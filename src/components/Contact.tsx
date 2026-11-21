import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { SITE_DATA } from '@/src/data/siteData';

type ServiceOption = 'Ground Mounted' | 'Rooftop' | 'Others';

interface ContactProps {
  preselectedService?: ServiceOption;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  serviceType: ServiceOption;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export const Contact: React.FC<ContactProps> = ({ preselectedService }) => {
  const prefersReducedMotion = useReducedMotion();
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    serviceType: preselectedService || 'Ground Mounted',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setValues((prev) => ({ ...prev, serviceType: preselectedService }));
    }
  }, [preselectedService]);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!values.name.trim() || values.name.trim().length < 2) {
      next.name = 'Please enter your full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (values.phone.replace(/\D/g, '').length < 10) {
      next.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!values.message.trim() || values.message.trim().length < 10) {
      next.message =
        'Please share brief project details (at least 10 characters).';
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setValues({
      name: '',
      email: '',
      phone: '',
      serviceType: 'Ground Mounted',
      message: '',
    });
  };

  return (
    <section
      id="contact"
      className="bg-[#F6F1EA] py-24 transition-colors duration-500 dark:bg-[#0A130F] sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-start">
          {/* Left: Headline + Pill Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs font-semibold tracking-[0.12em] text-[#8A5322] uppercase dark:font-medium dark:text-[#F5F06A]">
                {SITE_DATA.contact.eyebrow}
              </p>
              <h2 className="font-editorial mt-4 text-[clamp(2.5rem,5vw,4.5rem)] font-medium text-[#241912] [text-wrap:balance] dark:text-[#F5F5F0]">
                {SITE_DATA.contact.headline}
              </h2>
              <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-[#6B584C] dark:text-[#9AA39E] sm:text-base">
                {SITE_DATA.contact.subtext}
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-10 rounded-3xl border border-[#8A5322]/25 bg-white p-8 dark:border-[#F5F06A]/35 dark:bg-[#0D1512]"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="mt-0.5 h-7 w-7 shrink-0 text-[#8A5322] dark:text-[#F5F06A]" />
                    <div>
                      <h3 className="font-editorial text-2xl font-medium text-[#241912] dark:text-[#F5F5F0]">
                        Consultation request received
                      </h3>
                      <p className="mt-2 text-sm font-light leading-relaxed text-[#6B584C] dark:text-[#9AA39E]">
                        Thank you,{' '}
                        <span className="font-medium text-[#241912] dark:text-[#F5F5F0]">
                          {values.name}
                        </span>
                        . Our Chennai engineering desk has logged your{' '}
                        <span className="font-medium text-[#8A5322] dark:text-[#F5F06A]">
                          {values.serviceType}
                        </span>{' '}
                        inquiry and will reach out on{' '}
                        <span className="text-[#241912] dark:text-[#F5F5F0]">
                          {values.phone}
                        </span>
                        .
                      </p>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="mt-6 rounded-full border border-[#241912]/20 px-5 py-2.5 text-xs font-medium text-[#241912] transition-colors hover:bg-[#FAF7F2] cursor-pointer dark:border-white/25 dark:text-[#F5F5F0] dark:hover:bg-white/10"
                      >
                        Submit another request
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={false}
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-10 space-y-5"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="c-name"
                        className="mb-2 block pl-4 text-xs font-medium text-[#6B584C] dark:text-[#9AA39E]"
                      >
                        Name
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        value={values.name}
                        onChange={(e) =>
                          setValues({ ...values, name: e.target.value })
                        }
                        placeholder="Your full name"
                        className="w-full rounded-full border border-[#241912]/15 bg-white px-5 py-3.5 text-sm text-[#241912] placeholder-[#6B584C]/60 transition-colors focus:border-[#8A5322] focus:outline-none dark:border-white/15 dark:bg-[#07100C] dark:text-[#F5F5F0] dark:placeholder-[#9AA39E]/50 dark:focus:border-[#F5F06A]"
                      />
                      {errors.name && (
                        <p className="mt-1.5 pl-4 text-xs text-[#8A3B12] dark:text-[#F5F06A]">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="c-email"
                        className="mb-2 block pl-4 text-xs font-medium text-[#6B584C] dark:text-[#9AA39E]"
                      >
                        Email
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        value={values.email}
                        onChange={(e) =>
                          setValues({ ...values, email: e.target.value })
                        }
                        placeholder="name@company.com"
                        className="w-full rounded-full border border-[#241912]/15 bg-white px-5 py-3.5 text-sm text-[#241912] placeholder-[#6B584C]/60 transition-colors focus:border-[#8A5322] focus:outline-none dark:border-white/15 dark:bg-[#07100C] dark:text-[#F5F5F0] dark:placeholder-[#9AA39E]/50 dark:focus:border-[#F5F06A]"
                      />
                      {errors.email && (
                        <p className="mt-1.5 pl-4 text-xs text-[#8A3B12] dark:text-[#F5F06A]">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="c-phone"
                        className="mb-2 block pl-4 text-xs font-medium text-[#6B584C] dark:text-[#9AA39E]"
                      >
                        Phone
                      </label>
                      <input
                        id="c-phone"
                        type="tel"
                        value={values.phone}
                        onChange={(e) =>
                          setValues({ ...values, phone: e.target.value })
                        }
                        placeholder="+91 98XXX XXXXX"
                        className="w-full rounded-full border border-[#241912]/15 bg-white px-5 py-3.5 text-sm text-[#241912] placeholder-[#6B584C]/60 transition-colors focus:border-[#8A5322] focus:outline-none dark:border-white/15 dark:bg-[#07100C] dark:text-[#F5F5F0] dark:placeholder-[#9AA39E]/50 dark:focus:border-[#F5F06A]"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 pl-4 text-xs text-[#8A3B12] dark:text-[#F5F06A]">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <span className="mb-2 block pl-4 text-xs font-medium text-[#6B584C] dark:text-[#9AA39E]">
                        Service type
                      </span>
                      <div
                        role="radiogroup"
                        aria-label="Service type"
                        className="flex flex-wrap gap-2"
                      >
                        {SITE_DATA.contact.serviceOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            role="radio"
                            aria-checked={values.serviceType === option}
                            onClick={() =>
                              setValues({ ...values, serviceType: option })
                            }
                            className={`rounded-full px-4 py-3 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                              values.serviceType === option
                                ? 'bg-[#3B271A] text-white dark:bg-[#F5F06A] dark:text-[#07100C]'
                                : 'border border-[#241912]/15 bg-white text-[#241912]/80 hover:border-[#8A5322] dark:border-white/15 dark:bg-[#07100C] dark:text-[#F5F5F0]/80 dark:hover:border-white/40'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="c-message"
                      className="mb-2 block pl-4 text-xs font-medium text-[#6B584C] dark:text-[#9AA39E]"
                    >
                      Message
                    </label>
                    <textarea
                      id="c-message"
                      rows={4}
                      value={values.message}
                      onChange={(e) =>
                        setValues({ ...values, message: e.target.value })
                      }
                      placeholder="Estimated kW / MW capacity, roof or land location in Tamil Nadu or India..."
                      className="w-full rounded-3xl border border-[#241912]/15 bg-white px-5 py-4 text-sm text-[#241912] placeholder-[#6B584C]/60 transition-colors focus:border-[#8A5322] focus:outline-none dark:border-white/15 dark:bg-[#07100C] dark:text-[#F5F5F0] dark:placeholder-[#9AA39E]/50 dark:focus:border-[#F5F06A]"
                    />
                    {errors.message && (
                      <p className="mt-1.5 pl-4 text-xs text-[#8A3B12] dark:text-[#F5F06A]">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#3B271A] px-7 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#523726] hover:shadow-[0_8px_28px_rgba(59,39,26,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5322] cursor-pointer dark:bg-[#F5F06A] dark:text-[#07100C] dark:hover:bg-[#F5F06A] dark:hover:shadow-[0_0_28px_rgba(245,240,106,0.4)] dark:focus-visible:ring-[#F5F06A]"
                  >
                    <span>Send inquiry</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Address & Direct Contact */}
          <div className="rounded-3xl border border-[#241912]/10 bg-white p-7 shadow-sm transition-colors duration-500 dark:border-white/10 dark:bg-[#0D1512] dark:shadow-none sm:p-9 lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.12em] text-[#8A5322] uppercase dark:font-medium dark:text-[#F5F06A]">
              Chennai office
            </p>
            <h3 className="font-editorial mt-3 text-2xl font-medium text-[#241912] dark:text-[#F5F5F0] sm:text-3xl">
              {SITE_DATA.brand.legalName}
            </h3>

            <div className="mt-8 space-y-6 border-t border-[#241912]/10 pt-8 dark:border-white/10">
              <a
                href={SITE_DATA.contact.phoneHref}
                className="group flex items-start gap-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#241912]/15 bg-[#FAF7F2] text-[#8A5322] transition-colors group-hover:border-[#8A5322] dark:border-white/15 dark:bg-[#07100C] dark:text-[#F5F06A] dark:group-hover:border-[#F5F06A]">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-light text-[#6B584C] dark:text-[#9AA39E]">
                    Tap to call
                  </p>
                  <p className="mt-0.5 text-base font-medium text-[#241912] group-hover:text-[#8A5322] tabular-nums dark:text-[#F5F5F0] dark:group-hover:text-[#F5F06A]">
                    {SITE_DATA.contact.phoneDisplay}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${SITE_DATA.contact.email}`}
                className="group flex items-start gap-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#241912]/15 bg-[#FAF7F2] text-[#8A5322] transition-colors group-hover:border-[#8A5322] dark:border-white/15 dark:bg-[#07100C] dark:text-[#F5F06A] dark:group-hover:border-[#F5F06A]">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-light text-[#6B584C] dark:text-[#9AA39E]">
                    Email
                  </p>
                  <p className="mt-0.5 text-base font-medium break-all text-[#241912] group-hover:text-[#8A5322] dark:text-[#F5F5F0] dark:group-hover:text-[#F5F06A]">
                    {SITE_DATA.contact.email}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#241912]/15 bg-[#FAF7F2] text-[#6B584C] dark:border-white/15 dark:bg-[#07100C] dark:text-[#9AA39E]">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-light text-[#6B584C] dark:text-[#9AA39E]">
                    Address
                  </p>
                  <address className="mt-0.5 text-sm font-light leading-relaxed not-italic text-[#3B271A] dark:text-[#F5F5F0]/90">
                    {SITE_DATA.contact.address}
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
