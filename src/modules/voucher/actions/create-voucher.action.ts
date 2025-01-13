import { api } from '@/api'
import type { CreateVoucherItem, Voucher, VoucherForm } from '../interfaces'

export const createVoucherAction = async (voucher: VoucherForm): Promise<Voucher> => {
  try {
    const { items = [], ...rest } = voucher

    const { data } = await api.post<Voucher>('/voucher', {
      ...rest,
      items: cleanItems(items)
    })

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}

const cleanItems = (items: CreateVoucherItem[]) => {
  return items.map(({ product, ...rest }) => ({ ...rest }))
}
