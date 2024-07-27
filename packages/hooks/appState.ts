import React from "react";
import { AppState, AppStateStatus } from "react-native";

export const useAppState = () => {
  const [appState, setAppState] = React.useState(AppState.currentState);
  React.useEffect(() => {
    const onChange = (newState: AppStateStatus) => {
      setAppState(newState);
    };

    const subscription = AppState.addEventListener("change", onChange);

    return () => {
      subscription.remove();
    };
  }, [appState]);
  return appState;
};

export const useIsAppInBackground = () => {
  return useAppState() !== "active";
};

export const useIsAppInForeground = () => {
  return useAppState() === "active";
};

export const useAppStateChanged = (
  callback: (prevState: AppStateStatus, state: AppStateStatus) => void
) => {
  const prevStateRef = React.useRef(AppState.currentState);

  React.useEffect(() => {
    const onChange = (newState: AppStateStatus) => {
      callback(prevStateRef.current, newState);
      prevStateRef.current = newState;
    };

    const subscription = AppState.addEventListener("change", onChange);

    return () => {
      subscription.remove();
    };
  }, [callback]);
};
