<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { generateAuditItemList } from '@/modules/shared'
import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomInputText from '@/modules/shared/components/CustomInputText.vue'
import DetailPageCard from '@/modules/shared/components/DetailPageCard.vue'
import RecordAuditInfo from '@/modules/shared/components/RecordAuditInfo.vue'
import NewUserPassword from '../components/NewUserPassword.vue'
import { useUpsertUser, useUser, useUserDeletionToggle } from '../composables'

interface Props {
  username: string
}
const props = defineProps<Props>()
const { username } = toRefs(props)
const { t } = useI18n()
const router = useRouter()

const { user, isFetching, refetch, handleSubmit, form, meta, errors, hasRole, allRoles, toggleRole, canSave } =
  useUser(username)
const { deletionToggleMutation, isDeletionTogglePending } = useUserDeletionToggle()
const { upsertMutation, password, isUpsertPending, removePassword } = useUpsertUser()

const onDelete = () => {
  if (!user.value) return
  deletionToggleMutation({ userId: user.value.id, isDeleted: !!user.value.deletedAt })
}
const onSubmit = handleSubmit(async (values) => upsertMutation(values))
const onNew = () => {
  router.push({ name: 'user.detail', params: { username: 'nuevo' } })
  removePassword()
}
const isPending = computed(() => isFetching.value || isDeletionTogglePending.value || isUpsertPending.value)
</script>

<template>
  <DetailPageCard
    class="max-w-[70rem] mx-auto"
    :deleted="!!user?.deletedAt"
    :back-route="{ name: 'user.list' }"
    :loading="isPending"
    @on:new="onNew"
    @on:delete="onDelete"
    @on:refresh="refetch"
  >
    <form @submit="onSubmit" class="grid grid-cols-12 gap-4" v-focustrap>
      <CustomInputText
        id="username"
        :label="t('user.table.username')"
        v-model="form.username"
        v-bind="form.usernameAttrs"
        :error="errors.username"
        class="col-span-12 md:col-span-6"
        autofocus
      />
      <CustomInputText
        id="email"
        :label="t('user.table.email')"
        v-model="form.email"
        v-bind="form.emailAttrs"
        :error="errors.email"
        class="col-span-12 md:col-span-6"
      />
      <Fieldset legend="Roles" class="col-span-12">
        <section class="flex justify-start items-center flex-wrap gap-2 mb-2">
          <Button
            v-for="(item, index) in allRoles"
            :key="index"
            :label="t(`user.roles.${item}`, '')"
            :outlined="!hasRole(item)"
            @click="toggleRole(item)"
          />
        </section>
        <transition name="p-message" tag="section" class="flex flex-col">
          <Message v-if="meta.dirty && errors.roles" severity="error">{{ errors.roles }}</Message>
        </transition>
      </Fieldset>
      <div class="col-span-12 flex justify-end">
        <CustomButton type="submit" :label="t('shared.actions.save')" :disabled="!canSave" />
      </div>
      <NewUserPassword class="col-span-12" :password="password" />
    </form>

    <RecordAuditInfo class="mt-6" :data="generateAuditItemList(user)" />
  </DetailPageCard>
</template>

<style scoped>
.input-text {
  @apply col-span-12 md:col-span-6;
}
.input-text:disabled {
  @apply cursor-not-allowed;
}
</style>
