<script setup lang="ts">
import FullscreenLoader from '@shared/components/FullscreenLoader.vue'
import { useConfigStore } from '@shared/stores/config.store'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useRoute, useRouter } from 'vue-router'
import { AuthStatus } from './modules/auth/interfaces'
import { useAuthStore } from './modules/auth/store/auth.store'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const { setAppTheme } = useConfigStore()
setAppTheme()

const authStore = useAuthStore()
authStore.$subscribe(
  async (_, state) => {
    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'home' })
      return
    }

    if (authStore.authStatus === AuthStatus.Unauthenticated) router.replace({ name: 'auth.login' })
  },
  { immediate: true }
)

const appName = 'Caduca'
watch(
  () => route.meta.titleKey,
  (titleKey) => {
    if (titleKey) {
      // Fetch the translated title from the JSON
      const pageTitle = t(`${titleKey}`)

      // Set the document title with the app name template
      document.title = `${pageTitle} | ${appName}`
    } else {
      // Default to app name if no title key is provided
      document.title = appName
    }
  },
  { immediate: true }
)
</script>

<template>
  <FullscreenLoader v-if="authStore.isChecking" />

  <RouterView v-else />
  <VueQueryDevtools button-position="bottom-left" />
  <Toast />
</template>

<style scoped></style>
