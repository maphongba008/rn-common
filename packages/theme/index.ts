import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { ViewStyle, TextStyle, ImageStyle, StyleSheet } from 'react-native'

export type ThemeState = {
  theme: string
}

export type ThemeConfig<T> = {
  themeMap: Record<string, T>
  initialTheme: string
}

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

export const createThemeReducer = <T>(config: ThemeConfig<T>) => {
  const slice = createSlice({
    name: 'theme',
    initialState: {
      theme: config.initialTheme,
    },
    reducers: {
      setTheme: (state, action: PayloadAction<string>) => {
        state.theme = action.payload
      },
    },
  })

  const { setTheme } = slice.actions

  const useTheme = () => {
    return useSelector((state: { theme: ThemeState }) => {
      const theme = state[slice.name].theme
      if (config.themeMap[theme]) {
        return config.themeMap[theme]
      }
      return config.themeMap[config.initialTheme]
    })
  }

  const useThemeName = () => {
    return useSelector((state: { theme: ThemeState }) => {
      return state[slice.name].theme
    })
  }

  const useAvailableThemes = () => {
    return Object.keys(config.themeMap)
  }

  const createThemedStyleSheet = <V extends NamedStyles<any>>(
    builder: (theme: T) => V,
  ) => {
    return () => {
      const theme = useTheme()
      return StyleSheet.create(builder(theme))
    }
  }

  return {
    slice,
    setTheme,
    useTheme,
    useThemeName,
    useAvailableThemes,
    createThemedStyleSheet,
  }
}
