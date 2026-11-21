import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { heroMorning, heroNight } from '@/src/config/images';
import { SITE_DATA } from '@/src/data/siteData';

export type DayNightMode = 'morning' | 'night';

interface HeroDayNightProps {
  mode: DayNightMode;
  onSelectMode: (mode: DayNightMode) => void;
  onConsultClick: () => void;
}

const NIGHT_STARS = [
  { id: 's1', x: 12, y: 14, size: 2, delay: 0 },
  { id: 's2', x: 24, y: 9, size: 1.5, delay: 0.7 },
  { id: 's3', x: 36, y: 18, size: 2, delay: 1.4 },
  { id: 's4', x: 48, y: 11, size: 1.5, delay: 0.4 },
  { id: 's5', x: 61, y: 15, size: 2, delay: 1.9 },
  { id: 's6', x: 74, y: 8, size: 1.5, delay: 0.9 },
  { id: 's7', x: 84, y: 19, size: 2.5, delay: 0.2 },
  { id: 's8', x: 91, y: 12, size: 1.5, delay: 1.6 },
  { id: 's9', x: 18, y: 24, size: 1.5, delay: 1.1 },
  { id: 's10', x: 68, y: 25, size: 2, delay: 0.5 },
];

const ENERGY_STREAMS = [
  { id: 'e1', x: 37, delay: 0 },
  { id: 'e2', x: 43, delay: 0.55 },
  { id: 'e3', x: 50, delay: 0.25 },
  { id: 'e4', x: 57, delay: 0.85 },
  { id: 'e5', x: 63, delay: 0.4 },
];

const FallbackBuildingScene: React.FC<{ variant: DayNightMode }> = ({
  variant,
}) => {
  const isMorning = variant === 'morning';
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: isMorning
          ? 'linear-gradient(180deg, #F5F0E8 0%, #E7DED1 36%, #D7CBB9 64%, #F6F1EA 100%)'
          : 'linear-gradient(180deg, #04080F 0%, #08121E 40%, #0A1513 72%, #060B09 100%)',
      }}
    >
      <div
        className="absolute inset-x-0 top-[46%] h-40 blur-3xl"
        style={{
          background: isMorning
            ? 'radial-gradient(ellipse at 72% 50%, rgba(245, 240, 106, 0.45), transparent 65%)'
            : 'radial-gradient(ellipse at 50% 60%, rgba(245, 240, 106, 0.12), transparent 60%)',
        }}
      />
      <svg
        viewBox="0 0 1200 675"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <polygon
          points="330,360 870,360 820,275 380,275"
          fill={isMorning ? '#183C66' : '#0B1A2E'}
          stroke={isMorning ? '#88B4E6' : '#264366'}
          strokeWidth="1.5"
        />
        <rect
          x="335"
          y="360"
          width="530"
          height="135"
          rx="4"
          fill={isMorning ? '#D7CFC4' : '#0B1210'}
          stroke={isMorning ? 'rgba(36,25,18,0.14)' : 'rgba(255,255,255,0.12)'}
        />
        <rect
          x="365"
          y="385"
          width="145"
          height="36"
          fill={isMorning ? '#6E5A4C' : '#F5B841'}
          fillOpacity={isMorning ? 0.55 : 0.75}
        />
        <rect
          x="555"
          y="375"
          width="90"
          height="110"
          fill={isMorning ? '#806959' : '#F5C451'}
          fillOpacity={isMorning ? 0.6 : 0.85}
        />
        <rect
          x="690"
          y="385"
          width="145"
          height="36"
          fill={isMorning ? '#6E5A4C' : '#F5B841'}
          fillOpacity={isMorning ? 0.55 : 0.75}
        />
      </svg>
    </div>
  );
};

