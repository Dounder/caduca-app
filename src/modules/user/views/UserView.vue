<script setup lang="ts">
import { toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNotification } from '@/modules/shared'
import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomInputText from '@/modules/shared/components/CustomInputText.vue'
import DetailPageCard from '@/modules/shared/components/DetailPageCard.vue'
import { useRouter } from 'vue-router'
import { useUser, useUserMutation } from '../composables'

interface Props {
  username: string
}
const props = defineProps<Props>()
const { username } = toRefs(props)

const { t } = useI18n()

const { user, isLoading, refetch, form, errors, canSave, handleSubmit, resetForm } =
  useUser(username)
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
    :user="user"
    :back-route="{ name: 'user.list' }"
    :loading="isLoading || isMutationLoading"
    @on:new="$router.push({ name: 'user.detail', params: { username: 'nuevo' } })"
    @on:delete="onDelete"
    @on:refresh="refetch"
  >
    <form @submit="onSubmit" class="flex flex-col gap-6" v-focustrap>
      <CustomInputText
        id="username"
        :label="t('user.table.username')"
        v-model="form.username"
        v-bind="form.usernameAttrs"
        :error="errors.username"
        autofocus
      />
      <CustomInputText
        id="email"
        :label="t('user.table.email')"
        v-model="form.email"
        v-bind="form.emailAttrs"
        :error="errors.email"
      />
      <CustomButton
        type="submit"
        :label="t('shared.actions.save')"
        class="w-fit self-end"
        :disabled="!canSave"
      />
    </form>
  </DetailPageCard>
</template>

<style scoped></style>
