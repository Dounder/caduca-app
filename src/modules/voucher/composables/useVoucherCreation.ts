import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useNotification } from '@/modules/shared'
import { createVoucherAction } from '../actions'

export const useVoucherCreation = () => {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useNotification()
  const router = useRouter()

  const {
    mutate: createMutation,
    data: createData,
    isSuccess,
    isPending
  } = useMutation({
    mutationFn: createVoucherAction,
    onSuccess: (data) => {
      queryClient.setQueryData(['voucher', { number: data.number }], data)

      const message = data.id
        ? t('shared.messages.updated', [`#${data.number}`])
        : t('shared.messages.created', [`#${data.number}`])
      showSuccess({ detail: message })

      router.replace({ name: 'voucher.detail', params: { number: data.number } })
    },
    onError: (error) => showError({ detail: error.message })
  })

  return {
    createMutation,
    isPending,
    isSuccess,
    createData
  }
}
