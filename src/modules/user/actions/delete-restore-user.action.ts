import { api } from '@/api'
import type { DeleteRestoreUser, User, UserWithRoleStrings } from '../interfaces'
import { exceptionHandlerHelper } from '@/modules/shared'

export const deleteRestoreUserAction = async ({
  userId,
  isDeleted
}: DeleteRestoreUser): Promise<UserWithRoleStrings> => {
  if (isDeleted) return await restoreUser(userId)

  return await deleteUser(userId)
}

const restoreUser = async (userId: string): Promise<UserWithRoleStrings> => {
  try {
    const { data } = await api.patch<User>(`/user/${userId}/restore`)

    return { ...data, roles: data.roles.map((role) => role.id) }
  } catch (error) {
    throw exceptionHandlerHelper(error, 'restoreUser')
  }
}

const deleteUser = async (userId: string): Promise<UserWithRoleStrings> => {
  try {
    const { data } = await api.delete<User>(`/user/${userId}`)

    return { ...data, roles: data.roles.map((role) => role.id) }
  } catch (error) {
    throw exceptionHandlerHelper(error, 'deleteUser')
  }
}
