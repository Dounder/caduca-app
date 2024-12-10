import { useI18n } from 'vue-i18n'
import { useQueryClient, useMutation } from '@tanstack/vue-query'

import { userDeletionToggle } from '../actions'
import { useNotification } from '@/modules/shared'

export const useUserDeletionToggle = () => {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useNotification()

  const {
    mutate: deletionToggleMutation,
    isPending: isDeletionTogglePending,
    isSuccess: isDeletionToggleSuccess
  } = useMutation({
    mutationFn: userDeletionToggle,
    onSuccess: (data) => {
      queryClient.setQueryData(['user', data.username], data)
      const message = data.deletedAt
        ? t('shared.messages.deleted', [data.username])
        : t('shared.messages.restored', [data.username])
      showSuccess({ detail: message })
    },
    onError: (error) => showError({ detail: error.message })
  })

  return {
    deletionToggleMutation,
    isDeletionTogglePending,
    isDeletionToggleSuccess
  }
}
