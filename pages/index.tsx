import { useUser } from '@auth0/nextjs-auth0/client';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import SignalChannels from '@/components/SignalChannels';
import Disclaimer from '@/components/Disclaimer';

export default function Home() {
  const { user, isLoading } = useUser();

  return (
    <>
      <Head>
        <title>Stock Signals - Let Us Do The Hard Work For You</title>
        <meta
          name="description"
          content="Stock trading shouldn't be hard. Get expert trading signals delivered daily. Join 1,000+ traders making smarter decisions."
        />
        <meta property="og:title" content="Stock Signals - Expert Trading Made Simple" />
        <meta
          property="og:description"
          content="Stock trading shouldn't be hard. Get expert trading signals delivered daily."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_APP_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content="stock trading, trading signals, stock market, investment, trading tips" />
      </Head>

      <Layout>
        <Hero />
        <Features />
        <Pricing />
        <SignalChannels />
        <Testimonials />
        <Disclaimer />
      </Layout>
    </>
  );
}
