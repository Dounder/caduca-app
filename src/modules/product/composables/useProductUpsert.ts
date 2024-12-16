import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useNotification } from '@/modules/shared'
import { upsertProductAction } from '../actions'

export const useProductUpsert = () => {
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
    mutationFn: upsertProductAction,
    onSuccess: (data) => {
      queryClient.setQueryData(['product', { slug: data.slug }], data)

      const message = data.id ? t('shared.messages.updated', [data.name]) : t('shared.messages.created', [data.name])
      showSuccess({ detail: message })

      router.replace({ name: 'product.detail', params: { slug: data.slug } })
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
