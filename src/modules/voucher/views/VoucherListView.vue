<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '@/modules/auth'
import { DateUtils } from '@/modules/shared'
import CustomTable from '@/modules/shared/components/CustomTable.vue'
import ListPage from '@/modules/shared/components/ListPage.vue'
import { useRouter } from 'vue-router'
import { useVouchers } from '../composables'
import type { VoucherPlain } from '../interfaces'

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
</script>

<template>
  <ListPage
    :title="t('voucher.title')"
    @on:new="$router.push({ name: 'voucher.detail', params: { number: 'nuevo' } })"
    @on:refresh="refetch"
  >
    <CustomTable :data="vouchers" :loading="loading || false" @on:edit="onEdit" @on:delete="onDelete">
      <Column :header="t('voucher.fields.number')" field="number" />
      <Column :header="t('voucher.fields.customer')" field="customer" />
      <Column :header="t('voucher.fields.status')">
        <template #body="{ data }">
          <span>{{ t(`voucher.status.${data.status}`) }}</span>
        </template>
      </Column>
      <Column :header="t('shared.fields.createdAt')" field="createdAt" />
      <Column :header="t('shared.fields.createdBy')" field="createdBy" />
      <Column :header="t('shared.fields.deletedAt')" field="deletedAt" v-if="authStore.canDelete" />
    </CustomTable>
  </ListPage>
</template>

<style scoped></style>
