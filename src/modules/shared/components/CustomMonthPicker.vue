<script setup lang="ts">
import { defineProps } from 'vue'

interface FieldAttrs {
  name?: string
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
}

interface Props {
  id: string
  modelValue: any
  fieldAttrs?: FieldAttrs
  label?: string
  error?: string
}
defineProps<Props>()
</script>

<template>
  <IftaLabel>
    <DatePicker
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      v-bind="fieldAttrs"
      view="month"
      dateFormat="mm/yy"
      showIcon
      fluid
      :invalid="Boolean(error)"
    />

    <label v-if="label" :for="id">{{ label }}</label>
    <transition name="p-message" tag="div" class="flex flex-col mt-2">
      <Message v-if="error" severity="error">{{ error }}</Message>
    </transition>
  </IftaLabel>
</template>

<style scoped></style>
