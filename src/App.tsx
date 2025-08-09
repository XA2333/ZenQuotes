import { useState } from 'react';
import { Header } from './components/Header';
import { QuoteCard } from './components/QuoteCard';
import { FavoritesModal } from './components/FavoritesModal';
import { Footer } from './components/Footer';
import { useQuote } from './hooks/useQuote';
import { useFavorites } from './hooks/useFavorites';
import { useTheme } from './hooks/useTheme';
import './App.css';

function App() {
  const [showFavorites, setShowFavorites] = useState(false);
  
  const { quote, isLoading, error, refreshQuote, getRandomQuote } = useQuote();
  const { favorites, addToFavorites, removeFromFavorites, isInFavorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();

  const handleToggleFavorite = () => {
    if (!quote) return;
    
    if (isInFavorites(quote.q, quote.a)) {
      // Find and remove the favorite
      const favoriteToRemove = favorites.find(
        fav => fav.text === quote.q && fav.author === quote.a
      );
      if (favoriteToRemove) {
        removeFromFavorites(favoriteToRemove.id);
      }
    } else {
      addToFavorites(quote.q, quote.a);
    }
  };

  const isQuoteInFavorites = quote ? isInFavorites(quote.q, quote.a) : false;

  return (
    <div className="app">
      <Header
        theme={theme}
        onThemeToggle={toggleTheme}
        onRefresh={refreshQuote}
        onRandomQuote={getRandomQuote}
        onShowFavorites={() => setShowFavorites(true)}
        favoritesCount={favorites.length}
      />
      
      <main className="main-content">
        <div className="container">
          <QuoteCard
            quote={quote!}
            isLoading={isLoading}
            error={error}
            isInFavorites={isQuoteInFavorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </main>
      
      <Footer />
      
      <FavoritesModal
        isOpen={showFavorites}
        favorites={favorites}
        onClose={() => setShowFavorites(false)}
        onRemove={removeFromFavorites}
      />
    </div>
  );
}

export default App;
