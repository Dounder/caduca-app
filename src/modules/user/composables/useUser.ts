import { useQuery } from '@tanstack/vue-query'
import { computed, watch, type Ref } from 'vue'
import { useRouter } from 'vue-router'

import { getUserAction } from '../actions'
import { useUserForm } from './useUserForm'

export function useUser(username: Ref<string>) {
  const router = useRouter()
  const { form, errors, meta, allRoles, canSave, hasRole, handleSubmit, resetForm, toggleRole } = useUserForm()

  const {
    data: user,
    isError,
    isLoading,
    isRefetching,
    refetch
  } = useQuery({
    queryKey: ['user', username.value],
    queryFn: () => getUserAction(username.value),
    retry: false
  })

  const isFetching = computed(() => isLoading.value || isRefetching.value)

  watch([isError, isLoading], ([error, loading]) => {
    if (error && !loading) router.replace({ name: 'user.list' })
  })

  watch(
    user,
    (newUser) => {
      if (!newUser) return

      resetForm({ values: newUser })
    },
    { immediate: true }
  )

  watch(username, () => refetch())

  return {
    //* Props
    user,
    form,
    errors,
    meta,
    allRoles,
    canSave,
    isError,

    //! Getters
    isFetching,

    //? Methods
    hasRole,
    toggleRole,
    refetch,
    handleSubmit
  }
}
