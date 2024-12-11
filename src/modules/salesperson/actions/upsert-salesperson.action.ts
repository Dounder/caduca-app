import { api } from '@/api'
import { exceptionHandlerHelper } from '@/modules/shared'
import type { Salesperson } from '../interfaces'

export const createUpdateSalespersonAction = async (
  salesperson: Partial<Salesperson>
): Promise<Salesperson> => {
  const salespersonId = salesperson.id

  salesperson = cleanSalesperson(salesperson)

  if (salespersonId && salespersonId !== '')
    return await updateSalesperson(salespersonId, salesperson)

  return await createSalesperson(salesperson)
}

const cleanSalesperson = (salesperson: Partial<Salesperson>) => {
  delete salesperson.id
  delete salesperson.code
  delete salesperson.createdAt
  delete salesperson.updatedAt
  delete salesperson.deletedAt
  delete salesperson.createdBy
  delete salesperson.updatedBy
  delete salesperson.deletedBy

  return salesperson
}

const createSalesperson = async (salesperson: Partial<Salesperson>) => {
  try {
    const { data } = await api.post<Salesperson>('/salesperson', salesperson)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'createSalesperson')
  }
}

const updateSalesperson = async (salespersonId: string, salesperson: Partial<Salesperson>) => {
  try {
    const { data } = await api.patch<Salesperson>(`/salesperson/${salespersonId}`, salesperson)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'updateSalesperson')
  }
}
