import Link from "next/link";

const benefits = [
  "Custom cleaning plans tailored to your business",
  "After-hours cleaning available",
  "Dedicated account manager",
  "Monthly billing & flexible contracts",
  "Emergency cleaning services",
];

const commercialTypes = [
  {
    icon: "🏢",
    title: "Office Buildings",
    desc: "Daily, weekly, or custom cleaning schedules for offices of all sizes.",
  },
  {
    icon: "🏥",
    title: "Medical Clinics",
    desc: "Health-grade sanitization that meets medical facility standards.",
  },
  {
    icon: "🏪",
    title: "Retail Stores",
    desc: "Keep your storefront sparkling and welcoming for customers.",
  },
  {
    icon: "🏭",
    title: "Warehouses",
    desc: "Industrial cleaning including floor care, dust removal, and debris cleanup.",
  },
  {
    icon: "🍽️",
    title: "Restaurants",
    desc: "Kitchen deep cleaning, dining area sanitization, and health code compliance.",
  },
  {
    icon: "🏫",
    title: "Schools & Daycares",
    desc: "Safe, non-toxic cleaning for educational facilities.",
  },
];

export default function Commercial() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <span className="inline-block bg-blue-light text-blue font-semibold text-sm px-4 py-2 rounded-full mb-4">
              Commercial Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4 leading-tight">
              Professional Commercial Cleaning
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              From offices to warehouses, we provide comprehensive commercial
              cleaning solutions that keep your business looking professional and
              your employees healthy.
            </p>

            {/* Benefits list */}
            <div className="bg-gradient-to-r from-blue-light to-green-light rounded-2xl p-6 mb-8">
              <h4 className="font-bold text-navy mb-4 text-lg">
                Why Businesses Choose Us
              </h4>
              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
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
                    <span className="text-gray-700 text-sm sm:text-base">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="#quote"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all hover:shadow-lg hover:scale-[1.02] min-h-[52px]"
            >
              Get Commercial Quote
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Right: Commercial types grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {commercialTypes.map((type, i) => (
              <div
                key={i}
                className="bg-surface rounded-2xl p-5 border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{type.icon}</div>
                <h3 className="font-bold text-navy mb-1">{type.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {type.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
