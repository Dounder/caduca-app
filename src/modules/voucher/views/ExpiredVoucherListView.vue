<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useVouchers } from '../composables'
import ListPage from '@/modules/shared/components/ListPage.vue'
import CustomTable from '@/modules/shared/components/CustomTable.vue'
import { useAuthStore } from '@/modules/auth'

const { t } = useI18n()
const { loading, refetch, vouchers } = useVouchers()
const authStore = useAuthStore()

const onEdit = () => {
  console.log('Edit')
}
const onDelete = () => {
  console.log('Delete')
}
</script>

<template>
  <ListPage
    :title="t('voucher.title')"
    @on:new="$router.push({ name: 'expired_voucher.detail', params: { id: 'nuevo' } })"
    @on:refresh="refetch"
  >
    <CustomTable :data="vouchers" :loading="loading || false" @on:edit="onEdit" @on:delete="onDelete">
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
