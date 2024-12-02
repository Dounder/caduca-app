import { ref, watchEffect } from 'vue'
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/vue-query'

import { usePagination } from '@shared/composables/usePagination'
import { getUsersAction } from '../actions/get-users.action'

export const useUsers = () => {
  const queryClient = useQueryClient()
  const { page } = usePagination()
  const lastPage = ref(1)
  const total = ref(0)

  const {
    data: users,
    isFetching,
    isLoading,
    isPlaceholderData
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
