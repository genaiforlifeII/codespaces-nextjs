export default function Features() {
  const features = [
    {
      icon: '🎯',
      title: 'Expert Analysis',
      description: 'Our team of experienced traders analyzes thousands of stocks daily to find the best opportunities.',
    },
    {
      icon: '⚡',
      title: 'Real-Time Signals',
      description: 'Get instant notifications when our system identifies high-probability trading opportunities.',
    },
    {
      icon: '📊',
      title: 'Proven Strategies',
      description: 'Benefit from battle-tested trading strategies with consistent track records.',
    },
    {
      icon: '🛡️',
      title: 'Risk Management',
      description: 'Every signal includes stop-loss and target prices to help protect your capital.',
    },
    {
      icon: '📱',
      title: 'Multi-Channel Delivery',
      description: 'Receive signals via Discord, Telegram, or WhatsApp - choose what works for you.',
    },
    {
      icon: '📈',
      title: 'Performance Tracking',
      description: 'Track your performance and see detailed analytics on all past signals.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Stock Signals?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to make informed trading decisions, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card hover:shadow-xl transition-shadow duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
