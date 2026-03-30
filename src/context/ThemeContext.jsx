import { createContext, useContext, useState, useEffect } from "react";
import { THEME, getSavedTheme, saveTheme } from "../constants/themeConstants";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getSavedTheme);

  useEffect(() => {
    saveTheme(theme);
    document.documentElement.classList.toggle("dark", theme === THEME.DARK);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === THEME.DARK ? THEME.LIGHT : THEME.DARK));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === THEME.DARK }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);