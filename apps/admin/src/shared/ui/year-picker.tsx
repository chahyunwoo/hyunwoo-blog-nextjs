import { cn } from '@hyunwoo/shared/lib'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@hyunwoo/ui'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

const CURRENT_YEAR = new Date().getFullYear()
const START_YEAR = 2015

interface YearPickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function YearPicker({ value, onChange, placeholder = '연도 선택', disabled, className }: YearPickerProps) {
  const [open, setOpen] = useState(false)

  const years = Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }, (_, i) => String(CURRENT_YEAR - i))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            'h-10 w-full justify-start text-left font-normal text-sm',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          <CalendarIcon className="size-4 mr-2" />
          {value || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start">
        <div className="grid grid-cols-3 gap-1 max-h-[200px] overflow-y-auto">
          {years.map(year => (
            <Button
              key={year}
              type="button"
              variant={value === year ? 'default' : 'ghost'}
              size="sm"
              className="text-sm"
              onClick={() => {
                onChange(year)
                setOpen(false)
              }}
            >
              {year}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
