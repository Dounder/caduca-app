<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '@/modules/auth/store/auth.store'
import ToggleThemeBtn from '@/modules/home/components/ToggleThemeBtn.vue'
import { useConfigStore, type Lang } from '@/modules/shared'
import CustomCard from '@/modules/shared/components/CustomCard.vue'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const configStore = useConfigStore()
const { selectedLang } = storeToRefs(configStore)
const { t, locale } = useI18n()
const langs: { name: string; value: Lang }[] = [
  { name: t('preferences.en'), value: 'en' },
  { name: t('preferences.es'), value: 'es' }
]

watch(selectedLang, (lang: Lang) => {
  locale.value = lang
  configStore.setLang(lang)
})
</script>

<template>
  <div class="max-w-[40rem] w-full mx-auto relative">
    <CustomCard bodyClass="flex flex-col justify-center items-center">
      <h1 class="text-3xl mb-4">{{ t('preferences.title') }}</h1>
      <Avatar :icon="icons.USER" size="xlarge" shape="circle" />
      <h2 class="text-center text-2xl font-semibold mt-3 capitalize">@{{ user?.username }}</h2>
      <Tag :value="name" rounded v-for="{ id, name } in user?.roles" :key="id"></Tag>
      <hr class="w-full my-4" />

      <div class="grid grid-cols-2 gap-4 w-full">
        <div class="flex flex-col gap-2" v-if="false">
          <label for="pref_lang">{{ t('preferences.lang') }}</label>
          <Select
            v-model="selectedLang"
            inputId="pref_lang"
            :options="langs"
            optionLabel="name"
            optionValue="value"
            :default-value="false"
            @change="() => ($i18n.locale = selectedLang)"
          />
        </div>
        <ToggleThemeBtn />
      </div>
    </CustomCard>
  </div>
</template>
