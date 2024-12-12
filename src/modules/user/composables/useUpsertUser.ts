import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'

import { useNotification } from '@/modules/shared'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { upsertUserAction } from '../actions'

export const useUpsertUser = () => {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useNotification()
  const router = useRouter()
  const password = ref<string | null>(null)

  const {
    mutate: upsertMutation,
    isPending: isUpsertPending,
    isSuccess: isUpsertSuccess,
    data: upsertData
  } = useMutation({
    mutationFn: upsertUserAction,
    onSuccess: (data) => {
      if (data.password) password.value = data.password
      if (data.id === '') password.value = null

      queryClient.setQueryData(['user', data.username], data)

      const message = data.id
        ? t('shared.messages.updated', [data.username])
        : t('shared.messages.created', [data.username])
      showSuccess({ detail: message })

      router.replace({ name: 'user.detail', params: { username: data.username } })
    },
    onError: (error) => showError({ detail: error.message })
  })

  return {
    password,
    upsertMutation,
    isUpsertPending,
    isUpsertSuccess,
    upsertData,
    removePassword: () => (password.value = null)
  }
}
