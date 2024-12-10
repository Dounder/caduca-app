import * as yup from 'yup'

export const userSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'El nombre de usuario debe tener al menos 2 caracteres')
    .trim()
    .lowercase()
    .required('Nombre de usuario requerido'),
  email: yup
    .string()
    .email('Correo electrónico no válido')
    .trim()
    .lowercase()
    .required('Correo electrónico requerido')
  //TODO: Implement roles
})
