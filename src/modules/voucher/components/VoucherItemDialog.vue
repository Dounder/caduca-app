<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomInputNumber from '@/modules/shared/components/CustomInputNumber.vue'
import CustomInputText from '@/modules/shared/components/CustomInputText.vue'
import CustomAutoComplete from '@/modules/shared/components/CustomAutoComplete.vue'
import CustomMonthPicker from '@/modules/shared/components/CustomMonthPicker.vue'
import { useVoucherItemForm } from '../composables'
import type { CreateVoucherItem, CreateVoucherItemForm } from '../interfaces'
import { useProductCodes } from '@/modules/product-codes'
import type { SubmissionHandler } from 'vee-validate'

interface Emits {
  (e: 'update:visible', value: boolean): void
  (e: 'on:close'): void
  (e: 'on:save', item: CreateVoucherItem): void
}
const emits = defineEmits<Emits>()

interface Props {
  visible: boolean
}
const props = defineProps<Props>()
const isVisible = ref(props.visible)
const updateVisible = (value: boolean) => {
  isVisible.value = value
  emits('update:visible', value)
}
const { t } = useI18n()
const { form, errors, handleSubmit, resetForm } = useVoucherItemForm()
const { filteredProductCodes, loading: productCodesLoading, onSearch } = useProductCodes()

const onClose = () => {
  emits('on:close')
  updateVisible(false)
}

const onSubmit = handleSubmit((values) => {
  const { product, ...rest } = values as CreateVoucherItemForm

  emits('on:save', {
    product: product.name,
    productCodeId: product.value,
    ...rest
  } as CreateVoucherItem)
  updateVisible(false)

  resetForm()
})

watch(
  () => props.visible,
  (value) => {
    isVisible.value = value
  }
)
</script>

<template>
  <Dialog
    v-model:visible="isVisible"
    @update:visible="updateVisible"
    :header="t('voucher.items.title')"
    :modal="true"
    :style="{ width: '50vw' }"
    :breakpoints="{ '1199px': '50vw', '575px': '90vw' }"
  >
    <form class="grid grid-cols-12 gap-4" @submit.prevent="onSubmit">
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
        class="col-span-12"
      />
      <CustomInputNumber
        id="quantity"
        :label="t('voucher.items.fields.quantity')"
        v-model="form.quantity"
        v-bind="form.quantityAttrs"
        :error="errors.quantity"
        class="col-span-12 md:col-span-6"
      />
      <CustomMonthPicker
        id="expirationDate"
        :label="t('voucher.items.fields.expirationDate')"
        v-model="form.expirationDate"
        v-bind="form.expirationDateAttrs"
        :error="errors.expirationDate"
        class="col-span-12 md:col-span-6"
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
        <CustomButton :icon="icons.TIMES" :label="t('shared.actions.cancel')" @click="onClose" />
        <CustomButton type="submit" :icon="icons.CHECK" :label="t('shared.actions.save')" />
      </section>
    </form>
  </Dialog>
</template>

<style scoped></style>
