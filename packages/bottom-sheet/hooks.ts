import React from 'react'
import { Keyboard } from 'react-native'
import {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export const useBottomSheetItemAnimation = () => {
  const animation = useSharedValue(0)
  const runAnimation = React.useCallback(
    (toValue: number, callback?: () => void) => {
      Keyboard.dismiss()
      animation.value = withTiming(toValue, { duration: 300 }, () => {
        if (callback) {
          runOnJS(callback)()
        }
      })
    },
    [animation],
  )
  const animatedContentStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(animation.value, [0, 1], [500, 0]),
      },
    ],
  }))
  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animation.value,
      [0, 1],
      ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)'],
    ),
  }))

  return {
    animation,
    runAnimation,
    animatedContentStyle,
    animatedContainerStyle,
  }
}
