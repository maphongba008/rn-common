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
