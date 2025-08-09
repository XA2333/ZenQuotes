// Types for the Quote of the Day application

export interface Quote {
  q: string; // Quote text
  a: string; // Author
  h?: string; // HTML content (optional)
}

export interface FavoriteQuote {
  id: string;
  text: string;
  author: string;
  dateAdded: string;
}

export interface AppState {
  currentQuote: Quote | null;
  isLoading: boolean;
  error: string | null;
  favorites: FavoriteQuote[];
  isDarkMode: boolean;
}

export type Theme = 'light' | 'dark';

export interface ApiResponse {
  success: boolean;
  data?: Quote[];
  error?: string;
}
