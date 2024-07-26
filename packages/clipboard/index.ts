import * as Clipboard from "expo-clipboard";
import React from "react";

export const useOnCopy = () => {
  return React.useCallback((text: string) => {
    return Clipboard.setStringAsync(text);
  }, []);
};

export const useClipboard = () => {
  return React.useCallback(() => {
    return Clipboard.getStringAsync();
  }, []);
};
