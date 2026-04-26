import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Hammer, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    title: 'Facade Services',
    description:
      'Provides aluminum doors, windows, structural glazing, aluminum composite cladding, aluminum curtain walls, and aluminum windows that meet your design specifications for both residential and commercial buildings.',
    icon: Building2,
  },
  {
    title: 'Carpentry Services',
    description:
      'Offers a wide range of interior design solutions for residential and commercial buildings, including carved doors, flush doors, wall cabinets, fitted furniture, wall paneling, timber ceilings, composite wood decking, parquet flooring, and more.',
    icon: Hammer,
  },
  {
    title: 'Consultation Services',
    description:
      'Offers turn-key design solutions as well as execution for your requirements for the interiors and façade, along with specifications and work inspections.',
    icon: ClipboardCheck,
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#FBF8F0]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-20 md:mb-28 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-medium tracking-[0.25em] uppercase text-xs mb-5">
              About Marzam Projects
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
              What We Do
            </h2>
            <p className="text-muted-foreground font-light text-lg leading-relaxed">
              Three disciplines, one standard of craft — delivered for residential
              and commercial projects across Oman.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="h-full bg-white border border-primary/10 rounded-sm shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <CardHeader className="pt-14 pb-8 px-10 text-center">
                  <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-300">
                    <service.icon
                      size={32}
                      className="text-primary group-hover:text-primary-foreground transition-colors duration-300"
                    />
                  </div>
                  <CardTitle className="font-serif text-2xl md:text-3xl mb-6 leading-snug tracking-tight">
                    {service.title}
                  </CardTitle>
                  <div className="w-16 h-[2px] bg-primary mx-auto" />
                </CardHeader>
                <CardContent className="px-10 pb-14 text-center">
                  <p className="text-muted-foreground leading-relaxed font-light text-[0.95rem]">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
