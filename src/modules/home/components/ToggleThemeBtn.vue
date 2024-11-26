<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { PrimeIcons as icons } from '@primevue/core/api'

import { useConfigStore } from '@shared/stores/config.store'

const configStore = useConfigStore()
const { darkTheme } = storeToRefs(configStore)
const toggleBtn = ref<HTMLDivElement | null>(null)

const handleToggle = async () => {
  if (
    !toggleBtn.value ||
    !document.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    configStore.toggleTheme()
    return
  }

  await document.startViewTransition(() => configStore.toggleTheme()).ready

  document.documentElement.animate(
    { opacity: [0, 1] },
    { duration: 300, easing: 'ease', pseudoElement: '::view-transition-new(root)' }
  )
}
</script>

<template>
  <Button
    :icon="darkTheme ? icons.MOON : icons.SUN"
    @click="handleToggle"
    text
    plain
    ref="toggleBtn"
  />
</template>

<style scoped></style>
