import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
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
    isPending: isUpsertPending,
    isSuccess: isUpsertSuccess,
    data: upsertData
  } = useMutation({
    mutationFn: upsertCustomerAction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.setQueryData(['customer', data.code], data)

      const message = data.id ? t('shared.messages.updated', [data.code]) : t('shared.messages.created', [data.code])
      showSuccess({ detail: message })

      router.replace({ name: 'customer.detail', params: { code: data.code } })
    },
    onError: (error) => showError({ detail: error.message })
  })

  return {
    upsertMutation,
    isUpsertPending,
    isUpsertSuccess,
    upsertData
  }
}
