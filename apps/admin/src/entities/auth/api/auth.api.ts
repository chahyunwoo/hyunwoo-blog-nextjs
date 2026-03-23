import { adminApi } from '@/shared/api'
import { LOGIN_PATH } from '@/shared/config'
import { setAuthenticated } from '../model/auth.store'

interface LoginResponse {
  message?: string
  requiresTwoFactor?: boolean
  twoFactorToken?: string
}

export interface TwoFactorRequired {
  requiresTwoFactor: true
  twoFactorToken: string
}

export async function login(username: string, password: string): Promise<TwoFactorRequired | null> {
  const data = await adminApi.post('api/auth/login', { json: { username, password } }).json<LoginResponse>()

  if (data.requiresTwoFactor && data.twoFactorToken) {
    return { requiresTwoFactor: true, twoFactorToken: data.twoFactorToken }
  }

  setAuthenticated(true)
  return null
}

export async function verifyTwoFactor(twoFactorToken: string, code: string) {
  await adminApi.post('api/auth/2fa/verify', { json: { twoFactorToken, code } })
  setAuthenticated(true)
}

export interface TwoFactorSetupResponse {
  secret: string
  qrCode: string
  uri: string
}

export async function setupTwoFactor(): Promise<TwoFactorSetupResponse> {
  return adminApi.post('api/auth/2fa/setup').json<TwoFactorSetupResponse>()
}

export async function refreshSession() {
  try {
    await adminApi.post('api/auth/refresh')
    setAuthenticated(true)
    return true
  } catch {
    setAuthenticated(false)
    return false
  }
}

export async function extendSession() {
  try {
    await adminApi.post('api/auth/session/extend')
  } catch {
    // 세션 연장 실패는 무시
  }
}

export async function logout() {
  try {
    await adminApi.post('api/auth/logout')
  } catch {
    // 로그아웃 API 실패해도 리다이렉트
  } finally {
    setAuthenticated(false)
    window.location.href = LOGIN_PATH
  }
}

export async function getPreviewToken(): Promise<string | null> {
  try {
    const data = await adminApi.post('api/auth/preview-token').json<{ token: string }>()
    return data.token
  } catch {
    return null
  }
}
