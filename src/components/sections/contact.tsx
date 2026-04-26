import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EMAIL = 'marzamprojects@gmail.com';

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-4">
              Get in touch
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Contact Us
            </h2>
            <p className="text-muted-foreground font-light text-lg max-w-2xl mx-auto leading-relaxed">
              For project enquiries, free quotes, or any questions about our work,
              please reach out — we'd love to hear from you.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-[#FBF8F0] border border-primary/20 rounded-sm p-10 md:p-16 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start">
                <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mb-5">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Email
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-foreground hover:text-primary transition-colors font-serif text-lg leading-snug"
                >
                  marzamprojects
                  <br />
                  @gmail.com
                </a>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mb-5">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Hours
                </p>
                <p className="text-foreground font-serif text-lg leading-snug">
                  08:00 am – 06:00 pm
                </p>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mb-5">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Based In
                </p>
                <p className="text-foreground font-serif text-lg leading-snug">
                  Sultanate of Oman
                </p>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-primary/15 text-center">
              <p className="text-muted-foreground font-light leading-relaxed max-w-xl mx-auto mb-8">
                We stay in constant communication with our customers until the job
                is done. Drop us a line for a free quote or any special requests.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-[#AD9234] px-10 py-6 text-base"
              >
                <a href={`mailto:${EMAIL}`}>Email Us</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
