import React from 'react'
import { BackHandler, Keyboard, Platform } from 'react-native'

const isAndroid = Platform.OS === 'android'

/**
 * A custom React hook that provides the current height of the on-screen keyboard.
 *
 * This hook listens for keyboard events and updates the height state accordingly. It handles both Android and iOS platforms by using the appropriate keyboard events.
 *
 * @returns {number} The current height of the on-screen keyboard in pixels. Returns 0 when the keyboard is hidden.
 *
 * @example
 * const keyboardHeight = useKeyboardHeight();
 * console.log(`Keyboard height: ${keyboardHeight}px`);
 */
export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = React.useState(0)

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      isAndroid ? 'keyboardDidShow' : 'keyboardWillShow',
      (event) => {
        setKeyboardHeight(event.endCoordinates.height)
      },
    )

    const keyboardDidHideListener = Keyboard.addListener(
      isAndroid ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setKeyboardHeight(0)
      },
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])
  return keyboardHeight
}

/**
 * A custom React hook that determines whether the on-screen keyboard is currently visible.
 *
 * This hook uses the `useKeyboardHeight` hook to check the current height of the keyboard. If the height is greater than 0, it indicates that the keyboard is visible.
 *
 * @returns {boolean} `true` if the keyboard is visible, otherwise `false`.
 *
 * @example
 * const isKeyboardVisible = useIsKeyboardShow();
 * console.log(`Is keyboard visible: ${isKeyboardVisible}`);
 */
export const useIsKeyboardShow = () => {
  return useKeyboardHeight() > 0
}

/**
 * A custom React hook that allows you to handle the hardware back button press on Android devices.
 *
 * This hook registers a callback function to be invoked when the hardware back button is pressed. The callback function should return a boolean value to indicate whether the event has been handled (`true`) or not (`false`).
 *
 * @param {() => boolean} handler - The callback function to handle the hardware back button press. It should return `true` if the event is handled and `false` otherwise.
 *
 * @example
 * useBackHandler(() => {
 *   // Custom logic for handling back button press
 *   console.log('Back button pressed');
 *   return true; // Indicate that the event is handled
 * });
 */
export function useBackHandler(handler: () => boolean) {
  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler)

    return () => BackHandler.removeEventListener('hardwareBackPress', handler)
  }, [handler])
}
