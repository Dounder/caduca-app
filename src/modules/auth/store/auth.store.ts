import { useLocalStorage, useSessionStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'

import { hasRoles, useNotification } from '@/modules/shared'
import { RoleId, type User } from '@/modules/user'
import { checkAuthAction, loginAction } from '../actions'
import { AuthStatus } from '../interfaces'

export const useAuthStore = defineStore('auth', () => {
  const { showError } = useNotification()
  const authStatus = ref<AuthStatus>(AuthStatus.Checking)
  const user = ref<User | undefined>()
  const token = ref(useLocalStorage('token', ''))
  const sessionClosedNotified = ref(useSessionStorage('sessionClosedNotified', false))

  /**
   * Authenticates a user with the provided credentials.
   *
   * @param username - The user's username
   * @param password - The user's password
   * @returns Promise<boolean> - Returns true if login was successful, false otherwise
   *
   * @remarks
   * This function performs the following steps:
   * 1. Attempts to login using provided credentials
   * 2. If login fails, logs out user and returns false
   * 3. If login succeeds, updates user state, token, and auth status
   * 4. Resets session closed notification flag
   *
   * @throws Will catch any errors during login process and trigger logout
   */
  const login = async (username: string, password: string) => {
    try {
      const loginResp = await loginAction(username, password)

      if (!loginResp.ok) {
        logout(true)
        return false
      }

      user.value = loginResp.user
      token.value = loginResp.token
      authStatus.value = AuthStatus.Authenticated
      sessionClosedNotified.value = false

      return true
    } catch (error) {
      return logout(true)
    }
  }

  /**
   * Logs out the user by clearing authentication data and optionally showing a notification.
   *
   * This function:
   * - Removes the authentication token from localStorage
   * - Resets authentication status to Unauthenticated
   * - Clears user data and token from state
   * - Optionally shows an expiration notification
   *
   * @param {boolean} closedManually - Flag indicating if the logout was triggered manually by the user
   *                                  When false and session hasn't been notified as closed, shows expiration message
   *
   * @returns {boolean} Always returns false to indicate logout completion
   *
   * @remarks
   * The function uses a `sessionClosedNotified` flag to prevent showing multiple expiration
   * notifications to the user when the session times out.
   */
  const logout = (closedManually = false): boolean => {
    localStorage.removeItem('token')

    authStatus.value = AuthStatus.Unauthenticated
    user.value = undefined
    token.value = ''

    if (!closedManually && !sessionClosedNotified.value) {
      showError({
        summary: 'No Autorizado',
        detail: 'La sesión ha expirado, por favor inicie sesión nuevamente',
        life: 5000
      })
      sessionClosedNotified.value = true
    }

    return false
  }

  /**
   * Checks the authentication status of the current user session.
   *
   * This method verifies if the current session is valid by making an API call.
   * If the authentication check is successful, it updates the local authentication state
   * with the user information and token. If the check fails, it triggers a logout.
   *
   * @async
   * @returns {Promise<boolean>} A promise that resolves to:
   *   - `true` if authentication is valid and state was updated successfully
   *   - `false` if authentication failed or an error occurred
   *
   * @throws {Error} The error is caught internally and results in a logout
   *
   * @remarks
   * Side effects:
   * - Updates authStatus.value
   * - Updates user.value
   * - Updates token.value
   * - Updates sessionClosedNotified.value
   * - May trigger logout() if authentication fails
   */
  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction()

      if (!statusResp.ok) {
        logout()
        return false
      }

      authStatus.value = AuthStatus.Authenticated
      user.value = statusResp.user
      token.value = statusResp.token
      sessionClosedNotified.value = false
      return true
    } catch (error) {
      logout()
      return false
    }
  }

  return {
    user,
    token,
    authStatus,

    // Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    username: computed(() => user.value?.username),
    userRoles: computed(() => user.value?.roles || []),
    canDelete: computed(() => hasRoles(user.value?.roles || [], [RoleId.Admin, RoleId.Developer])),

    // Actions
    login,
    logout,
    checkAuthStatus
  }
})
