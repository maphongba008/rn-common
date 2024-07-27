import React from "react";

export const useUniqId = () => {
  const idRef = React.useRef(0);
  return {
    next: () => {
      const current = idRef.current;
      idRef.current += 1;
      return String(current);
    },
  };
};
