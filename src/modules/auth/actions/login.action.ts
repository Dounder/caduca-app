import { isAxiosError } from 'axios'

import type { AuthResponse, LoginError, LoginSuccess } from '../interfaces'
import { api } from '@/api/api'
import { exceptionHandler } from '@/modules/shared'

/**
 * Authenticates a user with their credentials against the API.
 *
 * @param username - The user's username or email
 * @param password - The user's password
 *
 * @returns Promise that resolves to either:
 * - LoginSuccess object containing user data and auth token if successful
 * - LoginError object with error message if credentials are invalid
 *
 * @throws {Exception} Rethrows API errors after handling them through exceptionHandler
 *
 * @remarks
 * - Returns {ok: false} with message on 401 Unauthorized
 * - Other API errors are handled by exceptionHandler
 * - Successful login returns user object and JWT token
 */
export const loginAction = async (username: string, password: string): Promise<LoginSuccess | LoginError> => {
  try {
    const { data } = await api.post<AuthResponse>('/auth/login', { username, password })

    return { ok: true, message: 'ok', user: data.user, token: data.token }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) return { ok: false, message: 'Credenciales incorrectas' }

    throw exceptionHandler(error, loginAction.name)
  }
}
