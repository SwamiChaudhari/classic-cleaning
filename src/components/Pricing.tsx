import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$99",
    period: "per visit",
    desc: "Perfect for regular maintenance cleaning",
    features: [
      "All common areas cleaned",
      "Kitchen & bathroom surfaces",
      "Vacuuming & mopping",
      "Trash removal",
      "Dusting all surfaces",
    ],
    popular: false,
    cta: "Get Quote",
  },
  {
    name: "Deep",
    price: "$199",
    period: "per visit",
    desc: "Comprehensive top-to-bottom cleaning",
    features: [
      "Everything in Starter",
      "Inside oven & refrigerator",
      "Cabinet interiors",
      "Baseboard scrubbing",
      "Window cleaning",
      "Grout & tile scrubbing",
    ],
    popular: true,
    cta: "Get Quote",
  },
  {
    name: "Move-Out",
    price: "$249",
    period: "per visit",
    desc: "Get your security deposit back",
    features: [
      "Everything in Deep Clean",
      "Wall spot cleaning",
      "Carpet steam cleaning",
      "Light fixture cleaning",
      "Garage cleaning",
      "Final walkthrough",
    ],
    popular: false,
    cta: "Get Quote",
  },
  {
    name: "Commercial",
    price: "Custom",
    period: "quote",
    desc: "Tailored for your business needs",
    features: [
      "Custom cleaning plan",
      "Flexible scheduling",
      "Dedicated team",
      "Monthly billing",
      "Account manager",
      "Emergency service",
    ],
    popular: false,
    cta: "Contact Us",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-light text-orange font-semibold text-sm px-4 py-2 rounded-full mb-4">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy mb-4">
            Simple, Honest Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No hidden fees. No surprises. Get an exact quote for your specific
            needs.
          </p>
        </div>

        {/* Cards: horizontal snap scroll on mobile, 4-col grid on desktop */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 sm:grid sm:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:overflow-visible sm:pb-0">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-2xl p-6 border-2 shadow-sm transition-all hover:shadow-xl shrink-0 w-[85vw] max-w-[320px] snap-center sm:w-auto sm:max-w-none ${
                plan.popular
                  ? "border-orange scale-[1.02] lg:scale-105 shadow-lg"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-xl font-bold text-navy mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>

              <div className="mb-5">
                <span className="text-4xl font-extrabold text-navy">
                  {plan.price}
                </span>
                <span className="text-gray-500 text-sm">/{plan.period}</span>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="w-5 h-5 rounded-full bg-green text-white flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="#quote"
                className={`block w-full text-center font-bold py-3.5 rounded-xl transition-all min-h-[48px] ${
                  plan.popular
                    ? "bg-orange hover:bg-orange/90 text-white hover:shadow-lg"
                    : "bg-navy hover:bg-navy-light text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          💡 All prices are starting from. Final price depends on property size
          and condition.{" "}
          <Link
            href="#quote"
            className="text-blue font-semibold hover:underline"
          >
            Get your exact quote
          </Link>{" "}
          in 60 seconds.
        </p>
      </div>
    </section>
  );
}
