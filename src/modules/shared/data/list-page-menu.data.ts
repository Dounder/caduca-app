import { useI18n } from 'vue-i18n'
import { PrimeIcons as icons } from '@primevue/core/api'

import { RoleId, type RoleItem } from '@/modules/auth/interfaces'
import { filterMenuItems } from '@/modules/shared'
import type { MenuItem } from 'primevue/menuitem'

export const getListPageOptions = (userRoles: RoleItem[]) => {
  const { t } = useI18n()
  const menuItems: MenuItem[] = [
    {
      label: t('shared.actions.new'),
      icon: icons.PLUS_CIRCLE,
      roles: [RoleId.Admin, RoleId.Developer, RoleId.Manager]
    },
    {
      label: t('shared.actions.refresh'),
      icon: icons.REFRESH
    },
    {
      label: t('shared.actions.export'),
      icon: icons.DOWNLOAD,
      disabled: true
    }
  ]

  return filterMenuItems(menuItems, userRoles)
}
