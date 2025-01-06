import type { CustomerSummary } from '@/modules/customer/interfaces'
import type { AuditTrailData, AuditTrailDataPlain } from '@/modules/shared'

export interface Voucher extends AuditTrailData {
  number: number
  approvedDate: null | Date
  rejectedDate: null | Date
  customer: CustomerSummary
  status: VoucherStatusCatalog
  returnType: VoucherStatusCatalog
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
