import { api } from '@/api'
import { exceptionHandlerHelper } from '@/modules/shared'
import type { User, UserWithRoleStrings } from '../interfaces'

export const getUserByUsernameAction = async (username: string): Promise<UserWithRoleStrings> => {
  if (username === 'nuevo')
    return {
      id: '',
      username: '',
      email: '',
      createdAt: null,
      updatedAt: null,
      deletedAt: null,
      createdBy: null,
      roles: [],
      updatedBy: null,
      deletedBy: null,
      password: undefined
    }

  try {
    const { data } = await api.get<User>(`/user/username/${username}`)

    return { ...data, roles: data.roles.map((role) => role.id) }
  } catch (error) {
    throw exceptionHandlerHelper(error, 'getUserByUsernameAction')
  }
}
