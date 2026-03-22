import type { Metadata } from 'next'
import { LoadingScreen } from '@/shared/ui/loading-screen'
import { ScrollBackground } from '@/shared/ui/scroll-background'
import { StarsBackground } from '@/shared/ui/stars-background'
import { ResolutionNotice } from '@/widgets/hero/resolution-notice'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://chahyunwoo.dev'),
  title: {
    default: 'Portfolio | Cha Hyunwoo',
    template: '%s | Cha Hyunwoo',
  },
  description: 'Frontend Developer Portfolio - Cha Hyunwoo',
  openGraph: {
    title: 'Portfolio | Cha Hyunwoo',
    description: 'Frontend Developer Portfolio - Cha Hyunwoo',
    siteName: 'hyunwoo.dev',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="font-pretendard antialiased bg-background text-foreground">
        <script
          dangerouslySetInnerHTML={{
            __html: 'window.history.scrollRestoration="manual";window.scrollTo(0,0);',
          }}
        />
        <LoadingScreen />
        <StarsBackground />
        <ScrollBackground>{children}</ScrollBackground>
        <ResolutionNotice />
      </body>
    </html>
  )
}
