const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''

interface FetchOptions {
  revalidate?: number
}

export async function apiFetch<T>(path: string, options?: FetchOptions): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      next: { revalidate: options?.revalidate ?? 60 },
    })

    if (!res.ok) return null

    return (await res.json()) as T
  } catch {
    return null
  }
}
