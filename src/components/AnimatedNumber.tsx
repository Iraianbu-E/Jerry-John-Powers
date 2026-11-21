import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  durationMs?: number;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  suffix = '',
  durationMs = 1200,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, prefersReducedMotion, value, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
};
