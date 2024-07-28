[This file is auto-generated, do not edit it manually]

[@rn-common/bottom-sheet](#rn-commonbottom-sheet)

[@rn-common/device-info](#rn-commondevice-info)

[@rn-common/event-emitter](#rn-commonevent-emitter)

[@rn-common/file](#rn-commonfile)

[@rn-common/hooks](#rn-commonhooks)

[@rn-common/logger](#rn-commonlogger)

[@rn-common/string-util](#rn-commonstring-util)

[@rn-common/toast](#rn-commontoast)

# [`@rn-common/bottom-sheet`](./packages/bottom-sheet)

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

const App = () => {
  const config = {
    backgroundColor: '#FFFFFF',
  } // optional
  return (
    <BottomSheet.Provider config={config}>
      {/* Your app components */}
    </BottomSheet.Provider>
  )
}
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
BottomSheet.show(
  'customSheet',
  { someData: 'value' },
  { backgroundColor: '#FF0000' }, // this will override the provider's config
)
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

# [`@rn-common/device-info`](./packages/device-info)

## Overview

This module provides utility functions to retrieve information about the device and the application. It leverages the `expo-device` and `expo-application` libraries to access various details such as device name, model, operating system, app version, and more.

## Installation

Install using npm:

```sh
npm install @rn-common/device-info
```

or yarn:

```sh
yarn add @rn-common/device-info
```

## Functions

### 1. `getDeviceInfo`

Retrieves detailed information about the device.

**Returns:**

- `DeviceInfo`: An object containing device-related information.

**Structure of `DeviceInfo` object:**

- `deviceName` (string): The name of the device.
- `modelName` (string): The model name of the device.
- `os` (string): The operating system of the device.
- `osVersion` (string): The version of the operating system.

**Example:**

```javascript
import { getDeviceInfo } from '@rn-common/device-info'

const deviceInfo = getDeviceInfo()
console.log(deviceInfo)
```

### 2. `getAppInfo`

Retrieves detailed information about the application.

**Returns:**

- `AppInfo`: An object containing application-related information.

**Structure of `AppInfo` object:**

- `name` (string): The name of the application.
- `version` (string): The native version of the application.
- `buildNumber` (string): The native build version of the application.
- `appId` (string): The application ID.

**Example:**

```javascript
import { getAppInfo } from '@rn-common/device-info'

const appInfo = getAppInfo()
console.log(appInfo)
```

# [`@rn-common/event-emitter`](./packages/event-emitter)

## Overview

This module provides a simple event emitter utility for subscribing to and emitting events. It includes types for defining event callbacks, an event registration array, and functions for subscribing to and emitting events.

## Installation

Install using npm:

```sh
npm install @rn-common/event-emitter
```

or yarn:

```sh
yarn add @rn-common/event-emitter
```

## Functions

### `subscribe`

Registers a callback function for a specific event type.

**Parameters:**

- `type` (string): The event type to subscribe to.
- `callback` (CallBack<T>): The function to be executed when the event is emitted.

**Returns:**

- A function to unsubscribe from the event.

**Example:**

```javascript
import { subscribe } from '@rn-common/event-emitter'

const unsubscribe = subscribe('eventType', (data) => {
  console.log(data)
})

// To unsubscribe
unsubscribe()
```

### `emit`

Emits an event, triggering all registered callbacks for that event type.

**Parameters:**

- `type` (string): The event type to emit.
- `data` (T): The data to be passed to the callback functions.

**Example:**

```javascript
import { emit } from '@rn-common/event-emitter'

emit('eventType', { key: 'value' })
```

# [`@rn-common/file`](./packages/file)

This module provides a set of utility functions for working with the file system in React Native, using Expo's `FileSystem` API. It includes functions for creating directories, reading and writing files, deleting files and folders, and managing downloads.

## Installation

Install using npm:

```sh
npm install @rn-common/file
```

or yarn:

```sh
yarn add @rn-common/file
```

## Exports

### Directories

- **`DocumentDirectory`**: The document directory path.
- **`CacheDirectory`**: The cache directory path.

### Functions

#### `mkdir(dir: string)`

Creates a new directory at the specified path, including any necessary intermediate directories.

**Parameters:**

- `dir` (string): The path of the directory to create.

**Returns:**

- `Promise<void>`: Resolves when the directory is created.

**Example:**

```javascript
await mkdir('/path/to/new/directory')
```

#### `readFile(filePath: string, options?: FileSystem.ReadingOptions)`

Reads the contents of a file as a string.

**Parameters:**

- `filePath` (string): The path of the file to read.
- `options` (FileSystem.ReadingOptions): Optional settings for reading the file.

**Returns:**

- `Promise<string>`: The contents of the file.

**Example:**

```javascript
const contents = await readFile('/path/to/file.txt')
```

#### `writeFile(filePath: string, contents: string, options?: FileSystem.WritingOptions)`

Writes content to a file.

**Parameters:**

- `filePath` (string): The path of the file to write to.
- `contents` (string): The content to write.
- `options` (FileSystem.WritingOptions): Optional settings for writing the file.

**Returns:**

- `Promise<void>`: Resolves when the file is written.

**Example:**

```javascript
await writeFile('/path/to/file.txt', 'Hello, World!')
```

#### `removeFile(filePath: string)`

Deletes a file at the specified path.

**Parameters:**

- `filePath` (string): The path of the file to delete.

**Returns:**

- `Promise<void>`: Resolves when the file is deleted.

**Example:**

```javascript
await removeFile('/path/to/file.txt')
```

#### `removeFolder(folderPath: string)`

Deletes a folder and all its contents.

**Parameters:**

- `folderPath` (string): The path of the folder to delete.

**Returns:**

- `Promise<void>`: Resolves when the folder and its contents are deleted.

**Example:**

```javascript
await removeFolder('/path/to/folder')
```

#### `extractFilename(filePath: string, withExtension = true)`

Extracts the filename from a given file path.

**Parameters:**

- `filePath` (string): The file path.
- `withExtension` (boolean, default: `true`): Whether to include the file extension.

**Returns:**

- `string`: The extracted filename.

**Example:**

```javascript
const filename = extractFilename('/path/to/file.txt') // 'file.txt'
const nameWithoutExtension = extractFilename('/path/to/file.txt', false) // 'file'
```

#### `extractExtension(filePath: string)`

Extracts the file extension from a given file path.

**Parameters:**

- `filePath` (string): The file path.

**Returns:**

- `string`: The file extension.

**Example:**

```javascript
const extension = extractExtension('/path/to/file.txt') // 'txt'
```

#### `joinPath(...paths: string[])`

Joins multiple path segments into a single path.

**Parameters:**

- `...paths` (string[]): Path segments.

**Returns:**

- `string`: The combined path.

**Example:**

```javascript
const fullPath = joinPath('/path', 'to', 'file.txt') // '/path/to/file.txt'
```

#### `createDownloadFile({ uri, filePath, options, onProgress })`

Initiates a file download from a specified URI.

**Parameters:**

- `uri` (string): The URI of the file to download.
- `filePath` (string): The local path to save the downloaded file.
- `options` (FileSystem.DownloadOptions): Optional download settings.
- `onProgress` (function): Callback for download progress.

**Returns:**

- `Object`: Methods to control the download (`download`, `pause`, `resume`, `cancel`) and the `uri` of the downloaded file.

**Example:**

```javascript
const { download, pause, resume, cancel, uri } = createDownloadFile({
  uri: 'https://example.com/file.zip',
  filePath: '/path/to/file.zip',
  onProgress: (progress) => console.log(`Download progress: ${progress}%`),
})
await download()
```

# [`@rn-common/hooks`](./packages/hooks)

This repository contains a collection of custom React hooks designed to simplify common tasks in React Native applications. These hooks provide functionality for app state management, clipboard access, keyboard height detection, and more.

## Installation

Install using npm:

```sh
npm install @rn-common/hooks
```

or yarn:

```sh
yarn add @rn-common/hooks
```

## Hooks

### `useAppState`

Tracks the current state of the app (active, background, or inactive).

**Returns:**

- `appState` (string): The current state of the app.

**Example:**

```javascript
import { useAppState } from '@rn-common/hooks'

const appState = useAppState()
console.log(`Current app state: ${appState}`)
```

### `useIsAppInBackground`

Determines if the app is in the background.

**Returns:**

- `boolean`: `true` if the app is in the background, `false` otherwise.

**Example:**

```javascript
import { useIsAppInBackground } from '@rn-common/hooks'

const isInBackground = useIsAppInBackground()
console.log(`Is app in background: ${isInBackground}`)
```

### `useIsAppInForeground`

Determines if the app is in the foreground.

**Returns:**

- `boolean`: `true` if the app is in the foreground, `false` otherwise.

**Example:**

```javascript
import { useIsAppInForeground } from '@rn-common/hooks'

const isInForeground = useIsAppInForeground()
console.log(`Is app in foreground: ${isInForeground}`)
```

### `useAppStateChanged`

Registers a callback function to be called when the app state changes.

**Parameters:**

- `callback` (function): The function to call with the previous and current app state.

**Example:**

```javascript
import { useAppStateChanged } from '@rn-common/hooks'

useAppStateChanged((prevState, newState) => {
  console.log(`App state changed from ${prevState} to ${newState}`)
})
```

### `useOnCopy`

Provides a function to copy text to the clipboard.

**Returns:**

- `function`: A function that takes a string and copies it to the clipboard.

**Example:**

```javascript
import { useOnCopy } from '@rn-common/hooks'

const copyText = useOnCopy()
copyText('Hello, world!')
```

### `useClipboard`

Retrieves the current text from the clipboard.

**Returns:**

- `Promise<string>`: The current clipboard text.

**Example:**

```javascript
import { useClipboard } from '@rn-common/hooks'

useClipboard().then((text) => {
  console.log(`Clipboard text: ${text}`)
})
```

### `useKeyboardHeight`

Tracks the height of the on-screen keyboard.

**Returns:**

- `number`: The current height of the keyboard in pixels.

**Example:**

```javascript
import { useKeyboardHeight } from '@rn-common/hooks'

const keyboardHeight = useKeyboardHeight()
console.log(`Keyboard height: ${keyboardHeight}px`)
```

### `useIsKeyboardShow`

Determines if the on-screen keyboard is visible.

**Returns:**

- `boolean`: `true` if the keyboard is visible, `false` otherwise.

**Example:**

```javascript
import { useIsKeyboardShow } from '@rn-common/hooks'

const isKeyboardVisible = useIsKeyboardShow()
console.log(`Is keyboard visible: ${isKeyboardVisible}`)
```

### `useBackHandler`

Handles the hardware back button press on Android devices.

**Parameters:**

- `handler` (function): A callback function to handle the back button press. Should return `true` if the event is handled, `false` otherwise.

**Example:**

```javascript
import { useBackHandler } from '@rn-common/hooks'

useBackHandler(() => {
  console.log('Back button pressed')
  return true // Indicate that the event is handled
})
```

### `useLayout`

Tracks layout measurements of a component.

**Returns:**

- An object containing the layout measurements (`x`, `y`, `width`, `height`).
- `onLayout` (function): A function to be set as the component's `onLayout` prop.

**Example:**

```javascript
import { useLayout } from '@rn-common/hooks'

const { onLayout, width, height } = useLayout()
return <View onLayout={onLayout} />
```

# [`@rn-common/logger`](./packages/logger)

This module provides a logging utility for React Native applications, leveraging `react-native-logs` and `expo-file-system` for storing logs in a file. It allows you to log messages with various severity levels and save them to a designated directory.

## Installation

Install using npm:

```sh
npm install @rn-common/logger
```

or yarn:

```sh
yarn add @rn-common/logger
```

## Usage

### `logger`

The `logger` object provides methods to log messages with different severity levels.

#### Methods

- **`setSeverity(severity: 'debug' | 'info' | 'warn' | 'error')`**

  - Sets the severity level of the logger. Messages with a lower severity level than the set level will be ignored.

- **`debug(message: any)`**

  - Logs a debug message.

- **`info(message: any)`**

  - Logs an informational message.

- **`warn(message: any)`**

  - Logs a warning message.

- **`error(message: any)`**
  - Logs an error message.

#### Example

```javascript
import { logger } from '@rn-common/logger'

// Set severity level
logger.setSeverity('info')

// Log messages with different severity levels
logger.debug('This is a debug message')
logger.info('This is an info message')
logger.warn('This is a warning message')
logger.error('This is an error message')
```

# [`@rn-common/string-util`](./packages/string-util)

This module provides utilities for generating universally unique identifiers (UUIDs) and formatting strings with placeholders using the Expo Crypto library.

## Installation

Install using npm:

```sh
npm install @rn-common/string-util
```

or yarn:

```sh
yarn add @rn-common/string-util
```

## Utilities

### `uuid()`

Generates a universally unique identifier (UUID). This function utilizes `Crypto.randomUUID()` to produce a UUID, a standardized 128-bit identifier commonly used for uniquely identifying information in computing systems.

#### Returns

- `string`: A string representation of the generated UUID.

#### Example

```javascript
import { uuid } from '@rn-common/string-util'

const id = uuid()
console.log(`Generated UUID: ${id}`)
```

### `formatTemplate(template: string, args: Record<string, any>)`

Formats a string by replacing placeholders with corresponding values from an arguments object. Placeholders in the string should be enclosed in double curly braces (e.g., `{{key}}`), where `key` corresponds to a property name in the `args` object. The function replaces these placeholders with their respective values from `args`.

#### Parameters

- `template` (`string`): The string containing placeholders to be replaced.
- `args` (`Record<string, any>`): An object containing key-value pairs where keys correspond to placeholders in the text and values are the replacement values.

#### Returns

- `string`: The formatted string with placeholders replaced by their corresponding values from `args`.

#### Example

```javascript
import { formatTemplate } from '@rn-common/string-util'

const template = 'Hello, {{name}}! Welcome to {{place}}.'
const values = { name: 'Alice', place: 'Wonderland' }
const result = formatTemplate(template, values)
console.log(result) // "Hello, Alice! Welcome to Wonderland."
```

# [`@rn-common/toast`](./packages/toast)

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

