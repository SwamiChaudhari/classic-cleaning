const steps = [
  {
    number: "01",
    title: "Request Quote",
    description:
      "Fill out our simple online form or give us a call. Tell us about your space and cleaning needs — it takes less than 2 minutes.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Schedule Service",
    description:
      "Pick a date and time that works for you. We offer flexible scheduling including evenings and weekends to fit your lifestyle.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "We Clean",
    description:
      "Our vetted, insured cleaning professionals arrive on time with all supplies. We follow a detailed checklist for every visit.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Enjoy",
    description:
      "Come back to a spotless space. Not satisfied? We'll come back and re-clean for free within 24 hours. That's our guarantee.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            How It Works
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Getting your space professionally cleaned is easier than you think.
            Four simple steps to a spotless home or office.
          </p>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/20" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex gap-5">
                {/* Number circle */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-orange flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-orange">{step.icon}</span>
                    <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Horizontal Steps */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-4 relative">
            {/* Horizontal connector line */}
            <div className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-white/20" />

            {steps.map((step) => (
              <div key={step.number} className="text-center relative">
                {/* Number circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-orange flex items-center justify-center mx-auto mb-5">
                  <span className="text-white font-bold text-lg">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-orange mb-3">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed max-w-[220px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 md:mt-16">
          <a
            href="/quote"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-semibold px-8 py-4 rounded-full transition-colors min-h-[48px]"
          >
            Get Your Free Quote
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
