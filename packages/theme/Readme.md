# [`@rn-common/theme`](./packages/theme)

This module provides a way to manage theming in a React Native application using Redux Toolkit. It supports dynamic theme switching and provides hooks for accessing and creating styles based on the current theme.

## Installation

Install using npm:

```sh
npm install @rn-common/theme
```

or yarn:

```sh
yarn add @rn-common/theme
```

## Features

- **Dynamic Theme Switching**: Easily switch between different themes.
- **Theme Access**: Provides hooks for accessing the current theme and available themes.
- **Themed StyleSheet**: Create styles that adapt to the current theme.

## Usage

### 1. Define Your Themes

Create a map of themes where each key represents a theme name and its value contains style properties.

```javascript
const themeMap = {
  light: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
  },
  dark: {
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
  },
}
```

### 2. Create the Theme Reducer

Use the `createThemeReducer` function to create a slice and associated actions.

```javascript
import { createThemeReducer } from '@rn-common/theme'

const config = {
  themeMap,
  initialTheme: 'light',
}

const {
  slice,
  setTheme,
  useTheme,
  useThemeName,
  useAvailableThemes,
  createThemedStyleSheet,
} = createThemeReducer(config)
```

### 3. Integrate with Redux Store

Add the created slice to your Redux store.

```javascript
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    theme: slice.reducer,
  },
})
```

### 4. Access and Apply Themes in Components

#### Access the Current Theme

Use the `useTheme` hook to access the current theme's properties.

```javascript
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme, setTheme } from '@rn-common/theme'
import { useDispatch } from 'react-redux'

const ThemedComponent = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  return (
    <View style={{ backgroundColor: theme.backgroundColor }}>
      <Text style={{ color: theme.textColor }}>Hello, World!</Text>
      <TouchableOpacity onClick={() => dispatch(setTheme('dark'))}>
        <Text>Switch to Dark Theme</Text>
      </TouchableOpacity>
    </View>
  )
}
```

#### Create Themed StyleSheets

Use the `createThemedStyleSheet` function to create styles that automatically adapt to the current theme.

```javascript
const useStyles = createThemedStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.textColor,
  },
}))

const ThemedComponent = () => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Themed Text</Text>
    </View>
  )
}
```

## API

### `createThemeReducer<T>`

Creates a theme reducer and associated utilities.

- `config`: Configuration object containing:
  - `themeMap`: Record of theme properties keyed by theme names.
  - `initialTheme`: Default theme to use.

Returns an object containing:

- `slice`: The Redux slice created by `createSlice`.
- `setTheme`: Action creator for changing the current theme.
- `useTheme`: Hook to access the properties of the current theme.
- `useThemeName`: Hook to get the name of the current theme.
- `useAvailableThemes`: Hook to get a list of available theme names.
- `createThemedStyleSheet`: Function to create themed styles.
