import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Services } from '@/components/sections/services';
import { Gallery } from '@/components/sections/gallery';
import { Contact } from '@/components/sections/contact';

export function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
