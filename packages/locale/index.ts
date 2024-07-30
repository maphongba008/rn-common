import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

export type LocaleState = {
  language: string
}

export type LocaleConfig<T> = {
  languageMap: Record<string, T>
  initialLanguage: string
}

export const createLocaleReducer = <T>(config: LocaleConfig<T>) => {
  const slice = createSlice({
    name: 'locale',
    initialState: {
      language: config.initialLanguage,
    },
    reducers: {
      setLanguage: (state, action) => {
        state.language = action.payload
      },
    },
  })

  const { setLanguage } = slice.actions
  const useStrings = () => {
    return useSelector((state: { locale: LocaleState }) => {
      const language = state[slice.name].language
      if (config.languageMap[language]) {
        return config.languageMap[language]
      }
      return config.languageMap[config.initialLanguage]
    })
  }
  const useLanguage = () => {
    return useSelector((state: { locale: LocaleState }) => {
      return state[slice.name].language
    })
  }

  const useAvailableLanguages = () => {
    return Object.keys(config.languageMap)
  }
  return {
    slice,
    setLanguage,
    useStrings,
    useLanguage,
    useAvailableLanguages,
  }
}
