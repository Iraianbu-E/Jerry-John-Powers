import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Play, X } from 'lucide-react';
import { GalleryRecord, SITE_DATA } from '@/src/data/siteData';
import { SolarImage } from '@/src/components/SolarImage';

type FilterTab = 'All' | 'Rooftop' | 'Ground Mounted';

export const Gallery: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<FilterTab>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryRecord | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const items =
    filter === 'All'
      ? SITE_DATA.gallery.items
      : SITE_DATA.gallery.items.filter((item) => item.category === filter);

  const currentIdx = lightboxItem
    ? items.findIndex((i) => i.id === lightboxItem.id)
    : -1;

  const stepLightbox = (dir: 'prev' | 'next') => {
    if (currentIdx === -1 || items.length === 0) return;
    const nextIdx =
      dir === 'next'
        ? (currentIdx + 1) % items.length
        : (currentIdx - 1 + items.length) % items.length;
    setLightboxItem(items[nextIdx]);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxItem(null);
        setVideoOpen(false);
      } else if (lightboxItem && e.key === 'ArrowRight') {
        stepLightbox('next');
      } else if (lightboxItem && e.key === 'ArrowLeft') {
        stepLightbox('prev');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <section
      id="gallery"
      className="border-b border-[#241912]/10 bg-white py-24 transition-colors duration-500 dark:border-white/10 dark:bg-[#07100C] sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold tracking-[0.12em] text-[#8A5322] uppercase dark:font-medium dark:text-[#F5F06A]">
              {SITE_DATA.gallery.eyebrow}
            </p>
            <h2 className="font-editorial mt-4 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium text-[#241912] [text-wrap:balance] dark:text-[#F5F5F0]">
              {SITE_DATA.gallery.headline}
            </h2>
          </motion.div>

          {/* Filter Pills */}
          <div
            role="tablist"
            aria-label="Filter gallery by installation type"
            className="flex flex-wrap items-center gap-2"
          >
            {(['All', 'Rooftop', 'Ground Mounted'] as FilterTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={filter === tab}
                onClick={() => setFilter(tab)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-xs font-medium transition-colors cursor-pointer ${
                  filter === tab
                    ? 'bg-[#3B271A] text-white dark:bg-[#F5F06A] dark:text-[#07100C]'
                    : 'border border-[#241912]/20 bg-transparent text-[#241912]/80 hover:border-[#3B271A] dark:border-white/20 dark:text-[#F5F5F0]/80 dark:hover:border-white/45'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Video Slot */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 overflow-hidden rounded-3xl border border-[#241912]/10 bg-[#FAF7F2] shadow-sm transition-colors duration-500 dark:border-white/10 dark:bg-[#0D1512] dark:shadow-none"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch">
            <div className="relative aspect-[16/9] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[300px]">
              <SolarImage
                src={SITE_DATA.gallery.videoSlot.poster}
                alt={SITE_DATA.gallery.videoSlot.title}
                className="h-full w-full object-cover"
                fallbackLabel="Field Video Walkthrough"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#241912]/70 via-[#241912]/20 to-transparent" />
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                aria-label="Open site video slot"
                className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] dark:focus-visible:ring-[#F5F06A] cursor-pointer"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#3B271A] text-white shadow-[0_8px_28px_rgba(36,25,18,0.4)] transition-transform duration-200 group-hover:scale-110 dark:bg-[#F5F06A] dark:text-[#07100C] dark:shadow-[0_0_32px_rgba(245,240,106,0.35)]">
                  <Play className="ml-0.5 h-6 w-6 fill-current" />
                </span>
              </button>
            </div>

            <div className="flex flex-col justify-between p-7 sm:p-9 lg:col-span-5">
              <div>
                <p className="text-xs font-semibold text-[#8A5322] dark:font-medium dark:text-[#F5F06A]">
                  {SITE_DATA.gallery.videoSlot.duration}
                </p>
                <h3 className="font-editorial mt-3 text-2xl font-medium text-[#241912] dark:text-[#F5F5F0] sm:text-3xl">
                  {SITE_DATA.gallery.videoSlot.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-[#6B584C] dark:text-[#9AA39E]">
                  {SITE_DATA.gallery.videoSlot.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#241912]/25 bg-white px-5 py-2.5 text-xs font-medium text-[#241912] transition-colors hover:bg-[#3B271A] hover:text-white cursor-pointer dark:border-white/25 dark:bg-transparent dark:text-[#F5F5F0] dark:hover:bg-white/10"
              >
                <Play className="h-3.5 w-3.5 text-[#8A5322] dark:text-[#F5F06A]" />
                <span>Play walkthrough</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <div className="mt-8 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative break-inside-avoid overflow-hidden rounded-3xl border border-[#241912]/10 bg-[#241912] dark:border-white/10 dark:bg-[#0D1512]"
            >
              <button
                type="button"
                onClick={() => setLightboxItem(item)}
                aria-label={`Open ${item.title} in lightbox`}
                className="relative block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] dark:focus-visible:ring-[#F5F06A] cursor-pointer"
              >
                <div className={`relative w-full overflow-hidden ${item.aspectClass}`}>
                  <SolarImage
                    src={item.image}
                    alt={`${item.title} — ${item.location}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    fallbackLabel={item.title}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1D140E]/90 via-[#1D140E]/25 to-transparent dark:from-[#07100C]/90 dark:via-[#07100C]/25" />
                  <div className="absolute right-5 bottom-5 left-5">
                    <p className="text-xs font-medium text-[#F5E6C8] dark:text-[#F5F06A]">
                      {item.category} · {item.capacity}
                    </p>
                    <h3 className="mt-1 text-base font-medium text-white dark:text-[#F5F5F0]">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-light text-white/75 dark:text-[#F5F5F0]/75">
                      {item.location}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightboxItem.title}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#241912]/80 p-4 backdrop-blur-xl dark:bg-[#07100C]/90 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl overflow-hidden rounded-3xl border border-[#241912]/15 bg-white text-[#241912] dark:border-white/15 dark:bg-[#0D1512] dark:text-[#F5F5F0]"
            >
              <div className="flex items-center justify-between border-b border-[#241912]/10 px-6 py-4 dark:border-white/10">
                <div>
                  <p className="text-xs font-semibold text-[#8A5322] dark:font-medium dark:text-[#F5F06A]">
                    {lightboxItem.category} · {lightboxItem.capacity}
                  </p>
                  <h3 className="text-base font-medium">{lightboxItem.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxItem(null)}
                  aria-label="Close lightbox"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#241912]/15 hover:bg-[#FAF7F2] dark:border-white/15 dark:hover:bg-white/10 cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="relative aspect-[16/9] w-full bg-[#1C140E] dark:bg-[#07100C]">
                <SolarImage
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  className="h-full w-full object-contain"
                  priority
                  fallbackLabel={lightboxItem.title}
                />
              </div>

              <div className="flex items-center justify-between border-t border-[#241912]/10 px-6 py-4 dark:border-white/10">
                <span className="text-xs font-light text-[#6B584C] dark:text-[#9AA39E]">
                  {lightboxItem.location}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => stepLightbox('prev')}
                    aria-label="Previous image"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#241912]/20 hover:bg-[#FAF7F2] dark:border-white/20 dark:hover:bg-white/10 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepLightbox('next')}
                    aria-label="Next image"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#241912]/20 hover:bg-[#FAF7F2] dark:border-white/20 dark:hover:bg-white/10 cursor-pointer"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Slot Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Site video walkthrough"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#241912]/80 p-4 backdrop-blur-xl dark:bg-[#07100C]/90 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl overflow-hidden rounded-3xl border border-[#241912]/15 bg-white text-[#241912] dark:border-white/15 dark:bg-[#0D1512] dark:text-[#F5F5F0]"
            >
              <div className="flex items-center justify-between border-b border-[#241912]/10 px-6 py-4 dark:border-white/10">
                <div>
                  <p className="text-xs font-semibold text-[#8A5322] dark:font-medium dark:text-[#F5F06A]">
                    {SITE_DATA.gallery.videoSlot.duration}
                  </p>
                  <h3 className="text-base font-medium">
                    {SITE_DATA.gallery.videoSlot.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setVideoOpen(false)}
                  aria-label="Close video preview"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#241912]/15 hover:bg-[#FAF7F2] dark:border-white/15 dark:hover:bg-white/10 cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1C140E] dark:bg-[#07100C]">
                <SolarImage
                  src={SITE_DATA.gallery.videoSlot.poster}
                  alt={SITE_DATA.gallery.videoSlot.title}
                  className="h-full w-full object-cover opacity-50"
                  priority
                  fallbackLabel="Video Walkthrough Slot"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1C140E]/55 px-6 text-center">
                  <p className="font-editorial text-3xl font-medium text-white">
                    Site Video Slot Ready
                  </p>
                  <p className="mt-2 max-w-md text-sm font-light text-white/80">
                    Connect your hosted MP4 or Vimeo/YouTube embed inside the Gallery video modal when your project footage is published.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
