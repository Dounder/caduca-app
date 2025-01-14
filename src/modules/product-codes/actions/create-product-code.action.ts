import { api } from '@/api'
import { exceptionHandlerHelper } from '@/modules/shared'
import type { ProductCodeAudit } from '../interfaces'

export const createProductCodeAction = async (productId: string): Promise<ProductCodeAudit> => {
  try {
    const { data } = await api.post<ProductCodeAudit>(`/product/code`, { productId })

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, createProductCodeAction.name)
  }
}
