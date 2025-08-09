import { useState } from 'react';
import { Heart, Share2, Copy, CheckCircle } from 'lucide-react';
import type { Quote } from '../types';
import './QuoteCard.css';

interface QuoteCardProps {
  quote: Quote;
  isLoading: boolean;
  error: string | null;
  isInFavorites: boolean;
  onToggleFavorite: () => void;
}

export const QuoteCard = ({ 
  quote, 
  isLoading, 
  error, 
  isInFavorites, 
  onToggleFavorite 
}: QuoteCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!quote) return;
    
    const text = `"${quote.q}" - ${quote.a}`;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = async () => {
    if (!quote) return;
    
    const text = `"${quote.q}" - ${quote.a}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quote of the Day',
          text: text,
        });
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    } else {
      // Fallback to copying
      handleCopy();
    }
  };

  if (isLoading) {
    return (
      <div className="quote-card loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading your daily inspiration...</p>
        </div>
      </div>
    );
  }

  if (error && !quote) {
    return (
      <div className="quote-card error">
        <div className="error-content">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="quote-card error">
        <div className="error-content">
          <h3>No quote available</h3>
          <p>Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quote-card">
      {error && (
        <div className="error-banner">
          <p>{error}</p>
        </div>
      )}
      
      <div className="quote-content">
        <blockquote className="quote-text">
          "{quote.q}"
        </blockquote>
        
        <div className="quote-author">
          — {quote.a}
        </div>
      </div>
      
      <div className="quote-actions">
        <button 
          className={`action-btn favorite-btn ${isInFavorites ? 'favorited' : ''}`}
          onClick={onToggleFavorite}
          title={isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={isInFavorites ? 'currentColor' : 'none'} />
          {isInFavorites ? 'Favorited' : 'Favorite'}
        </button>
        
        <button 
          className="action-btn copy-btn"
          onClick={handleCopy}
          title="Copy quote"
        >
          {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
        
        <button 
          className="action-btn share-btn"
          onClick={handleShare}
          title="Share quote"
        >
          <Share2 size={18} />
          Share
        </button>
      </div>
    </div>
  );
};
