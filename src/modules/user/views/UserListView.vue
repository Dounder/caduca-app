<script setup lang="ts">
import { usePagination } from '@/modules/shared'
import ListPage from '@shared/components/ListPage.vue'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import UserTable from '../components/UserTable.vue'
import { useUsers } from '../composables'

const { t } = useI18n()
const { users, lastPage, total, isLoading, isPlaceholderData, refreshUsers, isFetching } =
  useUsers()
const { page } = usePagination()
const pagination = reactive({ page, lastPage, total })
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
