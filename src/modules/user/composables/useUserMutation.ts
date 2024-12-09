import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useNotification } from '@/modules/shared'
import { createUpdateUserAction, deleteRestoreUserAction } from '../actions'

export const useUserMutation = () => {
  const { t } = useI18n()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useNotification()
  const password = ref<null | string>(null)

  const {
    mutate: updateMutation,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    data: updatedUser,
    error: updateError
  } = useMutation({
    mutationFn: createUpdateUserAction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.setQueryData(['user', data.username], data)
    }
  })

  const {
    mutate: deleteMutation,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    data: deletedUser,
    error: deleteError
  } = useMutation({
    mutationFn: deleteRestoreUserAction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.setQueryData(['user', data.username], data)
    }
  })

  const isSuccess = computed(() => {
    if (isUpdateSuccess.value) return updatedUser.value

    if (isDeleteSuccess.value) return deletedUser.value

    return null
  })
  const isError = computed<string | null>(() => {
    if (updateError.value) return updateError.value.message.split(':')[1].trim()
    if (deleteError.value) return deleteError.value.message.split(':')[1].trim()
    return null
  })

  return {
    //* Props
    updateMutation,
    deleteMutation,
    password,

    //! Getters
    isLoading: computed(() => isUpdatePending.value || isDeletePending.value),
    isSuccess,
    isError

    //? Methods
  }
}
