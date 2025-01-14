<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { useI18n } from 'vue-i18n'

import { useProductCodes } from '@/modules/product-codes'
import CustomAutoComplete from '@/modules/shared/components/CustomAutoComplete.vue'
import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomInputNumber from '@/modules/shared/components/CustomInputNumber.vue'
import CustomInputText from '@/modules/shared/components/CustomInputText.vue'
import CustomMonthPicker from '@/modules/shared/components/CustomMonthPicker.vue'
import { useVoucherItemForm } from '../composables'
import type { CreateVoucherItem, CreateVoucherItemForm } from '../interfaces'

interface Emits {
  (e: 'update:visible', value: boolean): void
  (e: 'on:close'): void
  (e: 'on:save', item: CreateVoucherItem): void
}
const emits = defineEmits<Emits>()
const { t } = useI18n()
const { form, errors, handleSubmit, resetForm } = useVoucherItemForm()
const { filteredProductCodes, loading: productCodesLoading, onSearch } = useProductCodes()

const onSubmit = handleSubmit((values) => {
  const { product, ...rest } = values as CreateVoucherItemForm
  emits('on:save', {
    product: product.name,
    productCodeId: product.value,
    ...rest
  } as CreateVoucherItem)
  resetForm()
})
</script>

<template>
  <form class="grid grid-cols-12 gap-4 mb-4" @submit.prevent="onSubmit">
    <CustomInputNumber
      id="quantity"
      :label="t('voucher.items.fields.quantity')"
      v-model="form.quantity"
      v-bind="form.quantityAttrs"
      :error="errors.quantity"
      class="col-span-12 md:col-span-2"
    />
    <CustomAutoComplete
      id="product"
      :label="t('voucher.items.fields.product')"
      :placeholder="t('shared.placeholders.search')"
      v-model="form.product"
      v-bind="form.productAttrs"
      :error="errors.product"
      :options="filteredProductCodes"
      @search="onSearch"
      :loading="productCodesLoading"
      class="col-span-12 md:col-span-7"
    />
    <CustomMonthPicker
      id="expirationDate"
      :label="t('voucher.items.fields.expirationDate')"
      v-model="form.expirationDate"
      v-bind="form.expirationDateAttrs"
      :error="errors.expirationDate"
      class="col-span-12 md:col-span-3"
    />
    <CustomInputText
      id="observation"
      :label="t('voucher.items.fields.observation')"
      v-model="form.observation"
      v-bind="form.observationAttrs"
      :error="errors.observation"
      class="col-span-12"
    />

    <section class="flex justify-end gap-2 col-span-12">
      <CustomButton type="submit" :icon="icons.PLUS" v-tooltip.left="t('shared.actions.add')" />
    </section>
  </form>
</template>

<style scoped></style>
