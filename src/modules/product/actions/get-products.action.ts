import { api } from '@/api'
import { DateUtils, type ApiListResponse } from '@/modules/shared'
import type { Product, ProductPlain } from '../interfaces'

export const getProductsAction = async (
  page: number = 1,
  search: string = ''
): Promise<ApiListResponse<ProductPlain>> => {
  try {
    const params = new URLSearchParams({ page: page.toString(), limit: '10' })
    if (search) params.append('search', search)

    const { data } = await api.get<ApiListResponse<Product>>('/product', { params })

    const { data: products, meta } = data

    return {
      meta,
      data: products.map((product) => ({
        ...product,
        codes: product.codes.map(({ code }) => code),
        createdAt: DateUtils.convertDate(product.createdAt),
        updatedAt: DateUtils.convertDate(product.updatedAt),
        deletedAt: DateUtils.convertDate(product.deletedAt),
        createdBy: product.createdBy?.username,
        updatedBy: product.updatedBy?.username,
        deletedBy: product.deletedBy?.username
      }))
    }
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
