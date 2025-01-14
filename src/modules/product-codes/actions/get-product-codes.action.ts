import { api } from '@/api'
import type { ApiListResponse } from '@/modules/shared'
import type { ProductCodeResponse, ProductCodeSummary } from '../interfaces'

export const getProductCodesAction = async (page: number = 1): Promise<ProductCodeSummary[]> => {
  try {
    const { data } = await api.get<ApiListResponse<ProductCodeResponse>>('/product/code/all', {
      params: { page, limit: 10000 }
    })

    return data.data.map(({ id, code, product }) => ({ id, code, product: product.name }))
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
