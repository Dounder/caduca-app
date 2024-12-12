import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useNotification } from '@/modules/shared'
import { upsertSalespersonAction } from '../actions'

export const useSalespersonUpsert = () => {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useNotification()
  const router = useRouter()

  const {
    mutate: upsertMutation,
    data: upsertData,
    isSuccess,
    isPending
  } = useMutation({
    mutationFn: upsertSalespersonAction,
    onSuccess: (data) => {
      queryClient.setQueryData(['salesperson', { code: data.code }], data)

      const message = data.id ? t('shared.messages.updated', [data.name]) : t('shared.messages.created', [data.name])
      showSuccess({ detail: message })

      router.replace({ name: 'salesperson.detail', params: { code: data.code } })
    },
    onError: (error) => showError({ detail: error.message })
  })

  return {
    upsertMutation,
    isPending,
    isSuccess,
    upsertData
  }
}
