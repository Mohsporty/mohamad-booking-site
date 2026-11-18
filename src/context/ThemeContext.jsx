import React, { createContext, useContext, useEffect, useState } from 'react';
import { THEME_KEY } from '../services/storage';

const ThemeContext = createContext({
  isDark: true,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved !== null) return saved === 'dark';
    } catch (e) {}
    return true; // Default dark
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      try { localStorage.setItem(THEME_KEY, 'dark'); } catch (e) {}
    } else {
      root.classList.remove('dark');
      try { localStorage.setItem(THEME_KEY, 'light'); } catch (e) {}
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
