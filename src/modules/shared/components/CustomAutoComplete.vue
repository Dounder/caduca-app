<script setup lang="ts">
import { defineProps, useAttrs } from 'vue'
import type { SelectOption } from '../interfaces'
import type { AutoCompleteCompleteEvent } from 'primevue'

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
  placeholder?: string
  onSearch?: (e: AutoCompleteCompleteEvent) => void
}
defineProps<Props>()
</script>

<template>
  <IftaLabel>
    <AutoComplete
      :invalid="Boolean(error)"
      :loading="loading"
      :modelValue="modelValue"
      :suggestions="options"
      :placeholder="placeholder"
      @complete="onSearch"
      @update:modelValue="$emit('update:modelValue', $event)"
      class="col-span-12"
      dropdown
      fluid
      optionLabel="name"
      v-bind="fieldAttrs"
    />

    <label v-if="label" :for="id">{{ label }}</label>
    <transition name="p-message" tag="div" class="flex flex-col mt-2">
      <Message v-if="error" severity="error">{{ error }}</Message>
    </transition>
  </IftaLabel>
</template>

<style scoped></style>
