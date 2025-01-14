<script setup lang="ts">
import type { FieldEntry } from 'vee-validate'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { DateUtils } from '@/modules/shared'
import CustomTable from '@/modules/shared/components/CustomTable.vue'
import type { CreateVoucherItem } from '../interfaces'
import VoucherItemForm from './VoucherItemForm.vue'

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
const showDialog = ref(false)
</script>

<template>
  <VoucherItemForm
    v-if="canEdit"
    v-model:visible="showDialog"
    @on:close="showDialog = false"
    @on:save="(item) => $emit('on:newItem', item)"
  />
  <pre>{{ canEdit }}</pre>

  <CustomTable :data="items" grid :editable="false" :paginator="false">
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
    <Column :header="t('voucher.items.fields.received')">
      <template #body="{ data }">
        <article class="flex justify-center items-center">
          <Checkbox v-model="data.value.received" binary size="large" />
        </article>
      </template>
    </Column>
  </CustomTable>

  <transition name="p-message" tag="div" class="flex flex-col mt-2">
    <Message v-if="error" severity="error">{{ error }}</Message>
  </transition>
</template>

<style scoped></style>
