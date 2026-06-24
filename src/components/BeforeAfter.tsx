"use client";

import { useState } from "react";

const transformations = [
  {
    id: 1,
    title: "Kitchen",
    emoji: "🍳",
    before: "Greasy countertops, stained sink, crumb-covered floors, and cloudy cabinet glass.",
    after: "Sparkling granite counters, polished stainless steel sink, spotless floors, and crystal-clear cabinets.",
  },
  {
    id: 2,
    title: "Living Room",
    emoji: "🛋️",
    before: "Dusty surfaces, pet hair on furniture, smudged windows, and cluttered shelves.",
    after: "Pristine surfaces, fresh vacuumed carpets, streak-free windows, and neatly arranged décor.",
  },
  {
    id: 3,
    title: "Bathroom",
    emoji: "🚿",
    before: "Soap scum on tiles, foggy mirrors, ringed tub, and mildew in the grout.",
    after: "Gleaming tiles, spotless mirrors, a shining tub, and bright white grout lines.",
  },
  {
    id: 4,
    title: "Office",
    emoji: "💼",
    before: "Cluttered desks, dusty electronics, smudged glass, and disorganized filing areas.",
    after: "Organized workstations, sanitized screens, polished glass, and tidy document storage.",
  },
];

export default function BeforeAfter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  const current = transformations[activeIndex];

  const goTo = (index: number) => {
    setActiveIndex(index);
    setShowAfter(false);
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % transformations.length);
    setShowAfter(false);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
    setShowAfter(false);
  };

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
            See the Transformation
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tap or swipe to see the dramatic difference our cleaning makes.
          </p>
        </div>

        {/* Mobile: Single Card */}
        <div className="md:hidden">
          <div
            className="relative rounded-2xl shadow-sm bg-white overflow-hidden cursor-pointer select-none"
            onClick={() => setShowAfter((prev) => !prev)}
            onTouchStart={(e) => {
              const startX = e.touches[0].clientX;
              const handler = (ev: TouchEvent) => {
                const diff = ev.touches[0].clientX - startX;
                if (Math.abs(diff) > 50) {
                  if (diff < 0) next();
                  else prev();
                  document.removeEventListener("touchmove", handler);
                }
              };
              document.addEventListener("touchmove", handler, { once: true });
            }}
          >
            {/* Labels */}
            <div className="absolute top-4 left-4 z-10">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-opacity ${
                  showAfter
                    ? "bg-green text-white opacity-100"
                    : "bg-red-500 text-white opacity-100"
                }`}
              >
                {showAfter ? "After" : "Before"}
              </span>
            </div>

            {/* Content */}
            <div className="p-8 pt-14 pb-16 text-center">
              <span className="text-5xl block mb-4">{current.emoji}</span>
              <h3 className="text-xl font-bold text-navy mb-4">{current.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {showAfter ? current.after : current.before}
              </p>
            </div>

            {/* Swipe hint */}
            <p className="text-center text-xs text-gray-400 pb-4">
              Tap to toggle · Swipe to browse
            </p>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {transformations.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`View transformation ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === activeIndex
                    ? "bg-blue w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: 3-Card Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transformations.slice(0, 3).map((item, i) => (
            <div
              key={item.id}
              className="rounded-2xl shadow-sm bg-white overflow-hidden"
            >
              <div className="p-8 text-center">
                <span className="text-5xl block mb-4">{item.emoji}</span>
                <h3 className="text-xl font-bold text-navy mb-4">{item.title}</h3>

                {/* Before */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500 text-white mb-2">
                    Before
                  </span>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.before}
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-gray-200 my-4" />

                {/* After */}
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green text-white mb-2">
                    After
                  </span>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.after}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
