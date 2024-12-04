import { api } from '@/api'
import type { Salesperson } from '../interfaces'
import { exceptionHandlerHelper } from '@/modules/shared'

export const deleteRestoreSalespersonAction = async (salespersonId: string, isDeleted: boolean) => {
  if (isDeleted) return await restoreSalesperson(salespersonId)

  return await deleteSalesperson(salespersonId)
}

const restoreSalesperson = async (salespersonId: string) => {
  try {
    const { data } = await api.patch<Salesperson>(`/salesperson/${salespersonId}/restore`)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'restoreSalesperson')
  }
}

const deleteSalesperson = async (salespersonId: string) => {
  try {
    const { data } = await api.delete<Salesperson>(`/salesperson/${salespersonId}`)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'deleteSalesperson')
  }
}
