import Link from "next/link";

const cities = [
  { name: "Austin", zip: "78701" },
  { name: "Denver", zip: "80202" },
  { name: "Seattle", zip: "98101" },
  { name: "Miami", zip: "33101" },
  { name: "Chicago", zip: "60601" },
  { name: "Atlanta", zip: "30301" },
  { name: "Dallas", zip: "75201" },
  { name: "Phoenix", zip: "85001" },
  { name: "Portland", zip: "97201" },
  { name: "Nashville", zip: "37201" },
  { name: "Charlotte", zip: "28201" },
  { name: "San Diego", zip: "92101" },
];

export default function ServiceAreas() {
  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
            Service Areas
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We proudly serve major cities across the United States. Professional
            cleaning, no matter where you are.
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="relative rounded-2xl overflow-hidden bg-blue-light border border-border mb-10 h-48 md:h-64 flex items-center justify-center">
          <div className="text-center">
            <svg
              className="w-12 h-12 text-blue/40 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <p className="text-blue/60 text-sm font-medium">
              Serving 50+ cities nationwide
            </p>
          </div>

          {/* Decorative dots representing cities */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[30%] left-[20%] w-2 h-2 rounded-full bg-orange/50 animate-pulse" />
            <div className="absolute top-[45%] left-[35%] w-2 h-2 rounded-full bg-orange/50 animate-pulse" />
            <div className="absolute top-[25%] left-[50%] w-2 h-2 rounded-full bg-orange/50 animate-pulse" />
            <div className="absolute top-[55%] left-[60%] w-2 h-2 rounded-full bg-orange/50 animate-pulse" />
            <div className="absolute top-[35%] left-[70%] w-2 h-2 rounded-full bg-orange/50 animate-pulse" />
            <div className="absolute top-[60%] left-[80%] w-2 h-2 rounded-full bg-orange/50 animate-pulse" />
            <div className="absolute top-[50%] left-[45%] w-2 h-2 rounded-full bg-orange/50 animate-pulse" />
            <div className="absolute top-[40%] left-[25%] w-2 h-2 rounded-full bg-orange/50 animate-pulse" />
          </div>
        </div>

        {/* City Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-10">
          {cities.map((city) => (
            <div
              key={city.name}
              className="rounded-2xl shadow-sm bg-white border border-border p-4 hover:border-blue hover:shadow-md transition-all group"
            >
              <h3 className="font-semibold text-navy text-sm md:text-base group-hover:text-blue transition-colors">
                {city.name}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                ZIP {city.zip}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block rounded-2xl bg-white border border-border shadow-sm px-6 py-5 md:px-8 md:py-6">
            <p className="text-navy font-semibold mb-1">
              Not sure if we service your area?
            </p>
            <p className="text-gray-500 text-sm mb-4">
              We're expanding rapidly — chances are we've got you covered.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue hover:bg-blue/90 text-white font-semibold px-6 py-3 rounded-full transition-colors min-h-[48px]"
            >
              Check Availability
              <svg
                className="w-4 h-4"
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
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
