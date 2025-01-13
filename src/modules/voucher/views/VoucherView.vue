<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

import { useCustomersSummary } from '@/modules/customer/composables'
import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomInputNumber from '@/modules/shared/components/CustomInputNumber.vue'
import CustomSelect from '@/modules/shared/components/CustomSelect.vue'
import DetailPageCard from '@/modules/shared/components/DetailPageCard.vue'
import { useVoucherReturnType } from '@/modules/voucher-catalog'
import VoucherFormItems from '../components/VoucherFormItems.vue'
import { useVoucher, useVoucherCreation } from '../composables'
import type { CreateVoucherItem, VoucherForm } from '../interfaces'

interface Props {
  number: string
}
const props = defineProps<Props>()
const { number } = toRefs(props)

const { t } = useI18n()
const { voucher, refetch, form, errors, canSave, isFetching, isDeleted, handleSubmit, pushItem, canEdit } =
  useVoucher(number)
const { customers, loading: customersLoading } = useCustomersSummary()
const { returnTypes, loading: returnTypesLoading } = useVoucherReturnType()
const { createMutation, isPending: creationPending } = useVoucherCreation()
const isPending = computed(() => isFetching.value || creationPending.value)

const onSubmit = handleSubmit((values) => {
  createMutation(values as VoucherForm)
})

const handleNewItem = (item: CreateVoucherItem) => {
  pushItem(item)
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
        />
      </section>

      <Divider align="left" type="solid">
        <b>{{ t('voucher.items.title') }}</b>
      </Divider>

      <section class="w-full overflow-x-auto">
        <VoucherFormItems :canEdit="canEdit" :items="form.items" :error="errors.items" @on:newItem="handleNewItem" />
      </section>

      <div class="flex justify-end">
        <CustomButton type="submit" :label="t('shared.actions.save')" :disabled="!canSave" />
      </div>
    </form>
  </DetailPageCard>
</template>

<style scoped></style>
