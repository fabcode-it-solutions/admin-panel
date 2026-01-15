'use client';

import React, { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme-storage',
}: ThemeProviderProps) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // Initialize theme on mount
    // The theme store already handles persistence via zustand persist
    // This just ensures the theme is applied on initial load
    const stored = localStorage.getItem(storageKey);
    
    if (stored) {
      try {
        const { state } = JSON.parse(stored);
        if (state?.theme) {
          setTheme(state.theme);
        }
      } catch (error) {
        console.error('Error loading theme from storage:', error);
        setTheme(defaultTheme);
      }
    } else {
      setTheme(defaultTheme);
    }
  }, [defaultTheme, storageKey, setTheme]);

  return <>{children}</>;
}
