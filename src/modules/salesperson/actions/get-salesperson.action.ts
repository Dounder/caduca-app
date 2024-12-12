import { api } from '@/api'
import { faker } from '@faker-js/faker'
import type { Salesperson } from '../interfaces'

export const getSalespersonAction = async (code: string): Promise<Salesperson> => {
  if (code === 'nuevo')
    return {
      id: '',
      code: 0,
      name: faker.person.fullName(),
      createdAt: null,
      updatedAt: null,
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null
    }

  try {
    const { data } = await api.get<Salesperson>(`/salesperson/code/${code}`)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
