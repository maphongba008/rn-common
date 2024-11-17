import React from 'react'
import {
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  BackHandler,
} from 'react-native'
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const DIALOG_ANIMATION_DURATION = 300

type DialogProps = {
  cancelable?: boolean
  children: React.ReactNode
  show?: boolean
  onRequestClose?: () => void
  backdropColor?: string
}

export const Dialog = ({
  cancelable = true,
  show = false,
  onRequestClose,
  children,
  backdropColor = 'rgba(0,0,0,0.5)',
}: DialogProps) => {
  const { height } = useWindowDimensions()
  const [isAnimationFinish, setIsAnimationFinish] = React.useState(true)
  const animation = useSharedValue(0)
  console.log({ cancelable })
  const runAnimation = React.useCallback(
    (_show: boolean) => {
      setIsAnimationFinish(false)
      animation.value = withTiming(
        _show ? 1 : 0,
        { duration: DIALOG_ANIMATION_DURATION },
        () => {
          runOnJS(setIsAnimationFinish)(true)
        },
      )
    },
    [animation],
  )
  React.useEffect(() => {
    runAnimation(show)
  }, [runAnimation, show])

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animation.value,
      [0, 1],
      ['rgba(0,0,0,0)', backdropColor],
    ),
  }))
  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(animation.value, [0, 1], [height, 0]),
      },
    ],
  }))
  React.useEffect(() => {
    const handler = () => {
      if (cancelable) {
        onRequestClose?.()
        return true
      }
      return false
    }
    BackHandler.addEventListener('hardwareBackPress', handler)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler)
    }
  }, [cancelable, onRequestClose])

  if (!show && isAnimationFinish) {
    return null
  }
  return (
    <Animated.View style={[styles.overlay, animatedOverlayStyle]}>
      <KeyboardAvoidingView style={styles.avoidingView}>
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            testID="backdrop"
            disabled={!cancelable}
            onPress={onRequestClose}
            style={styles.backdrop}
          />
          <Animated.View style={contentAnimatedStyle}>{children}</Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  avoidingView: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    flex: 1,
  },
})
