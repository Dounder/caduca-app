<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import type { MenuMethods } from 'primevue'
import type { MenuItem } from 'primevue/menuitem'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { type RouteLocationRaw } from 'vue-router'

import { useAuthStore } from '@/modules/auth'
import { RoleId } from '@/modules/user'
import { filterMenuItems } from '../utils'
import CustomButton from './CustomButton.vue'
import CustomCard from './CustomCard.vue'
import CustomSpinner from './CustomSpinner.vue'

interface Props {
  loading: boolean
  backRoute?: RouteLocationRaw
  deleted: boolean
}
const props = defineProps<Props>()
const emits = defineEmits(['on:new', 'on:delete', 'on:refresh'])

const { t } = useI18n()
const authStore = useAuthStore()

const menu = ref<MenuMethods | null>(null)
const items = ref<MenuItem[]>([
  { label: t('shared.actions.new'), icon: icons.PLUS, command: () => emits('on:new') },
  {
    label: props.deleted ? t('shared.actions.restore') : t('shared.actions.delete'),
    icon: props.deleted ? icons.REFRESH : icons.TRASH,
    command: () => emits('on:delete'),
    roles: [RoleId.Admin, RoleId.Developer, RoleId.Manager]
  },
  { label: t('shared.actions.refresh'), icon: icons.SYNC, command: () => emits('on:refresh') }
])
const getMenuItems = () => {
  if (!authStore.userRoles) return []
  return filterMenuItems(items.value, authStore.userRoles)
}

watch(
  () => props.deleted,
  (deleted) => {
    items.value[1].label = deleted ? t('shared.actions.restore') : t('shared.actions.delete')
    items.value[1].icon = deleted ? icons.REFRESH : icons.TRASH
  }
)
</script>

<template>
  <CustomCard :deleted="deleted" class="relative">
    <!-- Header -->
    <section class="flex items-center mb-6">
      <section class="flex justify-start flex-1 items-center">
        <CustomButton
          :icon="icons.CHEVRON_LEFT"
          :label="t('shared.actions.back')"
          @click="backRoute ? $router.push(backRoute) : $router.back()"
          :disabled="loading"
        />
      </section>

      <section>
        <CustomButton
          v-tooltip.top="t('shared.actions.options')"
          :icon="icons.ELLIPSIS_V"
          aria-haspopup="true"
          aria-controls="detail_page_menu"
          @click="menu?.toggle($event)"
          :disabled="loading"
        />
        <Menu ref="menu" id="detail_page_menu" :model="getMenuItems()" :popup="true" />
      </section>
    </section>

    <slot />

    <!-- Overlay and Loader -->
    <div v-if="loading" class="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
      <CustomSpinner />
    </div>
  </CustomCard>
</template>

<style scoped></style>
