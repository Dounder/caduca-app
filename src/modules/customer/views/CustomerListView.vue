<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/modules/auth/store/auth.store'
import { usePagination } from '@/modules/shared'
import CustomTable from '@/modules/shared/components/CustomTable.vue'
import ListPage from '@/modules/shared/components/ListPage.vue'
import { useCustomer, useCustomers } from '../composables'
import type { CustomerTable } from '../interfaces'

const { t } = useI18n()
const { customers, lastPage, total, isLoading, isPlaceholderData, refreshData, isFetching } =
  useCustomers()
const { deleteMutation } = useCustomer()
const { page } = usePagination()
const pagination = reactive({ page, lastPage, total })

const authStore = useAuthStore()

const router = useRouter()
const onEdit = ({ code }: CustomerTable, newTab: boolean) => {
  const route = router.resolve({ name: 'customer.detail', params: { code } })
  newTab ? window.open(route.href, '_blank') : router.push(route)
}
const onDelete = ({ id, deletedAt }: any) => {
  deleteMutation({ customerId: id, isDeleted: !!deletedAt })
}
const onSearch = (value: string, option: string) => {
  console.log(value, option)
}
</script>

<template>
  <ListPage
    :title="t('customer.title')"
    @on:new="$router.push({ name: 'customer.detail', params: { code: 'nuevo' } })"
    @on:refresh="refreshData"
  >
    <CustomTable
      :data="customers || []"
      :pagination="pagination"
      :loading="(isLoading && !isPlaceholderData) || isFetching"
      :options="[
        { label: t('customer.table.code'), value: 'code' },
        { label: t('customer.table.name'), value: 'name' }
      ]"
      @on:edit="onEdit"
      @on:delete="onDelete"
      @on:search="onSearch"
    >
      <Column field="code" :header="t('customer.table.code')" />
      <Column field="name" :header="t('customer.table.name')" />
      <Column field="address" :header="t('customer.table.address')" />
      <Column field="createdAt" :header="t('customer.table.createdAt')" />
      <Column field="createdBy" :header="t('customer.table.createdBy')" />
      <Column
        field="deletedAt"
        :header="t('customer.table.deletedAt')"
        v-if="authStore.canDelete"
      />
    </CustomTable>
  </ListPage>
</template>

<style scoped></style>
