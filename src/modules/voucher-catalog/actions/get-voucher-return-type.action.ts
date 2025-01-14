import { api } from '@/api'
import type { CatalogResponse, SelectOption } from '@/modules/shared'
import { useI18n } from 'vue-i18n'

export const getVoucherReturnTypeAction = async (): Promise<SelectOption[]> => {
  const { t } = useI18n()
  try {
    const { data } = await api.get<CatalogResponse[]>('/voucher/catalog/return_type')

    return data.map(({ id, name }) => ({ name: t(`voucher.returnType.${name}`), value: id }))
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
