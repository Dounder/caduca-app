<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { useI18n } from 'vue-i18n'

import type { ProductCode, ProductCodeSummary } from '@/modules/product-codes'
import CustomButton from '@/modules/shared/components/CustomButton.vue'

interface Props {
  codes: ProductCodeSummary[]
}
defineProps<Props>()
defineEmits(['add:code'])

const { t } = useI18n()
</script>

<template>
  <Fieldset :legend="t('product.table.codes')" class="col-span-12">
    <section class="flex justify-start items-center flex-wrap gap-2 mb-2">
      <Tag v-if="codes.length === 0">
        <template #default>
          <span class="text-xl">{{ t('product.table.noCodes') }}</span>
        </template>
      </Tag>
      <template v-else>
        <Tag v-for="{ id, code } in codes" :key="id">
          <template #default>
            <span class="text-xl">{{ code }}</span>
          </template>
        </Tag>
      </template>

      <CustomButton v-tooltip.top="t('product.actions.addCode')" :icon="icons.PLUS" @click="$emit('add:code')" />
    </section>
  </Fieldset>
</template>

<style scoped></style>
