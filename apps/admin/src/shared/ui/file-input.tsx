import { cn } from '@hyunwoo/shared/lib'
import { useRef } from 'react'

interface FileInputProps {
  placeholder?: string
  accept?: string
  disabled?: boolean
  leftSection?: React.ReactNode
  onChange?: (file: File | null) => void
  className?: string
}

export function FileInput({ placeholder, accept, disabled, leftSection, onChange, className }: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => inputRef.current?.click()}
      className={cn(
        'flex h-9 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 text-sm text-muted-foreground shadow-xs transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'disabled:pointer-events-none disabled:opacity-50',
        'cursor-pointer',
        className,
      )}
    >
      {leftSection}
      <span className="truncate">{placeholder}</span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={e => {
          onChange?.(e.target.files?.[0] ?? null)
          e.target.value = ''
        }}
      />
    </button>
  )
}
