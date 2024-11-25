import type { RoleItem } from '@/modules/auth/interfaces'
import { PrimeIcons as icons } from '@primevue/core/api'
import type { MenuItem } from 'primevue/menuitem'

export const getMenuOptions = (userRoles: RoleItem[]): MenuItem[] => [
  { icon: icons.HOME, route: { name: 'home' } }
]
