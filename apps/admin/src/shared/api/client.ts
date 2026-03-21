import { API_KEY, API_URL } from '@hyunwoo/shared/config'
import ky from 'ky'
import { setAuthenticated } from '@/entities/auth/auth.store'

let isRefreshing = false
let refreshPromise: Promise<boolean> | null = null

async function tryRefresh(): Promise<boolean> {
  try {
    await ky.post(`${API_URL}/api/auth/refresh`, {
      credentials: 'include',
      headers: { 'x-api-key': API_KEY },
    })
    return true
  } catch {
    return false
  }
}

export const adminApi = ky.create({
  prefixUrl: API_URL,
  credentials: 'include',
  headers: {
    'x-api-key': API_KEY,
  },
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status !== 401) return response

        if (isRefreshing) {
          const success = await refreshPromise
          if (success) return ky(request, { ...options, credentials: 'include' })
          throw new Error('Session expired')
        }

        isRefreshing = true
        refreshPromise = tryRefresh()
        const success = await refreshPromise
        isRefreshing = false
        refreshPromise = null

        if (success) {
          return ky(request, { ...options, credentials: 'include' })
        }

        setAuthenticated(false)
        window.location.href = '/login'
        throw new Error('Session expired')
      },
    ],
  },
})

export async function uploadFile<T>(path: string, formData: FormData): Promise<T> {
  return adminApi.post(path, { body: formData }).json<T>()
}
