import * as yup from 'yup'

export const customerSchema = yup.object().shape({
  name: yup.string().required().min(2),
  address: yup.string().required().min(2)
})
