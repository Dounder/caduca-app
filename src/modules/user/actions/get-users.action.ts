import { api } from '@/api'
import { type ApiListResponse, DateUtils, exceptionHandler, getLimitPaginationHelper } from '@/modules/shared'
import type { User, UserPlain } from '../interfaces'

export const getUsersAction = async (page: number = 1, search: string = ''): Promise<ApiListResponse<UserPlain>> => {
  try {
    const limit = getLimitPaginationHelper()
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())
    if (search) params.append('search', search)

    const { data } = await api.get<ApiListResponse<User>>('/user', { params })

    const { data: users, meta } = data
    return {
      meta: meta,
      data: users.map((user) => ({
        ...user,
        roles: user.roles.map((role) => role.name),
        createdAt: DateUtils.convertDate(user.createdAt),
        updatedAt: DateUtils.convertDate(user.updatedAt),
        deletedAt: DateUtils.convertDate(user.deletedAt),
        createdBy: user.createdBy ? user.createdBy.username : '',
        updatedBy: user.updatedBy ? user.updatedBy.username : '',
        deletedBy: user.deletedBy ? user.deletedBy.username : ''
      }))
    }
  } catch (error) {
    throw exceptionHandler(error, 'updateUser')
  }
}
