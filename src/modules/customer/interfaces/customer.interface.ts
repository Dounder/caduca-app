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

export interface CustomerTable {
  id: string
  code: number
  name: string
  address: string
  createdAt: string | null
  updatedAt: string | null
  deletedAt: string | null
  createdBy: string | null
  updatedBy?: string | null
  deletedBy?: string | null
}
