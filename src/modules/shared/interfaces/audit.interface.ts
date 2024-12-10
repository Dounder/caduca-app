import type { UserAudit } from '@/modules/user'

export interface AuditItem {
  title: string
  user?: UserAudit | null
  date: Date | null
}

export interface AuditTrailData {
  createdAt: Date | null
  updatedAt: Date | null
  deletedAt: Date | null
  createdBy: null | UserAudit
  updatedBy?: null | UserAudit
  deletedBy?: null | UserAudit
}
