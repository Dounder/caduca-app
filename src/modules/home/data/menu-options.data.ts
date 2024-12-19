import { RoleId, type RoleItem } from '@/modules/user'
import { filterMenuItems } from '@/modules/shared'
import { PrimeIcons as icons } from '@primevue/core/api'
import { useI18n } from 'vue-i18n'

export const getMenuOptions = (userRoles: RoleItem[]) => {
  const { t } = useI18n()
  const menuItems = [
    { icon: icons.HOME, route: { name: 'home' } },
    {
      label: t('navbar.directory'),
      icon: icons.BOOK,
      roles: [RoleId.Admin, RoleId.Developer, RoleId.Manager, RoleId.Salesperson],
      items: [
        {
          label: t('navbar.user'),
          route: { name: 'user.list' },
          roles: [RoleId.Admin, RoleId.Developer, RoleId.Manager]
        },
        {
          label: t('navbar.customer'),
          route: { name: 'customer.list' },
          roles: [RoleId.Admin, RoleId.Developer, RoleId.Manager, RoleId.Salesperson]
        },
        {
          label: t('navbar.salesperson'),
          route: { name: 'salesperson.list' },
          roles: [RoleId.Admin, RoleId.Developer, RoleId.Manager]
        }
      ]
    },
    {
      label: t('navbar.products'),
      icon: icons.BOX,
      route: { name: 'product.list' }
    },
    {
      label: t('navbar.expiredVouchers'),
      icon: icons.TICKET,
      route: { name: 'expired_voucher.list' }
    }
  ]

  return filterMenuItems(menuItems, userRoles)
}
