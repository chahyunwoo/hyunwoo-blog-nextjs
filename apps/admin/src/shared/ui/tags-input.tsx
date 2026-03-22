import { cn } from '@hyunwoo/shared/lib'
import { type KeyboardEvent, useId, useRef, useState } from 'react'

interface TagsInputProps {
  label?: string
  placeholder?: string
  data?: string[]
  value: string[]
  onChange: (tags: string[]) => void
  error?: string
}

export function TagsInput({ label, placeholder, data = [], value, onChange, error }: TagsInputProps) {
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()

  const filtered = data.filter(d => d.toLowerCase().includes(input.toLowerCase()) && !value.includes(d))

  const addTag = (tag: string) => {
    const trimmed = tag.trim()
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed])
    }
    setInput('')
    setShowSuggestions(false)
  }

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter') {
      e.preventDefault()
      if (input.trim()) addTag(input)
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value.length - 1)
    }
  }

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex flex-wrap gap-2 rounded-md border border-input bg-transparent px-3 py-2.5 text-sm ring-offset-background cursor-text min-h-[42px]',
          'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          error && 'border-destructive',
        )}
      >
        {value.map((tag, i) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-sm font-medium text-secondary-foreground leading-relaxed"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label={`${tag} 태그 제거`}
            >
              x
            </button>
          </span>
        ))}
        <div className="relative flex-1 min-w-[80px]">
          <input
            id={inputId}
            ref={inputRef}
            value={input}
            onChange={e => {
              setInput(e.target.value)
              setShowSuggestions(true)
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder={value.length === 0 ? placeholder : ''}
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
          {showSuggestions && input && filtered.length > 0 && (
            <div className="absolute top-full left-0 z-50 mt-1 w-48 rounded-md border bg-popover p-1 shadow-md">
              {filtered.slice(0, 8).map(suggestion => (
                <button
                  key={suggestion}
                  type="button"
                  onMouseDown={() => addTag(suggestion)}
                  className="flex w-full rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer text-left"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
