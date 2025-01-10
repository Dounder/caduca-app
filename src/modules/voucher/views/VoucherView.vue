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
import { useVoucher } from '../composables'
import type { CreateVoucherItem } from '../interfaces'

interface Props {
  number: string
}
const props = defineProps<Props>()
const { number } = toRefs(props)

const { t } = useI18n()
const { voucher, refetch, form, errors, canSave, isFetching, isDeleted, handleSubmit, pushItem, meta } =
  useVoucher(number)
const { customers, loading: customersLoading } = useCustomersSummary()
const { returnTypes, loading: returnTypesLoading } = useVoucherReturnType()
const isPending = computed(() => isFetching.value)

const onSubmit = handleSubmit((values) => {
  console.log(values)
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
    <form @submit.prevent="onSubmit" class="grid grid-cols-12 gap-4" v-focustrap v-if="voucher">
      <CustomInputNumber
        id="number"
        v-model="voucher.number"
        :label="t('voucher.fields.number')"
        disabled
        class="col-span-2"
      />
      <CustomSelect
        id="customer"
        v-model="form.customerId"
        v-bind="form.customerIdAttrs"
        :error="errors.customerId"
        :options="customers"
        :loading="customersLoading"
        :label="t('voucher.fields.customer')"
        class="col-span-5"
      />
      <CustomSelect
        id="returnType"
        v-model="form.returnTypeId"
        v-bind="form.returnTypeIdAttrs"
        :error="errors.returnTypeId"
        :options="returnTypes"
        :loading="returnTypesLoading"
        :label="t('voucher.fields.returnType')"
        class="col-span-5"
      />

      <section class="col-span-12">
        <VoucherFormItems :items="form.items" :error="errors.items" @on:newItem="handleNewItem" />
        <transition name="p-message" tag="div" class="flex flex-col mt-2">
          <Message v-if="errors.items" severity="error">{{ errors.items }}</Message>
        </transition>
      </section>

      <pre>{{ form }}</pre>

      <div class="col-span-12 flex justify-end">
        <CustomButton type="submit" :label="t('shared.actions.save')" :disabled="!canSave" />
      </div>
    </form>
  </DetailPageCard>
</template>

<style scoped></style>
