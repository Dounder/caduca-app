<script setup lang="ts">
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { envs } from '@/config/envs'
import { useNotification } from '@/modules/shared'
import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomCard from '@/modules/shared/components/CustomCard.vue'
import CustomSpinner from '@/modules/shared/components/CustomSpinner.vue'
import CustomInputPassword from '@shared/components/CustomInputPassword.vue'
import CustomInputText from '@shared/components/CustomInputText.vue'
import { loginSchema } from '../schemas'
import { useAuthStore } from '../store/auth.store'

const { t } = useI18n()
const { showSuccess, showError } = useNotification()
const authStore = useAuthStore()

const initialValues = envs.mode === 'development' ? { username: 'admin', password: 'Abcd@123' } : {}
const { defineField, errors, handleSubmit } = useForm({
  validationSchema: loginSchema,
  initialValues
})

const loading = ref(false)
const error = ref<string | null>(null)
const [username, usernameAttrs] = defineField('username')
const [password, passwordAttrs] = defineField('password')

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
</script>

<template>
  <div class="max-w-[30rem] h-full mx-auto flex items-center flex-col justify-center">
    <h1 class="font-bold text-center text-2xl mb-5">Logo</h1>
    <CustomCard class="w-full relative">
      <h4 class="text-center text-2xl mb-6">{{ t('auth.login.title') }}</h4>
      <form @submit="onSubmit" class="flex flex-col gap-6" v-focustrap>
        <CustomInputText
          id="username"
          :label="t('auth.login.username')"
          v-model="username"
          v-bind="usernameAttrs"
          :error="errors.username"
          autofocus
        />
        <CustomInputPassword
          id="password"
          :label="t('auth.login.password')"
          v-model="password"
          v-bind="passwordAttrs"
          :error="errors.password"
        />
        <CustomButton type="submit" :label="t('auth.login.submit')" class="mt-4" fluid />
        <transition name="p-message" tag="div" class="flex flex-col">
          <Message v-if="error" severity="error">{{ error }}</Message>
        </transition>
      </form>
      <div v-if="loading" class="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
        <CustomSpinner />
      </div>
    </CustomCard>
  </div>
</template>
