import '../styles/globals.css';
import '@nextail/core/nextail.css';

import { LayoutProvider, ThemeProvider } from '@nextail/providers';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LayoutProvider sidebarDefault={true}>
        <Component {...pageProps} />
      </LayoutProvider>
    </ThemeProvider>
  );
}

export default MyApp;
