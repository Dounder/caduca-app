import { api } from '@/api'
import { DateUtils, type ApiListResponse } from '@/modules/shared'
import type { Salesperson, SalespersonTable } from '../interfaces'

export const getSalespersonsAction = async (
  page: number = 1,
  search: string = ``
): Promise<ApiListResponse<SalespersonTable>> => {
  try {
    const params = new URLSearchParams({ page: page.toString(), limit: '10' })
    if (search) params.append('search', search)

    const { data } = await api.get<ApiListResponse<Salesperson>>('/salesperson', { params })
    const { meta, data: salespersons } = data

    return {
      meta,
      data: salespersons.map((item) => ({
        ...item,
        createdAt: DateUtils.convertDate(item.createdAt),
        updatedAt: DateUtils.convertDate(item.updatedAt),
        deletedAt: DateUtils.convertDate(item.deletedAt),
        createdBy: item.createdBy?.username ?? null,
        updatedBy: item.updatedBy?.username ?? null,
        deletedBy: item.deletedBy?.username ?? null
      }))
    }
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
