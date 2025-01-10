import type { ProductCodeSummary } from '@/modules/product-codes'
import * as yup from 'yup'

export const voucherItemSchema = yup.object().shape({
  expirationDate: yup.date().required(),
  observation: yup.string(),
  quantity: yup.number().required().min(1),
  product: yup.object<ProductCodeSummary>().required()
})

export const voucherSchema = yup.object().shape({
  customerId: yup.string().required(),
  returnTypeId: yup.number().required(),
  items: yup.array().of(voucherItemSchema).required().min(1)
})
