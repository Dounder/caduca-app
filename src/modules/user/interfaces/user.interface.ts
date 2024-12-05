export interface User {
  id: string
  username: string
  email: string
  createdAt: Date | null
  updatedAt: Date | null
  deletedAt: Date | null
  createdBy: null | UserAudit
  roles: RoleItem[]
  updatedBy?: null | UserAudit
  deletedBy?: null | UserAudit
  password?: string
}

export interface UserTable {
  id: string
  username: string
  email: string
  createdAt: string | null
  updatedAt: string | null
  deletedAt: string | null
  createdBy: string
  roles: string
  updatedBy?: string | null
  deletedBy?: string | null
  password?: string
}

export enum RoleId {
  Admin = 'cm3rmdiwl00010clfbut56c4r',
  Manager = 'cm3rmdiwl00020clf179p5y92',
  Staff = 'cm3rmdiwm00030clf2sw508so',
  Developer = 'cm3rmdiwm00040clf27ymcarm',
  Salesperson = 'cm3rmdiwm00050clffszl8rox',
  Customer = 'cm3rmdiwm00060clfg8032oef',
  Warehouse = 'cm3rmdiwm00070clf3w8288g4'
}

export interface RoleItem {
  id: string
  name: string
  description?: string
}

export interface UserAudit {
  id: string
  username: string
  email: string
}

export interface DeleteRestoreUser {
  userId: string
  isDeleted: boolean
}

export interface UserRelatedMeta {
  title: string
  user?: UserAudit | null
  date: Date | null
}
