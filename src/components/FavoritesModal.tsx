import { X, Trash2, Share2, Copy } from 'lucide-react';
import type { FavoriteQuote } from '../types';
import './FavoritesModal.css';

interface FavoritesModalProps {
  isOpen: boolean;
  favorites: FavoriteQuote[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

export const FavoritesModal = ({ 
  isOpen, 
  favorites, 
  onClose, 
  onRemove 
}: FavoritesModalProps) => {
  if (!isOpen) return null;

  const handleCopy = async (quote: FavoriteQuote) => {
    const text = `"${quote.text}" - ${quote.author}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = async (quote: FavoriteQuote) => {
    const text = `"${quote.text}" - ${quote.author}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Favorite Quote',
          text: text,
        });
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    } else {
      handleCopy(quote);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Your Favorite Quotes</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          {favorites.length === 0 ? (
            <div className="empty-state">
              <p>No favorite quotes yet.</p>
              <p>Start building your collection by clicking the heart icon on quotes you love!</p>
            </div>
          ) : (
            <div className="favorites-list">
              {favorites.map((quote) => (
                <div key={quote.id} className="favorite-item">
                  <div className="favorite-content">
                    <blockquote className="favorite-text">
                      "{quote.text}"
                    </blockquote>
                    <div className="favorite-author">
                      — {quote.author}
                    </div>
                    <div className="favorite-date">
                      Added {new Date(quote.dateAdded).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="favorite-actions">
                    <button 
                      className="favorite-action-btn copy-btn"
                      onClick={() => handleCopy(quote)}
                      title="Copy quote"
                    >
                      <Copy size={16} />
                    </button>
                    
                    <button 
                      className="favorite-action-btn share-btn"
                      onClick={() => handleShare(quote)}
                      title="Share quote"
                    >
                      <Share2 size={16} />
                    </button>
                    
                    <button 
                      className="favorite-action-btn remove-btn"
                      onClick={() => onRemove(quote.id)}
                      title="Remove from favorites"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
