<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import type { FieldEntry } from 'vee-validate'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomInputNumber from '@/modules/shared/components/CustomInputNumber.vue'
import CustomInputText from '@/modules/shared/components/CustomInputText.vue'
import CustomSelect from '@/modules/shared/components/CustomSelect.vue'
import type { CreateVoucherItem } from '../interfaces'
import { DateUtils } from '@/modules/shared'

interface Props {
  items: FieldEntry<CreateVoucherItem>[]
  error?: string
}
const props = defineProps<Props>()

const { t } = useI18n()
const form = reactive({ quantity: 0, productId: '', expirationDate: '', observation: '' })
</script>

<template>
  <Fieldset :legend="t('voucher.items.title')">
    <article class="flex flex-col">
      <section class="grid grid-cols-12 gap-2 text-center">
        <span class="col-span-2 flex justify-center items-center">{{ t('voucher.items.fields.quantity') }}</span>
        <span class="col-span-6 flex justify-center items-center">{{ t('voucher.items.fields.product') }}</span>
        <span class="col-span-2 flex justify-center items-center">{{ t('voucher.items.fields.expirationDate') }}</span>
        <span class="col-span-2 flex justify-center items-center">{{ t('voucher.items.fields.observation') }}</span>

        <template v-for="(item, index) in items" :key="index">
          <span class="col-span-2 truncate">{{ item.value.quantity }}</span>
          <span class="col-span-6 truncate">{{ item.value.product }}</span>
          <span class="col-span-2 truncate">{{ DateUtils.convertToMonthYear(item.value.expirationDate) }}</span>
          <span class="col-span-2 truncate">{{ item.value.observation }}</span>
        </template>
      </section>
      <section class="grid grid-cols-12 gap-2 text-center mt-4">
        <CustomInputNumber id="quantity" v-model="form.quantity" class="col-span-2" />
        <CustomSelect id="product" v-model="form.productId" :options="[]" class="col-span-6" />
        <CustomSelect id="expirationDate" v-model="form.expirationDate" :options="[]" class="col-span-2" />
        <CustomInputText id="observation" v-model="form.observation" :options="[]" class="col-span-2" />

        <CustomButton class="col-span-2 col-start-11" :icon="icons.PLUS" :label="t('shared.actions.new')" />
      </section>

      <transition name="p-message" tag="div" class="flex flex-col mt-4">
        <Message v-if="error" severity="error">{{ error }}</Message>
      </transition>
    </article>
  </Fieldset>
</template>

<style scoped></style>
