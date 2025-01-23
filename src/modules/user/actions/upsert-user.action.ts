import { api } from '@/api'
import { exceptionHandler } from '@/modules/shared'
import type { User, UserRoleString } from '../interfaces'

export const upsertUserAction = async (user: Partial<User>): Promise<UserRoleString> => {
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

const createUser = async (user: Partial<User>): Promise<UserRoleString> => {
  try {
    const { data } = await api.post<User>('/user', user)

    return { ...data, roles: data.roles.map((role) => role.id) }
  } catch (error) {
    throw exceptionHandler(error, 'createUser')
  }
}

const updateUser = async (userId: string, user: Partial<User>): Promise<UserRoleString> => {
  try {
    const { data } = await api.patch<User>(`/user/${userId}`, user)

    return { ...data, roles: data.roles.map((role) => role.id) }
  } catch (error) {
    throw exceptionHandler(error, 'updateUser')
  }
}
