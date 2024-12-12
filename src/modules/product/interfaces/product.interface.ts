import type { AuditTrailData, AuditTrailDataPlain } from '@/modules/shared'

export interface Product extends AuditTrailData {
  id: string
  name: string
  codes: ProductCode[]
}

export interface ProductCode {
  id: string
  code: number
}

export interface ProductPlain extends AuditTrailDataPlain {
  id: string
  name: string
  codes: string[]
}
