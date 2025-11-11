import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { createOrUpdateUser, logActivity } from '@/lib/db-helpers';
import { isAdmin } from '@/lib/auth';

const afterCallback = async (req: NextApiRequest, res: NextApiResponse, session: any) => {
  if (session.user) {
    try {
      // Create or update user in database
      const user = await createOrUpdateUser({
        email: session.user.email,
        name: session.user.name,
        picture: session.user.picture,
        lastLoginAt: new Date(),
        isAdmin: isAdmin(session.user.email),
      });

      // Log login activity
      await logActivity(
        user.id,
        user.email,
        'login',
        {
          userAgent: req.headers['user-agent'],
        }
      );

      // Add user database info to session
      session.user.dbId = user.id;
      session.user.subscriptionTier = user.subscriptionTier;
      session.user.isAdmin = user.isAdmin;
    } catch (error) {
      console.error('Error in afterCallback:', error);
    }
  }
  return session;
};

export default handleAuth({
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error: any) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
