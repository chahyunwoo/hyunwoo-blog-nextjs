"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({
  children,
}: React.ComponentProps<typeof NextThemeProvider>) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
