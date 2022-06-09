import '../styles/globals.css';
import '@nextail/core/nextail.css';

import { ThemeProvider } from '@nextail/providers';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
