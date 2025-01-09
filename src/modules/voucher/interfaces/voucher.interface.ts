import type { CustomerSummary } from '@/modules/customer/interfaces'
import type { ProductCode } from '@/modules/product-codes'
import type { AuditTrailData, AuditTrailDataPlain } from '@/modules/shared'

export interface Voucher extends AuditTrailData {
  number: number
  approvedDate: null | Date
  rejectedDate: null | Date
  customer: CustomerSummary | null
  status: VoucherStatusCatalog | null
  returnType: VoucherStatusCatalog | null
  items: VoucherItem[]
}

export interface VoucherPlain extends AuditTrailDataPlain {
  number: number
  approvedDate: null | Date
  rejectedDate: null | Date
  customer: string
  status: string
  returnType: string
}

export interface VoucherStatusCatalog {
  id: number
  name: string
  isActive: boolean
}

export interface VoucherItem {
  id: string
  expirationDate: Date
  observation: string
  received: boolean
  quantity: number
  productCode: ProductCode
}

export interface CreateVoucherItem {
  product: string | null
  expirationDate: Date
  observation: string
  quantity: number
  productCode: ProductCode
}
