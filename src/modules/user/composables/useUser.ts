import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { createUpdateUserAction, deleteRestoreUserAction } from '../actions'
import type { DeleteRestoreUser } from '../interfaces'
import { useNotification } from '@/modules/shared'

export const useUser = () => {
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useNotification()

  const {
    mutate: updateMutation,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    data: updatedUser,
    error: updateError
  } = useMutation({
    mutationFn: createUpdateUserAction
  })

  const {
    mutate: deleteMutation,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    data: deletedUser,
    error: deleteError
  } = useMutation({
    mutationFn: ({ userId, isDeleted }: DeleteRestoreUser) =>
      deleteRestoreUserAction(userId, isDeleted),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.setQueryData(['user', data.username], data)
    }
  })

  const isPending = computed(() => isUpdatePending.value || isDeletePending.value)
  const isSuccess = computed(() => {
    if (!updatedUser.value && !deletedUser.value) return null

    if (isUpdateSuccess.value)
      return { msg: 'Usuario actualizado correctamente', user: updatedUser.value }

    if (isDeleteSuccess.value)
      return {
        msg: `Usuario ${deletedUser.value?.deletedAt ? 'eliminado' : 'restaurado'} correctamente`,
        user: deletedUser.value
      }

    return null
  })
  const isError = computed<string | null>(() => {
    if (updateError.value) return updateError.value.message.split(':')[1].trim()
    if (deleteError.value) return deleteError.value.message.split(':')[1].trim()
    return null
  })

  watch(isSuccess, (value) => {
    if (!value) return
    showSuccess({ detail: value.msg })
  })

  watch(isError, (value) => {
    if (!value) return
    showError({ detail: value })
  })

  return {
    //* Props
    updateMutation,
    deleteMutation

    //! Getters
    //? Methods
  }
}
