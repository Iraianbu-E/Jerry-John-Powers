import React from 'react';
import { Check } from 'lucide-react';
import { SITE_DATA } from '@/src/data/siteData';
import { AnimatedNumber } from '@/src/components/AnimatedNumber';

export const TrustStrip: React.FC = () => {
  return (
    <section
      aria-label="Key milestones and enterprise partners"
      className="border-t border-[#241912]/10 bg-white py-5 transition-colors duration-500 dark:border-white/10 dark:bg-[#07100C]"
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 sm:px-8 lg:flex-row lg:items-center">
        {/* Left: Three factual highlights */}
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-xs text-[#241912]/90 dark:text-[#F5F5F0]/85 sm:text-sm">
          {SITE_DATA.trustStrip.highlights.map((item) => (
            <div key={item.text} className="inline-flex items-center gap-2">
              <Check
                className="h-3.5 w-3.5 shrink-0 text-[#8A5322] dark:text-[#F5F06A]"
                strokeWidth={2.2}
                aria-hidden="true"
              />
              <span>
                {item.numeric !== null && (
                  <span className="font-medium text-[#241912] dark:text-[#F5F5F0]">
                    <AnimatedNumber value={item.numeric} suffix={item.suffix} /> –{' '}
                  </span>
                )}
                <span className="font-light text-[#6B584C] dark:text-[#9AA39E]">
                  {item.text}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Right: Partner wordmarks */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium tracking-wide text-[#6B584C] dark:text-[#9AA39E]">
          {SITE_DATA.trustStrip.partners.map((partner) => (
            <span key={partner} className="whitespace-nowrap">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
