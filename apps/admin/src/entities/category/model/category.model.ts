export interface Category {
  category: string
  icon: string
  count: number
  recent: boolean
}

export interface CreateCategoryBody {
  name: string
  icon: string
  sortOrder?: number
}
