import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNotification, usePaginationStore } from '@/modules/shared'
import { getSalespersonsAction } from '../actions'

export const useSalespersons = () => {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const paginationStore = usePaginationStore()
  const { page, lastPage } = storeToRefs(paginationStore)
  const { showError } = useNotification()

  const { data, isFetching, isLoading, isError, refetch } = useQuery({
    queryKey: ['salespersons', { page }],
    queryFn: () => getSalespersonsAction(page.value)
  })

  const loading = computed(() => isFetching.value || isLoading.value)
  const salespersons = computed(() => data.value?.data || [])

  watchEffect(() => {
    const currentPage = page.value
    const currentLastPage = lastPage.value

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ['salespersons', { page: currentPage - 1 }],
        queryFn: () => getSalespersonsAction(currentPage - 1)
      })

    if (currentPage < currentLastPage)
      queryClient.prefetchQuery({
        queryKey: ['salespersons', { page: currentPage + 1 }],
        queryFn: () => getSalespersonsAction(currentPage + 1)
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
    salespersons,

    //! Getters
    loading,

    //? Methods
    refetch
  }
}
