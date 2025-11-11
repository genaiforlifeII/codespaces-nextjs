export default function Features() {
  const features = [
    {
      icon: '🎯',
      title: 'Expert Analysis',
      description: 'Our team of experienced traders analyzes thousands of stocks daily to find the best opportunities.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '⚡',
      title: 'Real-Time Signals',
      description: 'Get instant notifications when our system identifies high-probability trading opportunities.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: '📊',
      title: 'Proven Strategies',
      description: 'Benefit from battle-tested trading strategies with consistent track records.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '🛡️',
      title: 'Risk Management',
      description: 'Every signal includes stop-loss and target prices to help protect your capital.',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: '📱',
      title: 'Multi-Channel Delivery',
      description: 'Receive signals via Discord, Telegram, or WhatsApp - choose what works for you.',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: '📈',
      title: 'Performance Tracking',
      description: 'Track your performance and see detailed analytics on all past signals.',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <section id="features" className="section bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="section-title">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full mb-6 font-semibold text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Why Choose Us
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Everything You Need to
            <span className="block mt-2 gradient-text">Trade Like a Pro</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to help you make smarter trading decisions with confidence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative card-interactive animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500`}></div>
              
              {/* Card Content */}
              <div className="relative bg-white rounded-2xl p-8 h-full">
                {/* Icon Container */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 text-3xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {feature.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover Arrow */}
                <div className="mt-6 flex items-center text-primary-600 font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-sm">Learn more</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 mb-6 text-lg">Ready to start trading smarter?</p>
          <a href="/api/auth/login" className="btn-primary inline-flex items-center gap-2">
            Get Started for Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
