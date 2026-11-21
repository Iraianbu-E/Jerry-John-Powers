import React, { useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { CLIENT_LOGOS, ClientLogoAsset } from '@/src/components/ClientLogos';

const ClientLogoTile: React.FC<{ client: ClientLogoAsset }> = ({ client }) => {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="flex h-16 items-center justify-center rounded-xl bg-white px-5 py-2.5 transition-transform duration-200 hover:scale-[1.03] dark:shadow-[0_6px_24px_rgba(0,0,0,0.4)] sm:h-[72px] sm:px-6">
      {!imgErr ? (
        <img
          src={client.src}
          alt={client.name}
          referrerPolicy="no-referrer"
          onError={() => setImgErr(true)}
          className="max-h-10 w-auto max-w-[140px] object-contain sm:max-h-12 sm:max-w-[165px]"
        />
      ) : (
        <span className="font-editorial text-lg font-medium text-[#241912]">
          {client.name}
        </span>
      )}
    </div>
  );
};

export const ClientMarquee: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Clients"
      className="border-t border-b border-[#241912]/10 bg-white py-14 transition-colors duration-500 dark:border-white/10 dark:bg-[#07100C]"
    >
      <div className="mx-auto mb-7 max-w-7xl px-5 sm:px-8">
        <p className="text-xs font-medium tracking-[0.12em] text-[#6B584C] uppercase dark:text-[#9AA39E]">
          Trusted across manufacturing, IT &amp; public infrastructure
        </p>
      </div>

      {prefersReducedMotion ? (
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-5 sm:justify-between sm:px-8">
          {CLIENT_LOGOS.map((client) => (
            <ClientLogoTile key={client.id} client={client} />
          ))}
        </div>
      ) : (
        <div className="marquee-container relative flex overflow-hidden">
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent dark:from-[#07100C] sm:w-36" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-20 bg-gradient-to-l from-white to-transparent dark:from-[#07100C] sm:w-36" />

          <div className="animate-marquee-slow flex items-center gap-10 sm:gap-14">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, idx) => (
              <div
                key={`${client.id}-${idx}`}
                className="flex shrink-0 items-center gap-10 sm:gap-14"
              >
                <ClientLogoTile client={client} />
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#8A5322]/30 dark:bg-white/15"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
