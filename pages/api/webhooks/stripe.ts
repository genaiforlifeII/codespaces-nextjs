import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { getDatabase, COLLECTIONS } from '@/lib/mongodb';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    return res.status(400).send('Missing stripe-signature header');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const db = await getDatabase();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        await db.collection(COLLECTIONS.USERS).updateOne(
          { email: session.customer_email },
          {
            $set: {
              subscriptionTier: 'premium',
              subscriptionStatus: 'active',
              stripeCustomerId: session.customer,
              stripeSubscriptionId: session.subscription,
              dailyLimit: 999999,
              updatedAt: new Date(),
            },
          }
        );

        // Log activity
        await db.collection(COLLECTIONS.ACTIVITY_LOGS).insertOne({
          userEmail: session.customer_email,
          action: 'upgrade',
          metadata: {
            subscriptionId: session.subscription,
          },
          timestamp: new Date(),
        });
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        await db.collection(COLLECTIONS.USERS).updateOne(
          { stripeSubscriptionId: subscription.id },
          {
            $set: {
              subscriptionStatus: subscription.status === 'active' ? 'active' : 'inactive',
              updatedAt: new Date(),
            },
          }
        );
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        await db.collection(COLLECTIONS.USERS).updateOne(
          { stripeSubscriptionId: subscription.id },
          {
            $set: {
              subscriptionTier: 'free',
              subscriptionStatus: 'canceled',
              dailyLimit: 5,
              stripeSubscriptionId: null,
              updatedAt: new Date(),
            },
          }
        );

        // Log activity
        const user = await db.collection(COLLECTIONS.USERS).findOne({
          stripeSubscriptionId: subscription.id,
        });
        
        if (user) {
          await db.collection(COLLECTIONS.ACTIVITY_LOGS).insertOne({
            userId: user._id.toString(),
            userEmail: user.email,
            action: 'downgrade',
            metadata: {
              reason: 'subscription_canceled',
            },
            timestamp: new Date(),
          });
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: error.message });
  }
}
