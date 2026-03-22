import { cn } from '@hyunwoo/shared/lib'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@hyunwoo/ui'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

interface MonthPickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function MonthPicker({ value, onChange, placeholder = '연월 선택', disabled, className }: MonthPickerProps) {
  const [open, setOpen] = useState(false)
  const currentYear = new Date().getFullYear()
  const [viewYear, setViewYear] = useState(() => {
    if (value) {
      const parsed = Number.parseInt(value.split('.')[0], 10)
      return Number.isNaN(parsed) ? currentYear : parsed
    }
    return currentYear
  })

  const selectedYear = value ? value.split('.')[0] : null
  const selectedMonth = value ? value.split('.')[1] : null

  const handleSelect = (month: string) => {
    onChange(`${viewYear}.${month}`)
    setOpen(false)
  }

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
      <PopoverContent className="w-[280px] p-4" align="start">
        <div className="flex items-center justify-between mb-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-7"
            onClick={() => setViewYear(y => y - 1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-sm font-semibold">{viewYear}</span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-7"
            onClick={() => setViewYear(y => y + 1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {MONTHS.map(month => {
            const isSelected = selectedYear === String(viewYear) && selectedMonth === month
            return (
              <Button
                key={month}
                type="button"
                variant={isSelected ? 'default' : 'ghost'}
                size="sm"
                className="h-9"
                onClick={() => handleSelect(month)}
              >
                {month}월
              </Button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
