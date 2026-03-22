import { cn } from './cn'

function Separator({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<'hr'> & { orientation?: 'horizontal' | 'vertical' }) {
  return (
    <hr
      data-slot="separator"
      aria-orientation={orientation}
      className={cn(
        'bg-border shrink-0 border-none',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  )
}

export { Separator }
