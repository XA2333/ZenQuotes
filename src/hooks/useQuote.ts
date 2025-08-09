import { useState, useEffect } from 'react';
import type { Quote } from '../types';
import { QuoteService } from '../services/quoteService';
import { StorageService } from '../services/storageService';

export interface UseQuoteResult {
  quote: Quote | null;
  isLoading: boolean;
  error: string | null;
  refreshQuote: () => Promise<void>;
  getRandomQuote: () => Promise<void>;
}

/**
 * Custom hook for managing quote state and API calls
 */
export const useQuote = (): UseQuoteResult => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Try to get today's quote first
      let result = await QuoteService.getTodayQuote();
      
      // If that fails, try random quote
      if (!result.success) {
        result = await QuoteService.getRandomQuote();
      }

      if (result.success && result.data && result.data.length > 0) {
        setQuote(result.data[0]);
        StorageService.saveLastQuoteDate();
      } else {
        // Use fallback quote if all API calls fail
        const fallbackQuote = QuoteService.getFallbackQuote();
        setQuote(fallbackQuote);
        setError('Using offline quote. Please check your internet connection.');
      }
    } catch (err) {
      const fallbackQuote = QuoteService.getFallbackQuote();
      setQuote(fallbackQuote);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshQuote = async () => {
    await fetchQuote();
  };

  const getRandomQuote = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Always fetch a random quote, not today's quote
      const result = await QuoteService.getRandomQuote();
      
      if (result.success && result.data && result.data.length > 0) {
        setQuote(result.data[0]);
      } else {
        // Use fallback quote if API call fails
        const fallbackQuote = QuoteService.getFallbackQuote();
        setQuote(fallbackQuote);
        setError('Using offline quote. Please check your internet connection.');
      }
    } catch (err) {
      const fallbackQuote = QuoteService.getFallbackQuote();
      setQuote(fallbackQuote);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return {
    quote,
    isLoading,
    error,
    refreshQuote,
    getRandomQuote
  };
};
