<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface Props {
  customClass?: HTMLAttributes['class']
}

withDefaults(defineProps<Props>(), {
  customClass: ''
})
</script>

<template>
  <Card class="dark:bg-dark-950 border dark:border-gray-700 border-primary-400">
    <template #content>
      <div :class="customClass">
        <slot />
      </div>
    </template>
  </Card>
</template>
