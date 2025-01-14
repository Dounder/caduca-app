import { useNotification } from '@/modules/shared'
import { useQuery } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getCustomersSummaryAction } from '../actions'

export const useCustomersSummary = () => {
  const { t } = useI18n()
  const { showError } = useNotification()

  const { data, isFetching, isLoading, isPlaceholderData, isError, refetch } = useQuery({
    queryKey: ['customers:summary'],
    queryFn: async () => await getCustomersSummaryAction({ limit: 10000, page: 1 }),
    staleTime: Infinity
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
