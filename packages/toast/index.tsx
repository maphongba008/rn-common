import React from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  LinearTransition,
  runOnJS,
  SlideInUp,
  SlideOutUp,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FullWindowOverlay } from "react-native-screens";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { subscribe, emit } from "@rn-common/event-emitter";
import { useUniqId } from "./hooks";

type Toast = {
  type: string;
  message: string;
  id: string;
};

export type ToastProps = {
  indicatorStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export type ToastConfig = {
  duration?: number;
  toastMap: Record<string, ToastProps>;
};

const ToastItem = ({
  onClose,
  toast,
  config,
}: {
  toast: Toast;
  onClose?: (id: string) => void;
  config?: ToastConfig;
}) => {
  const animationValue = useSharedValue(0);
  const timeoutId = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const startAnimation = React.useCallback(
    (value: number, cb?: () => void) => {
      if (!value && timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      animationValue.value = withTiming(value, { duration: 300 }, () => {
        if (cb) {
          runOnJS(cb)();
        }
      });
    },
    [animationValue]
  );

  React.useEffect(() => {
    startAnimation(1, () => {
      timeoutId.current = setTimeout(() => {
        startAnimation(0, () => {
          onClose?.(toast.id);
        });
      }, config?.duration || 3000);
    });
  }, [config?.duration, onClose, startAnimation, toast.id]);

  const toastStyle = config?.toastMap?.[toast.type] || {};

  return (
    <Animated.View
      style={[styles.container]}
      entering={SlideInUp}
      exiting={SlideOutUp}
      layout={LinearTransition}
    >
      <View style={[styles.indicator, toastStyle.indicatorStyle]} />
      <View style={styles.textContainer}>
        <Text style={[styles.message, toastStyle.textStyle]}>
          {toast.message}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 3,
  },
  message: {
    color: "#000",
    paddingHorizontal: 8,
  },
  indicator: {
    width: 6,
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 8,
  },
});

const Provider = ({ config }: { config?: ToastConfig }) => {
  const Wrapper = Platform.OS === "ios" ? FullWindowOverlay : React.Fragment;
  const { top } = useSafeAreaInsets();
  const [data, setData] = React.useState<Toast[]>([]);
  const { next } = useUniqId();

  React.useEffect(() => {
    return subscribe("toast", (data: { type: string; message: string }) => {
      setData((state) => [...state, { ...data, id: next() }]);
    });
  }, []);

  const onRemove = (id: string) => {
    setData((state) => state.filter((d) => d.id !== id));
  };

  const style: ViewStyle = {
    elevation: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: top + 16,
  };

  return (
    <Wrapper>
      <Animated.View
        layout={LinearTransition}
        pointerEvents="none"
        style={style}
      >
        {data.map((d) => {
          return (
            <ToastItem
              config={config}
              key={d.id}
              onClose={onRemove}
              toast={d}
            />
          );
        })}
      </Animated.View>
    </Wrapper>
  );
};

export default {
  /**
   * Renders the Toast provider component.
   * @param config - The configuration for the Toast component.
   * @returns The rendered Toast provider component.
   */
  Provider: ({ config }: { config: ToastConfig }) => (
    <Provider {...{ config }} />
  ),

  /**
   * Shows a toast with the specified type and message.
   * @param type - The type of the toast.
   * @param message - The message of the toast.
   */
  show: (type: string, message: string) => {
    emit("toast", { type, message });
  },
};
