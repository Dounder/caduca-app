<script setup lang="ts">
import { toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomInputText from '@/modules/shared/components/CustomInputText.vue'
import DetailPageCard from '@/modules/shared/components/DetailPageCard.vue'
import { useUser, useUserMutation } from '../composables'

interface Props {
  username: string
}
const props = defineProps<Props>()
const { username } = toRefs(props)

const { t } = useI18n()

const {
  user,
  isLoading,
  refetch,
  form,
  errors,
  meta,
  canSave,
  handleSubmit,
  getAuditData,
  allRoles,
  hasRole,
  toggleRole
} = useUser(username)
const { updateMutation, deleteMutation, isLoading: isMutationLoading } = useUserMutation()
const onDelete = async () => {
  if (!user.value) return
  deleteMutation({ userId: user.value.id, isDeleted: !!user.value.deletedAt })
}
const onSubmit = handleSubmit(async (values) => updateMutation(values))
</script>

<template>
  <DetailPageCard
    class="max-w-[50rem] mx-auto"
    :deleted="!!user?.deletedAt"
    :back-route="{ name: 'user.list' }"
    :loading="isLoading || isMutationLoading"
    :audit-data="getAuditData"
    @on:new="$router.push({ name: 'user.detail', params: { username: 'nuevo' } })"
    @on:delete="onDelete"
    @on:refresh="refetch"
  >
    <form @submit="onSubmit" class="grid grid-cols-12 gap-4" v-focustrap v-if="user">
      <CustomInputText
        id="username"
        :label="t('user.table.username')"
        v-model="form.username"
        v-bind="form.usernameAttrs"
        :error="errors.username"
        :disabled="user.username !== ''"
        class="col-span-12 md:col-span-6"
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
    </form>
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
