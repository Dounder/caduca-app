import type { RoleId, Role } from '@/modules/user'

/**
 * Determines if a user has any of the valid roles.
 *
 * @param userRoles - An array of the user's roles.
 * @param validRoles - An array of valid role IDs. If empty or not provided, the function returns `true`.
 * @returns `true` if the user has at least one of the valid roles, or if no valid roles are specified; otherwise, `false`.
 */
export const hasRoles = (userRoles: Role[], validRoles: RoleId[] = []) => {
  if (!validRoles || validRoles.length === 0) return true

  return userRoles.some((role) => validRoles.includes(role.id as RoleId))
}
