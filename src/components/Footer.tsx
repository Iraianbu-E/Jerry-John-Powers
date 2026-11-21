import React from 'react';
import { Globe, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { SITE_DATA } from '@/src/data/siteData';

export const Footer: React.FC = () => {
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-[#241912]/10 bg-[#FAF7F2] py-16 transition-colors duration-500 dark:border-white/10 dark:bg-[#060D0A] sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Brand Lockup + Summary + Circular Icon Row + Talk to Us */}
          <div className="lg:col-span-4">
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, '#hero')}
              className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] dark:focus-visible:ring-[#F5F06A] rounded-lg"
            >
              <svg
                viewBox="0 0 42 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-9 shrink-0 text-[#8A5322] dark:text-[#F5F06A]"
                aria-hidden="true"
              >
                <path
                  d="M3 16C12 6 30 6 39 16"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M9 20C15.5 14.5 26.5 14.5 33 20"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <circle cx="21" cy="7" r="2.2" fill="currentColor" />
              </svg>
              <span className="font-editorial text-xl font-medium tracking-[-0.02em] text-[#241912] dark:text-[#F5F5F0]">
                {SITE_DATA.brand.shortName}
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-[#6B584C] dark:text-[#9AA39E]">
              {SITE_DATA.footer.summary}
            </p>

            {/* Circular Quick-Connect Icons matching reference row */}
            <div className="mt-6 flex items-center gap-2.5">
              <a
                href={SITE_DATA.contact.phoneHref}
                aria-label="Call Jerry John Powers"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#241912]/8 text-[#241912] transition-colors duration-200 hover:bg-[#3B271A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] dark:bg-white/10 dark:text-[#F5F5F0] dark:hover:bg-[#F5F06A] dark:hover:text-[#07100C] dark:focus-visible:ring-[#F5F06A]"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${SITE_DATA.contact.email}`}
                aria-label="Email Jerry John Powers"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#241912]/8 text-[#241912] transition-colors duration-200 hover:bg-[#3B271A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] dark:bg-white/10 dark:text-[#F5F5F0] dark:hover:bg-[#F5F06A] dark:hover:text-[#07100C] dark:focus-visible:ring-[#F5F06A]"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                aria-label="Inquire on LinkedIn or contact desk"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#241912]/8 text-[#241912] transition-colors duration-200 hover:bg-[#3B271A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] dark:bg-white/10 dark:text-[#F5F5F0] dark:hover:bg-[#F5F06A] dark:hover:text-[#07100C] dark:focus-visible:ring-[#F5F06A]"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                aria-label="Chennai office location"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#241912]/8 text-[#241912] transition-colors duration-200 hover:bg-[#3B271A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] dark:bg-white/10 dark:text-[#F5F5F0] dark:hover:bg-[#F5F06A] dark:hover:text-[#07100C] dark:focus-visible:ring-[#F5F06A]"
              >
                <MapPin className="h-4 w-4" />
              </a>
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, '#projects')}
                aria-label="Pan-India solar EPC footprint"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#241912]/8 text-[#241912] transition-colors duration-200 hover:bg-[#3B271A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] dark:bg-white/10 dark:text-[#F5F5F0] dark:hover:bg-[#F5F06A] dark:hover:text-[#07100C] dark:focus-visible:ring-[#F5F06A]"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>

            {/* Talk To Us Block */}
            <div className="mt-7">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#6B584C] uppercase dark:text-[#9AA39E]">
                {SITE_DATA.footer.talkToUsLabel}
              </p>
              <a
                href={SITE_DATA.contact.phoneHref}
                className="font-editorial mt-1.5 block text-2xl font-semibold tracking-[-0.02em] text-[#241912] tabular-nums transition-colors hover:text-[#8A5322] dark:text-[#F5F5F0] dark:hover:text-[#F5F06A]"
              >
                {SITE_DATA.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${SITE_DATA.contact.email}`}
                className="mt-1 inline-block text-sm font-light text-[#6B584C] transition-colors hover:text-[#8A5322] dark:text-[#9AA39E] dark:hover:text-[#F5F06A]"
              >
                {SITE_DATA.contact.email}
              </a>
            </div>
          </div>

          {/* Right 4 Structured Link Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {SITE_DATA.footer.columns.map((column) => (
              <div key={column.heading}>
                <p className="text-sm font-semibold text-[#241912] dark:text-[#F5F5F0]">
                  {column.heading}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm font-light text-[#6B584C] dark:text-[#A3B0AA]">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => scrollToSection(e, link.href)}
                        className="transition-colors duration-150 hover:text-[#8A5322] focus-visible:outline-none focus-visible:underline dark:hover:text-[#F5F06A]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[#241912]/10 pt-6 text-xs font-light text-[#6B584C] dark:border-white/10 dark:text-[#9AA39E] sm:flex-row sm:items-center sm:justify-between">
          <p>{SITE_DATA.brand.copyright}</p>
          <p>{SITE_DATA.contact.address}</p>
        </div>
      </div>
    </footer>
  );
};
