import { api } from '@/api'
import type { Customer } from '../interfaces'
import { exceptionHandler, type DeletionToggle } from '@/modules/shared'

export const customerDeletionToggleAction = async ({ id, isDeleted }: DeletionToggle): Promise<Customer> => {
  if (isDeleted) return await restoreCustomer(id)

  return await deleteCustomer(id)
}

const restoreCustomer = async (customerId: string): Promise<Customer> => {
  try {
    const { data } = await api.patch<Customer>(`/customer/${customerId}/restore`)

    return data
  } catch (error) {
    throw exceptionHandler(error, 'restoreCustomer')
  }
}

const deleteCustomer = async (customerId: string): Promise<Customer> => {
  try {
    const { data } = await api.delete<Customer>(`/customer/${customerId}`)

    return data
  } catch (error) {
    throw exceptionHandler(error, 'deleteCustomer')
  }
}
