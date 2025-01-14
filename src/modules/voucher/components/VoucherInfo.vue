<script setup lang="ts">
import { DateUtils, generateAuditItemList, type AuditItem } from '@/modules/shared'
import { PrimeIcons as icons } from '@primevue/core/api'
import { useI18n } from 'vue-i18n'
import type { Voucher } from '../interfaces'

interface Props {
  data?: Voucher
}
defineProps<Props>()

const { t } = useI18n()
</script>

<template>
  <transition name="p-message" tag="section" class="flex flex-col">
    <Accordion :expand-icon="icons.PLUS" :collapse-icon="icons.MINUS" v-if="data && data.id !== ''">
      <AccordionPanel value="1" class="!border-none">
        <AccordionHeader>{{ t('voucher.info.title') }}</AccordionHeader>
        <AccordionContent>
          <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <template v-for="({ date, title, user }, index) in generateAuditItemList(data)" :key="index">
              <Fieldset :legend="title" v-if="user">
                <p class="m-0">
                  <span class="flex items-center text-muted-color">
                    <i :class="icons.USER"></i>
                    <span class="ml-2">@{{ user?.username }}</span>
                  </span>
                  <span class="flex items-center text-muted-color">
                    <i :class="icons.ENVELOPE"></i>
                    <span class="ml-2">{{ user?.email }}</span>
                  </span>
                  <span class="flex items-center text-muted-color">
                    <i :class="icons.CALENDAR"></i>
                    <span class="ml-2">{{ DateUtils.convertDate(date) }}</span>
                  </span>
                </p>
              </Fieldset>
            </template>
            <Fieldset :legend="t('shared.messages.additionalInfo')">
              <p class="m-0">
                <span class="flex items-center text-muted-color">
                  <span>{{ t('voucher.fields.status') }}:</span>
                  <span class="ml-2">{{ t(`voucher.status.${data.status?.name}`) }}</span>
                </span>
                <span class="flex items-center text-muted-color" v-if="data.approvedDate">
                  <span>{{ t('voucher.fields.approvedDate') }}</span>
                  <span class="ml-2">{{ DateUtils.convertDate(data.approvedDate) }}</span>
                </span>
                <span class="flex items-center text-muted-color" v-if="data.rejectedDate">
                  <span>{{ t('voucher.fields.rejectedDate') }}</span>
                  <span class="ml-2">{{ DateUtils.convertDate(data.rejectedDate) }}</span>
                </span>
              </p>
            </Fieldset>
          </section>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </transition>
</template>

<style scoped></style>
