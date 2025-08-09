import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Powered by{' '}
          <a 
            href="https://zenquotes.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            ZenQuotes API
          </a>
        </p>
        <p className="footer-credits">
          Built with ❤️ for daily inspiration
        </p>
      </div>
    </footer>
  );
};
