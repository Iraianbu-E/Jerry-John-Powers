import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SITE_DATA } from '@/src/data/siteData';
import { AnimatedNumber } from '@/src/components/AnimatedNumber';

export const About: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="border-b border-[#241912]/10 bg-[#F6F1EA] py-24 transition-colors duration-500 dark:border-white/10 dark:bg-[#0A130F] sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-xs font-semibold tracking-[0.12em] text-[#8A5322] uppercase dark:font-medium dark:text-[#F5F06A]">
          {SITE_DATA.about.eyebrow}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left: Large Director's Quote */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <blockquote className="font-editorial text-[clamp(2rem,3.8vw,3.35rem)] font-medium text-[#241912] [text-wrap:balance] dark:text-[#F5F5F0]">
              &ldquo;{SITE_DATA.about.quote}&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-medium text-[#8A5322] dark:text-[#F5F06A]">
              – {SITE_DATA.about.director}
            </p>
          </motion.div>

          {/* Right: Short company story + animated counters */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <h3 className="text-lg font-medium text-[#241912] dark:text-[#F5F5F0]">
              {SITE_DATA.about.storyHeading}
            </h3>
            <div className="mt-4 space-y-4 text-sm font-light leading-relaxed text-[#6B584C] dark:text-[#9AA39E] sm:text-base">
              {SITE_DATA.about.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-5 border-t border-[#241912]/10 pt-8 dark:border-white/10">
              {SITE_DATA.about.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-editorial text-2xl font-medium text-[#241912] dark:text-[#F5F5F0] sm:text-3xl">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-xs font-light leading-snug text-[#6B584C] dark:text-[#9AA39E]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
