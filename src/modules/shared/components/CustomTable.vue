<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'

import type { Pagination } from '../interfaces'
import PaginationButtons from './PaginationButtons.vue'

interface Props {
  data: any[]
  pagination: Pagination
}
defineProps<Props>()
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
          <Button text rounded :icon="icons.PENCIL" severity="secondary" @click="undefined" />
          <Button
            text
            rounded
            :icon="data.deletedAt ? icons.REFRESH : icons.TRASH"
            :severity="data.deletedAt ? 'help' : 'danger'"
            @click="undefined"
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
