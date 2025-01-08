import * as yup from 'yup'

export const voucherSchema = yup.object().shape({
  customerId: yup.string().required(),
  returnTypeId: yup.string().required()
})
