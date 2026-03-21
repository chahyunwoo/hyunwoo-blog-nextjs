'use client'

import { Globe } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { memo, useCallback } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

interface LocaleItem {
  code: string
  label: string
}

interface LanguageSwitchProps {
  locales: LocaleItem[]
}

export default memo(function LanguageSwitch({ locales }: LanguageSwitchProps) {
  const pathname = usePathname() ?? '/about/ko'
  const router = useRouter()
  const currentLocale = pathname.split('/')[2] || 'ko'
  const currentLabel = locales.find(l => l.code === currentLocale)?.label ?? currentLocale

  const handleChange = useCallback(
    (value: string) => {
      router.push(`/about/${value}`)
    },
    [router],
  )

  return (
    <div className="flex items-center gap-2 mb-2">
      <Select onValueChange={handleChange}>
        <SelectTrigger>
          <Globe />
          <SelectValue placeholder={currentLabel} />
        </SelectTrigger>
        <SelectContent>
          {locales.map(locale => (
            <SelectItem key={locale.code} value={locale.code}>
              {locale.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
})
