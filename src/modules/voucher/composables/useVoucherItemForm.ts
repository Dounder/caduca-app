import { useForm } from 'vee-validate'
import { voucherItemDialogSchema } from '../schemas'
import { computed, reactive } from 'vue'

export const useVoucherItemForm = () => {
  const { meta, errors, handleSubmit, resetForm, defineField } = useForm({
    validationSchema: voucherItemDialogSchema
  })

  const [product, productAttrs] = defineField('product')
  const [expirationDate, expirationDateAttrs] = defineField('expirationDate')
  const [observation, observationAttrs] = defineField('observation')
  const [quantity, quantityAttrs] = defineField('quantity')

  const form = reactive({
    product,
    productAttrs,
    expirationDate,
    expirationDateAttrs,
    observation,
    observationAttrs,
    quantity,
    quantityAttrs
  })

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
