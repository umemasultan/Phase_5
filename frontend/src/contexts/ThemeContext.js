import React, { createContext, useContext, useState, useEffect } from 'react';
import twoColorTheme from '../styles/twoColorTheme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  const currentTheme = {
    ...twoColorTheme,
    mode: darkMode ? 'dark' : 'light',
    colors: {
      ...twoColorTheme.brand,
      ...twoColorTheme.mono,
      ...(darkMode ? twoColorTheme.dark : twoColorTheme.light),
    },
    isDark: darkMode,
    isLight: !darkMode,
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, darkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
