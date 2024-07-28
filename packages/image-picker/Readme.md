# [`@rn-common/image-picker`](./packages/image-picker)

This module use `expo-image-picker` and `expo-image-manipulator` to provides utilities for selecting images from the camera or gallery in a React Native application.

## Installation

Install using npm:

```sh
npm install @rn-common/image-picker
```

or yarn:

```sh
yarn add @rn-common/image-picker
```

## Usage

### Image Picker Hook

The `useImagePicker` hook allows you to select images from the camera or gallery. It provides configuration options such as aspect ratio, quality, and whether multiple selections are allowed.

```javascript
import { useImagePicker } from '@rn-common/image-picker'

const pickImage = useImagePicker()

const handlePickImage = async () => {
  try {
    const images = await pickImage({
      title: 'Select Image',
      photoLibraryTitle: 'Choose from gallery',
      cameraTitle: 'Take a photo',
      maxWidth: 800,
      maxHeight: 600,
      quality: 0.8,
      allowsMultipleSelection: false,
    })
    console.log('Selected images:', images)
  } catch (error) {
    console.error('Error picking image:', error)
  }
}
```

## Configuration Options

### `useImagePicker` Configuration

- `title` (string): Title for the action sheet.
- `photoLibraryTitle` (string): Label for the gallery option.
- `cameraTitle` (string): Label for the camera option.
- `cancelButtonTitle` (string): Label for the cancel button.
- `maxWidth` (number): Maximum width for selected images.
- `maxHeight` (number): Maximum height for selected images.
- `aspect` ([number, number]): Aspect ratio for the image.
- `quality` (number): Quality of the image (0-1).
- `allowsMultipleSelection` (boolean): Whether multiple images can be selected.
