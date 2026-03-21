import './globals.css'

export const metadata = {
  title: 'Portfolio | hyunwoo.dev',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
