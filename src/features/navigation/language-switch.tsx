'use client'

import { Globe } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { memo, useCallback } from 'react'
import { LANGUAGE_MAP } from '@/shared/config/constants'
import type { Locale } from '@/shared/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

export default memo(function LanguageSwitch() {
  const pathname = usePathname() ?? '/about/ko'
  const router = useRouter()
  const currentLocale = pathname.split('/')[2] || 'ko'

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
          <SelectValue placeholder={LANGUAGE_MAP[currentLocale as Locale]} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(LANGUAGE_MAP).map(([locale, language]) => (
            <SelectItem key={locale} value={locale}>
              {language}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
})
