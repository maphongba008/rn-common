/* eslint-disable react-native/no-inline-styles */
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { getDeviceInfo, getAppInfo } from '@rn-common/device-info'
import { logger } from '@rn-common/logger'
import Toast from '@rn-common/toast'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import BottomSheet from '@rn-common/bottom-sheet'
import React from 'react'
import { showActionSheet } from '@rn-common/action-sheet'
import { openImagePicker } from '@rn-common/image-picker'
import { Provider, useDispatch } from 'react-redux'
import { store } from './store'
import { setLanguage, useStrings } from './locale'
import {
  createThemedStyleSheet,
  setTheme,
  useAvailableThemes,
  useThemeName,
} from './theme'
logger.setSeverity('info')

const SampleSheet = ({ data, type, close }) => {
  return (
    <View
      style={{
        height: 200,
        backgroundColor: 'red',
      }}
    >
      <TouchableOpacity
        onPress={() => {
          BottomSheet.hide(type)
        }}
      >
        <Text>Close</Text>
      </TouchableOpacity>

      <TextInput style={{ height: 40, backgroundColor: 'green' }} />
    </View>
  )
}

BottomSheet.register('bottom-sheet-1', SampleSheet)

const getStyles = createThemedStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.background,
  },
  text: {
    color: theme.primaryText,
  },
}))

const Main = () => {
  const strings = useStrings()
  const dispatch = useDispatch()
  const styles2 = getStyles()
  const availableThemes = useAvailableThemes()
  const currentTheme = useThemeName()
  return (
    <View style={[styles.container, styles2.container]}>
      <Text style={styles2.text}>
        Open up App.js to start working on your app!
      </Text>
      <Text style={styles2.text}>{strings.common.hello}</Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(setLanguage('vi'))
        }}
      >
        <Text style={styles2.text}>Change language to Vi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          const deviceInfo = getDeviceInfo()
          const appInfo = getAppInfo()
          console.log({ deviceInfo, appInfo })
        }}
      >
        <Text style={styles2.text}>Print info</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          logger.debug('This is debug log')
        }}
      >
        <Text style={styles2.text}>Add debug log</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          logger.info('This is info log')
        }}
      >
        <Text style={styles2.text}>Add info log</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          logger.error('This is error log')
        }}
      >
        <Text style={styles2.text}>Add error log</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          logger.warn('This is warn log')
        }}
      >
        <Text style={styles2.text}>Add warn log</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          Toast.show('success', 'This is success toast')
        }}
      >
        <Text style={styles2.text}>Show success toast</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Toast.show('error', 'This is error toast')
        }}
      >
        <Text style={styles2.text}>Show error toast</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          BottomSheet.show('bottom-sheet-1', { name: 'Aaron', age: 30 })
        }}
      >
        <Text style={styles2.text}>Show sample sheet</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          dispatch(setTheme(availableThemes.find((x) => x !== currentTheme)))
        }}
      >
        <Text style={styles2.text}>Switch theme</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          openImagePicker({
            title: 'Select an image',
            cameraTitle: 'Take a photo',
            galleryTitle: 'Choose from gallery',
            cancelButtonTitle: 'Cancel',
          })
            .then((image) => {
              console.log({ image })
            })
            .catch((error) => {
              console.log('error here', 123)
              console.log(error)
            })
        }}
      >
        <Text style={styles2.text}>Show image picker</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          showActionSheet({
            title: "What's your favorite color?",
            message: 'Choose your favorite color',
            buttons: [
              {
                text: 'Blue',
                onPress: () => {
                  console.log('Blue')
                },
              },
              {
                text: 'Green',
                onPress: () => {
                  console.log('Green')
                },
              },
              {
                text: 'Red',
                type: 'destructive',
                onPress: () => {
                  console.log('Red')
                },
              },
              {
                text: 'Cancel',
                type: 'cancel',
                onPress: () => {
                  console.log('Cancel')
                },
              },
            ],
          })
        }}
      >
        <Text style={styles2.text}>Show actions sheet</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <BottomSheet.Provider
          config={{
            backgroundColor: 'blue',
          }}
        >
          <Main />
        </BottomSheet.Provider>
        <Toast.Provider
          config={{
            toastMap: {
              success: {
                indicatorStyle: {
                  backgroundColor: 'green',
                },
                textStyle: {
                  color: 'blue',
                },
              },
              error: {
                indicatorStyle: {
                  backgroundColor: 'red',
                },
                textStyle: {
                  color: 'yellow',
                },
              },
            },
          }}
        />
      </SafeAreaProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
