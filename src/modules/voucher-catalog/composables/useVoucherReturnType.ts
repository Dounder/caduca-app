import { useQuery } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { getVoucherReturnTypeAction } from '../actions'
import { useNotification } from '@/modules/shared'

export const useVoucherReturnType = () => {
  const { showError } = useNotification()

  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ['voucher:return_type'],
    queryFn: async () => getVoucherReturnTypeAction()
  })

  const returnTypes = computed(() => data.value || [])
  const loading = computed(() => isFetching.value || isLoading.value)

  watch(isError, (val) => {
    if (val) showError({ detail: 'Error al obtener los tipos de retorno' })
  })

  return {
    returnTypes,
    loading
  }
}
