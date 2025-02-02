import { useForm } from 'vee-validate'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { envs } from '@/config/envs'
import { useNotification } from '@/modules/shared'
import { loginSchema } from '../schemas'
import { useAuthStore } from '../store'

export const useLogin = () => {
  const { t } = useI18n()
  const authStore = useAuthStore()
  const { showSuccess, showError } = useNotification()

  const loading = ref(false)
  const error = ref<string | null>(null)

  const initialValues = envs.isDev ? { username: 'admin', password: 'Abcd@123' } : {}
  const { defineField, errors, handleSubmit } = useForm({
    validationSchema: loginSchema,
    initialValues
  })

  const [username, usernameAttrs] = defineField('username')
  const [password, passwordAttrs] = defineField('password')

  const form = reactive({ username, usernameAttrs, password, passwordAttrs })

  const onSubmit = handleSubmit(async ({ username, password }, { resetForm }) => {
    loading.value = true

    try {
      const ok = await authStore.login(username, password)

      if (!ok) {
        error.value = t('auth.login.errorMessage')
        return
      }

      showSuccess({ detail: t('auth.login.success') })

      resetForm()
    } catch (error) {
      console.log(error)
      showError({ detail: t('auth.login.error') })
    } finally {
      loading.value = false
    }
  })

  return {
    //* Props
    form,
    errors,
    loading,
    error,

    //? Methods
    onSubmit
  }
}
