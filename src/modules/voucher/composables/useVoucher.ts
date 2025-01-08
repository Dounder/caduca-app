import { useQuery } from '@tanstack/vue-query'
import { computed, reactive, watch, type Ref } from 'vue'
import { useRouter } from 'vue-router'

import { getVoucherAction } from '../actions'
import { voucherSchema } from '../schemas'
import { useForm } from 'vee-validate'

export const useVoucher = (number: Ref<string>) => {
  const router = useRouter()
  const voucherForm = useVoucherForm()

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

  watch([isError, isLoading], ([error, loading]) => {
    if (error && !loading) router.replace({ name: 'voucher.list' })
  })

  watch(
    voucher,
    (newData) => {
      if (!newData) return
      console.log('🚀 ~ useVoucher ~ newData:', newData)

      voucherForm.resetForm({ values: { customerId: newData.customer?.id, returnTypeId: newData.returnType?.id } })
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

    //? Methods
    refetch,

    //? form
    ...voucherForm
  }
}

const useVoucherForm = () => {
  const { meta, errors, handleSubmit, resetForm, defineField } = useForm({
    validationSchema: voucherSchema
  })

  const [customerId, customerIdAttrs] = defineField('customerId')
  const [returnTypeId, returnTypeIdAttrs] = defineField('returnTypeId')

  const form = reactive({ customerId, customerIdAttrs, returnTypeId, returnTypeIdAttrs })

  return {
    //* Props
    form,
    meta,
    errors,

    //! Getters
    canSave: computed(() => meta.value.valid && meta.value.dirty),

    //? Methods
    handleSubmit,
    resetForm
  }
}
