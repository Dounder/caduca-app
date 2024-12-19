<script setup lang="ts">
import ListPage from '@/modules/shared/components/ListPage.vue'
import { useProductDeletion, useProducts } from '../composables'
import { useI18n } from 'vue-i18n'
import CustomTable from '@/modules/shared/components/CustomTable.vue'
import type { ProductPlain } from '../interfaces'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth'

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()
const { products, loading, refetch } = useProducts()
const { deletionMutation, isPending } = useProductDeletion()

const onEdit = ({ slug }: ProductPlain, newTab: boolean) => {
  const route = router.resolve({ name: 'product.detail', params: { slug } })
  newTab ? window.open(route.href, '_blank') : router.push(route)
}
const onDelete = ({ id, deletedAt }: ProductPlain) => deletionMutation({ id, isDeleted: !!deletedAt })
</script>

<template>
  <ListPage
    :title="t('product.title')"
    @on:new="$router.push({ name: 'product.detail', params: { slug: 'nuevo' } })"
    @on:refresh="refetch"
  >
    <CustomTable
      :data="products"
      :options="[{ label: '', value: '' }]"
      :loading="loading || isPending"
      @on:edit="onEdit"
      @on:delete="onDelete"
    >
      <Column :header="t('product.table.name')" field="name" />
      <Column :header="t('product.table.codes')" field="code">
        <template #body="{ data }">
          <span v-if="data.codes.length > 0">
            {{ data.codes.map((code: number) => code).join(', ') }}
          </span>
          <span v-else>
            {{ t('product.table.noCodes') }}
          </span>
        </template>
      </Column>
      <Column :header="t('shared.fields.createdAt')" field="createdAt" />
      <Column :header="t('shared.fields.createdBy')" field="createdBy" />
      <Column :header="t('shared.fields.deletedAt')" field="deletedAt" v-if="authStore.canDelete" />
    </CustomTable>
  </ListPage>
</template>

<style scoped></style>
