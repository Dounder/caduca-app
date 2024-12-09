<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/modules/auth/store/auth.store'
import { usePagination } from '@/modules/shared'
import CustomTable from '@/modules/shared/components/CustomTable.vue'
import ListPage from '@shared/components/ListPage.vue'
import type { UserTable } from '../interfaces'
import { useUserMutation, useUsers } from '../composables'

const { t } = useI18n()
const { users, lastPage, total, isLoading, isPlaceholderData, refreshUsers, isFetching } =
  useUsers()
const { page } = usePagination()
const pagination = reactive({ page, lastPage, total })

const { deleteMutation } = useUserMutation()
const authStore = useAuthStore()

const router = useRouter()
const onEdit = ({ username }: UserTable, newTab: boolean) => {
  const route = router.resolve({ name: 'user.detail', params: { username } })
  newTab ? window.open(route.href, '_blank') : router.push(route)
}
const onDelete = ({ id, deletedAt }: UserTable) => {
  deleteMutation({ userId: id, isDeleted: !!deletedAt })
}
const onSearch = (value: string, option: string) => {
  console.log(value, option)
}
</script>

<template>
  <ListPage
    :title="t('user.title')"
    @on:new="$router.push({ name: 'user.detail', params: { username: 'nuevo' } })"
    @on:refresh="refreshUsers"
  >
    <CustomTable
      :data="users || []"
      :pagination="pagination"
      :loading="(isLoading && !isPlaceholderData) || isFetching"
      :options="[
        { label: t('user.table.username'), value: 'username' },
        { label: t('user.table.email'), value: 'email' },
        { label: t('user.table.roles'), value: 'roles' }
      ]"
      @on:edit="onEdit"
      @on:delete="onDelete"
      @on:search="onSearch"
    >
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
