import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const getParamFromHref = (paramName: string, url: string) => {
  const match = url.match(new RegExp(`[?&]${paramName}=([^&]*)`))
  return match ? decodeURIComponent(match[1]) : ''
}
