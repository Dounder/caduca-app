import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNotification, usePaginationStore } from '@/modules/shared'
import { storeToRefs } from 'pinia'
import { getUsersAction } from '../actions/get-users.action'
import { useRoute } from 'vue-router'

export const useUsers = () => {
  const route = useRoute()
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showError } = useNotification()

  const searchValue = computed(() => (route.query.q as string) || '')
  const paginationStore = usePaginationStore()
  const { page, lastPage } = storeToRefs(paginationStore)

  const { data, isFetching, isLoading, isPlaceholderData, isError, refetch } = useQuery({
    queryKey: ['users', { page, search: searchValue }],
    queryFn: () => getUsersAction(page.value, searchValue.value)
  })

  const loading = computed(() => isFetching.value || isLoading.value)
  const users = computed(() => data.value?.data || [])

  watchEffect(() => {
    const currentPage = page.value
    const currentLastPage = lastPage.value

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ['users', { page: currentPage - 1, search: searchValue.value }],
        queryFn: () => getUsersAction(currentPage - 1, searchValue.value)
      })

    if (currentPage < currentLastPage)
      queryClient.prefetchQuery({
        queryKey: ['users', { page: currentPage + 1, search: searchValue.value }],
        queryFn: () => getUsersAction(currentPage + 1, searchValue.value)
      })
  })

  watch(isError, (val) => {
    if (val) showError({ detail: t('error.500') })
  })

  watch(data, (val) => {
    if (val) lastPage.value = val.meta.lastPage
  })

  return {
    //* Props
    users,
    isPlaceholderData,

    //! Getters
    loading,

    //? Methods
    refetch
  }
}
