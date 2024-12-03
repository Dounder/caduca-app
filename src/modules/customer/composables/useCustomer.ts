import { computed, watch } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { useNotification } from '@/modules/shared'
import { createUpdateCustomerAction, deleteRestoreCustomerAction } from '../actions'
import type { DeleteRestoreCustomer } from '../interfaces'
import { useI18n } from 'vue-i18n'

export const useCustomer = () => {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useNotification()

  const {
    mutate: updateMutation,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    data: updatedCustomer,
    error: updateError
  } = useMutation({
    mutationFn: createUpdateCustomerAction
  })

  const {
    mutate: deleteMutation,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    data: deletedCustomer,
    error: deleteError
  } = useMutation({
    mutationFn: ({ customerId, isDeleted }: DeleteRestoreCustomer) =>
      deleteRestoreCustomerAction(customerId, isDeleted),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.setQueryData(['customer', data.code], data)
    }
  })

  const isPending = computed(() => isUpdatePending.value || isDeletePending.value)
  const isSuccess = computed(() => {
    if (!updatedCustomer.value && !deletedCustomer.value) return null

    if (isUpdateSuccess.value)
      return { msg: t('shared.messages.updateSuccess'), customer: updatedCustomer.value }

    if (isDeleteSuccess.value)
      return {
        msg: `Cliente ${deletedCustomer.value?.deletedAt ? 'eliminado' : 'restaurado'} correctamente`,
        customer: deletedCustomer.value
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
