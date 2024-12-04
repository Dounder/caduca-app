<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'

import CustomButton from './CustomButton.vue'
import CustomCard from './CustomCard.vue'
import { useI18n } from 'vue-i18n'
import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'
import type { MenuMethods } from 'primevue'

const { t } = useI18n()

const menu = ref<MenuMethods | null>(null)
const items: MenuItem[] = [
  { label: t('shared.actions.new'), icon: icons.PLUS, command: () => console.log('Edit') },
  { label: t('shared.actions.delete'), icon: icons.TRASH, command: () => console.log('Delete') }
]
</script>

<template>
  <CustomCard>
    <!-- Header -->
    <section class="flex items-center">
      <section class="flex justify-start flex-1 items-center">
        <CustomButton
          v-tooltip.top="t('shared.actions.back')"
          :icon="icons.CHEVRON_LEFT"
          @click="$router.back()"
        />
        <h1 class="text-2xl w-full">Title</h1>
      </section>

      <section>
        <CustomButton
          v-tooltip.top="t('shared.actions.options')"
          :icon="icons.ELLIPSIS_V"
          aria-haspopup="true"
          aria-controls="detail_page_menu"
          @click="menu?.toggle($event)"
        />
        <Menu ref="menu" id="detail_page_menu" :model="items" :popup="true" />
      </section>
    </section>
  </CustomCard>
</template>

<style scoped></style>
