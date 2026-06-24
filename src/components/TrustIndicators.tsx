export default function TrustIndicators() {
  const stats = [
    { number: "500+", label: "Homes", icon: "🏠" },
    { number: "4.9★", label: "Rating", icon: "⭐" },
    { number: "100%", label: "Insured", icon: "🛡️" },
    { number: "15min", label: "Response", icon: "⚡" },
  ];

  return (
    <section className="py-6 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex lg:grid lg:grid-cols-4 gap-3 overflow-x-auto no-scrollbar pb-1 snap-x snap-mandatory">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-blue-light/50 rounded-xl px-4 py-3 shrink-0 snap-start min-w-[160px] lg:min-w-0"
            >
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <div className="text-lg font-extrabold text-navy leading-tight">{stat.number}</div>
                <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
