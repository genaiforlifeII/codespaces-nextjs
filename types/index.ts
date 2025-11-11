export interface User {
  id: string;
  email: string;
  name?: string;
  picture?: string;
  subscriptionTier: 'free' | 'premium';
  subscriptionStatus: 'active' | 'inactive' | 'canceled';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  signalsUsedToday: number;
  dailyLimit: number;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  isAdmin: boolean;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userEmail: string;
  action: 'login' | 'logout' | 'signal_access' | 'upgrade' | 'downgrade' | 'account_created' | 'account_terminated';
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

export interface Signal {
  id: string;
  symbol: string;
  action: 'buy' | 'sell' | 'hold';
  price: number;
  targetPrice?: number;
  stopLoss?: number;
  confidence: number;
  reason: string;
  createdAt: Date;
  expiresAt?: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: 'free' | 'premium';
  status: 'active' | 'inactive' | 'canceled' | 'past_due';
  stripeSubscriptionId?: string;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalUsers: number;
  activeSubscriptions: number;
  revenue: number;
  signalsDelivered: number;
}

export interface PricingTier {
  name: string;
  price: number;
  features: string[];
  cta: string;
  popular?: boolean;
  stripePriceId?: string;
}
