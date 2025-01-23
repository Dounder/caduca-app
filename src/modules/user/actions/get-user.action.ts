import { faker } from '@faker-js/faker'

import { api } from '@/api'
import { envs } from '@/config/envs'
import { exceptionHandler } from '@/modules/shared'
import type { User, UserRoleString } from '../interfaces'

export const getUserAction = async (id: string): Promise<UserRoleString> => {
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
    throw exceptionHandler(error, 'getUserAction')
  }
}
