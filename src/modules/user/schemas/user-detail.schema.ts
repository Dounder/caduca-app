import * as yup from 'yup'

export const userSchema = yup.object().shape({
  username: yup.string().min(2).trim().lowercase().required(),
  email: yup.string().email().trim().lowercase().required()
  //TODO: Implement roles
})
