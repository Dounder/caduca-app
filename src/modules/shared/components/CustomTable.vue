<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '@/modules/auth/store/auth.store'
import BottomPagination from './BottomPagination.vue'
import TableSearchBar from './TableSearchBar.vue'

interface Props {
  data: any[]
  loading?: boolean
  editable?: boolean
  grid?: boolean
  paginator?: boolean
}
withDefaults(defineProps<Props>(), { editable: true, paginator: true })

interface Emits {
  (e: 'on:edit', data: any, newTab: boolean): void
  (e: 'on:delete', data: any): void
}
defineEmits<Emits>()

const { t } = useI18n()
const authStore = useAuthStore()
</script>

<template>
  <DataTable
    :value="data"
    :paginator="paginator"
    :rows="10"
    :rowsPerPageOptions="[10, 20, 50]"
    scrollable
    :loading="loading"
    data-key="id"
    :show-gridlines="grid"
    table-style="min-width: 50rem"
  >
    <template #header>
      <TableSearchBar />
    </template>

    <slot />

    <Column class="w-[8rem]" v-if="editable">
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
            v-if="authStore.canDelete"
          />
        </section>
      </template>
    </Column>

    <template #paginatorcontainer v-if="paginator">
      <BottomPagination />
    </template>

    <template #empty>
      <div class="flex flex-col items-center justify-center h-[200px]">
        <i class="pi pi-folder-open text-4xl text-gray-400" />
        <p class="text-gray-400">{{ t('shared.messages.noData') }}</p>
      </div>
    </template>
  </DataTable>
</template>
