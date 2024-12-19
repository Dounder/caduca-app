import { useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import { computed, reactive, watch, type Ref } from 'vue'
import { useRouter } from 'vue-router'

import { getProductBySlugAction } from '../actions'
import { productSchema } from '../schemas/product.schema'

export const useProduct = (slug: Ref<string>) => {
  const router = useRouter()
  const productForm = useProductForm()

  const {
    data: product,
    isError,
    isLoading,
    isRefetching,
    refetch
  } = useQuery({
    queryKey: ['product', { slug }],
    queryFn: () => getProductBySlugAction(slug.value),
    retry: false
  })

  const isFetching = computed(() => isLoading.value || isRefetching.value)
  const isDeleted = computed(() => product?.value?.deletedAt !== null)

  watch([isError, isLoading], ([error, loading]) => {
    if (error && !loading) router.replace({ name: 'product.list' })
  })

  watch(
    product,
    (newData) => {
      if (!newData) return

      productForm.resetForm({ values: newData })
    },
    { immediate: true }
  )

  watch(slug, () => refetch())

  return {
    //* Props
    product,

    //! Getters
    isFetching,
    isDeleted,

    //? Methods
    refetch,

    //? form
    ...productForm
  }
}

const useProductForm = () => {
  const { meta, errors, handleSubmit, resetForm, defineField } = useForm({
    validationSchema: productSchema
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
