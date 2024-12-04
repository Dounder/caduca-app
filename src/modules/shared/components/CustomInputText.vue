<script setup lang="ts">
interface Props {
  disabled?: boolean
  error?: string
  id: string
  label?: string
  modelValue?: string
  placeholder?: string
  size?: 'large' | 'small'
  variant?: 'outlined' | 'filled'
  loading?: boolean
  invalid?: boolean
  autofocus?: boolean
}
defineProps<Props>()
defineEmits(['update:modelValue', 'blur', 'change', 'input'])
</script>

<template>
  <article>
    <FloatLabel variant="in">
      <InputText
        :id="id"
        :model-value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value || '')"
        @blur="$emit('blur')"
        :invalid="invalid || Boolean(error)"
        :placeholder="placeholder"
        :size="size"
        :variant="variant"
        fluid
        :disabled="disabled"
        :loading="loading"
        :autofocus="autofocus"
      />
      <label v-if="label" :for="id">{{ label }}</label>
    </FloatLabel>
    <transition name="p-message" tag="div" class="flex flex-col mt-2">
      <Message v-if="error" severity="error">{{ error }}</Message>
    </transition>
  </article>
</template>

<style scoped>
.expand-enter-to,
.expand-leave-from {
  height: 1.5rem;
}
</style>
