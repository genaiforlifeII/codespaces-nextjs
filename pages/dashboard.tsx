import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { getUserByEmail } from '@/lib/db-helpers';
import { User } from '@/types';
import { isAdmin } from '@/lib/auth';

interface DashboardProps {
  user: User;
  isAdmin: boolean;
}

export default function Dashboard({ user, isAdmin: userIsAdmin }: DashboardProps) {
  const discordInvite = process.env.NEXT_PUBLIC_DISCORD_INVITE;
  
  return (
    <>
      <Head>
        <title>Dashboard - Stock Signals</title>
      </Head>

      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
            <p className="text-gray-600 mt-2">Here's your trading dashboard</p>
          </div>

          {/* Admin Link */}
          {userIsAdmin && (
            <div className="mb-6">
              <Link
                href="/admin"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm2 2v8h10V5H5z" clipRule="evenodd" />
                </svg>
                Admin Dashboard
              </Link>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Subscription</p>
                  <p className="text-2xl font-bold text-gray-900 capitalize mt-1">
                    {user.subscriptionTier}
                  </p>
                </div>
                <div className={`text-4xl ${user.subscriptionTier === 'premium' ? 'text-primary-600' : 'text-gray-400'}`}>
                  {user.subscriptionTier === 'premium' ? '⭐' : '🆓'}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Signals Today</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {user.signalsUsedToday} / {user.dailyLimit === 999999 ? '∞' : user.dailyLimit}
                  </p>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-2xl font-bold text-green-600 capitalize mt-1">
                    {user.subscriptionStatus}
                  </p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </div>
          </div>

          {/* Upgrade CTA for Free Users */}
          {user.subscriptionTier === 'free' && (
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-8 text-white mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold mb-2">Upgrade to Premium</h2>
                  <p className="text-primary-100">
                    Get unlimited signals, priority support, and advanced analytics for just $9/month
                  </p>
                </div>
                <Link
                  href="/#pricing"
                  className="btn-primary bg-white text-primary-600 hover:bg-gray-100 whitespace-nowrap"
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          )}

          {/* Signal Channels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📱 Discord Channel</h3>
              <p className="text-gray-600 mb-4">
                Join our Discord community to receive real-time trading signals and connect with other traders.
              </p>
              {discordInvite ? (
                <a
                  href={discordInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block"
                >
                  Join Discord
                </a>
              ) : (
                <p className="text-sm text-gray-500">Discord invite link not configured</p>
              )}
            </div>

            <div className="card bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🔔 More Channels Coming Soon</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-2">⏳</span>
                  Telegram - Coming Soon
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-2">⏳</span>
                  WhatsApp - Coming Soon
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-2">⏳</span>
                  Email Alerts - Coming Soon
                </li>
              </ul>
            </div>
          </div>

          {/* Account Management */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="text-gray-900 font-medium">{user.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Member Since</label>
                <p className="text-gray-900 font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              {user.subscriptionTier === 'premium' && user.stripeCustomerId && (
                <div className="pt-4 border-t">
                  <a
                    href="/api/create-portal-session"
                    className="btn-secondary inline-block"
                  >
                    Manage Subscription
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const session = await getSession(req, res);
    
    if (!session || !session.user) {
      return {
        redirect: {
          destination: '/api/auth/login',
          permanent: false,
        },
      };
    }

    const user = await getUserByEmail(session.user.email);
    
    if (!user) {
      return {
        redirect: {
          destination: '/api/auth/login',
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        isAdmin: isAdmin(session.user.email),
      },
    };
  },
});
