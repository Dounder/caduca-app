<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { Pagination } from '@/modules/shared'
import CustomTable from '@/modules/shared/components/CustomTable.vue'
import type { UserTable } from '../interfaces'

interface Props {
  data: UserTable[]
  pagination: Pagination
}
defineProps<Props>()
const { t } = useI18n()
</script>

<template>
  <CustomTable :data="data" :pagination="pagination">
    <Column field="username" :header="t('user.table.username')"></Column>
    <Column field="email" :header="t('user.table.email')"></Column>
    <Column field="roles" :header="t('user.table.roles')"></Column>
    <Column field="createdAt" :header="t('user.table.createdAt')"></Column>
  </CustomTable>
</template>

<style scoped></style>
