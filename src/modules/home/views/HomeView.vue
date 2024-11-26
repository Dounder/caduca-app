<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/store/auth.store'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const authStore = useAuthStore()
</script>

<template>
  <h1 className="text-center text-3xl font-bold underline">
    {{ t('home.welcome') }} {{ authStore.username }}
  </h1>
</template>