export const HeroDayNight: React.FC<HeroDayNightProps> = ({
  mode,
  onSelectMode,
  onConsultClick,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [morningImgError, setMorningImgError] = useState(false);
  const [nightImgError, setNightImgError] = useState(false);

  const morningBtnRef = useRef<HTMLButtonElement>(null);
  const nightBtnRef = useRef<HTMLButtonElement>(null);

  const mouseX = useSpring(0, { stiffness: 90, damping: 24 });
  const mouseY = useSpring(0, { stiffness: 90, damping: 24 });

  const buildingX = useTransform(mouseX, [-1, 1], [-5, 5]);
  const buildingY = useTransform(mouseY, [-1, 1], [-4, 4]);

  const handleToggleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const next: DayNightMode = mode === 'morning' ? 'night' : 'morning';
      onSelectMode(next);
      if (next === 'morning') {
        morningBtnRef.current?.focus();
      } else {
        nightBtnRef.current?.focus();
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      onSelectMode('morning');
      morningBtnRef.current?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      onSelectMode('night');
      nightBtnRef.current?.focus();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToServices = () => {
    const el = document.querySelector('#services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isMorning = mode === 'morning';
  const showMorningPhoto = Boolean(heroMorning) && !morningImgError;
  const showNightPhoto = Boolean(heroNight) && !nightImgError;
  const activeModeCopy = SITE_DATA.hero.modes[mode];

  return (
    <section
      id="hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-white px-5 pt-22 pb-7 text-center transition-colors duration-700 dark:bg-[#07100C] sm:px-8 sm:pt-24 sm:pb-9"
    >
      {/* Initial load fade */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 z-40 bg-[#F6F1EA] dark:bg-[#07100C]"
        />
      )}

      {/* BACKGROUND STACKED SCENE LAYERS */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          style={prefersReducedMotion ? undefined : { x: buildingX, y: buildingY }}
          className="absolute -inset-2"
        >
          {/* Base Layer: Night Scene */}
          <div className="absolute inset-0">
            {showNightPhoto ? (
              <img
                src={heroNight}
                alt="Commercial building with rooftop solar array illuminated at night"
                referrerPolicy="no-referrer"
                onError={() => setNightImgError(true)}
                className="h-full w-full object-cover object-center contrast-[1.03]"
              />
            ) : (
              <FallbackBuildingScene variant="night" />
            )}
          </div>

          {/* Top Layer: Morning Scene with smooth 900ms light/shadow sweep */}
          <motion.div
            initial={false}
            animate={
              prefersReducedMotion
                ? { opacity: isMorning ? 1 : 0 }
                : {
                    opacity: isMorning ? 1 : 0,
                    clipPath: isMorning
                      ? 'inset(0% 0% 0% 0%)'
                      : 'inset(0% 0% 0% 100%)',
                  }
            }
            transition={{
              duration: prefersReducedMotion ? 0.3 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            {showMorningPhoto ? (
              <img
                src={heroMorning}
                alt="Commercial building with rooftop solar array generating power in morning sunlight"
                referrerPolicy="no-referrer"
                onError={() => setMorningImgError(true)}
                className="h-full w-full object-cover object-center contrast-[1.03]"
              />
            ) : (
              <FallbackBuildingScene variant="morning" />
            )}
          </motion.div>

          {/* Soft atmospheric wipe beam across transition */}
          {!prefersReducedMotion && (
            <motion.div
              key={mode}
              initial={{ left: '-22%', opacity: 0 }}
              animate={{ left: '118%', opacity: [0, 0.55, 0] }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 bottom-0 w-56 blur-3xl"
              style={{
                background: isMorning
                  ? 'linear-gradient(90deg, transparent, rgba(255, 250, 235, 0.65), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(16, 26, 36, 0.7), transparent)',
              }}
            />
          )}
        </motion.div>

        {/* TOP & BOTTOM EDGE SCRIMS ONLY: Keeps center solar roof, glass facade, and street lights crystal clear */}
        <motion.div
          animate={{ opacity: isMorning ? 1 : 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(248, 244, 237, 0.95) 0%, rgba(244, 238, 229, 0.85) 20%, rgba(242, 235, 224, 0.32) 34%, rgba(255, 255, 255, 0.0) 44%, rgba(255, 255, 255, 0.0) 84%, rgba(250, 247, 242, 0.72) 94%, #FFFFFF 100%)',
          }}
        />
        <motion.div
          animate={{ opacity: isMorning ? 0 : 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(7, 16, 12, 0.78) 0%, rgba(7, 16, 12, 0.32) 22%, rgba(7, 16, 12, 0.0) 36%, rgba(7, 16, 12, 0.0) 84%, rgba(7, 16, 12, 0.72) 95%, #07100C 100%)',
          }}
        />

        {/* MORNING EXTRAS: Sunlit clouds, horizon glow, rooftop glint & energy flow */}
        {!prefersReducedMotion && (
          <motion.div
            animate={{ opacity: isMorning ? 1 : 0 }}
            transition={{ duration: 0.75 }}
            className="absolute inset-0"
            aria-hidden="true"
          >
            {/* Soft sunlit horizon haze behind roofline */}
            <div
              className="absolute top-[24%] left-1/2 h-48 w-[72vw] -translate-x-1/2 rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(ellipse, rgba(255, 248, 224, 0.65), transparent 70%)',
              }}
            />
            <motion.div
              animate={{ x: ['-4%', '4%', '-4%'] }}
              transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[22%] left-[10%] h-24 w-[44vw] rounded-full bg-white/45 blur-3xl"
            />
            <motion.div
              animate={{ x: ['4%', '-4%', '4%'] }}
              transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[28%] right-[10%] h-20 w-[36vw] rounded-full bg-[#F5EBDC]/55 blur-3xl"
            />

            {/* Rooftop solar panel glint sweep */}
            <div className="absolute top-[43%] left-1/2 h-[22%] w-[52%] -translate-x-1/2 overflow-hidden">
              <motion.div
                animate={{ x: ['-120%', '220%'] }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  repeatDelay: 3.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full w-1/3 -skew-x-12"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), rgba(245, 240, 106, 0.28), transparent)',
                }}
              />
            </div>

            {/* Live Energy Flow: particles flowing from panels down into building */}
            <div className="absolute inset-0">
              {ENERGY_STREAMS.map((stream) => (
                <div
                  key={stream.id}
                  style={{ left: `${stream.x}%`, top: '49%' }}
                  className="absolute flex h-[13%] flex-col items-center"
                >
                  <div className="h-full w-[1px] border-l border-dashed border-[#8A5322]/45" />
                  <motion.span
                    animate={{ y: [0, 72], opacity: [0, 0.95, 0] }}
                    transition={{
                      duration: 1.8,
                      delay: stream.delay,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute top-0 h-1.5 w-1.5 rounded-full bg-[#F5F06A] shadow-[0_0_8px_#F5F06A]"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* NIGHT EXTRAS: Twinkling stars, moon halo & glowing window pulse */}
        {!prefersReducedMotion && (
          <motion.div
            animate={{ opacity: isMorning ? 0 : 1 }}
            transition={{ duration: 0.75 }}
            className="absolute inset-0"
            aria-hidden="true"
          >
            {NIGHT_STARS.map((star) => (
              <motion.span
                key={star.id}
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                }}
                animate={{ opacity: [0.2, 0.85, 0.25] }}
                transition={{
                  duration: 3.4,
                  delay: star.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute rounded-full bg-[#F5F5F0]"
              />
            ))}
            <div
              className="absolute top-[11%] right-[25%] h-20 w-20 rounded-full blur-xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(220, 232, 255, 0.14), transparent 70%)',
              }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* TOP CENTER: Two-line Headline (crisp text with no box-clipped shadow halo) */}
      <div className="relative z-10 mx-auto mt-1 max-w-4xl sm:mt-3">
        <h1 className="font-editorial text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[1.03] tracking-[-0.03em]">
          <span className="block pb-1">
            <motion.span
              initial={prefersReducedMotion ? false : { y: 26, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`block transition-colors duration-700 ${
                isMorning ? 'text-[#241912]' : 'text-[#F5F5F0]'
              }`}
            >
              {SITE_DATA.hero.line1}
            </motion.span>
          </span>

          <span className="block pb-1">
            <motion.span
              initial={prefersReducedMotion ? false : { y: 26, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className={`block transition-colors duration-700 ${
                isMorning ? 'text-[#8A5322]' : 'text-[#F5F06A]'
              }`}
            >
              {SITE_DATA.hero.line2}
            </motion.span>
          </span>
        </h1>
      </div>

      {/* CENTER BREATHING SPACE: Frames the solar rooftop building & roadside lights clearly */}
      <div className="min-h-[130px] flex-1 sm:min-h-[170px] lg:min-h-[200px]" aria-hidden="true" />

      {/* BOTTOM CENTER: Glass Segmented Morning/Night Toggle (overlapping lower facade like video) + Copy + CTA Pills */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center"
      >
        {/* Glass Segmented Toggle matching reference video */}
        <div
          role="tablist"
          aria-label="Hero daylight mode"
          onKeyDown={handleToggleKeyDown}
          className="relative grid w-full max-w-[440px] grid-cols-2 rounded-[14px] border border-white/25 bg-[#241912]/45 p-1.5 backdrop-blur-xl shadow-[0_18px_48px_rgba(0,0,0,0.3)] transition-colors duration-700 dark:border-white/15 dark:bg-[#07100C]/65"
        >
          {(['morning', 'night'] as DayNightMode[]).map((itemMode) => {
            const selected = mode === itemMode;
            const option = SITE_DATA.hero.modes[itemMode];
            const Icon = itemMode === 'morning' ? Sun : Moon;

            return (
              <button
                key={itemMode}
                ref={itemMode === 'morning' ? morningBtnRef : nightBtnRef}
                type="button"
                role="tab"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => onSelectMode(itemMode)}
                className={`relative z-10 flex flex-col items-center justify-center rounded-[10px] px-3 py-2.5 text-center transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F06A] cursor-pointer sm:px-5 ${
                  selected
                    ? 'text-[#241912] dark:text-[#07100C]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="heroModePill"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.15 }
                        : { type: 'spring', stiffness: 360, damping: 32 }
                    }
                    className="absolute inset-0 -z-10 rounded-[10px] bg-[#F2ECE2] shadow-[0_4px_16px_rgba(0,0,0,0.18)] dark:bg-[#EAECC8] dark:shadow-[0_2px_18px_rgba(245,240,106,0.28)]"
                  />
                )}
                <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                  <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{option.label}</span>
                </span>
                <span
                  className={`mt-0.5 text-[11px] leading-tight transition-colors ${
                    selected
                      ? 'text-[#6B584C] dark:text-[#07100C]/75'
                      : 'text-white/70'
                  }`}
                >
                  {option.subtext}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mode Description */}
        <div
          aria-live="polite"
          className="mt-4 flex min-h-[52px] max-w-xl items-center justify-center rounded-2xl bg-[#FAF7F2]/88 px-5 py-2.5 shadow-[0_8px_28px_rgba(36,25,18,0.12)] backdrop-blur-md transition-colors duration-700 dark:bg-[#07100C]/78 dark:shadow-[0_8px_28px_rgba(0,0,0,0.45)]"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={mode}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="line-clamp-2 text-sm font-medium leading-relaxed text-[#241912] transition-colors duration-700 dark:font-normal dark:text-[#F5F5F0] sm:text-base"
            >
              <span className="sm:hidden">{activeModeCopy.shortDescription}</span>
              <span className="hidden sm:inline">{activeModeCopy.description}</span>
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA Pill Buttons */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={onConsultClick}
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#3B271A] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#523726] hover:shadow-[0_8px_28px_rgba(59,39,26,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] focus-visible:ring-offset-2 cursor-pointer dark:bg-[#F5F06A] dark:text-[#07100C] dark:hover:bg-[#F5F06A] dark:hover:shadow-[0_0_30px_rgba(245,240,106,0.4)] dark:focus-visible:ring-[#F5F06A]"
          >
            <span>{SITE_DATA.hero.primaryCta}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={scrollToServices}
            className="inline-flex items-center rounded-full border border-[#241912]/25 bg-white/80 px-6 py-3.5 text-sm font-medium text-[#241912] backdrop-blur-md transition-colors duration-300 hover:border-[#241912]/50 hover:bg-[#FAF7F2] cursor-pointer dark:border-white/30 dark:bg-[#07100C]/35 dark:text-[#F5F5F0] dark:hover:border-white/60 dark:hover:bg-white/10"
          >
            {SITE_DATA.hero.secondaryCta}
          </button>
        </div>
      </motion.div>
    </section>
  );
};
