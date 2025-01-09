<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import type { FieldEntry } from 'vee-validate'
import { ref, useAttrs } from 'vue'
import { useI18n } from 'vue-i18n'

import { DateUtils } from '@/modules/shared'
import CustomButton from '@/modules/shared/components/CustomButton.vue'
import type { CreateVoucherItem } from '../interfaces'
import VoucherItemDialog from './VoucherItemDialog.vue'

interface Props {
  items: FieldEntry<CreateVoucherItem>[]
  error?: string
}
const props = defineProps<Props>()

const { t } = useI18n()
const attrs = useAttrs()
const showDialog = ref(false)

const handleSave = (item: CreateVoucherItem) => {
  console.log(item)
}
</script>

<template>
  <DataTable
    :value="items"
    tableStyle="min-width: 50rem"
    :class="attrs.class"
    :paginator="true"
    :rows="10"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[5, 10, 25]"
    currentPageReportTemplate="{first} a {last} de {totalRecords} items"
    show-gridlines
  >
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="text-xl font-bold">{{ t('voucher.items.title') }}</span>
        <CustomButton
          :icon="icons.PLUS"
          icon-pos="right"
          v-tooltip.top="t('shared.actions.new')"
          @click="showDialog = true"
        />
      </div>
    </template>
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
  </DataTable>

  <VoucherItemDialog v-model:visible="showDialog" @on:close="showDialog = false" @on:save="handleSave" />
</template>

<style scoped></style>
