import { api } from '@/api'
import type { CatalogResponse } from '@/modules/shared'

export const getVoucherStatusAction = async (): Promise<CatalogResponse[]> => {
  try {
    const { data } = await api.get<CatalogResponse[]>('/voucher/catalog/status')

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
