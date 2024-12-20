import { Keyboard } from 'react-native'
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator'
import * as EXImagePicker from 'expo-image-picker'
import { showActionSheet } from '@rn-common/action-sheet'

const COMPRESS_IMAGE_MAX_SIZE = 900
const COMPRESS_IMAGE_QUALITY = 0.8

type Image = {
  uri: string
  width?: number
  height?: number
  exif?: any
  base64?: string | null
}

type ResizeOptions = {
  compressImageMaxWidth?: number
  compressImageMaxHeight?: number
  base64?: boolean
}

/**
 * Resizes an image based on the provided options.
 * @param image The image to resize.
 * @param options The resize options.
 * @returns A Promise that resolves to the resized image.
 */
const resizeImage = async (
  image: Image,
  options?: ResizeOptions,
): Promise<Image> => {
  if (!options) {
    return image
  }
  const {
    compressImageMaxHeight = COMPRESS_IMAGE_MAX_SIZE,
    compressImageMaxWidth = COMPRESS_IMAGE_MAX_SIZE,
    base64,
  } = options

  const oldWidth = image.width || 0
  const oldHeight = image.height || 0

  const shouldResizeWidth = oldWidth > compressImageMaxWidth
  const shouldResizeHeight = oldHeight > compressImageMaxHeight

  const context = ImageManipulator.manipulate(image.uri)

  if (shouldResizeWidth || shouldResizeHeight) {
    const newHeight = compressImageMaxHeight
    const newWidth = (oldWidth / oldHeight) * newHeight
    context.resize({
      width: newHeight,
      height: newWidth,
    })
    if (image.exif?.ImageWidth && image.exif?.ImageWidth !== oldWidth) {
      context.rotate(image.exif?.Orientation === 6 ? -90 : 90)
    }
  }
  const imgRef = await context.renderAsync()
  const imageResult = await imgRef.saveAsync({
    compress: COMPRESS_IMAGE_QUALITY,
    format: SaveFormat.JPEG,
    base64,
  })
  return {
    ...image,
    width: imageResult.width,
    height: imageResult.height,
    uri: imageResult.uri,
    base64: imageResult.base64,
  }
}

export type ImagePickerConfig = {
  title?: string
  photoLibraryTitle?: string
  cameraTitle?: string
  cancelButtonTitle?: string
  maxWidth?: number
  maxHeight?: number
  aspect?: [number, number]
  quality?: number
  allowsMultipleSelection?: boolean
  base64?: boolean
  mediaTypes: ('images' | 'videos' | 'livePhotos')[]
}

export const openImageCameraPicker = async (config: ImagePickerConfig) => {
  const {
    aspect = [4, 3],
    quality = 0.8,
    maxHeight,
    maxWidth,
    base64,
    mediaTypes,
  } = config
  const { status } = await EXImagePicker.requestCameraPermissionsAsync()
  if (status !== 'granted') {
    throw 'PERMISSION_DENIED'
  }
  const res = await EXImagePicker.launchCameraAsync({
    mediaTypes,
    aspect,
    quality,
    base64,
  })
  if (res.canceled || !res.assets.length) {
    throw 'CANCELLED'
  }
  const image = await resizeImage(res.assets[0], {
    compressImageMaxWidth: maxWidth,
    compressImageMaxHeight: maxHeight,
  })
  return [image]
}

export const openImageLibraryPicker = async (config: ImagePickerConfig) => {
  const {
    aspect = [4, 3],
    quality = 0.8,
    allowsMultipleSelection = false,
    maxHeight,
    maxWidth,
    base64,
    mediaTypes,
  } = config

  const { status } = await EXImagePicker.requestMediaLibraryPermissionsAsync()
  if (status !== 'granted') {
    throw new Error('PERMISSION_DENIED')
  }
  const res = await EXImagePicker.launchImageLibraryAsync({
    mediaTypes,
    allowsMultipleSelection,
    aspect,
    quality,
    base64,
  })
  if (res.canceled || !res.assets.length) {
    throw new Error('CANCELLED')
  }
  const promises = res.assets.map((asset) =>
    resizeImage(asset, {
      compressImageMaxWidth: maxWidth,
      compressImageMaxHeight: maxHeight,
    }),
  )
  return await Promise.all(promises)
}

export const openImagePicker = (config: ImagePickerConfig) => {
  return new Promise<Image[]>(async (resolve, reject) => {
    Keyboard.dismiss()
    showActionSheet({
      title: config?.title,
      buttons: [
        {
          text: config.cameraTitle || 'Take a photo',
          onPress: () => {
            openImageCameraPicker(config).then(resolve).catch(reject)
          },
        },
        {
          text: config.photoLibraryTitle || 'Choose from gallery',
          onPress: () => {
            openImageLibraryPicker(config).then(resolve).catch(reject)
          },
        },
        {
          text: config.cancelButtonTitle || 'Cancel',
          type: 'cancel',
        },
      ],
    })
  })
}
