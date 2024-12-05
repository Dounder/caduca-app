<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import type { MenuMethods } from 'primevue'
import type { MenuItem } from 'primevue/menuitem'
import { ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '@/modules/auth'
import { RoleId, type User } from '@/modules/user'
import { filterMenuItems } from '../utils'
import CustomButton from './CustomButton.vue'
import CustomCard from './CustomCard.vue'
import { useRoute, type RouteLocationRaw } from 'vue-router'

interface Props {
  loading: boolean
  backRoute?: RouteLocationRaw
  user: User | undefined
}
const props = defineProps<Props>()
const { user } = toRefs(props)
const emits = defineEmits(['on:new', 'on:delete', 'on:refresh'])

const { t } = useI18n()
const authStore = useAuthStore()

const menu = ref<MenuMethods | null>(null)
const items = ref<MenuItem[]>([
  { label: t('shared.actions.new'), icon: icons.PLUS, command: () => emits('on:new') },
  {
    label: !!user.value?.deletedAt ? t('shared.actions.restore') : t('shared.actions.delete'),
    icon: !!user.value?.deletedAt ? icons.REFRESH : icons.TRASH,
    command: () => {
      if (props.user?.username === 'nuevo') return
      emits('on:delete')
    },
    roles: [RoleId.Admin, RoleId.Developer, RoleId.Manager]
  },
  { label: t('shared.actions.refresh'), icon: icons.SYNC, command: () => emits('on:refresh') }
])
const getMenuItems = () => {
  if (!authStore.userRoles) return []
  return filterMenuItems(items.value, authStore.userRoles)
}
</script>

<template>
  <BlockUI :blocked="loading">
    <CustomCard :deleted="!!user?.deletedAt">
      <!-- Header -->
      <section class="flex items-center mb-6">
        <section class="flex justify-start flex-1 items-center">
          <CustomButton
            v-tooltip.top="t('shared.actions.back')"
            :icon="icons.CHEVRON_LEFT"
            :label="t('shared.actions.back')"
            @click="backRoute ? $router.push(backRoute) : $router.back()"
          />
        </section>

        <section>
          <CustomButton
            v-tooltip.top="t('shared.actions.options')"
            :icon="icons.ELLIPSIS_V"
            aria-haspopup="true"
            aria-controls="detail_page_menu"
            @click="menu?.toggle($event)"
          />
          <Menu ref="menu" id="detail_page_menu" :model="getMenuItems()" :popup="true" />
        </section>
      </section>

      <slot />
    </CustomCard>
  </BlockUI>
</template>

<style scoped></style>
