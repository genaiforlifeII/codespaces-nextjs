import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '@/components/Layout';
import { checkAdminAccess } from '@/lib/auth';
import { getDatabase, COLLECTIONS } from '@/lib/mongodb';
import toast from 'react-hot-toast';

interface AdminUser {
  _id: string;
  email: string;
  name?: string;
  subscriptionTier: string;
  subscriptionStatus: string;
  createdAt: string;
  lastLoginAt?: string;
  signalsUsedToday: number;
}

interface ActivityLog {
  _id: string;
  userEmail: string;
  action: string;
  timestamp: string;
  metadata?: any;
}

interface AdminProps {
  users: AdminUser[];
  activityLogs: ActivityLog[];
  stats: {
    totalUsers: number;
    premiumUsers: number;
    activeToday: number;
  };
}

export default function Admin({ users: initialUsers, activityLogs, stats: initialStats }: AdminProps) {
  const [users, setUsers] = useState(initialUsers);
  const [stats, setStats] = useState(initialStats);
  const [activeTab, setActiveTab] = useState<'users' | 'logs'>('users');

  const handleTerminateUser = async (email: string) => {
    if (!confirm(`Are you sure you want to terminate user: ${email}?`)) {
      return;
    }

    try {
      const response = await fetch('/api/admin/terminate-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('User terminated successfully');
        setUsers(users.filter(u => u.email !== email));
      } else {
        toast.error('Failed to terminate user');
      }
    } catch (error) {
      toast.error('Error terminating user');
    }
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - Stock Signals</title>
      </Head>

      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage users and monitor activity</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card bg-primary-50 border-l-4 border-primary-600">
              <p className="text-sm text-primary-700 font-semibold">Total Users</p>
              <p className="text-3xl font-bold text-primary-900 mt-1">{stats.totalUsers}</p>
            </div>
            <div className="card bg-green-50 border-l-4 border-green-600">
              <p className="text-sm text-green-700 font-semibold">Premium Users</p>
              <p className="text-3xl font-bold text-green-900 mt-1">{stats.premiumUsers}</p>
            </div>
            <div className="card bg-yellow-50 border-l-4 border-yellow-600">
              <p className="text-sm text-yellow-700 font-semibold">Active Today</p>
              <p className="text-3xl font-bold text-yellow-900 mt-1">{stats.activeToday}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('users')}
                className={`${
                  activeTab === 'users'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Users ({users.length})
              </button>
              <button
                onClick={() => setActiveTab('logs')}
                className={`${
                  activeTab === 'logs'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Activity Logs ({activityLogs.length})
              </button>
            </nav>
          </div>

          {/* Users Table */}
          {activeTab === 'users' && (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subscription
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Signals Used
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name || 'N/A'}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.subscriptionTier === 'premium'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {user.subscriptionTier}
                          </span>
                          <span className="ml-2 text-xs text-gray-500 capitalize">
                            ({user.subscriptionStatus})
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.signalsUsedToday}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastLoginAt
                            ? new Date(user.lastLoginAt).toLocaleDateString()
                            : 'Never'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleTerminateUser(user.email)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Terminate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Activity Logs */}
          {activeTab === 'logs' && (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activityLogs.map((log) => (
                      <tr key={log._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {log.userEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {log.metadata && JSON.stringify(log.metadata)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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

    try {
      checkAdminAccess(session.user.email);
    } catch (error) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }

    const db = await getDatabase();
    
    const users = await db
      .collection(COLLECTIONS.USERS)
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    const activityLogs = await db
      .collection(COLLECTIONS.ACTIVITY_LOGS)
      .find({})
      .sort({ timestamp: -1 })
      .limit(100)
      .toArray();

    const totalUsers = await db.collection(COLLECTIONS.USERS).countDocuments();
    const premiumUsers = await db
      .collection(COLLECTIONS.USERS)
      .countDocuments({ subscriptionTier: 'premium', subscriptionStatus: 'active' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeToday = await db
      .collection(COLLECTIONS.ACTIVITY_LOGS)
      .countDocuments({
        action: 'login',
        timestamp: { $gte: today },
      });

    return {
      props: {
        users: JSON.parse(JSON.stringify(users)),
        activityLogs: JSON.parse(JSON.stringify(activityLogs)),
        stats: {
          totalUsers,
          premiumUsers,
          activeToday,
        },
      },
    };
  },
});
