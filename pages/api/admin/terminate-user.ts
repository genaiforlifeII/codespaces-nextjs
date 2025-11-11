import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { checkAdminAccess } from '@/lib/auth';
import { getDatabase, COLLECTIONS } from '@/lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const session = await getSession(req, res);
    
    if (!session || !session.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    checkAdminAccess(session.user.email);

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const db = await getDatabase();
    
    // Delete user
    await db.collection(COLLECTIONS.USERS).deleteOne({ email });

    // Log activity
    await db.collection(COLLECTIONS.ACTIVITY_LOGS).insertOne({
      userEmail: email,
      action: 'account_terminated',
      metadata: {
        terminatedBy: session.user.email,
      },
      timestamp: new Date(),
    });

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error terminating user:', error);
    res.status(error.message === 'Unauthorized: Admin access required' ? 403 : 500).json({
      error: error.message,
    });
  }
}
