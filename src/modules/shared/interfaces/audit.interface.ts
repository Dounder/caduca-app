import type { UserAudit } from '@/modules/user'

export interface AuditItem {
  title: string
  user?: UserAudit | null
  date: Date | null
}

export interface AuditTrailData {
  id: string
  createdAt: Date | null
  updatedAt: Date | null
  deletedAt: Date | null
  createdBy: null | UserAudit
  updatedBy?: null | UserAudit
  deletedBy?: null | UserAudit
}

export interface AuditTrailDataPlain {
  id: string
  createdAt: string | null
  updatedAt: string | null
  deletedAt: string | null
  createdBy?: string | null
  updatedBy?: string | null
  deletedBy?: string | null
}
