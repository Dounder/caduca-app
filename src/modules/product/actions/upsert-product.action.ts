import { api } from '@/api'
import { exceptionHandler } from '@/modules/shared'
import type { Product } from '../interfaces'

export const upsertProductAction = async (product: Partial<Product>): Promise<Product> => {
  const productId = product.id

  product = cleanProduct(product)

  if (productId && productId !== '') return await updateProduct(productId, product)

  return await createProduct(product)
}

const cleanProduct = (product: Partial<Product>) => {
  delete product.id
  delete product.slug
  delete product.codes
  delete product.createdAt
  delete product.updatedAt
  delete product.deletedAt
  delete product.createdBy
  delete product.updatedBy
  delete product.deletedBy

  return product
}

const createProduct = async (product: Partial<Product>) => {
  try {
    const { data } = await api.post<Product>('/product', product)

    return data
  } catch (error) {
    throw exceptionHandler(error, 'createProduct')
  }
}

const updateProduct = async (productId: string, product: Partial<Product>) => {
  try {
    const { data } = await api.patch<Product>(`/product/${productId}`, product)

    return data
  } catch (error) {
    throw exceptionHandler(error, 'updateProduct')
  }
}
