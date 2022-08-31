import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const isServer = typeof window === 'undefined' ? true : false;
  if (isServer) {
    (async () => {
      const { server } = await import('@/mocks/server');
      server.listen();
    })();
  } else {
    (async () => {
      const { worker } = await import('@/mocks/broswer');
      worker.start();
    })();
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
