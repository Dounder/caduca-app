import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useNotification } from '@/modules/shared'
import { upsertCustomerAction } from '../actions'

export const useUpsertCustomer = () => {
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
    mutationFn: upsertCustomerAction,
    onSuccess: (data) => {
      queryClient.setQueryData(['customer', { code: data.code }], data)

      const message = data.id ? t('shared.messages.updated', [data.name]) : t('shared.messages.created', [data.name])
      showSuccess({ detail: message })

      router.replace({ name: 'customer.detail', params: { code: data.code } })
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
