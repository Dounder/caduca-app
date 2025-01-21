import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useNotification, usePaginationStore } from '@/modules/shared'
import { getVouchersAction } from '../actions'

export const useVouchers = () => {
  const route = useRoute()
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showError } = useNotification()

  const searchValue = computed(() => (route.query.q as string) || '')
  const paginationStore = usePaginationStore()
  const { page, lastPage } = storeToRefs(paginationStore)

  const { data, isFetching, isLoading, isPlaceholderData, isError, refetch } = useQuery({
    queryKey: ['vouchers', { page, search: searchValue }],
    queryFn: () => getVouchersAction(page.value, searchValue.value)
  })

  const loading = computed(() => isFetching.value || isLoading.value)
  const vouchers = computed(() => data.value?.data || [])

  watchEffect(() => {
    const currentPage = page.value
    const currentLastPage = lastPage.value

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ['vouchers', { page: currentPage - 1, search: searchValue.value }],
        queryFn: () => getVouchersAction(currentPage - 1, searchValue.value)
      })

    if (currentPage < currentLastPage)
      queryClient.prefetchQuery({
        queryKey: ['vouchers', { page: currentPage + 1, search: searchValue.value }],
        queryFn: () => getVouchersAction(currentPage + 1, searchValue.value)
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
    vouchers,
    isPlaceholderData,

    //! Getters
    loading,

    //? Methods
    refetch
  }
}
