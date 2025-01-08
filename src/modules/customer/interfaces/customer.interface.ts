import type { AuditTrailDataPlain } from '@/modules/shared'
import type { UserAudit } from '@/modules/user'

export interface Customer {
  id: string
  code: number
  name: string
  address: string
  createdAt: Date | null
  updatedAt: Date | null
  deletedAt: Date | null
  createdBy: UserAudit | null
  updatedBy?: UserAudit | null
  deletedBy?: UserAudit | null
}

export interface CustomerTable extends AuditTrailDataPlain {
  code: number
  name: string
  address: string
}

export interface CustomerSummary {
  id: string
  code: number
  name: string
}
