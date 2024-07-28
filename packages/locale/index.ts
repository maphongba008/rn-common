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
    return useSelector((state: any) => {
      const language = state[slice.name].language
      if (config.languageMap[language]) {
        return config.languageMap[language]
      }
      return config.languageMap[config.initialLanguage]
    })
  }
  return {
    slice,
    setLanguage,
    useStrings,
  }
}
