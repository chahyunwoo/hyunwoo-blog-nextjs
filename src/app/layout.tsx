import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { pretendard, roboto } from "./fonts";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "hyunwoo.dev",
  description: "FE Developer Hyunwoo's Tech Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${pretendard.variable} ${roboto.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-1 flex">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
