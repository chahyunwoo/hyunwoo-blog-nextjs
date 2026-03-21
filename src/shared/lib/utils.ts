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

export function estimateReadingTime(content: string) {
  if (!content) return 1
  let text = ''
  let inTag = false
  for (const char of content) {
    if (char === '<') inTag = true
    else if (char === '>') inTag = false
    else if (!inTag) text += char
  }
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export const getParamFromHref = (paramName: string, url: string) => {
  const match = url.match(new RegExp(`[?&]${paramName}=([^&]*)`))
  return match ? decodeURIComponent(match[1]) : ''
}
