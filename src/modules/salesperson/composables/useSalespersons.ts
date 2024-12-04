import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/vue-query'
import { reactive, ref, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import { getCustomersAction } from '@/modules/customer/actions'
import { useNotification, usePagination } from '@/modules/shared'
import { getSalespersonsAction } from '../actions'

export const useSalespersons = () => {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showError } = useNotification()
  const { page } = usePagination()
  const pagination = reactive({ page, lastPage: 1, total: 0 })

  const {
    data: salespersons,
    isFetching,
    isLoading,
    isPlaceholderData,
    isError,
    error
  } = useQuery({
    queryKey: ['salespersons', { page }],
    queryFn: () => getData(),
    placeholderData: keepPreviousData
  })

  watchEffect(() => {
    if (page.value > 1)
      queryClient.prefetchQuery({
        queryKey: ['salespersons', { page: page.value - 1 }],
        queryFn: () => getData()
      })

    queryClient.prefetchQuery({
      queryKey: ['salespersons', { page: page.value + 1 }],
      queryFn: () => getData()
    })
  })

  const getData = async () => {
    const { data, meta } = await getSalespersonsAction(page.value)
    pagination.lastPage = meta.lastPage
    pagination.total = meta.total
    return data
  }

  const refreshData = () => {
    queryClient.refetchQueries({
      queryKey: ['customers', { page }]
    })
  }

  watch(isError, () => {
    if (error.value) {
      showError({ detail: t('error.500') })
    }
  })

  return {
    //* Props
    salespersons,
    pagination,
    isFetching,
    isLoading,
    isPlaceholderData,

    //! Getters
    //? Methods
    refreshData
  }
}
