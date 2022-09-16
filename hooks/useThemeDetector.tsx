import { useState, useEffect, useCallback } from "react";

const useThemeDetector = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const test = window.matchMedia("(prefers-color-scheme: dark)").matches;
    console.log(test);
    setIsDarkTheme(test);
  }, []);
  return isDarkTheme;
};

export default useThemeDetector;
