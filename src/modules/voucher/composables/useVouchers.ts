import { useNotification, usePaginationStore } from '@/modules/shared'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { getVouchersAction } from '../actions'

export const useVouchers = () => {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const paginationStore = usePaginationStore()
  const { page, lastPage } = storeToRefs(paginationStore)
  const { showError } = useNotification()

  const { data, isFetching, isLoading, isError, refetch } = useQuery({
    queryKey: ['vouchers', { page }],
    queryFn: async () => await getVouchersAction(page.value)
  })
  const loading = computed(() => isFetching.value || isLoading.value)
  const vouchers = computed(() => data.value?.data || [])

  watchEffect(() => {
    const currentPage = page.value
    const currentLastPage = lastPage.value

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ['vouchers', { page: currentPage - 1 }],
        queryFn: () => getVouchersAction(currentPage - 1)
      })

    if (currentPage < currentLastPage)
      queryClient.prefetchQuery({
        queryKey: ['vouchers', { page: currentPage + 1 }],
        queryFn: () => getVouchersAction(currentPage + 1)
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
    vouchers,

    //! Getters
    loading,

    //? Methods
    refetch
  }
}
