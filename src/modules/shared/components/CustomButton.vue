<script setup lang="ts">
import type { ButtonProps } from 'primevue/button'
import { useConfigStore } from '../stores/config.store'
import { storeToRefs } from 'pinia'
import { useAttrs } from 'vue'

interface Props {
  label?: string
  severity?: ButtonProps['severity']
  fluid?: boolean
  icon?: string
  iconPos?: 'left' | 'right' | 'top' | 'bottom'
  iconClass?: string
  disabled?: boolean
  loading?: boolean
  loadingIcon?: string
  type?: ButtonProps['type']
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  severity: 'primary',
  outlined: false,
  fluid: false,
  type: 'button'
})

defineEmits(['click'])

const configStore = useConfigStore()
const { darkTheme } = storeToRefs(configStore)
const attrs = useAttrs()
const klass = attrs.class
</script>

<template>
  <Button
    :outlined="!darkTheme ? true : false"
    :text="darkTheme ? true : false"
    :label="label"
    :severity="severity"
    :fluid="fluid"
    :icon="icon"
    :iconPos="iconPos"
    :disabled="disabled"
    :loading="loading"
    :loadingIcon="loadingIcon"
    :type="type"
    :class="klass"
    :iconClass="`!${iconClass}`"
    @click="$emit('click', $event)"
  />
</template>

<style scoped></style>
