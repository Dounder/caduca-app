import { api } from '@/api'
import type { Customer } from '../interfaces'
import { exceptionHandlerHelper, type DeletionToggle } from '@/modules/shared'

export const customerDeletionToggleAction = async ({ id, isDeleted }: DeletionToggle) => {
  if (isDeleted) return await restoreCustomer(id)

  return await deleteCustomer(id)
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
