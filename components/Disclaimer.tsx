export default function Disclaimer() {
  return (
    <section className="py-16 bg-yellow-50 border-t border-b border-yellow-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <svg
              className="h-8 w-8 text-yellow-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Important Disclaimer
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>This is not financial advice.</strong> Stock market trading involves risk
              and may result in losses. The signals and information provided on this platform
              are for educational and informational purposes only. Past performance does not
              guarantee future results. You should conduct your own research and consult with
              qualified financial advisors before making any investment decisions. By using this
              service, you acknowledge and accept all risks associated with stock trading.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
