import { api } from '@/api'
import { exceptionHandlerHelper } from '@/modules/shared'
import type { ProductCode } from '../interfaces'

export const createProductCodeAction = async (productId: string): Promise<ProductCode> => {
  try {
    const { data } = await api.post<ProductCode>(`/product/code`, { productId })

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, createProductCodeAction.name)
  }
}
