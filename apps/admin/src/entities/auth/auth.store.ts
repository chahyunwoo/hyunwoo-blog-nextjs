import { useSyncExternalStore } from 'react'

const listeners = new Set<() => void>()
let authenticated = false
let initialized = false

function notify() {
  for (const listener of listeners) {
    listener()
  }
}

export function setAuthenticated(value: boolean) {
  authenticated = value
  initialized = true
  notify()
}

export function getSessionTimeout(): number | null {
  const match = document.cookie.match(/session_timeout=(\d+)/)
  return match ? Number(match[1]) : null
}

export function getRemainingSession(): number {
  const timeout = getSessionTimeout()
  if (!timeout) return 0
  return Math.max(0, timeout - Date.now())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getAuthSnapshot() {
  return authenticated
}

function getInitSnapshot() {
  return initialized
}

export function useAuth() {
  const isAuthenticated = useSyncExternalStore(subscribe, getAuthSnapshot)
  const isInitialized = useSyncExternalStore(subscribe, getInitSnapshot)
  return { isAuthenticated, initialized: isInitialized }
}
