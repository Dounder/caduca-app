<script setup lang="ts">
import { useAttrs } from 'vue'

interface Props {
  disabled?: boolean
  error?: string
  id: string
  label?: string
  modelValue?: string
  loading?: boolean
  invalid?: boolean
  autofocus?: boolean
}
defineProps<Props>()
defineEmits(['update:modelValue', 'blur', 'change', 'input'])

const attrs = useAttrs()
const klass = attrs.class
</script>

<template>
  <article :class="klass">
    <FloatLabel variant="in">
      <InputText
        :id="id"
        :model-value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value || '')"
        @blur="$emit('blur')"
        :invalid="invalid || Boolean(error)"
        :disabled="disabled"
        :loading="loading"
        :autofocus="autofocus"
        size="large"
        fluid
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
