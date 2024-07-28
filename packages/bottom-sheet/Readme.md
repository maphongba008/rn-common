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
