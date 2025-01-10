import type { ProductSummary } from '@/modules/product/interfaces'
import type { AuditTrailData } from '@/modules/shared'

export interface ProductCodeAudit extends AuditTrailData {
  id: string
  code: number
  product: ProductSummary
}

export interface ProductCodeSummary {
  id: string
  code: number
}

export interface ProductCode {
  id: string
  code: number
  product: ProductSummary
}

export interface ProductCodeResponse extends AuditTrailData {
  code: number
  product: ProductSummary
}

export interface ProductCodeSummary {
  id: string
  code: number
  product: string
}
