import type { MenuItem } from 'primevue/menuitem'
import type { RoleItem } from '@/modules/user'
import { hasRoles } from '../helpers'

export const filterMenuItems = (items: MenuItem[], userRoles: RoleItem[]) => {
  return items
    .filter((item) => hasRoles(userRoles, item.roles))
    .map((item) => {
      const newItem = { ...item }
      if (item.items) newItem.items = filterMenuItems(item.items, userRoles)
      return newItem
    })
}
