import { Button } from '@hyunwoo/ui'
import type { LocaleCode } from '@/shared/config'
import { LOCALE_TABS } from '@/shared/config'

interface LocaleTabsProps {
  activeLocale: LocaleCode
  onChange: (locale: LocaleCode) => void
}

export function LocaleTabs({ activeLocale, onChange }: LocaleTabsProps) {
  return (
    <div className="flex items-center gap-2">
      {LOCALE_TABS.map(l => (
        <Button
          key={l.code}
          type="button"
          variant={activeLocale === l.code ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(l.code)}
        >
          {l.label}
        </Button>
      ))}
    </div>
  )
}
