/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { colors } from '../tokens';

// ── Theme Definitions ────────────────────────────────────────────────────────
export const themes = {
  dark: {
    ...colors,
    border: 'rgba(255, 255, 255, 0.12)',
    borderHover: 'rgba(255, 255, 255, 0.35)',
    panel: 'rgba(255, 255, 255, 0.03)',
    mesh: 'rgba(255, 255, 255, 0.04)',
    inverse: '#ffffff',
    inverseBase: '#000000',
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
    inverseBase: '#ffffff',
  },
};

// ── Storage Key ──────────────────────────────────────────────────────────────
const STORAGE_KEY = 'vektor-theme';

/**
 * Resolves the initial dark/light preference:
 *   1. localStorage (returning visitor)
 *   2. OS-level prefers-color-scheme
 *   3. Default to dark
 */
function getInitialIsDark() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
  } catch {
    // localStorage unavailable (SSR, private browsing, etc.)
  }

  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  return true;
}

// ── Context ──────────────────────────────────────────────────────────────────
const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(getInitialIsDark);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const currentTheme = isDark ? themes.dark : themes.light;

  // Persist preference to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch {
      // Silently fail if storage is unavailable
    }
  }, [isDark]);

  // Sync CSS custom properties for stylesheet-based consumers
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(currentTheme).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ isDark, currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
