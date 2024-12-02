import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/vue-query'
import { ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import { useNotification } from '@/modules/shared'
import { usePagination } from '@shared/composables/usePagination'
import { getUsersAction } from '../actions/get-users.action'
import { useI18n } from 'vue-i18n'

export const useUsers = () => {
  const { t } = useI18n()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { showError } = useNotification()
  const { page } = usePagination()
  const lastPage = ref(1)
  const total = ref(0)

  const {
    data: users,
    isFetching,
    isLoading,
    isPlaceholderData,
    isError,
    error
  } = useQuery({
    queryKey: ['users', { page }],
    queryFn: () => getUsers(),
    placeholderData: keepPreviousData
  })

  watchEffect(() => {
    if (page.value > 1)
      queryClient.prefetchQuery({
        queryKey: ['users', { page: page.value - 1 }],
        queryFn: () => getUsers()
      })

    queryClient.prefetchQuery({
      queryKey: ['users', { page: page.value + 1 }],
      queryFn: () => getUsers()
    })
  })

  const getUsers = async () => {
    const { data, meta } = await getUsersAction(page.value)
    lastPage.value = meta.lastPage
    total.value = meta.total
    return data
  }

  const refreshUsers = () => {
    queryClient.refetchQueries({
      queryKey: ['users', { page }]
    })
  }

  watch(isError, () => {
    if (error.value) {
      showError({ detail: t('error.500') })
      router.back()
    }
  })

  return {
    //* Props
    users,
    lastPage,
    total,
    isFetching,
    isLoading,
    isPlaceholderData,

    //! Getters
    //? Methods
    refreshUsers
  }
}
