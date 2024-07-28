import { emit, subscribe } from '@rn-common/event-emitter'
import React from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Animated from 'react-native-reanimated'
import { useBottomSheetItemAnimation } from './hooks'

const BottomSheetItem = ({
  onClosed,
  type,
  data,
}: {
  onClosed: () => void
  type: string
  data: any
}) => {
  const { animatedContentStyle, animatedContainerStyle, runAnimation } =
    useBottomSheetItemAnimation()
  const Component = sheetMap[type]
  React.useEffect(() => {
    runAnimation(1)
  }, [runAnimation])

  const close = React.useCallback(() => {
    runAnimation(0, onClosed)
  }, [onClosed, runAnimation])

  React.useEffect(() => {
    return subscribe('hideBottomSheet', ({ type: hideType }) => {
      if (hideType === type) {
        close()
      }
    })
  }, [close, type])

  if (!Component) {
    console.error(`BottomSheet: ${type} is not registered`)
    return null
  }

  return (
    <Animated.View style={[StyleSheet.absoluteFill, animatedContainerStyle]}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={close}
        />
        <Animated.View style={animatedContentStyle}>
          <Component {...{ data, type, close }} />
        </Animated.View>
      </KeyboardAvoidingView>
    </Animated.View>
  )
}

const Provider = ({ children }: { children: any }) => {
  const [sheets, setSheets] = React.useState([])
  React.useEffect(() => {
    return subscribe('showBottomSheet', ({ type, props }) => {
      setSheets((prevSheets) => [...prevSheets, { type, props }])
    })
  }, [])
  return (
    <>
      {children}
      {sheets.length > 0 && (
        <Animated.View style={StyleSheet.absoluteFill}>
          {sheets.map(({ type, props }) => {
            return (
              <BottomSheetItem
                key={type}
                onClosed={() => {
                  setSheets((prevSheets) =>
                    prevSheets.filter((sheet) => sheet.type !== type),
                  )
                }}
                data={props}
                type={type}
              />
            )
          })}
        </Animated.View>
      )}
    </>
  )
}

const sheetMap = {}

const BottomSheet = {
  Provider,
  register: (type: string, component: React.ElementType) => {
    sheetMap[type] = component
  },
  show: (type: string, props: any) => {
    emit('showBottomSheet', { type, props })
  },
  hide: (type: string) => {
    emit('hideBottomSheet', { type })
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default BottomSheet

export type SheetProps<T> = {
  type: string
  data: T
  close: () => void
}
