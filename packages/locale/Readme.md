# [`@rn-common/locale`](./packages/locale)

This module provides a simple and flexible way to manage localization (i18n) in a React/React Native application using Redux Toolkit. It allows for dynamic language switching and provides a hook to access localized strings based on the current language.

## Installation

Install using npm:

```sh
npm install @rn-common/locale
```

or yarn:

```sh
yarn add @rn-common/locale
```

## Features

- **Language Management**: Easily set and switch between languages.
- **Localization Support**: Define localized strings for multiple languages.
- **Redux Integration**: Uses Redux Toolkit's `createSlice` for state management.
- **React Hook**: Provides a custom hook for accessing localized strings in components.

## Usage

### 1. Define Your Localized Strings

Create a map of localized strings for each supported language.

```javascript
const languageMap = {
  en: {
    greeting: 'Hello',
    farewell: 'Goodbye',
  },
  es: {
    greeting: 'Hola',
    farewell: 'Adiós',
  },
}
```

### 2. Create the Locale Reducer

Use the `createLocaleReducer` function to create a slice and associated actions.

```javascript
import { createLocaleReducer } from '@rn-common/locale'

const config = {
  languageMap,
  initialLanguage: 'en',
}

const { slice, setLanguage, useStrings } = createLocaleReducer(config)
```

### 3. Integrate with Redux Store

Add the created slice to your Redux store.

```javascript
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    [slice.name]: slice.reducer,
  },
})
```

### 4. Access Localized Strings in Components

Use the `useStrings` hook to access localized strings in your React components.

```javascript
import React from 'react'
import { useStrings, setLanguage } from './localeSlice'
import { useDispatch } from 'react-redux'

const MyComponent = () => {
  const strings = useStrings()
  const dispatch = useDispatch()

  return (
    <div>
      <p>{strings.greeting}</p>
      <button onClick={() => dispatch(setLanguage('es'))}>
        Switch to Spanish
      </button>
    </div>
  )
}
```
