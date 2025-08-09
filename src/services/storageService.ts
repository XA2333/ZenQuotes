import type { FavoriteQuote, Theme } from '../types';

// Local storage service for persisting user data
export class StorageService {
  private static readonly FAVORITES_KEY = 'quote-app-favorites';
  private static readonly THEME_KEY = 'quote-app-theme';
  private static readonly LAST_QUOTE_DATE_KEY = 'quote-app-last-date';

  /**
   * Get saved favorite quotes
   */
  static getFavorites(): FavoriteQuote[] {
    try {
      const stored = localStorage.getItem(this.FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  }

  /**
   * Save favorite quotes
   */
  static saveFavorites(favorites: FavoriteQuote[]): void {
    try {
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }

  /**
   * Add a quote to favorites
   */
  static addToFavorites(quote: Omit<FavoriteQuote, 'id' | 'dateAdded'>): void {
    const favorites = this.getFavorites();
    const newFavorite: FavoriteQuote = {
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
      ...quote
    };
    
    // Check if quote already exists
    const exists = favorites.some(fav => 
      fav.text === quote.text && fav.author === quote.author
    );
    
    if (!exists) {
      favorites.push(newFavorite);
      this.saveFavorites(favorites);
    }
  }

  /**
   * Remove a quote from favorites
   */
  static removeFromFavorites(id: string): void {
    const favorites = this.getFavorites();
    const filtered = favorites.filter(fav => fav.id !== id);
    this.saveFavorites(filtered);
  }

  /**
   * Check if a quote is in favorites
   */
  static isInFavorites(text: string, author: string): boolean {
    const favorites = this.getFavorites();
    return favorites.some(fav => fav.text === text && fav.author === author);
  }

  /**
   * Get saved theme preference
   */
  static getTheme(): Theme {
    try {
      const stored = localStorage.getItem(this.THEME_KEY);
      return (stored as Theme) || 'light';
    } catch (error) {
      console.error('Error loading theme:', error);
      return 'light';
    }
  }

  /**
   * Save theme preference
   */
  static saveTheme(theme: Theme): void {
    try {
      localStorage.setItem(this.THEME_KEY, theme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }

  /**
   * Get the date when the last quote was fetched
   */
  static getLastQuoteDate(): string | null {
    try {
      return localStorage.getItem(this.LAST_QUOTE_DATE_KEY);
    } catch (error) {
      console.error('Error loading last quote date:', error);
      return null;
    }
  }

  /**
   * Save the current date as last quote fetch date
   */
  static saveLastQuoteDate(): void {
    try {
      const today = new Date().toDateString();
      localStorage.setItem(this.LAST_QUOTE_DATE_KEY, today);
    } catch (error) {
      console.error('Error saving last quote date:', error);
    }
  }

  /**
   * Check if we should fetch a new quote (new day)
   */
  static shouldFetchNewQuote(): boolean {
    const lastDate = this.getLastQuoteDate();
    const today = new Date().toDateString();
    return lastDate !== today;
  }
}
