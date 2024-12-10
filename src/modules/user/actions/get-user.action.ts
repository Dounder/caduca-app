import { faker } from '@faker-js/faker'

import { api } from '@/api'
import { envs } from '@/config/envs'
import { exceptionHandlerHelper } from '@/modules/shared'
import type { User, UserWithRoleStrings } from '../interfaces'

export const getUserAction = async (id: string): Promise<UserWithRoleStrings> => {
  if (id === 'nuevo')
    return {
      id: '',
      username: envs.isDev ? faker.internet.username() : '',
      email: envs.isDev ? faker.internet.email() : '',
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
    const { data } = await api.get<User>(`/user/username/${id}`)

    return { ...data, roles: data.roles.map((role) => role.id) }
  } catch (error) {
    throw exceptionHandlerHelper(error, 'getUserAction')
  }
}
