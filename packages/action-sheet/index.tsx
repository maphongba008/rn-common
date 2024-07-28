import React from 'react'
import {
  Platform,
  ActionSheetIOS,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import BottomSheet, { SheetProps } from '@rn-common/bottom-sheet'

export type Button = {
  text: string
  onPress?: () => void
  type?: 'default' | 'cancel' | 'destructive'
}

export type ActionSheet = {
  title?: string
  message?: string
  buttons: Button[]
}

export const showActionSheet = (actionSheet: ActionSheet) => {
  if (Platform.OS === 'ios') {
    return ActionSheetIOS.showActionSheetWithOptions(
      {
        title: actionSheet.title,
        message: actionSheet.message,
        options: actionSheet.buttons.map((button) => button.text),
        cancelButtonIndex: actionSheet.buttons.findIndex(
          (button) => button.type === 'cancel',
        ),
        destructiveButtonIndex: actionSheet.buttons.findIndex(
          (button) => button.type === 'destructive',
        ),
      },
      (index) => {
        actionSheet.buttons[index]?.onPress?.()
      },
    )
  }
  BottomSheet.show('ActionSheet', actionSheet, {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  })
}

const AndroidActionSheet = ({
  data: { title, message, buttons },
  close,
}: SheetProps<ActionSheet>) => {
  return (
    <View style={styles.container}>
      <View style={styles.group}>
        {!!title && <Text style={styles.title}>{title}</Text>}
        {!!message && <Text style={styles.message}>{message}</Text>}
        <View style={styles.spacer} />
        {buttons
          .filter((t) => t.type !== 'cancel')
          .map((button) => (
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => {
                close()
                button.onPress?.()
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  button.type === 'destructive' && styles.destructiveText,
                ]}
              >
                {button.text}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
      <View style={styles.spacer} />
      <View style={styles.group}>
        {buttons
          .filter((t) => t.type === 'cancel')
          .map((button) => (
            <TouchableOpacity
              style={[styles.button, styles.noBorder]}
              activeOpacity={0.7}
              onPress={() => {
                close()
                button.onPress?.()
              }}
            >
              <Text style={[styles.buttonText, styles.cancelText]}>
                {button.text}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  )
}

BottomSheet.register('ActionSheet', AndroidActionSheet)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  group: {
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  spacer: {
    height: 8,
  },
  title: {
    color: '#757575',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
  },
  message: {
    color: '#9a9a9a',
    fontSize: 13,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  noBorder: {
    borderTopWidth: 0,
  },
  buttonText: {
    color: '#0769FF',
    fontSize: 16,
  },
  destructiveText: {
    color: '#FF3323',
  },
  cancelText: {
    fontWeight: 'bold',
  },
})
