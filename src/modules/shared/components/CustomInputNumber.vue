<script setup lang="ts">
import type { InputNumberProps } from 'primevue'
import { useAttrs } from 'vue'

interface Props extends InputNumberProps {
  id: string
  error?: string
  label?: string
  loading?: boolean
  autofocus?: boolean
}

withDefaults(defineProps<Props>(), {})
defineEmits(['update:modelValue', 'blur', 'change', 'input'])

const attrs = useAttrs()
const klass = attrs.class
</script>

<template>
  <FloatLabel variant="in">
    <InputNumber
      :inputId="id"
      :model-value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      @blur="$emit('blur')"
      :invalid="invalid || Boolean(error)"
      :disabled="disabled"
      :loading="loading"
      :autofocus="autofocus"
      size="large"
      fluid
    />
    <label :for="id">{{ label }}</label>
    <transition name="p-message" tag="div" class="flex flex-col mt-2">
      <Message v-if="error" severity="error">{{ error }}</Message>
    </transition>
  </FloatLabel>
</template>

<style scoped>
.expand-leave-active,
.expand-enter-active {
  transition: all 350ms ease-in-out;
  overflow: hidden;
}

.expand-enter-to,
.expand-leave-from {
  height: 1.5rem;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  height: 0;
}
</style>
