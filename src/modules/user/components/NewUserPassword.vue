<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'

import { useNotification } from '@/modules/shared'
import CustomButton from '@shared/components/CustomButton.vue'
import { useI18n } from 'vue-i18n'

interface Props {
  password: string | null
}
defineProps<Props>()

const { t } = useI18n()
const { showSuccess, showError } = useNotification()
const onCopy = async (text: string) => {
  try {
    navigator.clipboard.writeText(text)

    showSuccess({ detail: 'Contraseña copiada al portapapeles' })
  } catch (error) {
    showError({ detail: 'Error al copiar la contraseña' })
  }
}
</script>

<template>
  <transition name="p-message" tag="section" class="flex flex-col">
    <Fieldset legend="Contraseña" v-if="password">
      <div class="flex justify-between items-center">
        <p class="m-0 text-xl">{{ password }}</p>
        <CustomButton v-tooltip.top="t('shared.actions.copy')" :icon="icons.COPY" @click="onCopy(password)" />
      </div>
    </Fieldset>
  </transition>
</template>

<style scoped></style>
