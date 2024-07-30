import { createLocaleReducer } from '@rn-common/locale'
import en from './en.json'
import vi from './vi.json'

export const {
  slice: localeSlice,
  setLanguage,
  useStrings,
  useAvailableLanguages,
  useLanguage,
} = createLocaleReducer({
  initialLanguage: 'en',
  languageMap: {
    en,
    vi,
  },
})
