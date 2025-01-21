<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useConfigStore } from '..'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()

const router = useRouter()
const route = useRoute()
const searchValue = ref<string>((route.query.q as string) || '')

const onSearch = () => {
  router.push({
    query: {
      ...route.query, // keep other existing query params
      q: searchValue.value || undefined
    }
  })
}

const onClean = () => {
  searchValue.value = ''
  onSearch()
}

const configStore = useConfigStore()
const { darkTheme } = storeToRefs(configStore)
</script>

<template>
  <form @submit.prevent="onSearch">
    <InputGroup class="">
      <FloatLabel variant="on">
        <InputText id="search_bar" class="w-full" v-model="searchValue" />
        <label for="search_bar">{{ t('shared.actions.search') }}...</label>
      </FloatLabel>

      <InputGroupAddon>
        <Button
          v-tooltip.top="t('shared.actions.clean')"
          :icon="icons.ERASER"
          :text="darkTheme"
          :outlined="!darkTheme"
          :disabled="!searchValue"
          @click="onClean"
        />
      </InputGroupAddon>

      <InputGroupAddon>
        <Button
          type="submit"
          v-tooltip.top="t('shared.actions.search')"
          :icon="icons.SEARCH"
          :text="darkTheme"
          :outlined="!darkTheme"
        />
      </InputGroupAddon>
    </InputGroup>
  </form>
</template>

<style scoped></style>
