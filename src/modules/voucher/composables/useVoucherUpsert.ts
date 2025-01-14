import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useNotification } from '@/modules/shared'
import { upsertVoucherAction } from '../actions'

export const useVoucherUpsert = () => {
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
    mutationFn: upsertVoucherAction,
    onSuccess: (data) => {
      queryClient.setQueryData(['voucher', { number: `${data.number}` }], data)

      const message = data.id
        ? t('shared.messages.updated', [`#${data.number}`])
        : t('shared.messages.created', [`#${data.number}`])
      showSuccess({ detail: message })

      router.replace({ name: 'voucher.detail', params: { number: data.number } })
    },
    onError: (error) => showError({ detail: error.message })
  })

  return {
    upsertMutation,
    upsertData,
    isPending,
    isSuccess
  }
}
