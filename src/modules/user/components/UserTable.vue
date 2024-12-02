<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { hasRoles, type Pagination } from '@/modules/shared'
import CustomTable from '@/modules/shared/components/CustomTable.vue'
import { useUser } from '../composables'
import { RoleId, type UserTable } from '../interfaces'
import { useAuthStore } from '@/modules/auth/store/auth.store'

interface Props {
  data: UserTable[]
  pagination: Pagination
}
defineProps<Props>()

const { t } = useI18n()
const { deleteMutation } = useUser()
const authStore = useAuthStore()

const router = useRouter()
const onEdit = ({ username }: UserTable, newTab: boolean) => {
  const route = router.resolve({ name: 'user.detail', params: { username } })
  newTab ? window.open(route.href, '_blank') : router.push(route)
}
const onDelete = ({ id, deletedAt }: UserTable) => {
  deleteMutation({ userId: id, isDeleted: !!deletedAt })
}
</script>

<template>
  <CustomTable :data="data" :pagination="pagination" @on:edit="onEdit" @on:delete="onDelete">
    <Column field="username" :header="t('user.table.username')"></Column>
    <Column field="email" :header="t('user.table.email')"></Column>
    <Column field="roles" :header="t('user.table.roles')"></Column>
    <Column field="createdAt" :header="t('user.table.createdAt')"></Column>
    <Column
      field="deletedAt"
      :header="t('user.table.deletedAt')"
      v-if="authStore.canDelete"
    ></Column>
  </CustomTable>
</template>

<style scoped></style>
