import { useState, useCallback } from 'react'
import { LayoutChangeEvent, LayoutRectangle } from 'react-native'

/**
 * Custom hook that provides layout information and a callback for handling layout changes.
 * @returns An object containing the layout information and the callback function.
 */
export function useLayout() {
  const [layout, setLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => setLayout(e.nativeEvent.layout),
    [],
  )

  return {
    onLayout,
    ...layout,
  }
}
