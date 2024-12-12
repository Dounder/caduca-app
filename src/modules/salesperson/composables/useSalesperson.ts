import { useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import { type Ref, computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getSalespersonAction } from '../actions'
import { salespersonSchema } from '../schemas/salesperson.schema'

export const useSalesperson = (code: Ref<string>) => {
  const router = useRouter()
  const salespersonForm = useSalespersonForm()

  const { data, isLoading, isRefetching, isError, refetch } = useQuery({
    queryKey: ['salesperson', { code: Number(code.value) }],
    queryFn: async () => await getSalespersonAction(code.value)
  })
  const isFetching = computed(() => isLoading.value || isRefetching.value)
  const isDeleted = computed(() => !!data.value?.deletedAt)

  watch([isError, isLoading], ([error, loading]) => {
    if (error && !loading) router.replace({ name: 'customer.list' })
  })

  watch(
    data,
    (newData) => {
      if (!newData) return

      salespersonForm.resetForm({ values: newData })
    },
    { immediate: true }
  )

  watch(code, () => refetch())

  return {
    //* Props
    salesperson: data,

    //! Getters
    isFetching,
    isDeleted,

    //? Methods
    refetch,

    //? Form
    ...salespersonForm
  }
}

const useSalespersonForm = () => {
  const { meta, errors, handleSubmit, resetForm, defineField } = useForm({
    validationSchema: salespersonSchema
  })

  const [name, nameAttrs] = defineField('name')

  const form = reactive({ name, nameAttrs })

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
