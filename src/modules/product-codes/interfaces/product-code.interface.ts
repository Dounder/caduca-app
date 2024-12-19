import type { ProductSummary } from '@/modules/product/interfaces'
import type { AuditTrailData } from '@/modules/shared'

export interface ProductCode extends AuditTrailData {
  id: string
  code: number
  product: ProductSummary
}

export interface ProductCodeSummary {
  id: string
  code: number
}
