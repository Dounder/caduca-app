import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useNotification } from '@/modules/shared'
import { createProductCodeAction } from '../actions'
import type { Product } from '@/modules/product'

export const useProductCodeCreation = () => {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useNotification()
  const router = useRouter()

  const {
    mutate: productCodeMutation,
    isSuccess,
    isPending
  } = useMutation({
    mutationFn: createProductCodeAction,
    onSuccess: (data) => {
      const { product, id, code } = data

      queryClient.setQueryData(['product', { slug: product.slug }], (oldData: Product) => {
        return {
          ...oldData,
          codes: [...oldData.codes, { id, code }]
        }
      })

      const message = data.id
        ? t('shared.messages.updated', [product.name])
        : t('shared.messages.created', [product.name])
      showSuccess({ detail: message })

      router.replace({ name: 'product.detail', params: { slug: product.slug } })
    },
    onError: (error) => showError({ detail: error.message })
  })

  return {
    productCodeMutation,
    isPending,
    isSuccess
  }
}
