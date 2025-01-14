<script setup lang="ts">
import { defineProps } from 'vue'
import type { SelectOption } from '../interfaces'

interface FieldAttrs {
  name?: string
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
}

interface Props {
  id: string
  modelValue: any
  fieldAttrs?: FieldAttrs
  options?: SelectOption[]
  label?: string
  error?: string
  loading?: boolean
}
withDefaults(defineProps<Props>(), {
  options: () => [{ name: 'Missing options', value: 1 }]
})
</script>

<template>
  <article>
    <FloatLabel variant="in">
      <Select
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        v-bind="fieldAttrs"
        :options="options"
        option-label="name"
        option-value="value"
        :loading="loading"
        fluid
        :virtualScrollerOptions="{ itemSize: 38 }"
      />

      <label v-if="label" :for="id">{{ label }}</label>
    </FloatLabel>
    <transition name="p-message" tag="div" class="flex flex-col mt-2">
      <Message v-if="error" severity="error">{{ error }}</Message>
    </transition>
  </article>
</template>

<style scoped></style>
