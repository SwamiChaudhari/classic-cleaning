import QuoteForm from "./QuoteForm";

const trustSignals = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    label: "Free Estimates",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: "No Contracts",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Same-Day Service",
  },
];

export default function FinalCTA() {
  return (
    <section
      id="quote"
      className="py-16 lg:py-24 bg-gradient-to-br from-navy via-navy-light to-navy relative overflow-hidden"
    >
      {/* Background decorative blobs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-green rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block bg-white/10 text-white/90 font-semibold text-sm px-4 py-2 rounded-full mb-6">
              Ready To Get Started?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Ready For A Cleaner Home?
            </h2>
            <p className="text-xl text-white/75 mb-8 max-w-xl mx-auto lg:mx-0">
              Get your free quote in less than 60 seconds. No obligation. No
              hidden fees. Just professional cleaning you can trust.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {trustSignals.map((signal, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2.5"
                >
                  <span className="text-green">{signal.icon}</span>
                  <span className="text-white/90 text-sm font-medium">
                    {signal.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick contact */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="tel:+1-800-555-0199"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl transition-all min-h-[48px]"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                (800) 555-0199
              </a>
              <a
                href="mailto:hello@procleanservices.com"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl transition-all min-h-[48px]"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email Us
              </a>
            </div>
          </div>

          {/* Right: Quote Form */}
          <div>
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
