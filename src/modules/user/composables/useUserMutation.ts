import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useNotification } from '@/modules/shared'
import { createUpdateUserAction, deleteRestoreUserAction } from '../actions'
import type { DeleteRestoreUser } from '../interfaces'

export const useUserMutation = () => {
  const { t } = useI18n()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useNotification()
  const { password, closeDialog } = handlePassword()

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

  watch(isSuccess, (val) => {
    if (!val) return

    if (val.password) {
      console.log('🚀 ~ watch ~ val:', val.password)
      password.value = val.password
      password.visible = true
    }

    showSuccess({ detail: t('shared.messages.changesSaved') })

    router.replace({ name: 'user.detail', params: { username: val?.username } })
  })

  watch(isError, (value) => {
    if (!value) return
    showError({ detail: value })
  })

  function handlePassword() {
    const password = reactive({ value: '', visible: false })

    const closeDialog = (state: boolean) => {
      password.visible = state
      password.value = ''
    }

    return { password, closeDialog }
  }

  return {
    //* Props
    updateMutation,
    deleteMutation,
    password,

    //! Getters
    isLoading: computed(() => isUpdatePending.value || isDeletePending.value),
    isSuccess,

    //? Methods
    closeDialog
  }
}
