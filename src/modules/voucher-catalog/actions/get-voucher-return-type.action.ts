import { api } from '@/api'
import type { CatalogResponse, SelectOption } from '@/modules/shared'

export const getVoucherReturnTypeAction = async (): Promise<SelectOption[]> => {
  try {
    const { data } = await api.get<CatalogResponse[]>('/voucher/catalog/return_type')

    return data.map(({ id, name }) => ({ name, value: id }))
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
