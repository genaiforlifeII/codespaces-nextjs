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
      badge: 'Perfect to Start',
      badgeColor: 'gray',
      features: [
        { text: '5 signals per day', description: 'Quality signals to get you started' },
        { text: 'Discord access', description: 'Join our community' },
        { text: 'Performance tracking', description: 'Monitor your progress' },
        { text: 'Email support', description: "We're here to help" },
      ],
      cta: user ? 'Go to Dashboard' : 'Get Started Free',
      ctaHref: user ? '/dashboard' : '/api/auth/login',
      popular: false,
    },
    {
      name: 'Premium',
      price: '$9',
      period: 'per month',
      description: 'For serious traders',
      badge: 'MOST POPULAR',
      badgeColor: 'yellow',
      savings: 'Save $99/year vs daily signals',
      features: [
        { text: 'Unlimited signals', description: 'All signals, all the time' },
        { text: 'Multi-channel delivery', description: 'Discord, Telegram & WhatsApp' },
        { text: 'Advanced analytics', description: 'Deep insights & reports' },
        { text: 'Priority 24/7 support', description: 'Get help anytime' },
        { text: 'Exclusive research', description: 'Market reports & insights' },
        { text: 'Early access', description: 'Be first to new features' },
      ],
      cta: user ? 'Upgrade to Premium' : 'Start Premium Today',
      ctaAction: handleSubscribe,
      popular: true,
    },
  ];

  return (
    <section id="pricing" className="section relative overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white">
      {/* Background Decoration */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="section-title">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-full mb-6 font-semibold text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            Simple Pricing
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Choose Your
            <span className="block mt-2 gradient-text">Trading Edge</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`group relative animate-slide-up ${tier.popular ? '' : 'card-interactive bg-white'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {tier.popular ? (
                <>
                  {/* Glow Effect for Premium */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 rounded-3xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Card Content */}
                  <div className="relative card bg-white">
                    {/* Popular Badge */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-glow flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {tier.badge}
                      </div>
                    </div>
                    
                    <div className="text-center mb-8 pt-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full mb-4 text-sm font-semibold">
                        Best Value
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{tier.name}</h3>
                      <div className="flex items-baseline justify-center">
                        <span className="text-6xl font-black gradient-text">{tier.price}</span>
                        <span className="text-gray-600 ml-3 font-medium">/{tier.period.replace('per ', '')}</span>
                      </div>
                      {tier.savings && (
                        <p className="text-primary-600 mt-2 text-sm font-semibold">{tier.savings}</p>
                      )}
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                            <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="text-gray-900 font-bold">{feature.text}</span>
                            {feature.description && (
                              <p className="text-gray-500 text-sm">{feature.description}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                    
                    {tier.ctaAction ? (
                      <button
                        onClick={tier.ctaAction}
                        disabled={loading}
                        className="w-full btn-primary flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <span>{tier.cta}</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        )}
                      </button>
                    ) : (
                      <a href={tier.ctaHref} className="w-full btn-primary block text-center">
                        <span>{tier.cta}</span>
                        <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Free Tier Content */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full mb-4 text-sm font-semibold">
                      {tier.badge}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{tier.name}</h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-6xl font-black text-gray-900">{tier.price}</span>
                      <span className="text-gray-600 ml-3 font-medium">/{tier.period}</span>
                    </div>
                    <p className="text-gray-500 mt-2 text-sm">Forever free, no credit card required</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-gray-900 font-semibold">{feature.text}</span>
                          {feature.description && (
                            <p className="text-gray-500 text-sm">{feature.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <a href={tier.ctaHref} className="w-full btn-outline block text-center group-hover:shadow-lg transition-shadow">
                    {tier.cta}
                  </a>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">No hidden fees</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Join thousands of traders who trust us with their trading decisions. Start free, upgrade only when you see the value.
          </p>
        </div>
      </div>
    </section>
  );
}

