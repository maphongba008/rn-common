import { createLocaleReducer } from '@rn-common/locale'
import en from './en.json'
import vi from './vi.json'
const {
  slice: localeSlide,
  setLanguage,
  useStrings,
} = createLocaleReducer({
  initialLanguage: 'en',
  languageMap: {
    en,
    vi,
  },
})

export { localeSlide, setLanguage, useStrings }
