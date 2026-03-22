import { HTTPError } from 'ky'

export async function getErrorMessage(e: unknown): Promise<string> {
  if (e instanceof HTTPError) {
    const body = await e.response.json().catch(() => null)
    if (body?.message) return Array.isArray(body.message) ? body.message[0] : body.message
    return `HTTP ${e.response.status}`
  }
  return e instanceof Error ? e.message : '알 수 없는 오류'
}
