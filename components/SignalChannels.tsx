export default function SignalChannels() {
  const channels = [
    {
      name: 'Discord',
      icon: '💬',
      status: 'active',
      description: 'Join our active community and get real-time signals',
      link: process.env.NEXT_PUBLIC_DISCORD_INVITE || '#',
    },
    {
      name: 'Telegram',
      icon: '✈️',
      status: 'coming-soon',
      description: 'Get signals delivered to your Telegram',
      link: '#',
    },
    {
      name: 'WhatsApp',
      icon: '📱',
      status: 'coming-soon',
      description: 'Receive signals via WhatsApp',
      link: '#',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Get Signals Your Way
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your preferred channel for receiving trading signals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {channels.map((channel, index) => (
            <div
              key={index}
              className={`card text-center ${
                channel.status === 'active' ? 'ring-2 ring-primary-600' : 'opacity-75'
              }`}
            >
              <div className="text-6xl mb-4">{channel.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{channel.name}</h3>
              {channel.status === 'coming-soon' && (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full mb-3">
                  Coming Soon
                </span>
              )}
              {channel.status === 'active' && (
                <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full mb-3">
                  Active
                </span>
              )}
              <p className="text-gray-600 mb-4">{channel.description}</p>
              {channel.status === 'active' ? (
                <a
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block"
                >
                  Join Now
                </a>
              ) : (
                <button disabled className="btn-secondary cursor-not-allowed">
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
