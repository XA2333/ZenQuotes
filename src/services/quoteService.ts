import type { Quote, ApiResponse } from '../types';

const API_BASE_URL = 'https://zenquotes.io/api';

// ZenQuotes API service
export class QuoteService {
  private static readonly CORS_PROXY = 'https://api.allorigins.win/raw?url=';
  
  /**
   * Fetches the quote of the day from ZenQuotes API
   * Uses a CORS proxy to handle cross-origin requests
   */
  static async getTodayQuote(): Promise<ApiResponse> {
    try {
      const response = await fetch(
        `${this.CORS_PROXY}${encodeURIComponent(API_BASE_URL + '/today')}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        return {
          success: true,
          data: data
        };
      } else {
        throw new Error('No quote data received');
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch quote'
      };
    }
  }

  /**
   * Fetches a random quote as fallback
   */
  static async getRandomQuote(): Promise<ApiResponse> {
    try {
      const response = await fetch(
        `${this.CORS_PROXY}${encodeURIComponent(API_BASE_URL + '/random')}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        return {
          success: true,
          data: data
        };
      } else {
        throw new Error('No quote data received');
      }
    } catch (error) {
      console.error('Error fetching random quote:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch random quote'
      };
    }
  }

  /**
   * Fetches multiple random quotes
   */
  static async getMultipleRandomQuotes(count: number = 5): Promise<ApiResponse> {
    try {
      const response = await fetch(
        `${this.CORS_PROXY}${encodeURIComponent(API_BASE_URL + `/random/${count}`)}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        return {
          success: true,
          data: data
        };
      } else {
        throw new Error('No quote data received');
      }
    } catch (error) {
      console.error('Error fetching multiple random quotes:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch multiple quotes'
      };
    }
  }

  /**
   * Fallback quotes in case API is unavailable
   */
  static getFallbackQuote(): Quote {
    const fallbackQuotes: Quote[] = [
      {
        q: "The only way to do great work is to love what you do.",
        a: "Steve Jobs"
      },
      {
        q: "Innovation distinguishes between a leader and a follower.",
        a: "Steve Jobs"
      },
      {
        q: "Life is what happens to you while you're busy making other plans.",
        a: "John Lennon"
      },
      {
        q: "The future belongs to those who believe in the beauty of their dreams.",
        a: "Eleanor Roosevelt"
      },
      {
        q: "It is during our darkest moments that we must focus to see the light.",
        a: "Aristotle"
      },
      {
        q: "Be yourself; everyone else is already taken.",
        a: "Oscar Wilde"
      },
      {
        q: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
        a: "Albert Einstein"
      },
      {
        q: "In three words I can sum up everything I've learned about life: it goes on.",
        a: "Robert Frost"
      },
      {
        q: "The only impossible journey is the one you never begin.",
        a: "Tony Robbins"
      },
      {
        q: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        a: "Winston Churchill"
      },
      {
        q: "The way to get started is to quit talking and begin doing.",
        a: "Walt Disney"
      },
      {
        q: "Don't let yesterday take up too much of today.",
        a: "Will Rogers"
      },
      {
        q: "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
        a: "Unknown"
      },
      {
        q: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.",
        a: "Steve Jobs"
      },
      {
        q: "The mind is everything. What you think you become.",
        a: "Buddha"
      }
    ];

    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
  }
}
