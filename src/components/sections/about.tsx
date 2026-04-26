import React from 'react';
import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-sm relative">
              <img 
                src="https://img1.wsimg.com/isteam/ip/7eb2f9ac-7cff-4af4-929b-870d4fea362a/IMG_7607.JPG" 
                alt="Marzam Projects Craftsmanship" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 border border-black/10 m-4 rounded-sm pointer-events-none" />
            </div>
            {/* Decorative block */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/10 -z-10 hidden md:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">About Us</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
                Marzam Projects
              </h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg font-light">
              <p>
                Marzam Projects specializes in designing and constructing exceptional interiors and facades, focusing on aluminium windows, curtain walling, structural glazings, timber doors, ceilings, and bespoke woodwork. We transform both residential and commercial spaces into masterpieces of design and functionality.
              </p>
              <p>
                Our co-founder, having an experience of 25 years in interiors and facades, has contributed to over 125 successful projects, including a few monumental ones in Oman, ensuring that each one is executed with precision, creativity, and a commitment to excellence.
              </p>
              <p>
                At Marzam Projects, we pride ourselves on delivering personalized design solutions that cater to our client's unique needs and preferences. From custom-designed doors and windows to innovative ceiling designs and high-quality woodwork, every detail is meticulously crafted to perfection. Our mission is to create spaces that reflect your style and enhance your living or working environment.
              </p>
            </div>

            <div className="pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="text-3xl font-serif text-primary mb-2">25+</h4>
                <p className="text-sm font-medium uppercase tracking-wide">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-primary mb-2">125+</h4>
                <p className="text-sm font-medium uppercase tracking-wide">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-primary mb-2">100%</h4>
                <p className="text-sm font-medium uppercase tracking-wide">Residential & Commercial</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
