import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNotification, usePaginationStore } from '@/modules/shared'
import { storeToRefs } from 'pinia'
import { getUsersAction } from '../actions/get-users.action'

export const useUsers = () => {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showError } = useNotification()
  const paginationStore = usePaginationStore()
  const { page, lastPage } = storeToRefs(paginationStore)

  const { data, isFetching, isLoading, isPlaceholderData, isError, refetch } = useQuery({
    queryKey: ['users', { page }],
    queryFn: () => getUsersAction(page.value)
  })

  const loading = computed(() => isFetching.value || isLoading.value)
  const users = computed(() => data.value?.data || [])

  watchEffect(() => {
    const currentPage = page.value
    const currentLastPage = lastPage.value

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ['users', { page: currentPage - 1 }],
        queryFn: () => getUsersAction(currentPage - 1)
      })

    if (currentPage < currentLastPage)
      queryClient.prefetchQuery({
        queryKey: ['users', { page: currentPage + 1 }],
        queryFn: () => getUsersAction(currentPage + 1)
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
