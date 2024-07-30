import { createThemeReducer } from '@rn-common/theme'
import dark from './dark.json'
import light from './light.json'

export const {
  createThemedStyleSheet,
  setTheme,
  slice: themeSlice,
  useTheme,
  useThemeName,
  useAvailableThemes,
} = createThemeReducer({
  initialTheme: 'dark',
  themeMap: {
    dark,
    light,
  },
})
