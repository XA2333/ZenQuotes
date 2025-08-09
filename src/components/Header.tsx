import { Moon, Sun, Heart, RotateCcw, Shuffle } from 'lucide-react';
import type { Theme } from '../types';
import './Header.css';

interface HeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
  onRefresh: () => void;
  onRandomQuote: () => void;
  onShowFavorites: () => void;
  favoritesCount: number;
}

export const Header = ({ 
  theme, 
  onThemeToggle, 
  onRefresh, 
  onRandomQuote,
  onShowFavorites,
  favoritesCount 
}: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          ✨ Quote of the Day
        </h1>
        
        <div className="header-actions">
          <button 
            className="action-button favorites-button"
            onClick={onShowFavorites}
            title="View favorites"
          >
            <Heart size={20} />
            {favoritesCount > 0 && (
              <span className="favorites-count">{favoritesCount}</span>
            )}
          </button>
          
          <button 
            className="action-button"
            onClick={onRefresh}
            title="Refresh today's quote"
          >
            <RotateCcw size={20} />
          </button>
          
          <button 
            className="action-button"
            onClick={onRandomQuote}
            title="Get random quote"
          >
            <Shuffle size={20} />
          </button>
          
          <button 
            className="action-button theme-button"
            onClick={onThemeToggle}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};
