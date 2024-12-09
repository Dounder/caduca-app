<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useConfigStore } from '../stores'

interface Props {
  title: string
}

defineProps<Props>()
defineEmits(['on:refresh', 'on:new', 'on:export'])
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
        <!-- TODO: Implement export logic -->
        <Button
          size="small"
          v-tooltip.top="!isMobile ? '' : t('shared.actions.export')"
          :label="!isMobile ? t('shared.actions.export') : ''"
          :icon="icons.DOWNLOAD"
          @click="$emit('on:export')"
          :text="darkTheme"
          :outlined="!darkTheme"
          :rounded="isMobile"
          disabled
        />
      </section>
    </template>
  </Toolbar>

  <slot />
</template>

<style scoped></style>
