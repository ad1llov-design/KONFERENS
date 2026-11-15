'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeMode } from '@/lib/types';
import { DemoState } from '@/lib/demo-state';

interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  resolvedTheme: 'light',
  setTheme: () => {},
});

const THEME_STORAGE_KEY = 'kivora-theme';

function applyThemeToDocument(mode: ThemeMode): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const root = document.documentElement;
  let effective: 'light' | 'dark' = 'light';

  if (mode === 'system') {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    effective = isSystemDark ? 'dark' : 'light';
  } else {
    effective = mode;
  }

  if (effective === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
  }

  return effective;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage, profile, or default to light
  useEffect(() => {
    setMounted(true);
    let initialTheme: ThemeMode = 'light';
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        initialTheme = stored;
      } else {
        const user = DemoState.getUser();
        if (user?.theme) {
          initialTheme = user.theme;
        }
      }
    } catch {
      // Fallback
    }

    setThemeState(initialTheme);
    const effective = applyThemeToDocument(initialTheme);
    setResolvedTheme(effective);
  }, []);

  // Listen to system prefers-color-scheme changes if in 'system' mode
  useEffect(() => {
    if (!mounted) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function handleChange() {
      if (theme === 'system') {
        const effective = applyThemeToDocument('system');
        setResolvedTheme(effective);
      }
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  function setTheme(newTheme: ThemeMode) {
    setThemeState(newTheme);
    const effective = applyThemeToDocument(newTheme);
    setResolvedTheme(effective);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      DemoState.updateProfile({ theme: newTheme });
    } catch {
      // Ignore storage errors
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
