import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNotification, usePaginationStore } from '@/modules/shared'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { getCustomersAction } from '../actions'

export const useCustomers = () => {
  const route = useRoute()
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showError } = useNotification()

  const searchValue = computed(() => (route.query.q as string) || '')
  const paginationStore = usePaginationStore()
  const { page, lastPage } = storeToRefs(paginationStore)

  const { data, isFetching, isLoading, isPlaceholderData, isError, refetch } = useQuery({
    queryKey: ['customers', { page, search: searchValue }],
    queryFn: () => getCustomersAction(page.value, searchValue.value)
  })

  const loading = computed(() => isFetching.value || isLoading.value)
  const customers = computed(() => data.value?.data || [])

  // Prefetch previous and next page
  watchEffect(() => {
    const currentPage = page.value
    const currentLastPage = lastPage.value

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ['customers', { page: currentPage - 1, search: searchValue.value }],
        queryFn: () => getCustomersAction(currentPage - 1, searchValue.value)
      })

    if (currentPage < currentLastPage)
      queryClient.prefetchQuery({
        queryKey: ['customers', { page: currentPage + 1, search: searchValue.value }],
        queryFn: () => getCustomersAction(currentPage + 1, searchValue.value)
      })
  })

  // Show error notification when isError changes
  watch(isError, (val) => {
    if (val) showError({ detail: t('error.500') })
  })

  // Update lastPage value when data changes
  watch(data, (val) => {
    if (val) lastPage.value = val.meta.lastPage
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
