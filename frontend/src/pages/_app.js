import '../styles/globals.css';
import '../styles/alignment.css';
import '../styles/box-system.css';
import '../styles/box-content-colors.css';
import '../styles/modern.css';
import { ThemeProvider } from '../contexts/ThemeContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;