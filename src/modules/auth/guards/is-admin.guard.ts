import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '../store/auth.store'
import { AuthStatus } from '../interfaces'
import { hasRoles } from '@/modules/shared'
import { RoleId } from '@/modules/user'

/**
 * Navigation guard that checks if the current user has admin privileges.
 * Redirects to Home route if user is not an admin.
 *
 * @param to - Target route the user is navigating to
 * @param from - Current route the user is navigating from
 * @param next - Function to control navigation flow
 *
 * @remarks
 * This guard will:
 * 1. Wait for authentication status check if it's pending
 * 2. Allow navigation if user has Admin role
 * 3. Redirect to Home route if user lacks Admin role
 *
 * @example
 * ```
 * // In router configuration
 * {
 *   path: '/admin',
 *   component: AdminPanel,
 *   beforeEnter: isAdminGuard
 * }
 * ```
 */
const isAdminGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const authStore = useAuthStore()

  if (authStore.authStatus === AuthStatus.Checking) await authStore.checkAuthStatus()

  hasRoles(authStore.userRoles, [RoleId.Admin]) ? next() : next({ name: 'Home' })
}

export default isAdminGuard
