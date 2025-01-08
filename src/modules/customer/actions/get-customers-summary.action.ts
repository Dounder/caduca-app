import { api } from '@/api'
import { exceptionHandlerHelper, type ApiListResponse, type SelectOption } from '@/modules/shared'
import type { CustomerSummary } from '../interfaces'

interface Props {
  page?: number
  limit?: number
  search?: string
}

export const getCustomersSummaryAction = async ({ page = 1, limit = 10, search }: Props): Promise<SelectOption[]> => {
  try {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString(), summary: 'true' })
    if (search) params.append('search', search)

    const { data } = await api.get<ApiListResponse<CustomerSummary>>('/customer', { params })
    const { meta, data: customers } = data

    return customers.map((customer) => ({ name: `${customer.code} - ${customer.name}`, value: customer.id }))
  } catch (error) {
    throw exceptionHandlerHelper(error, 'updateCustomer')
  }
}
