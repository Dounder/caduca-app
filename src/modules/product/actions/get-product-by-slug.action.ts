import { api } from '@/api'
import type { Product } from '../interfaces'
import { faker } from '@faker-js/faker'

export const getProductBySlugAction = async (slug: string): Promise<Product> => {
  if (slug === 'nuevo')
    return {
      id: '',
      name: faker.commerce.product(),
      slug: '',
      codes: [],
      createdAt: null,
      updatedAt: null,
      deletedAt: null,
      createdBy: null
    }

  try {
    const { data } = await api.get<Product>(`/product/slug/${slug}`)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
