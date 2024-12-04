<script setup lang="ts">
import DetailPageCard from '@/modules/shared/components/DetailPageCard.vue'
import { useUser } from '../composables'

const {} = useUser()
</script>

<template>
  <DetailPageCard />
</template>

<style scoped></style>
