import { getDatabase, COLLECTIONS } from './mongodb';
import { ObjectId } from 'mongodb';
import type { User } from '@/types';

export async function getUserByEmail(email: string): Promise<User | null> {
  const db = await getDatabase();
  const user = await db.collection(COLLECTIONS.USERS).findOne({ email });
  
  if (!user) return null;
  
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    picture: user.picture,
    subscriptionTier: user.subscriptionTier || 'free',
    subscriptionStatus: user.subscriptionStatus || 'active',
    stripeCustomerId: user.stripeCustomerId,
    stripeSubscriptionId: user.stripeSubscriptionId,
    signalsUsedToday: user.signalsUsedToday || 0,
    dailyLimit: user.dailyLimit || 5,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastLoginAt: user.lastLoginAt,
    isAdmin: user.isAdmin || false,
  };
}

export async function createOrUpdateUser(userData: Partial<User>): Promise<User> {
  const db = await getDatabase();
  const now = new Date();
  
  const result = await db.collection(COLLECTIONS.USERS).findOneAndUpdate(
    { email: userData.email },
    {
      $set: {
        ...userData,
        updatedAt: now,
      },
      $setOnInsert: {
        createdAt: now,
        subscriptionTier: 'free',
        subscriptionStatus: 'active',
        signalsUsedToday: 0,
        dailyLimit: 5,
        isAdmin: false,
      },
    },
    { upsert: true, returnDocument: 'after' }
  );
  
  if (!result) {
    throw new Error('Failed to create or update user');
  }
  
  return {
    id: result._id.toString(),
    email: result.email,
    name: result.name,
    picture: result.picture,
    subscriptionTier: result.subscriptionTier,
    subscriptionStatus: result.subscriptionStatus,
    stripeCustomerId: result.stripeCustomerId,
    stripeSubscriptionId: result.stripeSubscriptionId,
    signalsUsedToday: result.signalsUsedToday,
    dailyLimit: result.dailyLimit,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    lastLoginAt: result.lastLoginAt,
    isAdmin: result.isAdmin,
  };
}

export async function logActivity(
  userId: string,
  userEmail: string,
  action: string,
  metadata?: Record<string, any>
): Promise<void> {
  const db = await getDatabase();
  await db.collection(COLLECTIONS.ACTIVITY_LOGS).insertOne({
    userId,
    userEmail,
    action,
    metadata,
    timestamp: new Date(),
  });
}

export async function resetDailySignalCounts(): Promise<void> {
  const db = await getDatabase();
  await db.collection(COLLECTIONS.USERS).updateMany(
    {},
    { $set: { signalsUsedToday: 0 } }
  );
}

export async function canAccessSignal(userId: string): Promise<boolean> {
  const db = await getDatabase();
  const user = await db.collection(COLLECTIONS.USERS).findOne({ _id: new ObjectId(userId) });
  
  if (!user) return false;
  
  if (user.subscriptionTier === 'premium' && user.subscriptionStatus === 'active') {
    return true;
  }
  
  return user.signalsUsedToday < user.dailyLimit;
}

export async function incrementSignalCount(userId: string): Promise<void> {
  const db = await getDatabase();
  await db.collection(COLLECTIONS.USERS).updateOne(
    { _id: new ObjectId(userId) },
    { $inc: { signalsUsedToday: 1 } }
  );
}
