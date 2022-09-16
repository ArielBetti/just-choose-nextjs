import { useState, useEffect } from "react";

const useThemeDetector = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const observeWindow = window.matchMedia("(prefers-color-scheme: dark)").matches;

    setIsDarkTheme(observeWindow);
  }, []);
  return isDarkTheme;
};

export default useThemeDetector;
