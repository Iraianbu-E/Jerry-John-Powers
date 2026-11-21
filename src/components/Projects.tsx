import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { ProjectRecord, SITE_DATA } from '@/src/data/siteData';
import { SolarImage } from '@/src/components/SolarImage';

interface ProjectsProps {
  onInquireProject: (type: 'Ground Mounted' | 'Rooftop') => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onInquireProject }) => {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragMoved, setDragMoved] = useState(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(
    null
  );

  const updateScrollBounds = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollBounds();
    window.addEventListener('resize', updateScrollBounds);
    return () => window.removeEventListener('resize', updateScrollBounds);
  }, [updateScrollBounds]);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const pillX = useSpring(rawX, { stiffness: 320, damping: 28 });
  const pillY = useSpring(rawY, { stiffness: 320, damping: 28 });

  const handleTrackPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || e.pointerType === 'touch') return;
    rawX.set(e.clientX - 34);
    rawY.set(e.clientY - 18);

    if (isDragging && trackRef.current) {
      const dx = e.clientX - dragStartRef.current.x;
      if (Math.abs(dx) > 5) setDragMoved(true);
      trackRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current || e.pointerType === 'touch') return;
    setIsDragging(true);
    setDragMoved(false);
    dragStartRef.current = {
      x: e.clientX,
      scrollLeft: trackRef.current.scrollLeft,
    };
  };

  const handlePointerUpOrLeave = () => {
    setIsDragging(false);
  };

  const scrollByStep = (dir: 'prev' | 'next') => {
    if (!trackRef.current) return;
    const distance = 420;
    trackRef.current.scrollBy({
      left: dir === 'next' ? distance : -distance,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="projects"
      className="relative border-t border-[#241912]/10 bg-[#F6F1EA] py-24 transition-colors duration-500 dark:border-white/10 dark:bg-[#0A130F] sm:py-32"
    >
      {/* Floating cursor-following "View" pill on desktop */}
      {!prefersReducedMotion && hoveredId && (
        <motion.div
          style={{ x: pillX, y: pillY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="pointer-events-none fixed top-0 left-0 z-50 hidden rounded-full bg-[#3B271A] px-4 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-[#F5F06A] dark:text-[#07100C] lg:block"
        >
          View
        </motion.div>
      )}

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold tracking-[0.12em] text-[#8A5322] uppercase dark:font-medium dark:text-[#F5F06A]">
            {SITE_DATA.projects.eyebrow}
          </p>
          <h2 className="font-editorial mt-4 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium text-[#241912] [text-wrap:balance] dark:text-[#F5F5F0]">
            {SITE_DATA.projects.headline}
          </h2>
        </motion.div>
      </div>

      {/* Horizontal drag-to-scroll track with left & right flanking arrows */}
      <div className="relative mt-12">
        <button
          type="button"
          onClick={() => scrollByStep('prev')}
          onMouseEnter={() => setHoveredId(null)}
          disabled={!canScrollLeft}
          aria-label="Scroll projects left"
          className="absolute top-1/2 left-3 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#241912]/20 bg-white/95 text-[#241912] shadow-[0_8px_24px_rgba(36,25,18,0.14)] backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-[#3B271A] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] disabled:cursor-default disabled:opacity-35 disabled:hover:scale-100 cursor-pointer sm:left-5 sm:h-12 sm:w-12 dark:border-white/20 dark:bg-[#0D1512]/90 dark:text-[#F5F5F0] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)] dark:hover:border-[#F5F06A] dark:hover:bg-[#0D1512] dark:focus-visible:ring-[#F5F06A]"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
        </button>

        <button
          type="button"
          onClick={() => scrollByStep('next')}
          onMouseEnter={() => setHoveredId(null)}
          disabled={!canScrollRight}
          aria-label="Scroll projects right"
          className="absolute top-1/2 right-3 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#241912]/20 bg-white/95 text-[#241912] shadow-[0_8px_24px_rgba(36,25,18,0.14)] backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-[#3B271A] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] disabled:cursor-default disabled:opacity-35 disabled:hover:scale-100 cursor-pointer sm:right-5 sm:h-12 sm:w-12 dark:border-white/20 dark:bg-[#0D1512]/90 dark:text-[#F5F5F0] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)] dark:hover:border-[#F5F06A] dark:hover:bg-[#0D1512] dark:focus-visible:ring-[#F5F06A]"
        >
          <ArrowRight className="h-4.5 w-4.5" />
        </button>

        <div
          ref={trackRef}
          onScroll={updateScrollBounds}
          onPointerDown={handlePointerDown}
          onPointerMove={handleTrackPointerMove}
          onPointerUp={handlePointerUpOrLeave}
          onPointerLeave={() => {
            handlePointerUpOrLeave();
            setHoveredId(null);
          }}
          className={`flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:px-8 xl:px-[max(2rem,calc((100vw-80rem)/2+2rem))] ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          style={{ scrollbarWidth: 'none' }}
        >
        {SITE_DATA.projects.items.map((project, index) => (
          <motion.article
            key={project.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.55,
              delay: Math.min(index * 0.06, 0.3),
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => {
              if (!dragMoved) setSelectedProject(project);
            }}
            className="group relative w-[84vw] max-w-[400px] shrink-0 snap-start overflow-hidden rounded-3xl border border-[#241912]/10 bg-white shadow-sm transition-colors duration-500 dark:border-white/10 dark:bg-[#0D1512] dark:shadow-none lg:cursor-none"
          >
            {/* Photo container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <SolarImage
                src={project.image}
                alt={`${project.name} ${project.capacity} ${project.type} installation`}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                fallbackLabel={project.name}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/15 to-transparent dark:from-[#0D1512] dark:via-[#0D1512]/25 dark:to-transparent" />
            </div>

            {/* Card Footer */}
            <div className="p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="font-editorial text-3xl font-medium text-[#8A5322] tabular-nums dark:text-[#F5F06A]">
                  {project.capacity}
                </span>
                <span className="rounded-full border border-[#241912]/12 bg-[#FAF7F2] px-3 py-1 text-xs font-normal text-[#3B271A] whitespace-nowrap dark:border-white/15 dark:bg-white/[0.04] dark:text-[#F5F5F0]/85">
                  {project.type}
                </span>
              </div>

              <h3 className="mt-3 text-lg font-medium text-[#241912] dark:text-[#F5F5F0]">
                {project.name}
              </h3>
              <p className="mt-1 text-xs font-light text-[#6B584C] dark:text-[#9AA39E]">
                {project.location}
              </p>
            </div>
          </motion.article>
        ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.name}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#241912]/70 p-4 backdrop-blur-xl dark:bg-[#07100C]/85 sm:p-8"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[#241912]/15 bg-white text-[#241912] dark:border-white/15 dark:bg-[#0D1512] dark:text-[#F5F5F0]"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <SolarImage
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="h-full w-full object-cover"
                  priority
                  fallbackLabel={selectedProject.name}
                />
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#241912]/80 text-white backdrop-blur-md transition-colors hover:bg-[#3B271A] dark:bg-[#07100C]/80 dark:text-[#F5F5F0] dark:hover:bg-[#F5F06A] dark:hover:text-[#07100C] cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="p-7 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-editorial text-3xl font-medium text-[#8A5322] tabular-nums dark:text-[#F5F06A]">
                    {selectedProject.capacity}
                  </span>
                  <span className="rounded-full border border-[#241912]/15 bg-[#FAF7F2] px-3 py-1 text-xs text-[#3B271A] dark:border-white/15 dark:bg-transparent dark:text-[#F5F5F0]/85">
                    {selectedProject.type}
                  </span>
                </div>
                <h3 className="font-editorial mt-3 text-3xl font-medium">
                  {selectedProject.name}
                </h3>
                <p className="mt-1.5 text-sm font-light text-[#6B584C] dark:text-[#9AA39E]">
                  {selectedProject.location} · Turnkey Solar EPC Execution
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-[#241912]/10 pt-6 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      const type = selectedProject.type;
                      setSelectedProject(null);
                      onInquireProject(type);
                    }}
                    className="rounded-full bg-[#3B271A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#523726] dark:bg-[#F5F06A] dark:text-[#07100C] dark:hover:shadow-[0_0_24px_rgba(245,240,106,0.45)] cursor-pointer"
                  >
                    Request a similar project
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full border border-[#241912]/20 px-5 py-2.5 text-sm font-medium hover:bg-[#FAF7F2] cursor-pointer dark:border-white/25 dark:hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
