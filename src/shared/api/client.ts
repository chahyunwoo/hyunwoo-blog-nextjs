export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''

const headers = {
  'x-api-key': API_KEY,
  'Content-Type': 'application/json',
}

interface FetchOptions {
  revalidate?: number
}

export async function apiFetch<T>(path: string, options?: FetchOptions): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers,
      next: { revalidate: options?.revalidate ?? 60 },
    })

    if (!res.ok) return null

    return (await res.json()) as T
  } catch {
    return null
  }
}

export async function apiClientFetch<T>(path: string, signal?: AbortSignal): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers,
      signal,
    })

    if (!res.ok) return null

    return (await res.json()) as T
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError') return null
    return null
  }
}
