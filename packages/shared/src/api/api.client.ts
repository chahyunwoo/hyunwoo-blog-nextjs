import { API_URL, DEFAULT_HEADERS, DEFAULT_REVALIDATE } from '../config/api.config'

interface FetchOptions {
  revalidate?: number
  tags?: string[]
}

export async function apiFetch<T>(path: string, options?: FetchOptions): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: DEFAULT_HEADERS,
      next: {
        revalidate: options?.revalidate ?? DEFAULT_REVALIDATE,
        tags: options?.tags,
      },
    } as RequestInit)

    if (!res.ok) return null

    return (await res.json()) as T
  } catch {
    return null
  }
}

export async function apiClientFetch<T>(path: string, signal?: AbortSignal): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: DEFAULT_HEADERS,
      signal,
    })

    if (!res.ok) return null

    return (await res.json()) as T
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError') return null
    return null
  }
}
