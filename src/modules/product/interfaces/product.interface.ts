import type { ProductCodeSummary } from '@/modules/product-codes'
import type { AuditTrailData, AuditTrailDataPlain } from '@/modules/shared'

export interface Product extends AuditTrailData {
  id: string
  name: string
  slug: string
  codes: ProductCodeSummary[]
}

export interface ProductPlain extends AuditTrailDataPlain {
  id: string
  name: string
  codes: number[]
  slug: string
}

export interface ProductSummary {
  id: string
  name: string
  slug: string
}
