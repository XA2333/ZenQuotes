# Quote of the Day 

A beautiful, modern web application that displays daily inspirational quotes using the ZenQuotes API. Built with React, TypeScript, and Vite for a fast, responsive, and delightful user experience.

## Features

- **Daily Quotes**: Fetches fresh inspirational quotes from the ZenQuotes API
- **Favorites System**: Save your favorite quotes for easy access
- **Dark/Light Theme**: Toggle between beautiful light and dark themes
- **Share & Copy**: Easily share quotes or copy them to clipboard
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Offline Support**: Fallback quotes when the API is unavailable
- **Modern UI**: Clean, accessible interface with smooth animations

## Live Demo

[View Live Demo](https://your-demo-url.com) *(Update this with your deployed URL)*

## Technologies Used

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with CSS Variables for theming
- **Icons**: Lucide React
- **API**: ZenQuotes API
- **Storage**: Local Storage for preferences and favorites
### Tech Stack Rationale

**React + TypeScript + Vite**
- **Why**: Modern frontend development standard with excellent developer experience
- **Benefits**: Type safety, component reusability, fast hot reload, optimized builds
- **Alternative**: Could use Next.js for SSR needs, but Vite is perfect for this SPA

**CSS Variables + Native CSS**
- **Why**: Lightweight theming without CSS-in-JS complexity
- **Benefits**: Native browser support, easy theme switching, no runtime overhead
- **Alternative**: Could use Tailwind CSS or styled-components, but native CSS keeps it simple

**Local Storage for State Persistence**
- **Why**: Simple client-side storage for user preferences
- **Benefits**: No backend needed, privacy-focused, works offline
- **Alternative**: Could integrate with Firebase or Supabase for cloud sync

**Lucide React Icons**
- **Why**: Lightweight, consistent design, tree-shakeable
- **Benefits**: Only bundles used icons, modern SVG-based
- **Alternative**: React Icons or Heroicons would work similarly
## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/quote-of-the-day.git
   cd quote-of-the-day
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Usage

- **View Quote**: The app automatically loads a quote when you visit
- **Refresh Quote**: Click the refresh button to get a new quote
- **Add to Favorites**: Click the heart icon to save quotes you love
- **View Favorites**: Click the heart button in the header to see all saved quotes
- **Toggle Theme**: Use the sun/moon icon to switch between light and dark themes
- **Share**: Use the share button to share quotes via native sharing or copy to clipboard

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # App header with navigation
│   ├── QuoteCard.tsx   # Main quote display component
│   ├── FavoritesModal.tsx # Modal for viewing favorites
│   └── Footer.tsx      # App footer
├── hooks/              # Custom React hooks
│   ├── useQuote.ts     # Quote fetching and management
│   ├── useFavorites.ts # Favorites management
│   └── useTheme.ts     # Theme switching
├── services/           # API and storage services
│   ├── quoteService.ts # ZenQuotes API integration
│   └── storageService.ts # Local storage utilities
├── types/              # TypeScript type definitions
│   └── index.ts        # App-wide types
└── styles/            # Component-specific CSS files
```

## Configuration

The app uses environment-friendly configurations:

- **API**: Uses ZenQuotes free API with CORS proxy
- **Storage**: Local storage for persistence
- **Themes**: CSS variables for easy customization
- **Responsive**: Mobile-first responsive design

## Customization

### Adding New Themes
Edit the CSS variables in `src/index.css` to create new themes:

```css
:root[data-theme="your-theme"] {
  --primary-color: #your-color;
  --bg-color: #your-bg;
  /* Add more variables */
}
```

### Modifying Quote Sources
Update `src/services/quoteService.ts` to use different APIs or add new endpoints.

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [ZenQuotes](https://zenquotes.io) for providing the quote API
- [Lucide](https://lucide.dev) for beautiful icons
- [Vite](https://vitejs.dev) for the amazing build tool
- [React](https://reactjs.org) for the component framework

## Contact

Wentao Ma 
email: ma450824851@gmail.com
       maxx7140@mylaurier.ca

Project Link: [https://github.com/your-username/quote-of-the-day](https://github.com/your-username/quote-of-the-day)

---

Built with ❤️ for spreading daily inspiration
[ZenQuotes](https://zenquotes.io)
