<script setup lang="ts">
import { ref, useAttrs } from 'vue'
import type { SelectOption } from '../interfaces'

interface Props {
  disabled?: boolean
  error?: string
  id: string
  label?: string
  modelValue?: string
  loading?: boolean
  invalid?: boolean
  autofocus?: boolean
  options: SelectOption[]
}
defineProps<Props>()
defineEmits(['update:modelValue', 'blur', 'change', 'input'])

const attrs = useAttrs()
const klass = attrs.class
</script>

<template>
  <article :class="klass">
    <FloatLabel variant="in">
      <Select
        :inputId="id"
        :model-value="modelValue"
        @change="$emit('change', $event)"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value || '')"
        @blur="$emit('blur')"
        :options="options"
        option-label="name"
        option-value="value"
        fluid
        :loading="loading"
      />

      <label v-if="label" :for="id">{{ label }}</label>
    </FloatLabel>
    <transition name="p-message" tag="div" class="flex flex-col mt-2">
      <Message v-if="error" severity="error">{{ error }}</Message>
    </transition>
  </article>
</template>
