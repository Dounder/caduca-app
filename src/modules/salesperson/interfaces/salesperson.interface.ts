import type { UserAudit } from '@/modules/user'

export interface Salesperson {
  id: string
  createdAt: Date | null
  updatedAt: Date | null
  deletedAt: Date | null
  code: number
  name: string
  createdBy: UserAudit
  updatedBy?: UserAudit | null
  deletedBy?: UserAudit | null
}

export interface SalespersonTable {
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

export interface DeleteRestoreSalesperson {
  salespersonId: string
  isDeleted: boolean
}
