import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { SITE_DATA } from '@/src/data/siteData';

export const Process: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 78%', 'end 62%'],
  });

  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      ref={containerRef}
      className="border-t border-[#241912]/10 bg-[#F6F1EA] py-24 transition-colors duration-500 dark:border-white/10 dark:bg-[#0A130F] sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold tracking-[0.12em] text-[#8A5322] uppercase dark:font-medium dark:text-[#F5F06A]">
            {SITE_DATA.process.eyebrow}
          </p>
          <h2 className="font-editorial mt-4 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium text-[#241912] [text-wrap:balance] dark:text-[#F5F5F0]">
            {SITE_DATA.process.headline}
          </h2>
        </motion.div>

        {/* 5-step horizontal timeline */}
        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-4 right-0 left-0 hidden h-[1px] bg-[#241912]/15 dark:bg-white/10 lg:block"
          >
            <motion.div
              style={
                prefersReducedMotion
                  ? { scaleX: 1 }
                  : { scaleX: lineScaleX }
              }
              className="h-full origin-left bg-[#8A5322] dark:bg-[#F5F06A]"
            />
          </div>

          <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {SITE_DATA.process.steps.map((step, index) => (
              <motion.li
                key={step.number}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex flex-col"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#8A5322]/45 bg-[#F6F1EA] text-xs font-semibold text-[#8A5322] tabular-nums dark:border-[#F5F06A]/60 dark:bg-[#0A130F] dark:font-medium dark:text-[#F5F06A]">
                    {step.number}
                  </span>
                  <div className="h-[1px] flex-1 bg-[#241912]/15 dark:bg-white/10 lg:hidden" />
                </div>

                <h3 className="mt-6 text-lg font-medium leading-snug text-[#241912] dark:text-[#F5F5F0]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm font-light leading-relaxed text-[#6B584C] dark:text-[#9AA39E]">
                  {step.detail}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
