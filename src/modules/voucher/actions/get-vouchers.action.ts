import { api } from '@/api'
import { DateUtils, type ApiListResponse } from '@/modules/shared'
import type { Voucher, VoucherPlain } from '../interfaces'

export const getVouchersAction = async (
  page: number = 1,
  search: string = ''
): Promise<ApiListResponse<VoucherPlain>> => {
  try {
    const params = new URLSearchParams({ page: page.toString() })
    if (search) params.append('search', search)

    const { data } = await api.get<ApiListResponse<Voucher>>(`/voucher`, { params })

    const { meta, data: vouchers } = data

    return {
      meta,
      data: vouchers.map((voucher) => ({
        ...voucher,
        customer: voucher.customer?.name || '',
        status: voucher.status?.name || '',
        returnType: voucher.returnType?.name || '',
        createdAt: DateUtils.convertDate(voucher.createdAt),
        updatedAt: DateUtils.convertDate(voucher.updatedAt),
        deletedAt: DateUtils.convertDate(voucher.deletedAt),
        createdBy: voucher.createdBy?.username || '',
        updatedBy: voucher.updatedBy?.username || '',
        deletedBy: voucher.deletedBy?.username || ''
      }))
    }
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
