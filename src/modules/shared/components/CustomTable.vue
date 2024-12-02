<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'

import type { Pagination } from '../interfaces'
import PaginationButtons from './PaginationButtons.vue'
import { useI18n } from 'vue-i18n'

interface Props {
  data: any[]
  pagination: Pagination
}
defineProps<Props>()

interface Emits {
  (e: 'on:edit', data: any, newTab: boolean): void
  (e: 'on:delete', data: any): void
}
defineEmits<Emits>()

const { t } = useI18n()
</script>

<template>
  <DataTable
    :value="data"
    tableStyle="min-width: 50rem"
    paginator
    :rows="10"
    :rowsPerPageOptions="[10, 20, 50]"
    scrollable
  >
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
</template>

<style scoped></style>
