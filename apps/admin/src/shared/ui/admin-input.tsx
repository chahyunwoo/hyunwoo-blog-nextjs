import { cn } from '@hyunwoo/shared/lib'
import { Input, Label } from '@hyunwoo/ui'

export function AdminInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return <Input className={cn('h-10 px-3.5 text-sm leading-7 text-foreground/80', className)} {...props} />
}

export function AdminTextarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      className={cn(
        'flex w-full rounded-md border border-input bg-transparent px-3.5 py-2.5 text-sm leading-7 text-foreground/80 shadow-xs outline-none transition-colors placeholder:text-muted-foreground',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'disabled:pointer-events-none disabled:opacity-50',
        'min-h-[120px]',
        className,
      )}
      {...props}
    />
  )
}

export function AdminLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return <Label className={cn('mb-3 text-foreground/95', className)} {...props} />
}
