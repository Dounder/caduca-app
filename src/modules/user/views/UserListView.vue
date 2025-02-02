<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/modules/auth'
import CustomTable from '@/modules/shared/components/CustomTable.vue'
import ListPage from '@/modules/shared/components/ListPage.vue'
import { useUserDeletionToggle, useUserReports, useUsers } from '../composables'
import type { UserPlain } from '../interfaces'

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()
const { deletionToggleMutation, isDeletionTogglePending } = useUserDeletionToggle()
const { users, refetch, loading } = useUsers()
const { userReportMutation, isGeneratingReport } = useUserReports()

const onEdit = ({ username }: UserPlain, newTab: boolean) => {
  const route = router.resolve({ name: 'user.detail', params: { username } })
  newTab ? window.open(route.href, '_blank') : router.push(route)
}
const onDelete = ({ id, deletedAt }: UserPlain) => deletionToggleMutation({ userId: id, isDeleted: !!deletedAt })
</script>

<template>
  <ListPage
    :title="t('user.title')"
    @on:new="$router.push({ name: 'user.detail', params: { username: 'nuevo' } })"
    @on:refresh="refetch"
    @on:export="userReportMutation"
    v-model:visible="isGeneratingReport"
  >
    <CustomTable :data="users" :loading="loading || isDeletionTogglePending" @on:edit="onEdit" @on:delete="onDelete">
      <Column field="username" :header="t('user.table.username')" />
      <Column field="email" :header="t('user.table.email')" />
      <Column field="roles" :header="t('user.table.roles')">
        <template #body="{ data }">
          {{ data.roles.map((role: string) => t(`user.roles.${role}`)).join(', ') }}
        </template>
      </Column>
      <Column field="createdAt" :header="t('user.table.createdAt')" />
      <Column field="deletedAt" :header="t('user.table.deletedAt')" v-if="authStore.canDelete" />
    </CustomTable>
  </ListPage>
</template>

<style scoped></style>
