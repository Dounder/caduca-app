<script setup lang="ts">
import { usePagination } from '@/modules/shared'
import type { TableColumn } from '@/modules/shared/interfaces'
import ListPage from '@shared/components/ListPage.vue'
import { reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUsers } from '../composables'
import UserTable from '../components/UserTable.vue'

const { t } = useI18n()
const { users, lastPage, total, isLoading, isPlaceholderData, refreshUsers, isFetching } =
  useUsers()
const { page } = usePagination()
const pagination = reactive({ page, lastPage, total })
const columns: TableColumn[] = [
  { field: 'username', header: t('user.table.username') },
  { field: 'email', header: t('user.table.email') },
  { field: 'roles', header: t('user.table.roles') },
  { field: 'createdAt', header: t('user.table.createdAt') }
]
</script>

<template>
  <ListPage
    :title="t('user.title')"
    @on:new="$router.push({ name: 'user.detail', params: { username: 'nuevo' } })"
    @on:refresh="refreshUsers"
  >
    <UserTable
      :data="users || []"
      :pagination="pagination"
      :loading="(isLoading && !isPlaceholderData) || isFetching"
    />
  </ListPage>
</template>

<style scoped></style>
