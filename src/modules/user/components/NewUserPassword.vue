<script setup lang="ts">
import { ref } from 'vue'
import { PrimeIcons as icons } from '@primevue/core/api'
import { useToast } from 'primevue/usetoast'

import CustomButton from '@shared/components/CustomButton.vue'
import CustomDialog from '@/modules/shared/components/CustomDialog.vue'
import { useNotification } from '@/modules/shared'

interface Props {
  password: string
}
defineProps<Props>()

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
    <Fieldset legend="Contraseña">
      <div class="flex justify-between items-center">
        <p class="m-0 text-xl">{{ password }}</p>
        <CustomButton :icon="icons.COPY" @click="onCopy(password)" />
      </div>
    </Fieldset>
  </transition>
</template>

<style scoped></style>
