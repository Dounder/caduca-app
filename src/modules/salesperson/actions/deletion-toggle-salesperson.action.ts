import { api } from '@/api'
import type { Salesperson } from '../interfaces'
import { exceptionHandlerHelper, type DeletionToggle } from '@/modules/shared'

export const deletionToggleSalespersonAction = async ({ id, isDeleted }: DeletionToggle) => {
  if (isDeleted) return await restoreSalesperson(id)

  return await deleteSalesperson(id)
}

const restoreSalesperson = async (id: string) => {
  try {
    const { data } = await api.patch<Salesperson>(`/salesperson/${id}/restore`)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'restoreSalesperson')
  }
}

const deleteSalesperson = async (id: string) => {
  try {
    const { data } = await api.delete<Salesperson>(`/salesperson/${id}`)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'deleteSalesperson')
  }
}
