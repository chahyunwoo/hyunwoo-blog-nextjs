export const SUPPORTED_LOCALES = ['ko', 'en', 'jp'] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const PDF_LOCALES = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
  { code: 'jp', label: '日本語' },
] as const

export const WORKS_LOCALES = [
  { code: 'ko', label: 'KO' },
  { code: 'en', label: 'EN' },
  { code: 'jp', label: 'JP' },
] as const
