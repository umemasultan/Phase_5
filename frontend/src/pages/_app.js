import '../styles/globals.css';
import '../styles/alignment.css';
import '../styles/box-system.css';
import '../styles/box-content-colors.css';
import '../styles/modern.css';
import '../styles/alignment-fixes.css';
import { ThemeProvider } from '../contexts/ThemeContext';
import { WebSocketProvider } from '../contexts/WebSocketContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <WebSocketProvider>
        <Component {...pageProps} />
      </WebSocketProvider>
    </ThemeProvider>
  );
}

export default MyApp;