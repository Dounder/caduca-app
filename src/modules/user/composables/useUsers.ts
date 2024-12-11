import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNotification } from '@/modules/shared'
import { usePagination } from '@shared/composables/usePagination'
import { getUsersAction } from '../actions/get-users.action'

export const useUsers = () => {
  const queryClient = useQueryClient()
  const { t } = useI18n()
  const { showError } = useNotification()
  const { page, lastPage, setLastPage } = usePagination()

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
    if (val) setLastPage(val.meta.lastPage)
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
