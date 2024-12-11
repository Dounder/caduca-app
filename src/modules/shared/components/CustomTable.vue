<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '@/modules/auth/store/auth.store'
import { usePagination } from '../composables'
import type { SelectOption } from '../interfaces'
import BottomPagination from './BottomPagination.vue'
import TableSearchBar from './TableSearchBar.vue'

interface Props {
  options: SelectOption[]
  data: any[]
  loading: boolean
}
withDefaults(defineProps<Props>(), {
  options: () => [{ label: 'Missing options', value: 'Missing options' }]
})

interface Emits {
  (e: 'on:edit', data: any, newTab: boolean): void
  (e: 'on:delete', data: any): void
  (e: 'on:search', value: string, option: string): void
}
const emits = defineEmits<Emits>()

const { t } = useI18n()
const { page } = usePagination()
const onSearch = (value: string, option: string) => emits('on:search', value, option)

const authStore = useAuthStore()
</script>

<template>
  <DataTable
    :value="data"
    paginator
    :rows="10"
    :rowsPerPageOptions="[10, 20, 50]"
    scrollable
    :loading="loading"
    data-key="id"
  >
    <template #header>
      <TableSearchBar :options="options" @on:search="onSearch" />
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
            v-if="authStore.canDelete"
          />
        </section>
      </template>
    </Column>

    <template #paginatorcontainer>
      <BottomPagination :lastPage="3" :page="page" />
    </template>
  </DataTable>
</template>
