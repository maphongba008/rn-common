# [`@rn-common/action-sheet`](./packages/action-sheet)

This library provides a cross-platform action sheet component for React Native, leveraging native `ActionSheetIOS` for iOS and a custom bottom sheet for other platforms.

## Installation

Install using npm:

```sh
npm install @rn-common/action-sheet
```

or yarn:

```sh
yarn add @rn-common/action-sheet
```

## Usage

### Showing an Action Sheet

To display an action sheet, use the `showActionSheet` function:

```javascript
import { showActionSheet } from '@rn-common/action-sheet'

const actionSheet = {
  title: 'Title',
  message: 'Message',
  buttons: [
    { text: 'Option 1', onPress: () => console.log('Option 1 selected') },
    { text: 'Option 2', onPress: () => console.log('Option 2 selected') },
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel selected'),
      type: 'cancel',
    },
  ],
}

showActionSheet(actionSheet)
```

### Button Types

- **default**: Standard button style.
- **cancel**: Typically used to cancel the action sheet; positioned separately.
- **destructive**: Used for actions that may have negative consequences.

### `showActionSheet` Function

The `showActionSheet` function takes an `ActionSheet` object with the following structure:

- `title` (optional): A title for the action sheet.
- `message` (optional): A message displayed below the title.
- `buttons`: An array of buttons, each with a `text`, `onPress`, and an optional `type` ('default', 'cancel', 'destructive').
