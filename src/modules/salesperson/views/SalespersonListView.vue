<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '@/modules/auth'
import CustomTable from '@/modules/shared/components/CustomTable.vue'
import ListPage from '@/modules/shared/components/ListPage.vue'
import { useRouter } from 'vue-router'
import { useSalesperson, useSalespersons } from '../composables'
import type { SalespersonTable } from '../interfaces'

const { t } = useI18n()
const { salespersons, pagination, isLoading, isPlaceholderData, refreshData, isFetching } =
  useSalespersons()
const { deleteMutation } = useSalesperson()
const authStore = useAuthStore()

const router = useRouter()
const onEdit = ({ code }: SalespersonTable, newTab: boolean) => {
  const route = router.resolve({ name: 'customer.detail', params: { code } })
  newTab ? window.open(route.href, '_blank') : router.push(route)
}
const onDelete = ({ id, deletedAt }: any) => {
  deleteMutation({ salespersonId: id, isDeleted: !!deletedAt })
}
const onSearch = (value: string, option: string) => {
  console.log(value, option)
}
</script>

<template>
  <ListPage
    :title="t('salesperson.title')"
    @on:new="$router.push({ name: 'salesperson.detail', params: { code: 'nuevo' } })"
    @on:refresh="refreshData"
  >
    <CustomTable
      :options="[
        { label: t('salesperson.table.code'), value: 'code' },
        { label: t('salesperson.table.name'), value: 'name' }
      ]"
      :data="salespersons || []"
      :pagination="pagination"
      :loading="(isLoading && !isPlaceholderData) || isFetching"
      @on:delete="onDelete"
      @on:edit="onEdit"
      @on:search="onSearch"
    >
      <Column field="code" :header="t('salesperson.table.code')" />
      <Column field="name" :header="t('salesperson.table.name')" />
      <Column field="createdBy" :header="t('salesperson.table.createdBy')" />
      <Column field="createdAt" :header="t('salesperson.table.createdAt')" />
      <Column
        field="deletedAt"
        :header="t('salesperson.table.deletedAt')"
        v-if="authStore.canDelete"
      />
    </CustomTable>
  </ListPage>
</template>

<style scoped></style>
