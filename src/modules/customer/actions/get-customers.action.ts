import { api } from '@/api'
import { DateUtils, type ApiListResponse } from '@/modules/shared'
import type { Customer, CustomerTable } from '../interfaces'

export const getCustomersAction = async (
  page: number = 1,
  search: string = ''
): Promise<ApiListResponse<CustomerTable>> => {
  try {
    const params = new URLSearchParams({ page: page.toString(), limit: '10' })
    if (search) params.append('search', search)

    const { data } = await api.get<ApiListResponse<Customer>>('/customer', { params })
    const { meta, data: customers } = data

    return {
      meta,
      data: customers.map((customer) => ({
        ...customer,
        createdAt: DateUtils.convertDate(customer.createdAt),
        updatedAt: DateUtils.convertDate(customer.updatedAt),
        deletedAt: DateUtils.convertDate(customer.deletedAt),
        createdBy: customer.createdBy?.username,
        updatedBy: customer.updatedBy?.username,
        deletedBy: customer.deletedBy?.username
      }))
    }
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
