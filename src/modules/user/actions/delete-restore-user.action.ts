import { api } from '@/api'
import type { User } from '../interfaces'
import { exceptionHandlerHelper } from '@/modules/shared'

export const deleteRestoreUserAction = async (userId: string, isDeleted: boolean) => {
  if (isDeleted) return await restoreUser(userId)

  return await deleteUser(userId)
}

const restoreUser = async (userId: string) => {
  try {
    const { data } = await api.patch<User>(`/user/${userId}/restore`)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'restoreUser')
  }
}

const deleteUser = async (userId: string) => {
  try {
    const { data } = await api.delete<User>(`/user/${userId}`)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'deleteUser')
  }
}
