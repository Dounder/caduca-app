import i18n from '@/locales/i18n'
import type { AuditItem, AuditTrailData } from '../interfaces'

export const generateAuditItemList = <T extends AuditTrailData>(item?: T): AuditItem[] => {
  if (!item) return []

  return [
    { title: i18n.global.t('shared.fields.createdBy'), user: item.createdBy, date: item.createdAt },
    { title: i18n.global.t('shared.fields.updatedBy'), user: item.updatedBy, date: item.updatedAt },
    { title: i18n.global.t('shared.fields.deletedBy'), user: item.deletedBy, date: item.deletedAt }
  ]
}
