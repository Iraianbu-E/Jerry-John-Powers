import React, { useState } from 'react';

interface SolarImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fallbackLabel?: string;
}

/**
 * Resilient editorial image slot with white/warm-sand and dark-forest gradient fallbacks.
 */
export const SolarImage: React.FC<SolarImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`relative flex items-end overflow-hidden bg-gradient-to-br from-[#F3ECE2] via-[#EFE7DC] to-[#FFFFFF] p-6 dark:from-[#13201A] dark:via-[#0D1512] dark:to-[#07100C] ${className}`}
        role="img"
        aria-label={alt}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            background:
              'radial-gradient(circle at 75% 25%, rgba(138, 83, 34, 0.16), transparent 55%)',
          }}
        />
        {fallbackLabel && (
          <span className="relative z-10 text-xs font-medium text-[#6B584C] dark:text-[#9AA39E]">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
