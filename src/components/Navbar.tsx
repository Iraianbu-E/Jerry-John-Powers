import React, { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react';
import { Menu, X } from 'lucide-react';
import { SITE_DATA } from '@/src/data/siteData';

interface NavbarProps {
  onQuoteClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onQuoteClick }) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);

    if (mobileOpen) {
      setHidden(false);
      return;
    }

    if (latest > 140 && latest > previous) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }
  });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        animate={
          prefersReducedMotion ? { y: 0 } : { y: hidden ? '-100%' : '0%' }
        }
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'border-b border-[#241912]/10 bg-white/90 py-3.5 text-[#241912] backdrop-blur-xl dark:border-white/10 dark:bg-[#07100C]/85 dark:text-[#F5F5F0]'
            : 'border-b border-transparent bg-transparent py-5 text-[#241912] dark:text-[#F5F5F0]'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-5 sm:px-8">
          {/* Logo: solid dot + wordmark */}
          <a
            href="#hero"
            className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] dark:focus-visible:ring-[#F5F06A] rounded-full"
          >
            <span
              className="h-2.5 w-2.5 rounded-full bg-[#8A5322] transition-colors duration-700 dark:bg-[#F5F06A]"
              aria-hidden="true"
            />
            <span className="font-editorial text-lg font-medium tracking-[-0.02em]">
              {SITE_DATA.brand.shortName}
            </span>
          </a>

          {/* Centered navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-normal text-[#3B271A]/80 transition-colors duration-700 dark:text-[#F5F5F0]/80"
          >
            {SITE_DATA.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#241912] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] dark:hover:text-white dark:focus-visible:ring-[#F5F06A] rounded-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right action: Solid pill button "Get an Instant Quote" */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={onQuoteClick}
              className="hidden sm:inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-[#241912] px-4 py-2 text-xs font-medium text-white transition-all duration-700 hover:bg-[#3B271A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] cursor-pointer dark:bg-white dark:text-[#07100C] dark:hover:bg-[#F5F06A] dark:focus-visible:ring-[#F5F06A]"
            >
              {SITE_DATA.navCtaLabel}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#241912]/20 bg-white/70 text-[#241912] backdrop-blur-md transition-colors md:hidden cursor-pointer dark:border-white/25 dark:bg-white/[0.06] dark:text-[#F5F5F0]"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile slide-in panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-[#241912]/50 backdrop-blur-sm md:hidden dark:bg-[#07100C]/70"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={prefersReducedMotion ? { x: 0 } : { x: '100%' }}
              animate={{ x: 0 }}
              exit={prefersReducedMotion ? { x: 0 } : { x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="ml-auto flex h-full w-[82vw] max-w-sm flex-col justify-between border-l border-[#241912]/10 bg-white p-6 text-[#241912] dark:border-white/10 dark:bg-[#0D1512] dark:text-[#F5F5F0]"
            >
              <div className="flex items-center justify-between border-b border-[#241912]/10 pb-5 dark:border-white/10">
                <span className="inline-flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#8A5322] dark:bg-[#F5F06A]" />
                  <span className="font-editorial text-base font-medium">
                    {SITE_DATA.brand.shortName}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#241912]/15 dark:border-white/15 cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <nav className="my-auto py-8">
                <ul className="space-y-4">
                  {SITE_DATA.navLinks.map((link, idx) => (
                    <motion.li
                      key={link.href}
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, x: 18 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + idx * 0.05,
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleNavClick(link.href)}
                        className="font-editorial block w-full py-2 text-left text-3xl font-medium transition-colors hover:text-[#8A5322] dark:hover:text-[#F5F06A] cursor-pointer"
                      >
                        {link.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-[#241912]/10 pt-5 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onQuoteClick();
                  }}
                  className="w-full rounded-full bg-[#3B271A] px-5 py-3 text-sm font-medium text-white dark:bg-[#F5F06A] dark:text-[#07100C] cursor-pointer"
                >
                  Book a free consultation
                </button>
                <p className="mt-4 text-xs text-[#6B584C] dark:text-[#9AA39E]">
                  {SITE_DATA.contact.phoneDisplay}
                </p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
