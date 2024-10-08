# [`@rn-common/bottom-sheet`](./packages/bottom-sheet)

## Overview

The `BottomSheet` component is a reusable React Native component that provides a modal bottom sheet UI by using react-native-reanimated. It includes a provider, registration method for custom bottom sheets, and methods to show and hide sheets.

## Installation

Install using:

```sh
npx expo install @rn-common/bottom-sheet react-native-reanimated
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
