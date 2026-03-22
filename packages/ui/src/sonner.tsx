'use client'
import { Toaster as SonnerToaster } from 'sonner'

function Toaster({ theme = 'system' }: { theme?: 'light' | 'dark' | 'system' }) {
  return (
    <SonnerToaster
      theme={theme}
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: 'group border-border bg-background text-foreground shadow-lg rounded-md',
          title: 'text-foreground font-medium',
          description: 'text-muted-foreground text-sm',
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'bg-muted text-muted-foreground',
        },
      }}
    />
  )
}

export { Toaster }
