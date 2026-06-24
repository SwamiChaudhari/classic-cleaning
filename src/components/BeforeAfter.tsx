'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterPair {
  id: number;
  category: string;
  beforeImage: string;
  afterImage: string;
  title: string;
}

const beforeAfterData: BeforeAfterPair[] = [
  {
    id: 1,
    category: 'Kitchen',
    beforeImage:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&sat=-100&hue=-50',
    title: 'Kitchen Deep Clean',
  },
  {
    id: 2,
    category: 'Bathroom',
    beforeImage:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80&sat=-100&hue=-50',
    title: 'Bathroom Restoration',
  },
  {
    id: 3,
    category: 'Sofa',
    beforeImage:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&sat=-100&hue=-50',
    title: 'Sofa Deep Cleaning',
  },
  {
    id: 4,
    category: 'Deep Cleaning',
    beforeImage:
      'https://images.unsplash.com/photo-1527515637462-cee1395c108c?w=800&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1527515637462-cee1395c108c?w=800&q=80&sat=-100',
    title: 'Full Home Deep Clean',
  },
  {
    id: 5,
    category: 'Office',
    beforeImage:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&sat=-100',
    title: 'Office Space Cleaning',
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
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
        >
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
        </motion.div>

        {/* Slider Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut' as const, delay: 0.2 }}
        >
          {/* Category Label */}
          <div className="flex items-center justify-center mb-6">
            <span
              className="px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: '#EA580C' }}
            >
              {currentItem.category}
            </span>
          </div>

          {/* Image Comparison Container */}
          <div
            className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden cursor-col-resize select-none shadow-xl border-2 border-white"
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* After Image (full background) */}
            <div className="absolute inset-0">
              <img
                src={currentItem.afterImage}
                alt={`${currentItem.title} - After`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            {/* Before Image (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={currentItem.beforeImage}
                alt={`${currentItem.title} - Before`}
                className="w-full h-full object-cover"
                draggable={false}
              />
              {/* Grayscale overlay for "before" effect */}
              <div className="absolute inset-0 bg-gray-600/30 mix-blend-multiply" />
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 z-10 flex items-center"
              style={{ left: `calc(${sliderPosition}% - 20px)` }}
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

            {/* Slider line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 z-10 pointer-events-none"
              style={{ left: `${sliderPosition}%`, backgroundColor: '#ffffff' }}
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

          {/* Title Bar */}
          <motion.div
            className="mt-8 text-center"
            key={currentItem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3
              className="text-xl md:text-2xl font-bold"
              style={{ color: '#0B1D3A' }}
            >
              {currentItem.title}
            </h3>
            <p className="text-sm mt-1" style={{ color: '#0B1D3A80' }}>
              Drag the slider or tap arrows to compare
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
