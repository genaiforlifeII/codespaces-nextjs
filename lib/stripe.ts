import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export const PRICE_IDS = {
  PREMIUM: process.env.STRIPE_PRICE_ID_PREMIUM || '',
};

export const PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    dailyLimit: 5,
  },
  PREMIUM: {
    name: 'Premium',
    price: 9,
    dailyLimit: 999999,
  },
};
