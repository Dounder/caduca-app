import { api } from '@/api'
import { exceptionHandler, type BlobResponse } from '@/modules/shared'

export const getReportAction = async (endpoint: string): Promise<BlobResponse> => {
  try {
    const { data, headers } = await api.get(endpoint, { responseType: 'blob' })

    // Create a Blob from the response data
    const blob = new Blob([data], { type: headers['content-type'] })

    return { blob, headers }
  } catch (error) {
    throw exceptionHandler(error, getReportAction.name)
  }
}
