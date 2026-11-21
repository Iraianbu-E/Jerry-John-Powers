import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { SITE_IMAGES } from '@/src/config/images';
import { SITE_DATA } from '@/src/data/siteData';
import { SolarImage } from '@/src/components/SolarImage';

interface ServicesProps {
  onSelectService: (service: 'Rooftop' | 'Ground Mounted') => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const prefersReducedMotion = useReducedMotion();
  const [lightsMorningErr, setLightsMorningErr] = useState(false);
  const [lightsNightErr, setLightsNightErr] = useState(false);

  return (
    <section
      id="services"
      className="border-t border-[#241912]/10 bg-white py-24 transition-colors duration-500 dark:border-white/10 dark:bg-[#07100C] sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Two-column editorial header: Left headline + Right blended solar street lights in empty space */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 lg:pb-4"
          >
            <p className="text-xs font-semibold tracking-[0.12em] text-[#8A5322] uppercase dark:font-medium dark:text-[#F5F06A]">
              {SITE_DATA.services.eyebrow}
            </p>
            <h2 className="font-editorial mt-4 text-[clamp(2.25rem,4.5vw,4rem)] font-medium text-[#241912] [text-wrap:balance] dark:text-[#F5F5F0]">
              {SITE_DATA.services.headline}
            </h2>
          </motion.div>

          {/* Blended solar street lights visual filling the upper-right negative space */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-56 w-full overflow-hidden sm:h-68 lg:col-span-6 lg:h-72"
            style={{
              WebkitMaskImage:
                'radial-gradient(ellipse 92% 90% at 64% 52%, black 58%, transparent 98%)',
              maskImage:
                'radial-gradient(ellipse 92% 90% at 64% 52%, black 58%, transparent 98%)',
            }}
          >
            {!lightsMorningErr && (
              <img
                src={SITE_IMAGES.services.streetLightsMorning}
                alt="Curved walkway lined with solar-powered circular LED street lights during morning daylight"
                referrerPolicy="no-referrer"
                onError={() => setLightsMorningErr(true)}
                className="absolute inset-0 h-full w-full object-cover object-center brightness-105 contrast-[1.04] opacity-100 transition-opacity duration-700 dark:opacity-0"
              />
            )}
            {!lightsNightErr && (
              <img
                src={SITE_IMAGES.services.streetLightsNight}
                alt="Curved campus pathway illuminated at night by circular-disc solar street lights"
                referrerPolicy="no-referrer"
                onError={() => setLightsNightErr(true)}
                className="absolute inset-0 h-full w-full object-cover object-center brightness-[1.38] contrast-[1.08] opacity-0 transition-opacity duration-700 dark:opacity-100"
              />
            )}

            {/* Seamless left & bottom melts without dimming the right-hand foreground lamp heads */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent dark:from-[#07100C] dark:to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-transparent dark:from-[#07100C] dark:to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/80 to-transparent dark:from-[#07100C]/80 dark:to-transparent" />
          </motion.div>
        </div>

        {/* Two Large Rounded Photo Cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
          {SITE_DATA.services.items.map((service, index) => (
            <motion.article
              key={service.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.65,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-[#241912]/10 bg-[#FAF7F2] shadow-sm transition-colors duration-500 dark:border-white/10 dark:bg-[#0D1512] dark:shadow-none"
            >
              {/* Photo Header */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <SolarImage
                  src={service.image}
                  alt={`${service.title} engineering by Jerry John Powers`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  fallbackLabel={service.title}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/15 to-transparent dark:from-[#0D1512] dark:via-[#0D1512]/20 dark:to-transparent" />
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-7 sm:p-9">
                <div>
                  <h3 className="font-editorial text-3xl font-medium text-[#241912] dark:text-[#F5F5F0]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-[#6B584C] dark:text-[#9AA39E] sm:text-base">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-[#241912]/10 pt-6 dark:border-white/10">
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-3 text-sm font-light text-[#3B271A] dark:text-[#F5F5F0]/85"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#8A5322] dark:text-[#F5F06A]"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-[#241912]/10 pt-6 dark:border-white/10">
                  <p className="text-xs font-light text-[#6B584C] dark:text-[#9AA39E]">
                    {service.mountingSummary}
                  </p>

                  <button
                    type="button"
                    onClick={() => onSelectService(service.serviceValue)}
                    className="group/btn mt-5 inline-flex items-center gap-2.5 rounded-full border border-[#241912]/25 bg-white px-5 py-2.5 text-sm font-medium text-[#241912] transition-colors duration-200 hover:border-[#3B271A] hover:bg-[#3B271A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] cursor-pointer dark:border-white/25 dark:bg-transparent dark:text-[#F5F5F0] dark:hover:border-[#F5F06A] dark:hover:bg-[#F5F06A] dark:hover:text-[#07100C]"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
