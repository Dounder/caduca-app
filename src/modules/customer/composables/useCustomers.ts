import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/vue-query'
import { ref, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useNotification, usePagination } from '@/modules/shared'
import { getUsersAction } from '@/modules/user/actions'
import { getCustomersAction } from '../actions'

export const useCustomers = () => {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showError } = useNotification()
  const { page } = usePagination()
  const lastPage = ref(1)
  const total = ref(0)

  const {
    data: customers,
    isFetching,
    isLoading,
    isPlaceholderData,
    isError,
    error
  } = useQuery({
    queryKey: ['customers', { page }],
    queryFn: () => getData(),
    placeholderData: keepPreviousData
  })

  watchEffect(() => {
    if (page.value > 1)
      queryClient.prefetchQuery({
        queryKey: ['users', { page: page.value - 1 }],
        queryFn: () => getData()
      })

    queryClient.prefetchQuery({
      queryKey: ['users', { page: page.value + 1 }],
      queryFn: () => getData()
    })
  })

  const getData = async () => {
    const { data, meta } = await getCustomersAction(page.value)
    lastPage.value = meta.lastPage
    total.value = meta.total
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
    customers,
    lastPage,
    total,
    isFetching,
    isLoading,
    isPlaceholderData,

    //! Getters
    //? Methods
    refreshData
  }
}
