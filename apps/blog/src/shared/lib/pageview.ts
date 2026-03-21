import { API_KEY, API_URL } from '@hyunwoo/shared/config'

export function trackPageview(path: string) {
  if (typeof window === 'undefined') return

  fetch(`${API_URL}/api/analytics/pageview`, {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path,
      appName: 'blog',
      referrer: document.referrer || '',
    }),
    keepalive: true,
  }).catch(() => {})
}
