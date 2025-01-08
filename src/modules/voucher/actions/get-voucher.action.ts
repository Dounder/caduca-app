import { api } from '@/api'
import type { Voucher } from '../interfaces'

export const getVoucherAction = async (number: string): Promise<Voucher> => {
  if (number === 'nuevo')
    return {
      id: '',
      number: 0,
      approvedDate: null,
      rejectedDate: null,
      customer: null,
      status: null,
      returnType: null,
      createdAt: null,
      updatedAt: null,
      deletedAt: null,
      createdBy: null
    }

  try {
    const { data } = await api.get<Voucher>(`/voucher/number/${number}`)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
