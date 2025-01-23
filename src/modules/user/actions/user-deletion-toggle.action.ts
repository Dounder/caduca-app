import { api } from '@/api'
import type { DeleteRestoreUser, User, UserRoleString } from '../interfaces'
import { exceptionHandler } from '@/modules/shared'

export const userDeletionToggle = async ({ userId, isDeleted }: DeleteRestoreUser): Promise<UserRoleString> => {
  if (isDeleted) return await restoreUser(userId)

  return await deleteUser(userId)
}

const restoreUser = async (userId: string): Promise<UserRoleString> => {
  try {
    const { data } = await api.patch<User>(`/user/${userId}/restore`)

    return { ...data, roles: data.roles.map((role) => role.id) }
  } catch (error) {
    throw exceptionHandler(error, 'restoreUser')
  }
}

const deleteUser = async (userId: string): Promise<UserRoleString> => {
  try {
    const { data } = await api.delete<User>(`/user/${userId}`)

    return { ...data, roles: data.roles.map((role) => role.id) }
  } catch (error) {
    throw exceptionHandler(error, 'deleteUser')
  }
}
