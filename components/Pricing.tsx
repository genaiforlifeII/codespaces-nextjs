import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Pricing() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      window.location.href = '/api/auth/login';
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });
      
      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const tiers = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '5 signals per day',
        'Discord access',
        'Basic market insights',
        'Community support',
        'Email alerts',
      ],
      cta: 'Get Started',
      ctaHref: '/api/auth/login',
      popular: false,
    },
    {
      name: 'Premium',
      price: '$9',
      period: 'per month',
      description: 'For serious traders',
      features: [
        'Unlimited signals',
        'Priority Discord access',
        'Advanced market analysis',
        'Priority support',
        'SMS & Email alerts',
        'Telegram access (coming soon)',
        'WhatsApp access (coming soon)',
        'Performance analytics',
      ],
      cta: 'Upgrade to Premium',
      ctaAction: handleSubscribe,
      popular: true,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free, upgrade when you're ready
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`card relative ${
                tier.popular ? 'ring-2 ring-primary-600 shadow-2xl scale-105' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 mb-4">{tier.description}</p>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-gray-600 ml-2">/ {tier.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {tier.ctaAction ? (
                <button
                  onClick={tier.ctaAction}
                  disabled={loading}
                  className="w-full btn-primary"
                >
                  {loading ? 'Processing...' : tier.cta}
                </button>
              ) : (
                <a
                  href={tier.ctaHref}
                  className="block w-full text-center btn-outline"
                >
                  {tier.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
