import { api } from '@/api'
import { exceptionHandlerHelper } from '@/modules/shared'
import type { Customer } from '../interfaces'

export const upsertCustomerAction = async (customer: Partial<Customer>): Promise<Customer> => {
  const customerId = customer.id

  customer = cleanCustomer(customer)

  if (customerId && customerId !== '') return await updateCustomer(customerId, customer)

  return await createCustomer(customer)
}

const cleanCustomer = (customer: Partial<Customer>) => {
  delete customer.id
  delete customer.code
  delete customer.createdAt
  delete customer.updatedAt
  delete customer.deletedAt
  delete customer.createdBy
  delete customer.updatedBy
  delete customer.deletedBy

  return customer
}

const createCustomer = async (customer: Partial<Customer>) => {
  try {
    const { data } = await api.post<Customer>('/customer', customer)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'createCustomer')
  }
}

const updateCustomer = async (customerId: string, customer: Partial<Customer>) => {
  try {
    const { data } = await api.patch<Customer>(`/customer/${customerId}`, customer)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'updateCustomer')
  }
}
