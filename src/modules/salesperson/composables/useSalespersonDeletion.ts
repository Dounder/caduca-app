import { useI18n } from 'vue-i18n'
import { useQueryClient, useMutation } from '@tanstack/vue-query'

import { useNotification } from '@/modules/shared'
import { deletionToggleSalespersonAction } from '../actions'

export const useSalespersonDeletion = () => {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useNotification()

  const {
    mutate: deletionToggleMutation,
    isPending,
    isSuccess
  } = useMutation({
    mutationFn: deletionToggleSalespersonAction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['salespersons'] })
      queryClient.setQueryData(['salesperson', { code: data.code }], data)
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
