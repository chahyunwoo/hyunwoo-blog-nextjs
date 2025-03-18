import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/shared/lib/providers/theme/theme-provider";
import { Header } from "@/widgets/header/ui/header";
import Footer from "@/widgets/footer/ui/footer";
import { pretendard, roboto } from "./fonts";

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
