import { useNotification, usePaginationStore } from '@/modules/shared'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { getCustomersAction } from '../actions'

export const useCustomers = () => {
  const { t } = useI18n()
  const paginationStore = usePaginationStore()
  const { page, lastPage } = storeToRefs(paginationStore)
  const queryClient = useQueryClient()
  const { showError } = useNotification()

  const { data, isFetching, isLoading, isPlaceholderData, isError, refetch } = useQuery({
    queryKey: ['customers', { page }],
    queryFn: async () => await getCustomersAction(page.value)
  })

  const loading = computed(() => isFetching.value || isLoading.value)
  const customers = computed(() => data.value?.data || [])

  watchEffect(() => {
    const currentPage = page.value
    const currentLastPage = lastPage.value

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ['customers', { page: currentPage - 1 }],
        queryFn: () => getCustomersAction(currentPage - 1)
      })

    if (currentPage < currentLastPage)
      queryClient.prefetchQuery({
        queryKey: ['customers', { page: currentPage + 1 }],
        queryFn: () => getCustomersAction(currentPage + 1)
      })
  })
  watch(isError, (val) => {
    if (val) showError({ detail: t('error.500') })
  })
  watch(data, (val) => {
    if (val) paginationStore.setLastPage(val.meta.lastPage)
  })

  return {
    //* Props
    customers,
    isPlaceholderData,

    //! Getters
    loading,

    //? Methods
    refetch
  }
}
