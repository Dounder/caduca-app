import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { AuthStatus } from '../interfaces'
import { useAuthStore } from '../store/auth.store'

/**
 * Navigation guard that checks authentication status before allowing route access.
 *
 * @async
 * @param {RouteLocationNormalized} to - Target route the user is navigating to
 * @param {RouteLocationNormalized} from - Current route the user is navigating from
 * @param {NavigationGuardNext} next - Function to resolve the navigation
 * @returns {Promise<void>}
 *
 * @remarks
 * This guard performs the following checks:
 * 1. Waits for authentication status check if status is 'checking'
 * 2. Redirects to login if user is unauthenticated, saving attempted route
 * 3. Redirects to previously attempted route if it exists
 *
 * @example
 * ```typescript
 * // In router configuration
 * {
 *   path: '/protected',
 *   beforeEnter: isAuthenticatedGuard
 * }
 * ```
 */
const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()

  // If the auth status is checking, wait for it to complete
  if (authStore.authStatus === AuthStatus.Checking) await authStore.checkAuthStatus()

  // If the user is unauthenticated, redirect to login
  if (authStore.authStatus === AuthStatus.Unauthenticated) {
    localStorage.setItem('lastAttemptedRoute', JSON.stringify(to.fullPath)) // Save route
    next({ name: 'auth.login' })
    return
  }

  const lastAttemptedRoute = localStorage.getItem('lastAttemptedRoute')
  if (lastAttemptedRoute) {
    localStorage.removeItem('lastAttemptedRoute')
    next(JSON.parse(lastAttemptedRoute))
    return
  }

  next()
}

export default isAuthenticatedGuard
