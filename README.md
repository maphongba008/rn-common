[This file is auto-generated, do not edit it manually]

# [`@rn-common/bottom-sheet`](./packages/bottom-sheet) - BottomSheet Component Documentation

## Overview

The `BottomSheet` component is a reusable React Native component that provides a modal bottom sheet UI. It includes a provider, registration method for custom bottom sheets, and methods to show and hide sheets.

## Installation

Install using npm:

```sh
npm install @rn-common/bottom-sheet
```

or yarn:

```sh
yarn add @rn-common/bottom-sheet
```

## Usage

### 1. **Provider**

Wrap your app or a section of your app with the `Provider` component to enable bottom sheet functionality.

```jsx
import BottomSheet from '@rn-common/bottom-sheet'

const App = () => (
  <BottomSheet.Provider>{/* Your app components */}</BottomSheet.Provider>
)
```

### 2. **Registering a Bottom Sheet Component**

Register your custom bottom sheet component using the `BottomSheet.register` method.

```jsx
const CustomBottomSheet = ({ data, close }) => {
  return <View>{/* Custom content */}</View>
}

BottomSheet.register('customSheet', CustomBottomSheet)
```

### 3. **Showing a Bottom Sheet**

To display a bottom sheet, use the `BottomSheet.show` method.

```jsx
BottomSheet.show('customSheet', { someData: 'value' })
```

### 4. **Hiding a Bottom Sheet**

To hide a bottom sheet, use the `BottomSheet.hide` method.

```jsx
BottomSheet.hide('customSheet')
```

or use the `close` function provided in the custom bottom sheet component.:

```jsx
const CustomBottomSheet = ({
  data,
  close,
  type,
}: SheetProps<{ someData: string }>) => {
  return (
    <View>
      {/* Custom content */}
      <Button title="Close" onPress={close} />
    </View>
  )
}
```

## Custom Bottom Sheet Component Props

- `type`: A string indicating the type of the bottom sheet.
- `data`: Data passed when showing the bottom sheet.
- `close`: A function to close the bottom sheet.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

# [`@rn-common/toast`](./packages/toast) - Toast Notification Component

This component provides a simple and customizable toast notification system for React Native applications. It uses `react-native-reanimated` for animations and `react-native-screens` for overlay support.

## Features

- **Customizable Toast Styles:** Define custom styles for different types of toasts.
- **Animation Support:** Includes slide-in and slide-out animations using `react-native-reanimated`.
- **Auto Dismiss:** Toasts automatically dismiss after a specified duration.
- **Cross-Platform Support:** Works on both iOS and Android with platform-specific optimizations.

## Installation

Install using npm:

```bash
npm install @rn-common/toast
```

or yarn:

```bash
yarn add @rn-common/toast
```

## Usage

### Importing the Component

```javascript
import Toast from '@rn-common/toast'
```

### Setting Up the Toast Provider

Place the `Toast.Provider` component at the root of your app, preferably at a high level in the component tree.
Make sure to wrap the `Toast.Provider` component inside a `SafeAreaProvider` from `react-native-safe-area-context` to ensure the toast is displayed correctly.

```javascript
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from '@rn-common/toast'

export default function App() {
  const toastConfig = {
    duration: 4000,
    toastMap: {
      success: {
        indicatorStyle: { backgroundColor: 'green' },
        textStyle: { color: 'white' },
      },
      error: {
        indicatorStyle: { backgroundColor: 'red' },
        textStyle: { color: 'white' },
      },
    },
  }

  return (
    <SafeAreaProvider>
      {/* Your other app components */}
      <Toast.Provider config={toastConfig} />
    </SafeAreaProvider>
  )
}
```

### Showing a Toast

To show a toast, call the `Toast.show` method with the desired type and message:

```javascript
import Toast from '@rn-common/toast'

// Example usage:
Toast.show('success', 'This is a success message!')
Toast.show('error', 'This is an error message!')
```

## Configuration

The `Toast.Provider` accepts a `config` prop to customize toast behavior:

- `duration` (optional): Duration in milliseconds for how long the toast should be visible. Defaults to 3000 ms.
- `toastMap`: An object mapping toast types to their styles. Each entry can have `indicatorStyle` and `textStyle` properties.

## Styling

Customize the styles by modifying the `toastMap` configuration:

- `indicatorStyle`: Style for the indicator on the left side of the toast.
- `textStyle`: Style for the toast message text.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

