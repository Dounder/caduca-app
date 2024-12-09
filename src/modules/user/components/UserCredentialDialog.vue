<script setup lang="ts">
import { ref } from 'vue'
import { PrimeIcons as icons } from '@primevue/core/api'
import { useToast } from 'primevue/usetoast'

import CustomButton from '@shared/components/CustomButton.vue'
import CustomDialog from '@/modules/shared/components/CustomDialog.vue'

interface Props {
  username: string
  password: string
}

interface Emits {
  (e: 'update:visible', state: boolean): boolean
}

defineProps<Props>()
defineEmits<Emits>()
const visible = ref(false)
const toast = useToast()

const onCopy = async (text: string) => {
  try {
    navigator.clipboard.writeText(text)

    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `Texto ${text} copiado`,
      life: 500
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Ocurrió un error al copiar',
      life: 1000
    })
  }
}
</script>

<template>
  <CustomDialog
    class="w-[22rem]"
    title="Credenciales"
    v-model:visible="visible"
    @update:visible="(val: boolean) => $emit('update:visible', val)"
  >
    <Fieldset legend="Nombre de usuario">
      <p class="m-0 text-xl">{{ username }}</p>
    </Fieldset>
    <Fieldset legend="Contraseña">
      <div class="flex justify-between items-center">
        <p class="m-0 text-xl">{{ password }}</p>
        <CustomButton :icon="icons.COPY" @click="onCopy(password)" />
      </div>
    </Fieldset>
    <div class="flex justify-end gap-2 mt-4">
      <Button type="button" label="Ok" @click="$emit('update:visible', false)"></Button>
    </div>
  </CustomDialog>
</template>

<style scoped></style>
