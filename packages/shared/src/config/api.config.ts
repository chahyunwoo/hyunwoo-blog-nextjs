export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''

export const DEFAULT_REVALIDATE = false

export const DEFAULT_HEADERS = {
  'x-api-key': API_KEY,
  'Content-Type': 'application/json',
} as const
