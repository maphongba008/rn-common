import { Keyboard } from 'react-native'
import { Action, manipulateAsync, SaveFormat } from 'expo-image-manipulator'
import * as EXImagePicker from 'expo-image-picker'
import { showActionSheet } from '@rn-common/action-sheet'

const COMPRESS_IMAGE_MAX_SIZE = 900
const COMPRESS_IMAGE_QUALITY = 0.8

type Image = {
  uri: string
  width?: number
  height?: number
  exif?: any
}

type ResizeOptions = {
  compressImageMaxWidth?: number
  compressImageMaxHeight?: number
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
  if (!options?.compressImageMaxHeight && !options?.compressImageMaxWidth) {
    return image
  }

  const oldWidth = image.width || 0
  const oldHeight = image.height || 0
  const maxWidth = options?.compressImageMaxWidth || COMPRESS_IMAGE_MAX_SIZE
  const maxHeight = options?.compressImageMaxHeight || COMPRESS_IMAGE_MAX_SIZE

  const shouldResizeWidth = oldWidth > maxWidth
  const shouldResizeHeight = oldHeight > maxHeight

  if (shouldResizeWidth || shouldResizeHeight) {
    const newHeight = maxHeight
    const newWidth = (oldWidth / oldHeight) * newHeight
    const actions: Action[] = []
    if (image.exif?.ImageWidth && image.exif?.ImageWidth !== oldWidth) {
      actions.push({
        resize: {
          width: newHeight,
          height: newWidth,
        },
      })
      actions.push({
        rotate: image.exif?.Orientation === 6 ? -90 : 90,
      })
    } else {
      actions.push({
        resize: {
          width: newWidth,
          height: newHeight,
        },
      })
    }

    const result = await manipulateAsync(image.uri, actions, {
      compress: COMPRESS_IMAGE_QUALITY,
      format: SaveFormat.JPEG,
    })

    return {
      ...image,
      width: result.width,
      height: result.height,
      uri: result.uri,
    }
  }
  return image
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
}

export const openImageCameraPicker = async (config: ImagePickerConfig) => {
  const { aspect = [4, 3], quality = 0.8, maxHeight, maxWidth } = config
  const { status } = await EXImagePicker.requestCameraPermissionsAsync()
  if (status !== 'granted') {
    throw 'PERMISSION_DENIED'
  }
  const res = await EXImagePicker.launchCameraAsync({
    mediaTypes: EXImagePicker.MediaTypeOptions.Images,
    aspect,
    quality,
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
  } = config

  const { status } = await EXImagePicker.requestMediaLibraryPermissionsAsync()
  if (status !== 'granted') {
    throw new Error('PERMISSION_DENIED')
  }
  const res = await EXImagePicker.launchImageLibraryAsync({
    mediaTypes: EXImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection,
    aspect,
    quality,
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
