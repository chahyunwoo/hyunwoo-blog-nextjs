import { createTheme } from '@mantine/core'

export const adminTheme = createTheme({
  primaryColor: 'indigo',
  defaultRadius: 'md',
  fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  headings: {
    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
  components: {
    TextInput: {
      styles: { label: { marginBottom: 8, fontWeight: 500 } },
    },
    Textarea: {
      styles: { label: { marginBottom: 8, fontWeight: 500 } },
    },
    Autocomplete: {
      styles: { label: { marginBottom: 8, fontWeight: 500 } },
    },
    TagsInput: {
      styles: { label: { marginBottom: 8, fontWeight: 500 } },
    },
    DateInput: {
      styles: { label: { marginBottom: 8, fontWeight: 500 } },
    },
    Switch: {
      styles: { label: { fontWeight: 500 } },
    },
  },
})
