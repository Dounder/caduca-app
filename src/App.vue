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
// Utility function to replace placeholders
function replacePlaceholders(template: string, params: Record<string, string | string[]>): string {
  return Object.keys(params).reduce((result, param) => {
    const paramValue = Array.isArray(params[param]) ? params[param][0] : params[param]
    return result.replace(`{${param}}`, String(paramValue || ''))
  }, template)
}

// Watcher for the titleKey in route meta
watch(
  () => route.meta.titleKey,
  (titleKey: unknown) => {
    const defaultTitle: string = appName

    if (!titleKey || typeof titleKey !== 'string') {
      document.title = defaultTitle
      return
    }

    // Fetch the translated title
    let pageTitle: string = titleKey.includes('{') ? titleKey : t(titleKey)

    // Replace placeholders with route params
    pageTitle = replacePlaceholders(pageTitle, route.params as Record<string, string | string[]>)

    // Set the document title
    document.title = `${pageTitle} | ${defaultTitle}`
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
