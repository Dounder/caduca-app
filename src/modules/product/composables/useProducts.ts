import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNotification, usePaginationStore } from '@/modules/shared'
import { storeToRefs } from 'pinia'
import { getProductsAction } from '../actions'
import { useRoute } from 'vue-router'

export const useProducts = () => {
  const route = useRoute()
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showError } = useNotification()

  const searchValue = computed(() => (route.query.q as string) || '')
  const paginationStore = usePaginationStore()
  const { page, lastPage } = storeToRefs(paginationStore)

  const { data, isFetching, isLoading, isPlaceholderData, isError, refetch } = useQuery({
    queryKey: ['products', { page, search: searchValue }],
    queryFn: () => getProductsAction(page.value, searchValue.value)
  })

  const loading = computed(() => isFetching.value || isLoading.value)
  const products = computed(() => data.value?.data || [])

  watchEffect(() => {
    const currentPage = page.value
    const currentLastPage = lastPage.value

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ['products', { page: currentPage - 1, search: searchValue.value }],
        queryFn: () => getProductsAction(currentPage - 1, searchValue.value)
      })

    if (currentPage < currentLastPage)
      queryClient.prefetchQuery({
        queryKey: ['products', { page: currentPage + 1, search: searchValue.value }],
        queryFn: () => getProductsAction(currentPage + 1, searchValue.value)
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
    products,
    isPlaceholderData,

    //! Getters
    loading,

    //? Methods
    refetch
  }
}
