import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, watch } from 'vue'

import { useNotification } from '@/modules/shared'
import { useI18n } from 'vue-i18n'
import { createUpdateSalespersonAction, deleteRestoreSalespersonAction } from '../actions'
import type { DeleteRestoreSalesperson } from '../interfaces'

export const useSalesperson = () => {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useNotification()

  const {
    mutate: updateMutation,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    data: updatedSalesperson,
    error: updateError
  } = useMutation({
    mutationFn: createUpdateSalespersonAction
  })

  const {
    mutate: deleteMutation,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    data: deletedSalesperson,
    error: deleteError
  } = useMutation({
    mutationFn: ({ salespersonId, isDeleted }: DeleteRestoreSalesperson) =>
      deleteRestoreSalespersonAction(salespersonId, isDeleted),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['salespersons'] })
      queryClient.setQueryData(['salesperson', data.code], data)
    }
  })

  const isPending = computed(() => isUpdatePending.value || isDeletePending.value)
  const isSuccess = computed(() => {
    if (!updatedSalesperson.value && !deletedSalesperson.value) return null

    if (isUpdateSuccess.value)
      return { msg: t('shared.messages.updateSuccess'), salesperson: updatedSalesperson.value }

    if (isDeleteSuccess.value)
      return {
        msg: `Vendedor ${deletedSalesperson.value?.deletedAt ? 'eliminado' : 'restaurado'} correctamente`,
        salesperson: deletedSalesperson.value
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
    deleteMutation,
    isPending

    //! Getters
    //? Methods
  }
}
