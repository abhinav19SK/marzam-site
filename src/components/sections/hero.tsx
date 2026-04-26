import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const images = [
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/IMG_7583.JPG',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/IMG_7607.JPG',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/IMG_7542%20(1).jpg',
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/IMG_7527%20(1).jpg',
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#161616]"
    >
      {/* Slideshow */}
      <AnimatePresence mode="popLayout">
        {images.map(
          (src, index) =>
            index === currentIndex && (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url("${src}")` }}
                />
              </motion.div>
            ),
        )}
      </AnimatePresence>

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 min-h-[100dvh] flex flex-col justify-center pt-44 md:pt-52 pb-24">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-primary font-medium tracking-[0.25em] uppercase text-xs md:text-sm mb-6 drop-shadow"
          >
            Interiors · Façades · Bespoke Woodwork
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] text-white mb-8 drop-shadow-lg"
          >
            Building<br />
            <span className="text-primary">Your Vision</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-lg md:text-xl text-white/90 max-w-xl mb-10 font-light leading-relaxed drop-shadow"
          >
            We bring your ideas to life with quality craftsmanship — from
            aluminium façades to bespoke timber interiors, executed with 25
            years of precision across Oman.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={() => scrollTo('contact')}
              className="bg-primary text-primary-foreground hover:bg-[#AD9234] text-base px-8 py-6"
            >
              Contact Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo('gallery')}
              className="bg-transparent text-white border-white/40 hover:bg-white hover:text-foreground text-base px-8 py-6"
            >
              View Our Work
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`View slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? 'w-10 bg-primary'
                : 'w-3 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
