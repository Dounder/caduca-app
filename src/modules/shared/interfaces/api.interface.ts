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
