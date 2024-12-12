import { api } from '@/api'
import { exceptionHandlerHelper, type DeletionToggle } from '@/modules/shared'
import type { Product } from '../interfaces'

export const deletionToggleProductAction = async ({ id, isDeleted }: DeletionToggle) => {
  return isDeleted ? await restoreProduct(id) : await deleteProduct(id)
}

const deleteProduct = async (id: string) => {
  try {
    const { data } = await api.delete<Product>(`/product/${id}`)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, deletionToggleProductAction.name)
  }
}

const restoreProduct = async (id: string) => {
  try {
    const { data } = await api.patch<Product>(`/product/${id}/restore`)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, deletionToggleProductAction.name)
  }
}
