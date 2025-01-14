import { api } from '@/api'
import type { Voucher, VoucherForm } from '../interfaces'
import { exceptionHandlerHelper } from '@/modules/shared'

export const upsertVoucherAction = async (voucher: VoucherForm): Promise<Voucher> => {
  const voucherId = voucher.id

  return voucherId !== '' ? updateVoucher(voucherId, voucher) : createVoucher(voucher)
}

const createVoucher = async (voucher: VoucherForm): Promise<Voucher> => {
  try {
    const { items = [], id: _, ...rest } = voucher

    const { data } = await api.post<Voucher>('/voucher', {
      ...rest,
      items: items.map(({ product, id, ...rest }) => ({ ...rest }))
    })

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, createVoucher.name)
  }
}

const updateVoucher = async (id: string, voucher: VoucherForm): Promise<Voucher> => {
  try {
    const { items = [], statusId } = voucher

    const { data } = await api.patch<Voucher>(`/voucher/${id}`, {
      status: statusId,
      items: items.map(({ product, ...rest }) => ({ ...rest }))
    })

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, updateVoucher.name)
  }
}
