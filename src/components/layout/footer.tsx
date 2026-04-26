import React from 'react';
import { motion } from 'framer-motion';

export function Footer() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="bg-[#161616] text-[#DBDBDB] py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <img
              src="https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/logo-removebg-preview-1014133.png/:/rs=h:120,cg:true,m/qt=q:100/ll"
              alt="Marzam Projects"
              className="h-16 w-auto mb-6 brightness-0 invert opacity-80"
            />
            <p className="text-sm max-w-sm leading-relaxed">
              Marzam Projects is a high-end interiors and façade construction firm based in Oman, specializing in exceptional design and craftsmanship for residential and commercial spaces.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-serif text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-xl mb-6">Connect</h4>
            <p className="text-sm mb-3">Hours: Open today 08:00 am – 06:00 pm</p>
            <a
              href="mailto:marzamprojects@gmail.com"
              className="text-primary hover:text-white transition-colors text-sm break-all block mb-3"
            >
              marzamprojects@gmail.com
            </a>
            <button
               onClick={() => scrollTo('contact')}
               className="text-primary hover:text-white transition-colors text-sm underline underline-offset-4"
            >
              Contact Us
            </button>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-white/50 text-center md:text-left">
            Copyright © 2024 Marzam Projects - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
