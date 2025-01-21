<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

import { useCustomersSummary } from '@/modules/customer/composables'
import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomInputNumber from '@/modules/shared/components/CustomInputNumber.vue'
import CustomSelect from '@/modules/shared/components/CustomSelect.vue'
import DetailPageCard from '@/modules/shared/components/DetailPageCard.vue'
import { useVoucherReturnType } from '@/modules/voucher-catalog'
import VoucherInfo from '../components/VoucherInfo.vue'
import VoucherItems from '../components/VoucherItems.vue'
import { useVoucher, useVoucherUpsert } from '../composables'
import { VoucherStatus, type CreateVoucherItem, type VoucherForm } from '../interfaces'

interface Props {
  number: string
}
const props = defineProps<Props>()
const { number } = toRefs(props)

const { t } = useI18n()
const { voucher, refetch, isFetching, isDeleted, canEdit, canReceive, voucherForm } = useVoucher(number)
const { form, errors, pushItem, updateItem, handleSubmit, canSave } = voucherForm
const { customers, loading: customersLoading } = useCustomersSummary()
const { returnTypes, loading: returnTypesLoading } = useVoucherReturnType()
const { upsertMutation, isPending: upsertPending } = useVoucherUpsert()
const isPending = computed(() => isFetching.value || upsertPending.value)
const voucherStatus = ref<VoucherStatus>(VoucherStatus.Draft)

const onSubmit = handleSubmit((values) => {
  upsertMutation({ ...values, statusId: voucherStatus.value } as VoucherForm)
})

const handleNewItem = (newItem: CreateVoucherItem) => {
  const existingItemIndex = form.items.findIndex((formItem) => {
    const sameProduct = formItem.value.productCodeId === newItem.productCodeId
    const sameDate = new Date(formItem.value.expirationDate).getTime() === new Date(newItem.expirationDate).getTime()
    return sameProduct && sameDate
  })

  if (existingItemIndex === -1) {
    pushItem(newItem)
    return
  }

  const existingItem = form.items[existingItemIndex]
  const updatedItem = {
    ...newItem,
    quantity: existingItem.value.quantity + newItem.quantity
  }

  updateItem(existingItemIndex, updatedItem)
}
</script>

<template>
  <DetailPageCard
    :loading="isPending"
    :deleted="isDeleted"
    :back-route="{ name: 'voucher.list' }"
    @on:new="$router.push({ name: 'voucher.detail', params: { number: 'nuevo' } })"
    @on:delete="undefined"
    @on:refresh="refetch"
  >
    <form @submit.prevent="onSubmit" v-focustrap v-if="voucher">
      <section class="grid grid-cols-12 gap-4 w-full">
        <CustomInputNumber
          id="number"
          v-model="voucher.number"
          :label="t('voucher.fields.number')"
          disabled
          class="col-span-12 md:col-span-2"
        />
        <CustomSelect
          id="customer"
          v-model="form.customerId"
          v-bind="form.customerIdAttrs"
          :error="errors.customerId"
          :options="customers"
          :loading="customersLoading"
          :label="t('voucher.fields.customer')"
          class="col-span-12 md:col-span-5"
          :disabled="!canEdit"
        />
        <CustomSelect
          id="returnType"
          v-model="form.returnTypeId"
          v-bind="form.returnTypeIdAttrs"
          :error="errors.returnTypeId"
          :options="returnTypes"
          :loading="returnTypesLoading"
          :label="t('voucher.fields.returnType')"
          class="col-span-12 md:col-span-5"
          :disabled="!canEdit"
        />
      </section>

      <Divider align="left" type="solid">
        <b>{{ t('voucher.items.title') }}</b>
      </Divider>

      <VoucherItems
        :canEdit="canEdit"
        :canReceive="canReceive"
        :items="form.items"
        :error="errors.items"
        @on:newItem="handleNewItem"
      />

      <div class="flex justify-end mt-6">
        <CustomButton
          type="submit"
          @click="voucherStatus = VoucherStatus.Draft"
          :label="t('shared.actions.saveDraft')"
          :disabled="!canSave"
          v-if="!voucher.status"
        />
        <CustomButton
          type="submit"
          @click="voucherStatus = VoucherStatus.Submitted"
          :label="t('shared.actions.save')"
          :disabled="!voucher.status && !canSave"
          v-if="canEdit"
        />
        <template v-if="voucher.status?.id === VoucherStatus.Submitted && canReceive">
          <CustomButton
            type="submit"
            @click="voucherStatus = VoucherStatus.Rejected"
            :label="t('shared.actions.reject')"
            severity="danger"
          />
          <CustomButton
            type="submit"
            @click="voucherStatus = VoucherStatus.Approved"
            :label="t('shared.actions.approve')"
            :disabled="!canSave"
          />
        </template>
      </div>
    </form>

    <VoucherInfo class="mt-6" :data="voucher" />
  </DetailPageCard>
</template>

<style scoped></style>
