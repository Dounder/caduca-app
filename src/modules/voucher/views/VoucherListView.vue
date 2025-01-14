<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useVouchers } from '../composables'
import ListPage from '@/modules/shared/components/ListPage.vue'
import CustomTable from '@/modules/shared/components/CustomTable.vue'
import { useAuthStore } from '@/modules/auth'
import type { VoucherPlain } from '../interfaces'
import { useRouter } from 'vue-router'
import TableSearchBar from '@/modules/shared/components/TableSearchBar.vue'

const router = useRouter()
const { t } = useI18n()
const { loading, refetch, vouchers } = useVouchers()
const authStore = useAuthStore()

const onEdit = ({ number }: VoucherPlain, newTab: boolean) => {
  const route = router.resolve({ name: 'voucher.detail', params: { number } })
  newTab ? window.open(route.href, '_blank') : router.push(route)
}
const onDelete = () => {
  console.log('Delete')
}
const onSearch = (value: string) => {
  console.log('Search', value)
}
</script>

<template>
  <ListPage
    :title="t('voucher.title')"
    @on:new="$router.push({ name: 'voucher.detail', params: { number: 'nuevo' } })"
    @on:refresh="refetch"
  >
    <CustomTable :data="vouchers" :loading="loading || false" @on:edit="onEdit" @on:delete="onDelete">
      <template #searchBar>
        <TableSearchBar @on:search="onSearch" />
      </template>
      <Column :header="t('voucher.fields.number')" field="number" />
      <Column :header="t('voucher.fields.approvedDate')" field="approvedDate" />
      <Column :header="t('voucher.fields.rejectedDate')" field="rejectedDate" />
      <Column :header="t('shared.fields.createdAt')" field="createdAt" />
      <Column :header="t('shared.fields.createdBy')" field="createdBy" />
      <Column :header="t('shared.fields.deletedAt')" field="deletedAt" v-if="authStore.canDelete" />
    </CustomTable>
  </ListPage>
</template>

<style scoped></style>
