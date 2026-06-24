const reasons = [
  { icon: "🛡️", title: "Fully Insured & Bonded", desc: "Your property is protected with full liability insurance." },
  { icon: "🔍", title: "Background Checked Staff", desc: "Every team member passes a thorough background check." },
  { icon: "🌿", title: "Eco-Friendly Products", desc: "Non-toxic, green cleaning products safe for kids and pets." },
  { icon: "📅", title: "Flexible Scheduling", desc: "Book online. We work around your schedule, including weekends." },
  { icon: "💯", title: "Satisfaction Guarantee", desc: "Not happy? We'll come back and re-clean for free." },
  { icon: "⚡", title: "Fast 15min Response", desc: "Get a response within 15 minutes. Same-day appointments available." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Stats grid */}
          <div>
            <span className="inline-block bg-green-light text-green font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mb-8">
              Why Hundreds Of Families Trust Us
            </h2>

            {/* 2x2 Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-light/50 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-1">🏆</div>
                <div className="text-2xl font-extrabold text-navy">5+ Years</div>
                <div className="text-sm text-gray-500">In Business</div>
              </div>
              <div className="bg-blue-light/50 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-1">👥</div>
                <div className="text-2xl font-extrabold text-navy">50+</div>
                <div className="text-sm text-gray-500">Team Members</div>
              </div>
              <div className="bg-blue-light/50 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-1">🏠</div>
                <div className="text-2xl font-extrabold text-navy">500+</div>
                <div className="text-sm text-gray-500">Homes Cleaned</div>
              </div>
              <div className="bg-blue-light/50 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-1">⭐</div>
                <div className="text-2xl font-extrabold text-navy">4.9★</div>
                <div className="text-sm text-gray-500">Google Rating</div>
              </div>
            </div>

            {/* Satisfaction guarantee banner */}
            <div className="bg-green rounded-2xl p-5 text-center">
              <div className="text-lg font-bold text-white">💯 100% Satisfaction Guarantee</div>
              <div className="text-sm text-white/85 mt-1">If you're not happy, we'll re-clean for free</div>
            </div>
          </div>

          {/* Right: Reasons list */}
          <div>
            <h3 className="text-xl font-bold text-navy mb-6">What Sets Us Apart</h3>
            <div className="space-y-4">
              {reasons.map((r, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-surface transition-colors">
                  <div className="w-11 h-11 bg-green-light rounded-xl flex items-center justify-center shrink-0 text-xl">
                    {r.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-navy text-sm">{r.title}</h4>
                    <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
