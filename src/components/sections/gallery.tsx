import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const fallbackImages = [
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/WhatsApp%20Image%202024-11-06%20at%2010.55.11%20AM%20(1).jpeg',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/WhatsApp%20Image%202024-11-06%20at%2010.55.12%20AM%20(1).jpeg',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/WhatsApp%20Image%202024-11-06%20at%2010.55.14%20AM.jpeg',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/WhatsApp%20Image%202024-11-06%20at%2010.55.07%20AM.jpeg',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/WhatsApp%20Image%202024-11-06%20at%2010.55.12%20AM.jpeg',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/WhatsApp%20Image%202024-11-06%20at%2010.55.15%20AM.jpeg',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/WhatsApp%20Image%202024-11-06%20at%2010.55.10%20AM.jpeg',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/WhatsApp%20Image%202024-11-06%20at%2010.55.11%20AM.jpeg',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/WhatsApp%20Image%202024-11-06%20at%2010.55.13%20AM.jpeg',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/WhatsApp%20Image%202024-11-06%20at%2010.55.10%20AM%20(1).jpeg',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/IMG_7645.JPG',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/IMG_7559.JPG',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/IMG_7534.JPG',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/IMG_7591.JPG',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/IMG_7623.JPG',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/IMG_7571%20(1).jpg',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/IMG_7616-9956bfc.JPG',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/IMG_7525.JPG',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/IMG_7542%20(1).jpg',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/IMG_7527%20(1).jpg',
];

export function Gallery() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [images, setImages] = useState<string[]>(fallbackImages);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/gallery', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.images?.length) return;
        const urls = (data.images as Array<{ url: string }>).map((i) => i.url);
        setImages([...urls, ...fallbackImages]);
        setIndex(0);
      })
      .catch(() => {
        // Keep fallback images on error
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, []);

  const goTo = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-medium tracking-[0.25em] uppercase text-xs mb-5">
              Our Work
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              A Gallery of Marzam Projects' Masterful Work
            </h2>
            <div className="w-24 h-[2px] bg-primary mx-auto" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slideshow stage */}
          <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-sm bg-[#161616] shadow-2xl">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <img
                  src={images[index]}
                  alt={`Marzam Project ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next arrows */}
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/85 hover:bg-white text-foreground flex items-center justify-center shadow-md transition-all z-10"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/85 hover:bg-white text-foreground flex items-center justify-center shadow-md transition-all z-10"
            >
              <ChevronRight size={22} />
            </button>

            {/* Counter */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs tracking-[0.2em] rounded-sm">
              {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`View image ${i + 1}`}
                className={`flex-shrink-0 w-20 h-14 md:w-24 md:h-16 overflow-hidden rounded-sm transition-all duration-300 ${
                  i === index
                    ? 'ring-2 ring-primary opacity-100'
                    : 'opacity-50 hover:opacity-90'
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {/* Dot indicators (mobile-friendly) */}
          <div className="mt-4 flex justify-center gap-1.5 md:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-primary' : 'w-1.5 bg-foreground/20'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
