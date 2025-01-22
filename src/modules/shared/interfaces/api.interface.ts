import type { AxiosResponseHeaders } from 'axios'

export interface ApiListResponse<T> {
  meta: ApiListMeta
  data: T[]
}

export interface ApiListMeta {
  total: number
  lastPage: number
}

export interface DeletionToggle {
  id: string
  isDeleted: boolean
}

export interface CatalogResponse {
  id: number
  name: string
}

export interface BlobResponse {
  blob: Blob
  headers: Record<string, any>
}
