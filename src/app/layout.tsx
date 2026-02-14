import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const BASE_URL = "https://chahyunwoo.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "hyunwoo.dev | 프론트엔드 개발 블로그",
    template: "%s | hyunwoo.dev",
  },
  description:
    "프론트엔드 개발자 현우의 기술 블로그입니다. React, Next.js, TypeScript 등 웹 개발 경험과 노하우를 공유합니다.",
  keywords: [
    "프론트엔드",
    "Frontend",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "웹 개발",
    "개발 블로그",
    "기술 블로그",
  ],
  authors: [{ name: "Hyunwoo Cha", url: BASE_URL }],
  creator: "Hyunwoo Cha",
  publisher: "Hyunwoo Cha",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: BASE_URL,
    siteName: "hyunwoo.dev",
    title: "hyunwoo.dev | 프론트엔드 개발 블로그",
    description:
      "프론트엔드 개발자 현우의 기술 블로그입니다. React, Next.js, TypeScript 등 웹 개발 경험과 노하우를 공유합니다.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "hyunwoo.dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "hyunwoo.dev | 프론트엔드 개발 블로그",
    description:
      "프론트엔드 개발자 현우의 기술 블로그입니다. React, Next.js, TypeScript 등 웹 개발 경험과 노하우를 공유합니다.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`font-pretendard antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-1 flex mt-12">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
