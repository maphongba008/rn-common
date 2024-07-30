# [`@rn-common/image-picker`](./packages/image-picker)

This utility provides a convenient way to pick and resize images using the camera or photo library in a React Native application. It leverages `expo-image-picker` for image selection and `expo-image-manipulator` for resizing images, with additional UI support via `@rn-common/action-sheet`.

## Installation

Install using npm:

```sh
npm install @rn-common/image-picker
```

or yarn:

```sh
yarn add @rn-common/image-picker
```

## Features

- **Cross-Platform Support**: Works on both iOS and Android.
- **Action Sheet Integration**: Presents options to the user in an action sheet format.
- **Permission Handling**: Manages camera and media library permissions.

## Usage

### Configuration Options

The utility functions accept a `ImagePickerConfig` object with the following optional properties:

- `title` (optional): Title of the action sheet.
- `photoLibraryTitle` (optional): Title for the option to choose from the gallery. Default to 'Choose from gallery'.
- `cameraTitle` (optional): Title for the option to take a photo. Default to 'Take a photo'.
- `cancelButtonTitle` (optional): Title for the cancel button. Default to 'Cancel'.
- `maxWidth` (optional): Maximum width for the resized image.
- `maxHeight` (optional): Maximum height for the resized image.
- `aspect` (optional): Aspect ratio for the image. Default to [4, 3].
- `quality` (optional): Quality of the resized image (0 to 1). Default to 0.8.
- `allowsMultipleSelection` (optional): Boolean indicating if multiple images can be selected.

### Open Image Picker

To open an action sheet and allow the user to pick an image from the camera or photo library:

```javascript
import { openImagePicker } from '@rn-common/image-picker'

const config = {
  title: 'Select an option',
  cameraTitle: 'Take a Photo',
  photoLibraryTitle: 'Choose from Gallery',
  cancelButtonTitle: 'Cancel',
  maxWidth: 800,
  maxHeight: 600,
  aspect: [4, 3],
  quality: 0.8,
}

openImagePicker(config)
  .then((images) => {
    console.log('Selected images:', images)
  })
  .catch((error) => {
    console.error('Error picking images:', error)
  })
```

## Functions

### `openImageCameraPicker`

Launches the camera for image capture.

### `openImageLibraryPicker`

Opens the media library for image selection.

### `openImagePicker`

Displays an action sheet with options to either take a photo or choose from the gallery.

### Error Handling

- `PERMISSION_DENIED`: Thrown if the necessary permissions are not granted.
- `CANCELLED`: Thrown if the user cancels the image picking process.
