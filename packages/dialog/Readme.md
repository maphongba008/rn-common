# Dialog Component

The `Dialog` component is a customizable modal dialog built with React Native and Reanimated. It provides smooth animations, a backdrop overlay, and the ability to handle user interactions like hardware back button presses.

## Features

- **Customizable Backdrop**: Set the backdrop color and transparency.
- **Cancelable**: Allow users to close the dialog by tapping the backdrop or pressing the back button.
- **Smooth Animations**: Powered by `react-native-reanimated` for seamless transitions.
- **Keyboard Avoidance**: Automatically adjusts for keyboard appearance.

## Installation

Install using:

```bash
yarn @rn-common/dialog
```

## Usage

```tsx
import React from 'react'
import { Button, Text, View } from 'react-native'
import { Dialog } from './Dialog'

export default function App() {
  const [visible, setVisible] = React.useState(false)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Dialog" onPress={() => setVisible(true)} />
      <Dialog
        show={visible}
        onRequestClose={() => setVisible(false)}
        backdropColor="rgba(0, 0, 0, 0.7)"
      >
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Text>Hello, this is a dialog!</Text>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </Dialog>
    </View>
  )
}
```

## Props

| Prop             | Type         | Default             | Description                                                                 |
| ---------------- | ------------ | ------------------- | --------------------------------------------------------------------------- |
| `cancelable`     | `boolean`    | `true`              | Whether the dialog can be dismissed by tapping the backdrop or back button. |
| `children`       | `ReactNode`  | **Required**        | The content to display inside the dialog.                                   |
| `show`           | `boolean`    | `false`             | Controls the visibility of the dialog.                                      |
| `onRequestClose` | `() => void` | `undefined`         | Callback invoked when the dialog is requested to close.                     |
| `backdropColor`  | `string`     | `'rgba(0,0,0,0.5)'` | Color of the backdrop overlay.                                              |

## Customization

You can customize the dialog further by modifying the styles or providing additional props to the `children`.

## License

This project is licensed under the MIT License.
