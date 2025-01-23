import * as yup from 'yup'

/**
 * Configuration file for Yup validation schema messages in Spanish.
 * Sets custom locale messages for different validation types.
 *
 * @remarks
 * This configuration includes error messages for:
 * - Mixed type validations (default, required, oneOf, etc.)
 * - String validations (length, min, max, email, etc.)
 * - Number validations (min, max, integer, etc.)
 * - Date validations (min, max)
 * - Array validations (min, max, length)
 * - Boolean validations
 * - Object validations
 *
 * @example
 * ```typescript
 * import './config/yup'
 * // Now all Yup validations will use these Spanish messages
 * ```
 *
 * @see {@link https://github.com/jquense/yup?tab=readme-ov-file#localization-and-i18n Yup Custom Locale}
 */
yup.setLocale({
  mixed: {
    default: 'No es válido',
    required: 'Este campo es requerido',
    oneOf: 'Debe ser uno de los siguientes valores: ${values}',
    notOneOf: 'No debe ser uno de los siguientes valores: ${values}',
    defined: 'Debe estar definido',
    notNull: 'No puede ser nulo',
    notType: ({ type, value }) => {
      return `Debe ser de tipo ${type}, pero el valor actual es ${value}`
    }
  },
  string: {
    length: 'Debe tener exactamente ${length} caracteres',
    min: 'Debe tener al menos ${min} caracteres',
    max: 'Debe tener como máximo ${max} caracteres',
    email: 'Debe ser un correo electrónico válido',
    url: 'Debe ser una URL válida',
    uuid: 'Debe ser un UUID válido',
    trim: 'No debe contener espacios al inicio o al final',
    lowercase: 'Debe estar en minúsculas',
    uppercase: 'Debe estar en mayúsculas',
    matches: 'Debe coincidir con el siguiente patrón: "${regex}"'
  },
  number: {
    min: 'Debe ser mayor o igual a ${min}',
    max: 'Debe ser menor o igual a ${max}',
    lessThan: 'Debe ser menor a ${less}',
    moreThan: 'Debe ser mayor a ${more}',
    positive: 'Debe ser un número positivo',
    negative: 'Debe ser un número negativo',
    integer: 'Debe ser un número entero'
  },
  date: {
    min: 'Debe ser posterior a ${min}',
    max: 'Debe ser anterior a ${max}'
  },
  array: {
    min: 'Debe tener al menos ${min} elementos',
    max: 'Debe tener como máximo ${max} elementos',
    length: 'Debe tener exactamente ${length} elementos'
  },
  boolean: {
    isValue: 'Debe ser ${value}'
  },
  object: {
    noUnknown: 'No se permiten claves no definidas en la validación'
  }
})
