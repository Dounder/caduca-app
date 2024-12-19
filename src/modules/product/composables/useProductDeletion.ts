import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { deletionToggleProductAction } from '../actions'
import { useI18n } from 'vue-i18n'
import { useNotification } from '@/modules/shared'

export const useProductDeletion = () => {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showError, showSuccess } = useNotification()

  const {
    mutate: deletionMutation,
    isPending,
    isSuccess
  } = useMutation({
    mutationFn: deletionToggleProductAction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.setQueryData(['product', { slug: data.slug }], data)
      const message = data.deletedAt
        ? t('shared.messages.deleted', [data.name])
        : t('shared.messages.restored', [data.name])
      showSuccess({ detail: message })
    },
    onError: (error) => showError({ detail: error.message })
  })

  return {
    deletionMutation,
    isPending,
    isSuccess
  }
}
