import type { AuditTrailData, AuditTrailDataPlain } from '@/modules/shared'
import type { UserAudit } from '@/modules/user'

export interface Salesperson extends AuditTrailData {
  id: string
  code: number
  name: string
}

export interface SalespersonTable extends AuditTrailDataPlain {
  id: string
  code: number
  name: string
  createdAt: string | null
  updatedAt: string | null
  deletedAt: string | null
  createdBy: string | null
  updatedBy?: string | null
  deletedBy?: string | null
}
