import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNotification, usePaginationStore } from '@/modules/shared'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { getSalespersonsAction } from '../actions'

export const useSalespersons = () => {
  const route = useRoute()
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showError } = useNotification()

  const searchValue = computed(() => (route.query.q as string) || '')
  const paginationStore = usePaginationStore()
  const { page, lastPage } = storeToRefs(paginationStore)

  const { data, isFetching, isLoading, isPlaceholderData, isError, refetch } = useQuery({
    queryKey: ['salespersons', { page, search: searchValue }],
    queryFn: () => getSalespersonsAction(page.value, searchValue.value)
  })

  const loading = computed(() => isFetching.value || isLoading.value)
  const salespersons = computed(() => data.value?.data || [])

  watchEffect(() => {
    const currentPage = page.value
    const currentLastPage = lastPage.value

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ['salespersons', { page: currentPage - 1, search: searchValue.value }],
        queryFn: () => getSalespersonsAction(currentPage - 1, searchValue.value)
      })

    if (currentPage < currentLastPage)
      queryClient.prefetchQuery({
        queryKey: ['salespersons', { page: currentPage + 1, search: searchValue.value }],
        queryFn: () => getSalespersonsAction(currentPage + 1, searchValue.value)
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
    salespersons,
    isPlaceholderData,

    //! Getters
    loading,

    //? Methods
    refetch
  }
}
