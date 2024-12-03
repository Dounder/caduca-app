<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useConfigStore, type SelectOption } from '..'

const { t } = useI18n()

interface Props {
  options: SelectOption[]
}
defineProps<Props>()

interface Emits {
  (e: 'on:search', value: string, option: string): void
}
const emits = defineEmits<Emits>()

const searchValue = ref('')
const selectedOption = ref('')
const onSearch = () => {
  if (searchValue.value === '') return

  emits('on:search', searchValue.value, selectedOption.value)
}

const configStore = useConfigStore()
const { darkTheme } = storeToRefs(configStore)
</script>

<template>
  <article class="grid grid-cols-12 gap-2">
    <!-- Search Bar -->
    <FloatLabel class="col-span-full md:col-span-9" variant="on">
      <InputText id="search_bar" class="w-full" v-model="searchValue" />
      <label for="search_bar">{{ t('shared.actions.search') }}...</label>
    </FloatLabel>

    <!-- Options Dropdown -->
    <FloatLabel class="col-span-5 md:col-span-2" variant="on">
      <Select
        inputId="search_options"
        :options="options"
        optionLabel="label"
        option-value="value"
        class="w-full"
        :default-value="options[0].value"
      />
      <label for="search_options">{{ t('shared.actions.options') }}</label>
    </FloatLabel>

    <!-- Search Button -->
    <Button
      v-tooltip.top="t('shared.actions.search')"
      :icon="icons.SEARCH"
      @click="onSearch"
      :text="darkTheme"
      :outlined="!darkTheme"
      class="col-span-1 !w-full"
    />
  </article>
</template>

<style scoped></style>
