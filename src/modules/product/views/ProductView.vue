<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

import { useProductCodeCreation } from '@/modules/product-codes'
import { generateAuditItemList } from '@/modules/shared'
import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomInputText from '@/modules/shared/components/CustomInputText.vue'
import DetailPageCard from '@/modules/shared/components/DetailPageCard.vue'
import RecordAuditInfo from '@/modules/shared/components/RecordAuditInfo.vue'
import ProductCodes from '../components/ProductCodes.vue'
import { useProduct, useProductDeletion, useProductUpsert } from '../composables'

interface Props {
  slug: string
}
const props = defineProps<Props>()
const { slug } = toRefs(props)

const { t } = useI18n()
const { product, form, errors, canSave, isDeleted, isFetching, handleSubmit, refetch } = useProduct(slug)
const { deletionMutation, isPending: deletionPending } = useProductDeletion()
const { upsertMutation, isPending: upsertPending } = useProductUpsert()
const { productCodeMutation, isPending: productCodePending } = useProductCodeCreation()

const isPending = computed(
  () => isFetching.value || upsertPending.value || deletionPending.value || productCodePending.value
)

const onDelete = () => {
  if (!product.value) return
  deletionMutation({ id: product.value.id, isDeleted: isDeleted.value })
}
const onSubmit = handleSubmit(async (values) => upsertMutation(values))
const onNewCode = () => {
  if (!product.value) return
  productCodeMutation(product.value.id)
}
</script>

<template>
  <DetailPageCard
    class="max-w-[70rem] mx-auto"
    :deleted="isDeleted"
    :back-route="{ name: 'product.list' }"
    :loading="isPending"
    @on:new="$router.push({ name: 'product.detail', params: { slug: 'nuevo' } })"
    @on:delete="onDelete"
    @on:refresh="refetch"
  >
    <form @submit="onSubmit" class="grid grid-cols-12 gap-4" v-focustrap v-if="product">
      <CustomInputText
        id="name"
        :label="t('customer.table.name')"
        v-model="form.name"
        v-bind="form.nameAttrs"
        :error="errors.name"
        class="col-span-12"
        autofocus
      />

      <ProductCodes v-if="product.id !== ''" :codes="product.codes" @add:code="onNewCode" />

      <div class="col-span-12 flex justify-end">
        <CustomButton type="submit" :label="t('shared.actions.save')" :disabled="!canSave" />
      </div>
    </form>

    <RecordAuditInfo class="mt-6" :data="generateAuditItemList(product)" />
  </DetailPageCard>
</template>

<style scoped></style>
