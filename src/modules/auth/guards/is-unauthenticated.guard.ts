import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { AuthStatus } from '../interfaces'
import { useAuthStore } from '../store/auth.store'

/**
 * Navigation guard that prevents authenticated users from accessing certain routes.
 * Redirects authenticated users to the home view.
 *
 * @param {RouteLocationNormalized} to - Target route the user is navigating to
 * @param {RouteLocationNormalized} from - Current route the user is navigating from
 * @param {NavigationGuardNext} next - Function to resolve the navigation
 * @returns {Promise<void>}
 *
 * @remarks
 * This guard first checks the authentication status. If the status is still being checked,
 * it waits for the check to complete before making a decision.
 *
 * @example
 * ```typescript
 * // In router configuration
 * {
 *   path: '/login',
 *   beforeEnter: [isUnauthenticatedGuard]
 * }
 * ```
 */
const isUnauthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()

  // If the auth status is checking, wait for it to complete
  if (authStore.authStatus === AuthStatus.Checking) await authStore.checkAuthStatus()

  // If the user is authenticated, allow the navigation
  authStore.authStatus === AuthStatus.Authenticated ? next({ name: 'home.view' }) : next()
}

export default isUnauthenticatedGuard
