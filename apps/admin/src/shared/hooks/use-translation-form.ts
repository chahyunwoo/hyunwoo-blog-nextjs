import { useState } from 'react'
import type { LocaleCode } from '@/shared/config'
import { LOCALE_TABS } from '@/shared/config'

interface UseTranslationFormOptions<T extends { locale: LocaleCode }> {
  emptyFactory: (locale: LocaleCode) => T
  initial?: T[]
}

export function useTranslationForm<T extends { locale: LocaleCode }>({
  emptyFactory,
  initial,
}: UseTranslationFormOptions<T>) {
  const [activeLocale, setActiveLocale] = useState<LocaleCode>('ko')
  const [translations, setTranslations] = useState<T[]>(() =>
    LOCALE_TABS.map(l => {
      const existing = initial?.find(t => t.locale === l.code)
      return existing ?? emptyFactory(l.code)
    }),
  )

  const currentTranslation = translations.find(t => t.locale === activeLocale)

  const updateField = (locale: LocaleCode, field: keyof T, value: unknown) => {
    setTranslations(prev => prev.map(t => (t.locale === locale ? { ...t, [field]: value } : t)))
  }

  const resetTranslations = () => {
    setTranslations(LOCALE_TABS.map(l => emptyFactory(l.code)))
    setActiveLocale('ko')
  }

  const setInitial = (data: T[]) => {
    setTranslations(
      LOCALE_TABS.map(l => {
        const existing = data.find(t => t.locale === l.code)
        return existing ?? emptyFactory(l.code)
      }),
    )
    setActiveLocale('ko')
  }

  return { activeLocale, setActiveLocale, translations, currentTranslation, updateField, resetTranslations, setInitial }
}
