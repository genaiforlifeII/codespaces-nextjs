import Head from 'next/head';
import Layout from '@/components/Layout';

export default function Blog() {
  const posts = [
    {
      title: 'Getting Started with Stock Trading Signals',
      excerpt: 'Learn how to use our platform to make smarter trading decisions.',
      date: '2024-11-01',
      slug: 'getting-started',
    },
    {
      title: '5 Risk Management Strategies Every Trader Should Know',
      excerpt: 'Protect your capital with these essential risk management techniques.',
      date: '2024-10-28',
      slug: 'risk-management',
    },
    {
      title: 'Understanding Market Volatility',
      excerpt: 'How to navigate uncertain markets and identify opportunities.',
      date: '2024-10-25',
      slug: 'market-volatility',
    },
  ];

  return (
    <>
      <Head>
        <title>Blog - Stock Signals</title>
        <meta
          name="description"
          content="Expert insights and trading tips from Stock Signals platform."
        />
      </Head>

      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trading Insights & Tips
            </h1>
            <p className="text-xl text-gray-600">
              Stay updated with the latest market analysis and trading strategies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article key={index} className="card hover:shadow-xl transition-shadow">
                <div className="mb-4">
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a
                  href={`/blog/${post.slug}`}
                  className="text-primary-600 font-semibold hover:text-primary-700"
                >
                  Read more →
                </a>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600">More articles coming soon...</p>
          </div>
        </div>
      </Layout>
    </>
  );
}
