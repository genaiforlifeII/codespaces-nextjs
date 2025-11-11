import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <UserProvider>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </UserProvider>
  );
}
