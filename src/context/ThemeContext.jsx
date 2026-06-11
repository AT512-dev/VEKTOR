import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    base: '#000000',
    surface: '#08080a',
    border: 'rgba(255, 255, 255, 0.12)',
    borderHover: 'rgba(255, 255, 255, 0.35)',
    primary: '#ffffff',
    secondary: '#f4f4f5',
    muted: '#a1a1aa',
    dim: '#52525b',
    panel: 'rgba(255, 255, 255, 0.03)',
    mesh: 'rgba(255, 255, 255, 0.04)',
    inverse: '#ffffff',
    inverseBase: '#000000'
  },
  light: {
    base: '#ffffff',
    surface: '#f9f9fb',
    border: 'rgba(0, 0, 0, 0.12)',
    borderHover: 'rgba(0, 0, 0, 0.4)',
    primary: '#000000',
    secondary: '#18181b',
    muted: '#71717a',
    dim: '#d4d4d8',
    panel: 'rgba(0, 0, 0, 0.02)',
    mesh: 'rgba(0, 0, 0, 0.03)',
    inverse: '#000000',
    inverseBase: '#ffffff'
  }
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);
  const currentTheme = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ isDark, currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
