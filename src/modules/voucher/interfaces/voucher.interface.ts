import type { CustomerSummary } from '@/modules/customer/interfaces'
import type { ProductCode } from '@/modules/product-codes'
import type { AuditTrailData, AuditTrailDataPlain, SelectOption } from '@/modules/shared'

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
  productCodeId: ProductCode
}

export interface CreateVoucherItemForm {
  expirationDate: Date
  observation: string
  quantity: number
  product: SelectOption
}

export interface VoucherForm {
  customerId: number | null
  returnTypeId: number | null
  statusId: VoucherStatus
  items: CreateVoucherItem[]
}

export enum VoucherStatus {
  Draft = 1,
  Submitted = 2,
  UnderReview = 3,
  Approved = 4,
  Processing = 5,
  Received = 6,
  Completed = 7,
  Rejected = 8
}
