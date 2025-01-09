import * as yup from 'yup'
import type { CreateVoucherItem } from '../interfaces'

const voucherItemSchema = yup.object().shape({
  expirationDate: yup.date().required(),
  observation: yup.string(),
  quantity: yup.number().required().min(1),
  productCodeId: yup.string().required()
})

export const voucherSchema = yup.object().shape({
  customerId: yup.string().required(),
  returnTypeId: yup.number().required(),
  items: yup.array().of(voucherItemSchema).required().min(1)
})
