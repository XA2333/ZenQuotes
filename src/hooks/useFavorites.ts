import { useState, useEffect } from 'react';
import type { FavoriteQuote } from '../types';
import { StorageService } from '../services/storageService';

export interface UseFavoritesResult {
  favorites: FavoriteQuote[];
  addToFavorites: (text: string, author: string) => void;
  removeFromFavorites: (id: string) => void;
  isInFavorites: (text: string, author: string) => boolean;
}

/**
 * Custom hook for managing favorite quotes
 */
export const useFavorites = (): UseFavoritesResult => {
  const [favorites, setFavorites] = useState<FavoriteQuote[]>([]);

  // Load favorites on mount
  useEffect(() => {
    const savedFavorites = StorageService.getFavorites();
    setFavorites(savedFavorites);
  }, []);

  const addToFavorites = (text: string, author: string) => {
    StorageService.addToFavorites({ text, author });
    const updatedFavorites = StorageService.getFavorites();
    setFavorites(updatedFavorites);
  };

  const removeFromFavorites = (id: string) => {
    StorageService.removeFromFavorites(id);
    const updatedFavorites = StorageService.getFavorites();
    setFavorites(updatedFavorites);
  };

  const isInFavorites = (text: string, author: string): boolean => {
    return StorageService.isInFavorites(text, author);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isInFavorites
  };
};
