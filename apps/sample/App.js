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

export default function App() {
  return (
    <SafeAreaProvider>
      <BottomSheet.Provider
        config={{
          backgroundColor: 'blue',
        }}
      >
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>

          <TouchableOpacity
            onPress={async () => {
              const deviceInfo = getDeviceInfo()
              const appInfo = getAppInfo()
              console.log({ deviceInfo, appInfo })
            }}
          >
            <Text>Print info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              logger.debug('This is debug log')
            }}
          >
            <Text>Add debug log</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              logger.info('This is info log')
            }}
          >
            <Text>Add info log</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              logger.error('This is error log')
            }}
          >
            <Text>Add error log</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              logger.warn('This is warn log')
            }}
          >
            <Text>Add warn log</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Toast.show('success', 'This is success toast')
            }}
          >
            <Text>Show success toast</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Toast.show('error', 'This is error toast')
            }}
          >
            <Text>Show error toast</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              BottomSheet.show('bottom-sheet-1', { name: 'Aaron', age: 30 })
            }}
          >
            <Text>Show sample sheet</Text>
          </TouchableOpacity>

          <StatusBar style="auto" />
        </View>
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
