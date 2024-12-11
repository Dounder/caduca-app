import * as yup from 'yup'

export const salespersonSchema = yup.object().shape({
  name: yup.string().required().min(2)
})
