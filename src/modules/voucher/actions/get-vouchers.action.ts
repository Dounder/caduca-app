import { api } from '@/api'
import type { ApiListResponse } from '@/modules/shared'
import type { Voucher, VoucherPlain } from '../interfaces'

export const getVouchersAction = async (page: number = 1): Promise<ApiListResponse<VoucherPlain>> => {
  try {
    const params = new URLSearchParams({ page: page.toString() })

    const { data } = await api.get<ApiListResponse<Voucher>>(`/voucher`, { params })

    const { meta, data: vouchers } = data

    return { meta, data: [] }
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
