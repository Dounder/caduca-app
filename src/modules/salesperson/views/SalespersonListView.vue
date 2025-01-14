<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/modules/auth'
import CustomTable from '@/modules/shared/components/CustomTable.vue'
import ListPage from '@/modules/shared/components/ListPage.vue'
import { computed } from 'vue'
import { useSalespersonDeletion, useSalespersons } from '../composables'
import type { SalespersonTable } from '../interfaces'
import TableSearchBar from '@/modules/shared/components/TableSearchBar.vue'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const { salespersons, refetch, loading } = useSalespersons()
const { deletionToggleMutation, isPending: deletionPending } = useSalespersonDeletion()
const isPending = computed(() => loading.value || deletionPending.value)

const onEdit = ({ code }: SalespersonTable, newTab: boolean) => {
  const route = router.resolve({ name: 'salesperson.detail', params: { code } })
  newTab ? window.open(route.href, '_blank') : router.push(route)
}
const onDelete = ({ id, deletedAt }: SalespersonTable) => deletionToggleMutation({ id, isDeleted: !!deletedAt })
const onSearch = (search: string) => {
  console.log(search)
}
</script>

<template>
  <ListPage
    :title="t('salesperson.title')"
    @on:new="$router.push({ name: 'salesperson.detail', params: { code: 'nuevo' } })"
    @on:refresh="refetch"
  >
    <CustomTable :data="salespersons" :loading="isPending" @on:delete="onDelete" @on:edit="onEdit">
      <template #searchBar>
        <TableSearchBar @on:search="onSearch" />
      </template>
      <Column field="code" :header="t('salesperson.table.code')" />
      <Column field="name" :header="t('salesperson.table.name')" />
      <Column field="createdBy" :header="t('salesperson.table.createdBy')" />
      <Column field="createdAt" :header="t('salesperson.table.createdAt')" />
      <Column field="deletedAt" :header="t('salesperson.table.deletedAt')" v-if="authStore.canDelete" />
    </CustomTable>
  </ListPage>
</template>

<style scoped></style>
