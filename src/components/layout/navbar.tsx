import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LOGO_URL =
  'https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/logo-removebg-preview-1014133.png/:/rs=h:240,cg:true,m/qt=q:100/ll';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm py-2'
          : 'bg-white/95 backdrop-blur-sm py-3 border-b border-primary/10'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => scrollTo('home')}
          className="flex items-center gap-3 cursor-pointer min-w-0 flex-shrink"
          aria-label="Marzam Projects home"
        >
          <img
            src={LOGO_URL}
            alt="Marzam Projects"
            className="h-10 md:h-12 w-auto flex-shrink-0"
          />
          <span className="hidden xl:flex flex-col leading-tight">
            <span className="font-serif text-base text-foreground tracking-wide whitespace-nowrap">
              Marzam Projects
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-primary whitespace-nowrap">
              Interiors &amp; Façades
            </span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium tracking-wide text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {link.name}
            </button>
          ))}
          <Button
            onClick={() => scrollTo('contact')}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-[#AD9234] transition-colors whitespace-nowrap"
          >
            Contact Us
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg border-t py-4 px-4 flex flex-col space-y-4 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-left text-lg font-medium text-foreground hover:text-primary py-2 border-b border-border last:border-0"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => scrollTo('contact')}
              className="bg-primary text-primary-foreground hover:bg-[#AD9234] w-full"
            >
              Contact Us
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
