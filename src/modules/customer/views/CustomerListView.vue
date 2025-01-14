<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import CustomTable from '@/modules/shared/components/CustomTable.vue'
import ListPage from '@/modules/shared/components/ListPage.vue'
import TableSearchBar from '@/modules/shared/components/TableSearchBar.vue'
import { useAuthStore } from '@/modules/auth'
import { useCustomers, useDeletionCustomer } from '../composables'
import type { CustomerTable } from '../interfaces'

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()
const { customers, loading, refetch } = useCustomers()
const { deletionToggleMutation, isPending } = useDeletionCustomer()

const onEdit = ({ code }: CustomerTable, newTab: boolean) => {
  const route = router.resolve({ name: 'customer.detail', params: { code } })
  newTab ? window.open(route.href, '_blank') : router.push(route)
}
const onDelete = ({ id, deletedAt }: CustomerTable) => deletionToggleMutation({ id, isDeleted: !!deletedAt })
const onSearch = (value: string) => {
  console.log(value)
}
</script>

<template>
  <ListPage
    :title="t('customer.title')"
    @on:new="$router.push({ name: 'customer.detail', params: { code: 'nuevo' } })"
    @on:refresh="refetch"
  >
    <CustomTable
      :data="customers"
      :loading="loading || isPending"
      @on:edit="onEdit"
      @on:delete="onDelete"
      @on:search="onSearch"
    >
      <template #searchBar>
        <TableSearchBar @on:search="onSearch" />
      </template>

      <Column field="code" :header="t('customer.table.code')" />
      <Column field="name" :header="t('customer.table.name')" />
      <Column field="address" :header="t('customer.table.address')" />
      <Column field="createdAt" :header="t('customer.table.createdAt')" />
      <Column field="createdBy" :header="t('customer.table.createdBy')" />
      <Column field="deletedAt" :header="t('customer.table.deletedAt')" v-if="authStore.canDelete" />
    </CustomTable>
  </ListPage>
</template>

<style scoped></style>
