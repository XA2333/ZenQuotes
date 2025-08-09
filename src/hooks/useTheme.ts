import { useState, useEffect } from 'react';
import type { Theme } from '../types';
import { StorageService } from '../services/storageService';

export interface UseThemeResult {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

/**
 * Custom hook for managing theme state
 */
export const useTheme = (): UseThemeResult => {
  const [theme, setThemeState] = useState<Theme>('light');

  // Load theme on mount
  useEffect(() => {
    const savedTheme = StorageService.getTheme();
    setThemeState(savedTheme);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    StorageService.saveTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return {
    theme,
    toggleTheme,
    setTheme
  };
};
