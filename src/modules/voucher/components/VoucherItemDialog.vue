<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { useI18n } from 'vue-i18n'

import CustomButton from '@/modules/shared/components/CustomButton.vue'
import type { CreateVoucherItem } from '../interfaces'
import { ref, watch } from 'vue'

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

const onClose = () => {
  emits('on:close')
  updateVisible(false)
}

const onSave = () => {
  updateVisible(false)
}

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
    :style="{ width: '450px' }"
    :header="t('voucher.items.title')"
    :modal="true"
  >
    <section class="grid grid-cols-12"></section>

    <template #footer>
      <CustomButton :icon="icons.TIMES" :label="t('shared.actions.cancel')" @click="onClose" />
      <CustomButton :icon="icons.CHECK" :label="t('shared.actions.save')" @click="onSave" />
    </template>
  </Dialog>
</template>

<style scoped></style>
