<script setup lang="ts">
import { ref } from 'vue'
import { useCustomersSummary } from '@/modules/customer/composables'
import type { AutoCompleteCompleteEvent } from 'primevue'

const selectedCustomer = ref(null)
const { customers } = useCustomersSummary()

const onSearch = (evt: AutoCompleteCompleteEvent) => {
  console.log(evt)
}
</script>

<template>
  <AutoComplete v-model="selectedCustomer" optionLabel="name" dropdown :suggestions="customers" @complete="onSearch" />
</template>

<style scoped></style>
