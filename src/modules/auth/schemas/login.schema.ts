import * as yup from 'yup'

/**
 * Schema for validating login credentials.
 * @description Defines validation rules for username and password fields.
 * @example
 * ```typescript
 * const credentials = { username: "john_doe", password: "secretpass" };
 * const isValid = await loginSchema.validate(credentials);
 * ```
 *
 * @remarks
 * - Username must be at least 3 characters long
 * - Both username and password are required fields
 *
 * @throws {ValidationError} When validation fails
 */
export const loginSchema = yup.object().shape({
  username: yup.string().required().min(3),
  password: yup.string().required()
})
