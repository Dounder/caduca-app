import { useForm } from 'vee-validate'
import { voucherItemSchema } from '../schemas'
import { computed, reactive } from 'vue'

const useVoucherItemForm = () => {
  const { meta, errors, handleSubmit, resetForm, defineField } = useForm({
    validationSchema: voucherItemSchema
  })

  const [product, productAttrs] = defineField('product')
  const [expirationDate, expirationDateAttrs] = defineField('expirationDate')
  const [observation, observationAttrs] = defineField('observation')
  const [quantity, quantityAttrs] = defineField('quantity')
  const [productCode, productCodeAttrs] = defineField('productCode')

  const form = reactive({
    product,
    productAttrs,
    expirationDate,
    expirationDateAttrs,
    observation,
    observationAttrs,
    quantity,
    quantityAttrs,
    productCode,
    productCodeAttrs
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
