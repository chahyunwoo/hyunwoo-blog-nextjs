import { Button, Calendar, cn, Popover, PopoverContent, PopoverTrigger } from '@hyunwoo/ui'
import { format, parse } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DatePicker({ value, onChange, placeholder = '날짜 선택', disabled, className }: DatePickerProps) {
  const [open, setOpen] = useState(false)

  const date = value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined
  const isValidDate = date && !Number.isNaN(date.getTime())

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
          {isValidDate ? format(date, 'yyyy-MM-dd') : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={isValidDate ? date : undefined}
          onSelect={day => {
            if (day) {
              onChange(format(day, 'yyyy-MM-dd'))
            }
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
