import { RoleId, type RoleItem } from '@/modules/auth/interfaces'
import { hasRoles } from '@/modules/shared'
import { PrimeIcons as icons } from '@primevue/core/api'
import type { MenuItem } from 'primevue/menuitem'

const filterMenuItems = (items: MenuItem[], userRoles: RoleItem[]) => {
  return items
    .filter((item) => hasRoles(userRoles, item.roles))
    .map((item) => {
      const newItem = { ...item }
      if (item.items) newItem.items = filterMenuItems(item.items, userRoles)
      return newItem
    })
}

export const getMenuOptions = (userRoles: RoleItem[]) => {
  const menuItems = [
    { icon: icons.HOME, route: { name: 'home' } },
    {
      label: 'Directorio',
      icon: icons.BOOK,
      items: [
        {
          label: 'Usuarios',
          route: { name: 'user.list' },
          roles: [RoleId.Admin, RoleId.Developer, RoleId.Manager]
        },
        {
          label: 'Clientes',
          route: { name: 'customer.list' },
          roles: [RoleId.Admin, RoleId.Developer, RoleId.Manager, RoleId.Salesperson]
        },
        {
          label: 'Vendedores',
          route: { name: 'salesperson.list' },
          roles: [RoleId.Admin, RoleId.Developer, RoleId.Manager]
        }
      ]
    }
  ]

  return filterMenuItems(menuItems, userRoles)
}
