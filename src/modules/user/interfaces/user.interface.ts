import type { AuditTrailData } from '@/modules/shared'
import type { Role } from './role.interface'

export interface User extends AuditTrailData {
  username: string
  email: string
  roles: Role[]
  password?: string
}

export interface UserRoleString extends AuditTrailData {
  id: string
  username: string
  email: string
  roles: string[]
  password?: string
}

export interface UserPlain {
  id: string
  username: string
  email: string
  createdAt: string | null
  updatedAt: string | null
  deletedAt: string | null
  createdBy: string
  roles: string[]
  updatedBy?: string | null
  deletedBy?: string | null
  password?: string
}

export interface UserAudit {
  id: string
  username: string
  email: string
}
