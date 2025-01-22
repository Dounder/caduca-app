<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import { useConfigStore } from '../stores'
import CustomSpinner from './CustomSpinner.vue'

interface Props {
  title: string
  visible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['on:refresh', 'on:new', 'on:export', 'update:visible'])

const { t } = useI18n()
const configStore = useConfigStore()
const { darkTheme, isMobile } = storeToRefs(configStore)
</script>

<template>
  <Toolbar class="dark:bg-dark-950 mb-3">
    <template #start>
      <h1 class="text-2xl capitalize">{{ title }}</h1>
    </template>

    <template #end>
      <section class="flex justify-end gap-2">
        <Button
          size="small"
          v-tooltip.top="!isMobile ? '' : t('shared.actions.new')"
          :label="!isMobile ? t('shared.actions.new') : ''"
          :icon="icons.PLUS"
          @click="$emit('on:new')"
          :text="darkTheme"
          :outlined="!darkTheme"
          :rounded="isMobile"
        />
        <Button
          size="small"
          v-tooltip.top="!isMobile ? '' : t('shared.actions.refresh')"
          :label="!isMobile ? t('shared.actions.refresh') : ''"
          :icon="icons.REFRESH"
          @click="$emit('on:refresh')"
          :text="darkTheme"
          :outlined="!darkTheme"
          :rounded="isMobile"
        />
        <Button
          size="small"
          v-tooltip.top="!isMobile ? '' : t('shared.actions.export')"
          :label="!isMobile ? t('shared.actions.export') : ''"
          :icon="icons.DOWNLOAD"
          @click="$emit('on:export')"
          :text="darkTheme"
          :outlined="!darkTheme"
          :rounded="isMobile"
        />
      </section>
    </template>
  </Toolbar>

  <slot />

  <!-- Use v-bind and v-on instead of v-model -->
  <Dialog
    :visible="props.visible"
    @update:visible="$emit('update:visible', $event)"
    modal
    :closable="false"
    class="w-1/2"
  >
    <div class="flex flex-col items-center gap-4 p-10">
      <span class="text-2xl">{{ t('shared.messages.generatingReport') }}...</span>
      <CustomSpinner />
    </div>
  </Dialog>
</template>
