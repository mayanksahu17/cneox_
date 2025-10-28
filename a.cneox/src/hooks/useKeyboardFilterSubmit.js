import React, { useEffect } from "react";

const useKeyboardFilterSubmit = (callback) => {
  useEffect(() => {
    const keyboardHandler = (e) => {
      if (e.key === "Enter") {
        callback();
        console.log(e.key);
      }
    };

    document.addEventListener("keydown", keyboardHandler);

    return () => {
      document.removeEventListener("keydown", keyboardHandler);
    };
  }, [callback]);
  return;
};

export default useKeyboardFilterSubmit;
