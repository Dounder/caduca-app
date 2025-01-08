import { useNotification, usePaginationStore } from '@/modules/shared'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { getCustomersSummaryAction } from '../actions'

export const useCustomersSummary = () => {
  const { t } = useI18n()
  const paginationStore = usePaginationStore()
  const { page, lastPage } = storeToRefs(paginationStore)
  const queryClient = useQueryClient()
  const { showError } = useNotification()

  const { data, isFetching, isLoading, isPlaceholderData, isError, refetch } = useQuery({
    queryKey: ['customers:summary', { page }],
    queryFn: async () => await getCustomersSummaryAction({ limit: 1000, page: 1 })
  })

  const loading = computed(() => isFetching.value || isLoading.value)
  const customers = computed(() => data.value || [])

  watch(isError, (val) => {
    if (val) showError({ detail: t('error.500') })
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
