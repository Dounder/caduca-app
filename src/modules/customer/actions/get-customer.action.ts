import { faker } from '@faker-js/faker'

import { api } from '@/api'
import type { Customer } from '../interfaces'
import { envs } from '@/config/envs'

export const getCustomerAction = async (code: string): Promise<Customer> => {
  if (code === 'nuevo')
    return {
      id: '',
      code: 0,
      name: envs.isDev ? faker.person.fullName() : '',
      address: envs.isDev ? faker.location.streetAddress({ useFullAddress: true }) : '',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null
    }

  try {
    const { data } = await api.get<Customer>(`/customer/code/${code}`)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
