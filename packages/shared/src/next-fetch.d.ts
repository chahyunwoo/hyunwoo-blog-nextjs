interface NextFetchRequestConfig {
  revalidate?: number | false
  tags?: string[]
}

declare global {
  interface RequestInit {
    next?: NextFetchRequestConfig
  }
}

export {}
