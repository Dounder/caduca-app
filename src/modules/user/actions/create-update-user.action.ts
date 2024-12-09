import { api } from '@/api'
import { exceptionHandlerHelper } from '@/modules/shared'
import type { User, UserWithRoleStrings } from '../interfaces'

export const createUpdateUserAction = async (user: Partial<User>): Promise<UserWithRoleStrings> => {
  const userId = user.id

  user = cleanUser(user)

  if (userId && userId !== '') return await updateUser(userId, user)

  return await createUser(user)
}

const cleanUser = (user: Partial<User>) => {
  delete user.id
  delete user.createdAt
  delete user.updatedAt
  delete user.deletedAt
  delete user.createdBy
  delete user.updatedBy
  delete user.deletedBy

  if (user.password) delete user.password

  return user
}

const createUser = async (user: Partial<User>): Promise<UserWithRoleStrings> => {
  try {
    const { data } = await api.post<User>('/user', user)

    return { ...data, roles: data.roles.map((role) => role.id) }
  } catch (error) {
    throw exceptionHandlerHelper(error, 'createUser')
  }
}

const updateUser = async (userId: string, user: Partial<User>): Promise<UserWithRoleStrings> => {
  try {
    const { data } = await api.patch<User>(`/user/${userId}`, user)

    return { ...data, roles: data.roles.map((role) => role.id) }
  } catch (error) {
    throw exceptionHandlerHelper(error, 'updateUser')
  }
}
