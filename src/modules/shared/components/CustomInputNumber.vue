<script setup lang="ts">
import type { InputNumberProps } from 'primevue'

interface Props extends InputNumberProps {
  id: string
  error?: string
  label?: string
  loading?: boolean
  autofocus?: boolean
}

withDefaults(defineProps<Props>(), {})
defineEmits(['update:modelValue', 'blur', 'change', 'input'])
</script>

<template>
  <IftaLabel>
    <InputNumber
      :inputId="id"
      :model-value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :invalid="invalid || Boolean(error)"
      :disabled="disabled"
      :loading="loading"
      :autofocus="autofocus"
      fluid
    />
    <label :for="id">{{ label }}</label>
    <transition name="p-message" tag="div" class="flex flex-col mt-2">
      <Message v-if="error" severity="error">{{ error }}</Message>
    </transition>
  </IftaLabel>
</template>
