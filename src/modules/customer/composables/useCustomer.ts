import { useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import { computed, reactive, watch, type Ref } from 'vue'
import { useRouter } from 'vue-router'

import { getCustomerAction } from '../actions'
import { customerSchema } from '../schemas/customer.schema'

export const useCustomer = (code: Ref<string>) => {
  const router = useRouter()
  const customerForm = useCustomerForm()

  const {
    data: customer,
    isError,
    isLoading,
    isRefetching,
    refetch
  } = useQuery({
    queryKey: ['customer', { code: Number(code.value) }],
    queryFn: () => getCustomerAction(code.value),
    retry: false
  })

  const isFetching = computed(() => isLoading.value || isRefetching.value)
  const isDeleted = computed(() => customer?.value?.deletedAt !== null)

  watch([isError, isLoading], ([error, loading]) => {
    if (error && !loading) router.replace({ name: 'user.list' })
  })

  watch(
    customer,
    (newUser) => {
      if (!newUser) return

      customerForm.resetForm({ values: newUser })
    },
    { immediate: true }
  )

  watch(code, () => refetch())

  return {
    //* Props
    customer,

    //! Getters
    isFetching,
    isDeleted,

    //? Methods
    refetch,

    //? form
    ...customerForm
  }
}

const useCustomerForm = () => {
  const { meta, errors, handleSubmit, resetForm, defineField } = useForm({
    validationSchema: customerSchema
  })

  const [name, nameAttrs] = defineField('name')
  const [address, addressAttrs] = defineField('address')

  const form = reactive({ name, address, nameAttrs, addressAttrs })

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
