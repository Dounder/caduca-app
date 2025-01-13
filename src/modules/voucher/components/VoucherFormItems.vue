<script setup lang="ts">
import type { FieldEntry } from 'vee-validate'
import { ref, useAttrs } from 'vue'
import { useI18n } from 'vue-i18n'

import CustomTable from '@/modules/shared/components/CustomTable.vue'
import VoucherItemDialog from './VoucherItemDialog.vue'
import { DateUtils } from '@/modules/shared'
import type { CreateVoucherItem } from '../interfaces'

interface Props {
  items: FieldEntry<CreateVoucherItem>[]
  error?: string
  canEdit: boolean
}
defineProps<Props>()
interface Emits {
  (e: 'on:newItem', item: CreateVoucherItem): void
}
defineEmits<Emits>()

const { t } = useI18n()
const attrs = useAttrs()
const showDialog = ref(false)
</script>

<template>
  <VoucherItemDialog
    v-if="canEdit"
    v-model:visible="showDialog"
    @on:close="showDialog = false"
    @on:save="(item) => $emit('on:newItem', item)"
  />

  <CustomTable :data="items" grid :editable="false">
    <Column :header="t('voucher.items.fields.quantity')">
      <template #body="{ data }">
        <span>{{ data.value.quantity }}</span>
      </template>
    </Column>
    <Column :header="t('voucher.items.fields.product')">
      <template #body="{ data }">
        <span>{{ data.value.product }}</span>
      </template>
    </Column>
    <Column :header="t('voucher.items.fields.expirationDate')">
      <template #body="{ data }">
        <span>{{ DateUtils.convertToMonthYear(data.value.expirationDate) }}</span>
      </template>
    </Column>
    <Column :header="t('voucher.items.fields.observation')">
      <template #body="{ data }">
        <span>{{ data.value.observation }}</span>
      </template>
    </Column>
  </CustomTable>

  <transition name="p-message" tag="div" class="flex flex-col mt-2">
    <Message v-if="error" severity="error">{{ error }}</Message>
  </transition>
</template>

<style scoped></style>
