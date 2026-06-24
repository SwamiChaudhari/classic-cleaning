"use client";

import Link from "next/link";

const servicesList = [
  {
    icon: "🏠",
    title: "Residential Cleaning",
    features: ["Kitchen & Bathrooms", "Dusting & Vacuuming", "Floor Mopping"],
    price: "From $99",
  },
  {
    icon: "✨",
    title: "Deep Cleaning",
    features: ["Inside Appliances", "Baseboard Scrubbing", "Window Cleaning"],
    price: "From $199",
  },
  {
    icon: "📦",
    title: "Move-In / Move-Out",
    features: ["Empty Property", "All Rooms Deep Cleaned", "Carpet Cleaning"],
    price: "From $249",
  },
  {
    icon: "🛏️",
    title: "Airbnb Cleaning",
    features: ["Same-Day Turnover", "Linen Change", "Restock Supplies"],
    price: "From $79",
  },
  {
    icon: "🏢",
    title: "Office Cleaning",
    features: ["Desk Areas", "Common Rooms", "Restrooms"],
    price: "From $149",
  },
  {
    icon: "🏭",
    title: "Commercial Cleaning",
    features: ["Floor Care", "Restroom Sanitization", "Pressure Washing"],
    price: "Custom Quote",
  },
  {
    icon: "🔨",
    title: "Post-Construction",
    features: ["Dust Removal", "Debris Cleanup", "Surface Polishing"],
    price: "From $299",
  },
  {
    icon: "📅",
    title: "Recurring Plans",
    features: ["Same Team Every Visit", "Priority Booking", "Discount Pricing"],
    price: "Save 20%",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-12 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-blue-light text-blue font-semibold text-sm px-4 py-1.5 rounded-full mb-3">
            Our Services
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mb-3">
            Cleaning Services For Every Need
          </h2>
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            From regular home cleaning to specialized commercial services, we have you covered.
          </p>
        </div>

        {/* Cards: horizontal scroll snap on mobile, 2-col tablet, 4-col desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto sm:overflow-visible no-scrollbar pb-2 sm:pb-0 snap-x snap-mandatory sm:snap-none">
          {servicesList.map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all border border-border group flex flex-col shrink-0 snap-start w-[280px] sm:w-auto"
            >
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-blue transition-colors">
                {service.title}
              </h3>
              <ul className="space-y-2 mb-4 flex-1">
                {service.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green font-bold shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                <span className="text-base font-bold text-orange">{service.price}</span>
                <Link
                  href="#quote"
                  className="bg-navy hover:bg-blue text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors min-h-[44px] flex items-center"
                >
                  Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
