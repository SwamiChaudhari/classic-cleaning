'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterPair {
  id: number;
  category: string;
  title: string;
  /** CSS gradient used instead of Unsplash images — saves ~1.5MB total */
  beforeGradient: string;
  afterGradient: string;
}

const beforeAfterData: BeforeAfterPair[] = [
  {
    id: 1,
    category: 'Kitchen',
    title: 'Kitchen Deep Clean',
    beforeGradient: 'from-amber-900/60 via-stone-700/40 to-amber-800/50',
    afterGradient: 'from-teal-600/30 via-white/10 to-teal-400/20',
  },
  {
    id: 2,
    category: 'Bathroom',
    title: 'Bathroom Restoration',
    beforeGradient: 'from-stone-600/60 via-gray-500/40 to-stone-700/50',
    afterGradient: 'from-cyan-500/20 via-white/10 to-blue-300/20',
  },
  {
    id: 3,
    category: 'Sofa',
    title: 'Sofa Deep Cleaning',
    beforeGradient: 'from-amber-800/60 via-orange-900/40 to-yellow-900/50',
    afterGradient: 'from-blue-400/20 via-white/10 to-indigo-300/20',
  },
  {
    id: 4,
    category: 'Deep Cleaning',
    title: 'Full Home Deep Clean',
    beforeGradient: 'from-gray-700/60 via-stone-600/40 to-gray-800/50',
    afterGradient: 'from-emerald-400/20 via-white/10 to-teal-300/20',
  },
  {
    id: 5,
    category: 'Office',
    title: 'Office Space Cleaning',
    beforeGradient: 'from-slate-700/60 via-gray-600/40 to-slate-800/50',
    afterGradient: 'from-blue-500/20 via-white/10 to-slate-300/20',
  },
];

const AUTOPLAY_INTERVAL = 5000;

export default function BeforeAfter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const currentItem = beforeAfterData[currentIndex];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % beforeAfterData.length);
    setSliderPosition(50);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + beforeAfterData.length) % beforeAfterData.length
    );
    setSliderPosition(50);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setSliderPosition(50);
  }, []);

  // Auto-play
  useEffect(() => {
    if (isPaused || isDragging) return;

    const timer = setInterval(goToNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, isDragging, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Handle slider drag (mouse)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    [isDragging]
  );

  // Handle slider drag (touch)
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (touchStartX === null) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    [touchStartX]
  );

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(false);

    if (touchStartX === null) return;

    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX - endX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) goToNext();
      else goToPrev();
    }

    setTouchStartX(null);
  };

  return (
    <section
      className="py-16 md:py-24 bg-gray-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ backgroundColor: '#0D948820', color: '#0D9488' }}
          >
            Our Work
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
            style={{ color: '#0B1D3A' }}
          >
            Before &amp; After
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: '#0B1D3A99' }}
          >
            See the transformation we deliver across every service category
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Category Label */}
          <div className="flex items-center justify-center mb-6">
            <span
              className="px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: '#EA580C' }}
            >
              {currentItem.category}
            </span>
          </div>

          {/* Image Comparison Container — uses CSS variable for clip-path to avoid style recalc */}
          <div
            className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden cursor-col-resize select-none shadow-xl border-2 before-after-slider"
            style={{ "--slider-pos": `${sliderPosition}%` } as React.CSSProperties}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* After Gradient (full background) — CSS-only, no image download */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentItem.afterGradient}`}>
              {/* Texture pattern for visual interest */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-white rounded-full blur-2xl" />
                <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-white rounded-full blur-xl" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/60 text-6xl font-bold">✨</div>
              </div>
            </div>

            {/* Before Gradient (clipped) — uses CSS variable, no inline style recalc */}
            <div
              className="absolute inset-0 overflow-hidden before-after-clip"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${currentItem.beforeGradient}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/40 text-6xl font-bold">🧹</div>
                </div>
              </div>
              {/* Grayscale overlay for "before" effect */}
              <div className="absolute inset-0 bg-gray-600/30 mix-blend-multiply" />
            </div>

            {/* Slider Handle — positioned via CSS variable */}
            <div
              className="absolute top-0 bottom-0 z-10 flex items-center before-after-handle"
            >
              <div
                onMouseDown={() => setIsDragging(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-col-resize shadow-lg border-2 border-white"
                style={{ backgroundColor: '#059669' }}
              >
                <ChevronLeft className="w-3 h-3 text-white" />
                <ChevronRight className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* "Before" / "After" Labels */}
            <div
              className="absolute left-4 top-4 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: '#0B1D3ACC' }}
            >
              Before
            </div>
            <div
              className="absolute right-4 top-4 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: '#059669CC' }}
            >
              After
            </div>

            {/* Slider line — positioned via CSS variable */}
            <div
              className="absolute top-0 bottom-0 w-0.5 z-10 pointer-events-none before-after-line"
            />
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={goToPrev}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 hover:shadow-lg"
              style={{
                borderColor: '#0B1D3A',
                color: '#0B1D3A',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#0B1D3A')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'transparent')
              }
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots Navigation */}
            <div className="flex items-center gap-3">
              {beforeAfterData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-8 h-3'
                      : 'w-3 h-3 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor:
                      index === currentIndex ? '#0D9488' : '#0D948860',
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 hover:shadow-lg"
              style={{
                borderColor: '#0B1D3A',
                color: '#0B1D3A',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#0B1D3A')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'transparent')
              }
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Title Bar — plain div, no motion needed for simple text */}
          <div className="mt-8 text-center">
            <h3
              className="text-xl md:text-2xl font-bold"
              style={{ color: '#0B1D3A' }}
            >
              {currentItem.title}
            </h3>
            <p className="text-sm mt-1" style={{ color: '#0B1D3A80' }}>
              Drag the slider or tap arrows to compare
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
