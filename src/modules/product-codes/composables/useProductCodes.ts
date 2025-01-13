import { useQuery } from '@tanstack/vue-query'
import type { AutoCompleteCompleteEvent } from 'primevue'
import { computed, onUpdated, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNotification, type SelectOption } from '@/modules/shared'
import { getProductCodesAction } from '../actions'

export const useProductCodes = () => {
  const { t } = useI18n()
  const { showError } = useNotification()
  const productCodes = ref<SelectOption[]>([])
  const filteredProductCodes = ref<SelectOption[]>([])

  const { data, isFetching, isLoading, isError, refetch } = useQuery({
    queryKey: ['product_codes'],
    queryFn: async () => await getProductCodesAction(),
    staleTime: Infinity
  })
  const loading = computed(() => isFetching.value || isLoading.value)

  const onSearch = async (event: AutoCompleteCompleteEvent) => {
    if (!data.value) return

    if (!event.query) {
      filteredProductCodes.value = productCodes.value
      return
    }

    const filtered = productCodes.value.filter(({ name }) => name.toLowerCase().includes(event.query.toLowerCase()))

    filteredProductCodes.value = filtered
  }

  watch(isError, (val) => {
    if (val) showError({ detail: t('error.500') })
  })

  watch(data, (val) => {
    if (val) productCodes.value = val.map(({ id, code, product }) => ({ name: `${code} - ${product}`, value: id }))
  })

  return {
    //* Props
    productCodes,
    filteredProductCodes,

    //! Getters
    loading,

    //? Methods
    refetch,
    onSearch
  }
}
