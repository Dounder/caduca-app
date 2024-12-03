import { api } from '@/api'
import type { Customer } from '../interfaces'
import { exceptionHandlerHelper } from '@/modules/shared'

export const deleteRestoreCustomerAction = async (customerId: string, isDeleted: boolean) => {
  if (isDeleted) return await restoreCustomer(customerId)

  return await deleteCustomer(customerId)
}

const restoreCustomer = async (customerId: string) => {
  try {
    const { data } = await api.patch<Customer>(`/customer/${customerId}/restore`)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'restoreCustomer')
  }
}

const deleteCustomer = async (customerId: string) => {
  try {
    const { data } = await api.delete<Customer>(`/customer/${customerId}`)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'deleteCustomer')
  }
}
