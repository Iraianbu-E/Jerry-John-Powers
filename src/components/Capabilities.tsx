import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Cpu,
  FileCheck2,
  FileSpreadsheet,
  Landmark,
  Scale,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { SITE_IMAGES } from '@/src/config/images';
import { SITE_DATA } from '@/src/data/siteData';
import { SolarImage } from '@/src/components/SolarImage';

const CAPABILITY_ICONS = [
  Zap,
  Landmark,
  Cpu,
  FileCheck2,
  Scale,
  FileSpreadsheet,
  ShieldCheck,
] as const;

const CAPABILITY_IMAGES = [
  SITE_IMAGES.projects.shapoorji,
  SITE_IMAGES.gallery.rooftop3,
  SITE_IMAGES.services.rooftop,
  SITE_IMAGES.projects.ascendas,
  SITE_IMAGES.services.groundMounted,
  SITE_IMAGES.gallery.ground2,
  SITE_IMAGES.gallery.rooftop2,
] as const;

export const Capabilities: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeCardIdx, setActiveCardIdx] = useState<number | null>(null);
  const [leadItem, ...otherItems] = SITE_DATA.capabilities.items;

  return (
    <section
      id="capabilities"
      className="border-t border-[#241912]/10 bg-white py-24 transition-colors duration-500 dark:border-white/10 dark:bg-[#07100C] sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Balanced Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12"
        >
          <div className="lg:col-span-8">
            <p className="text-xs font-semibold tracking-[0.12em] text-[#8A5322] uppercase dark:font-medium dark:text-[#F5F06A]">
              {SITE_DATA.capabilities.eyebrow}
            </p>
            <h2 className="font-editorial mt-4 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium text-[#241912] [text-wrap:balance] dark:text-[#F5F5F0]">
              {SITE_DATA.capabilities.headline}
            </h2>
          </div>

          <p className="text-sm font-light leading-relaxed text-[#6B584C] dark:text-[#9AA39E] lg:col-span-4 lg:pb-1">
            Single-point EPC accountability covering utility connectivity, land due diligence, statutory safety, and switchyard commissioning.
          </p>
        </motion.div>

        {/* Architectural Bento Grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 01: Featured Split Visual + Engineering Detail */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setActiveCardIdx(0)}
            onMouseLeave={() => setActiveCardIdx(null)}
            className="group relative grid grid-cols-1 overflow-hidden rounded-2xl border border-[#241912]/12 bg-[#FAF7F2] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8A5322]/45 sm:col-span-2 sm:grid-cols-12 dark:border-white/12 dark:bg-[#0D1512] dark:hover:border-[#F5F06A]/40"
          >
            <div className="relative z-10 flex flex-col justify-between p-6 sm:col-span-7 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="font-editorial text-2xl font-medium text-[#8A5322] tabular-nums dark:text-[#F5F06A]">
                  01
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#241912]/10 bg-white text-[#8A5322] transition-colors duration-300 group-hover:bg-[#3B271A] group-hover:text-white dark:border-white/10 dark:bg-white/[0.04] dark:text-[#F5F06A] dark:group-hover:bg-[#F5F06A] dark:group-hover:text-[#07100C]">
                  <Zap className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>

              <div className="mt-8">
                <p className="text-xs font-medium text-[#6B584C] dark:text-[#9AA39E]">
                  High-voltage grid evacuation
                </p>
                <h3 className="mt-2 text-lg font-medium leading-snug text-[#241912] dark:text-[#F5F5F0]">
                  {leadItem.title}
                </h3>
                <p className="mt-2.5 text-sm font-light leading-relaxed text-[#6B584C] dark:text-[#9AA39E]">
                  {leadItem.detail}
                </p>
              </div>
            </div>

            <div className="relative min-h-[190px] overflow-hidden sm:col-span-5 sm:min-h-full">
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: activeCardIdx === 0 ? 1.07 : 1 }
                }
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full"
              >
                <SolarImage
                  src={CAPABILITY_IMAGES[0]}
                  alt="11 kV to 110 kV grid evacuation substation"
                  className="h-full w-full object-cover"
                  fallbackLabel="11 kV – 110 kV Substation"
                />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent sm:bg-gradient-to-r sm:from-[#FAF7F2] sm:via-[#FAF7F2]/15 sm:to-transparent dark:from-[#0D1512] sm:dark:from-[#0D1512] sm:dark:via-[#0D1512]/20" />
            </div>
          </motion.div>

          {/* Cards 02 - 07: Clean image reveal animation on hover, focus, or tap */}
          {otherItems.map((item, offsetIdx) => {
            const idx = offsetIdx + 1;
            const Icon = CAPABILITY_ICONS[idx] ?? FileCheck2;
            const imageSrc = CAPABILITY_IMAGES[idx] ?? SITE_IMAGES.services.rooftop;
            const isActive = activeCardIdx === idx;

            return (
              <motion.div
                key={item.title}
                tabIndex={0}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setActiveCardIdx(idx)}
                onMouseLeave={() => setActiveCardIdx(null)}
                onFocus={() => setActiveCardIdx(idx)}
                onBlur={() => setActiveCardIdx(null)}
                onClick={() =>
                  setActiveCardIdx((prev) => (prev === idx ? null : idx))
                }
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#241912]/10 bg-[#FAF7F2] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8A5322]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] dark:border-white/10 dark:bg-[#0D1512]/70 dark:hover:border-[#F5F06A]/45 dark:focus-visible:ring-[#F5F06A]"
              >
                {/* Clean Hover/Focus Image Reveal Layer */}
                <motion.div
                  initial={false}
                  animate={
                    prefersReducedMotion
                      ? { opacity: isActive ? 1 : 0 }
                      : {
                          opacity: isActive ? 1 : 0,
                          scale: isActive ? 1 : 1.08,
                        }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0.2 : 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="pointer-events-none absolute inset-0 z-0"
                  aria-hidden="true"
                >
                  <SolarImage
                    src={imageSrc}
                    alt=""
                    className="h-full w-full object-cover"
                    fallbackLabel={item.title}
                  />
                  {/* Theme-matched legibility scrim keeping text sharp over photography */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/85 to-[#FAF7F2]/40 dark:from-[#0D1512] dark:via-[#0D1512]/80 dark:to-[#0D1512]/35" />
                </motion.div>

                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className={`font-editorial text-xl font-medium tabular-nums transition-colors duration-300 ${
                      isActive
                        ? 'text-[#8A5322] dark:text-[#F5F06A]'
                        : 'text-[#8A5322]/85 dark:text-[#9AA39E]'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 ${
                      isActive
                        ? 'border-[#8A5322]/35 bg-[#3B271A] text-white dark:border-[#F5F06A]/40 dark:bg-[#F5F06A] dark:text-[#07100C]'
                        : 'border-[#241912]/10 bg-white text-[#6B584C] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#9AA39E]'
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>

                <div className="relative z-10 mt-8">
                  <h3 className="text-base font-medium leading-snug text-[#241912] dark:text-[#F5F5F0]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-[#5C493E] transition-colors duration-300 dark:text-[#B6C0BA]">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
