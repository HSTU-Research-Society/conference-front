'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PartnersSection } from '@/components/partners-section';

function TypewriterHeading() {
  const [text, setText] = React.useState('');
  const fullText = "International Conference on\nTrends in Science,\nEngineering and Technology";

  React.useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        i++;
        setText(fullText.slice(0, i));
        if (i >= fullText.length) clearInterval(timer);
      }, 70);
    }, 150);
    return () => clearTimeout(timeout);
  }, []);

  const renderLines = (content: string, isCursor = false) => {
    const lines = content.split('\n');
    return (
      <div className="flex flex-col space-y-1">
        {lines.map((line, idx) => (
          <div key={idx} className="leading-[1.06] tracking-tight">
            {idx === 1 ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-info-light via-blue-500 to-indigo-500">
                {line}
              </span>
            ) : (
              <span>{line}</span>
            )}
            {isCursor && idx === lines.length - 1 && (
              <span className="animate-pulse border-r-4 border-info-light ml-1 sm:ml-2 inline-block h-[0.75em] align-middle" />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight pt-2 pb-2 relative w-full text-left">
      <div className="opacity-0 pointer-events-none select-none text-left" aria-hidden="true">
        {renderLines(fullText)}
      </div>
      <div className="absolute top-0 left-0 w-full h-full pt-2 text-left">
        {renderLines(text, true)}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-12">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-8">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-5 max-w-2xl relative z-10">
              <TypewriterHeading />
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-xl text-primary-light/70 dark:text-primary/70 max-w-lg leading-relaxed"
              >
                1st Edition
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link href="/content/gallery" className="btn-primary group">
                  Explore Gallery
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Contact Us
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateX: 10, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[500px] lg:h-[700px] w-full"
              style={{ perspective: 1000 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-info-light/20 to-transparent rounded-[40px] transform rotate-3" />
              <div className="absolute inset-0 glass-card overflow-hidden">
                <Image 
                  src="/heroimg1.png"
                  alt="HSTU Research Society activities"
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Organized by HSTU Research Society */}
      <section className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-[36px] p-8 md:p-12 border-white/40 shadow-xl text-center flex flex-col items-center justify-center gap-3"
        >
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary-light dark:text-primary">
            Organized by <span className="text-transparent bg-clip-text bg-gradient-to-r from-info-light via-blue-500 to-indigo-500">HSTU Research Society</span>
          </div>
        </motion.div>
      </section>

      {/* About Overview */}
      <section className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] lg:h-[600px] w-full rounded-[36px] overflow-hidden group shadow-2xl"
          >
            <Image
              src="/card.png"
              alt="About ICTSET Conference"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="glass px-6 py-4 rounded-2xl border-white/20 backdrop-blur-md hover:bg-white/70 transition-colors">
                <p className="text-primary-light dark:text-primary font-medium">&quot;Pioneering Research &amp; Innovation&quot;</p>
              </div>
            </div>
          </motion.div>
          
          <div className="flex flex-col gap-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold"
            >
              About the <span className="text-info-light">Conference</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-primary-light/70 dark:text-primary/70 leading-relaxed"
            >
              The International Conference on Trends in Science, Engineering and Technology (ICTSET) is a premier academic gathering bringing together leading researchers, academicians, scientists, and industry innovators from around the world to present and exchange cutting-edge advancements.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-primary-light/70 dark:text-primary/70 leading-relaxed"
            >
              Organized to foster interdisciplinary collaboration, ICTSET provides a dynamic international forum for sharing peer-reviewed scientific findings, emerging methodologies, and sustainable technological solutions addressing modern global challenges.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <Link href="/about/scope" className="btn-secondary w-fit group">
                Explore Conference Scope
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners & Collaborators Section */}
      <PartnersSection />
    </div>
  );
}
