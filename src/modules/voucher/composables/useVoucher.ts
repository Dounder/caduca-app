import { useQuery } from '@tanstack/vue-query'
import { computed, reactive, watch, type Ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/modules/auth'
import { useFieldArray, useForm } from 'vee-validate'
import { getVoucherAction } from '../actions'
import { VoucherStatus, type CreateVoucherItem } from '../interfaces'
import { voucherSchema } from '../schemas'
import { hasRoles } from '@/modules/shared'
import { RoleId } from '@/modules/user'

export const useVoucher = (number: Ref<string>) => {
  const router = useRouter()
  const voucherForm = useVoucherForm()
  const authStore = useAuthStore()

  const {
    data: voucher,
    isLoading,
    isRefetching,
    isError,
    refetch
  } = useQuery({
    queryKey: ['voucher', { number }],
    queryFn: () => getVoucherAction(number.value)
  })

  const isFetching = computed(() => isLoading.value || isRefetching.value)
  const isDeleted = computed(() => voucher?.value?.deletedAt !== null)
  const canEdit = computed(() => (voucher.value?.status ? voucher.value.status.id === VoucherStatus.Draft : true))
  const canReceive = computed(() => hasRoles(authStore.userRoles, [RoleId.Admin, RoleId.Warehouse]))

  watch([isError, isLoading], ([error, loading]) => {
    if (error && !loading) router.replace({ name: 'voucher.list' })
  })

  watch(
    voucher,
    (newData) => {
      if (!newData) return

      const items = newData.items.map((item) => ({
        id: item.id,
        product: `${item.productCode.code} - ${item.productCode.product.name}`,
        productCodeId: item.productCode.id,
        quantity: item.quantity,
        observation: item.observation,
        expirationDate: item.expirationDate,
        received: item.received
      }))
      voucherForm.resetForm({
        values: {
          id: newData.id,
          customerId: newData.customer?.id || null,
          returnTypeId: newData.returnType?.id || null,
          items
        }
      })
    },
    { immediate: true }
  )

  watch(number, () => refetch())

  return {
    //* Props
    voucher,

    //! Getters
    isFetching,
    isDeleted,
    canEdit,
    canReceive,

    //? Methods
    refetch,

    //? form
    voucherForm
  }
}

const useVoucherForm = () => {
  const { meta, errors, handleSubmit, resetForm, defineField } = useForm({
    validationSchema: voucherSchema
  })

  const [customerId, customerIdAttrs] = defineField('customerId')
  const [returnTypeId, returnTypeIdAttrs] = defineField('returnTypeId')

  const {
    fields: items,
    remove: removeItem,
    push: pushItem,
    update: updateItem
  } = useFieldArray<CreateVoucherItem>('items')

  const form = reactive({ customerId, customerIdAttrs, returnTypeId, returnTypeIdAttrs, items })

  return {
    //* Props
    form,
    meta,
    errors,

    //! Getters
    canSave: computed(() => meta.value.valid && meta.value.dirty),

    //? Methods
    handleSubmit,
    resetForm,
    removeItem,
    pushItem,
    updateItem
  }
}
