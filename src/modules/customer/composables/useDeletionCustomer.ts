import { useI18n } from 'vue-i18n'
import { useQueryClient, useMutation } from '@tanstack/vue-query'

import { useNotification } from '@/modules/shared'
import { customerDeletionToggleAction } from '../actions'

export const useDeletionCustomer = () => {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useNotification()

  const {
    mutate: deletionToggleMutation,
    isPending,
    isSuccess
  } = useMutation({
    mutationFn: customerDeletionToggleAction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.setQueryData(['customer', data.code], data)
      const message = data.deletedAt
        ? t('shared.messages.deleted', [data.name])
        : t('shared.messages.restored', [data.name])
      showSuccess({ detail: message })
    },
    onError: (error) => showError({ detail: error.message })
  })

  return {
    deletionToggleMutation,
    isPending,
    isSuccess
  }
}
