<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

import { generateAuditItemList } from '@/modules/shared'
import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomInputNumber from '@/modules/shared/components/CustomInputNumber.vue'
import CustomInputText from '@/modules/shared/components/CustomInputText.vue'
import DetailPageCard from '@/modules/shared/components/DetailPageCard.vue'
import RecordAuditInfo from '@/modules/shared/components/RecordAuditInfo.vue'
import { useCustomer, useDeletionCustomer, useUpsertCustomer } from '../composables'

interface Props {
  code: string
}
const props = defineProps<Props>()
const { code } = toRefs(props)

const { t } = useI18n()
const { customer, form, errors, isFetching, canSave, isDeleted, handleSubmit, refetch } = useCustomer(code)
const { upsertMutation, isPending: isUpsertPending } = useUpsertCustomer()
const { deletionToggleMutation, isPending: isDeletionTogglePending } = useDeletionCustomer()

const onDelete = () => {
  if (!customer.value) return
  deletionToggleMutation({ id: customer.value.id, isDeleted: isDeleted.value })
}
const onSubmit = handleSubmit(async (values) => upsertMutation(values))
const isPending = computed(() => isFetching.value || isDeletionTogglePending.value || isUpsertPending.value)
</script>

<template>
  <DetailPageCard
    class="max-w-[70rem] mx-auto"
    :deleted="isDeleted"
    :back-route="{ name: 'customer.list' }"
    :loading="isPending"
    @on:new="$router.push({ name: 'customer.detail', params: { username: 'nuevo' } })"
    @on:delete="onDelete"
    @on:refresh="refetch"
  >
    <form @submit="onSubmit" class="grid grid-cols-12 gap-4" v-focustrap v-if="customer">
      <CustomInputNumber
        id="code"
        :label="t('customer.table.code')"
        v-model="customer.code"
        class="col-span-12 md:col-span-6"
        disabled
      />
      <CustomInputText
        id="name"
        :label="t('customer.table.name')"
        v-model="form.name"
        v-bind="form.nameAttrs"
        :error="errors.name"
        class="col-span-12 md:col-span-6"
        autofocus
      />
      <CustomInputText
        id="address"
        :label="t('customer.table.address')"
        v-model="form.address"
        v-bind="form.addressAttrs"
        :error="errors.address"
        class="col-span-12"
        autofocus
      />

      <div class="col-span-12 flex justify-end">
        <CustomButton type="submit" :label="t('shared.actions.save')" :disabled="!canSave" />
      </div>
    </form>

    <RecordAuditInfo class="mt-6" :data="generateAuditItemList(customer)" />
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
