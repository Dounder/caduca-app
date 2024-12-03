<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'

import type { Pagination, SelectOption } from '../interfaces'
import PaginationButtons from './PaginationButtons.vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useConfigStore } from '../stores'
import { storeToRefs } from 'pinia'

interface Props {
  data: any[]
  pagination: Pagination
  options: SelectOption[]
}
defineProps<Props>()

interface Emits {
  (e: 'on:edit', data: any, newTab: boolean): void
  (e: 'on:delete', data: any): void
  (e: 'on:search', value: string, option: string): void
}
const emits = defineEmits<Emits>()

const { t } = useI18n()
const configStore = useConfigStore()
const { darkTheme } = storeToRefs(configStore)
const searchValue = ref('')
const selectedOption = ref('')
const onSearch = () => {
  console.log(searchValue.value, selectedOption.value)
}
</script>

<template>
  <div class="card">
    <DataTable :value="data" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" scrollable>
      <template #header>
        <article class="grid grid-cols-12 gap-2">
          <!-- Search Bar -->
          <FloatLabel class="col-span-full md:col-span-9" variant="on">
            <InputText id="search_bar" class="w-full" />
            <label for="search_bar">{{ t('shared.actions.search') }}...</label>
          </FloatLabel>

          <!-- Options Dropdown -->
          <FloatLabel class="col-span-5 md:col-span-2" variant="on">
            <Select inputId="search_options" :options="[]" optionLabel="name" class="w-full" />
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

      <slot />

      <Column class="w-[8rem]">
        <template #body="{ data }">
          <section class="flex justify-center gap-2">
            <Button
              v-tooltip.top="t('shared.actions.edit')"
              text
              rounded
              :icon="icons.PENCIL"
              severity="secondary"
              @click="$emit('on:edit', data, false)"
              @click.middle="$emit('on:edit', data, true)"
            />
            <Button
              v-tooltip.top="t(data.deletedAt ? 'shared.actions.restore' : 'shared.actions.delete')"
              text
              rounded
              :icon="data.deletedAt ? icons.REFRESH : icons.TRASH"
              :severity="data.deletedAt ? 'help' : 'danger'"
              @click="$emit('on:delete', data)"
            />
          </section>
        </template>
      </Column>

      <template #paginatorcontainer>
        <PaginationButtons
          :total="pagination.total"
          :lastPage="pagination.lastPage"
          :page="pagination.page"
        />
      </template>
    </DataTable>
  </div>
</template>

<style scoped></style>
