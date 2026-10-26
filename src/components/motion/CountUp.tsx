"use client";
import { useEffect, useRef } from "react";
export function CountUp({ value }: { value: number }) {
  const digits = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = digits.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = false;
    const finish = () => {
      cancelAnimationFrame(frame);
      el.textContent = `${value}+`;
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (started || !entries.some((entry) => entry.isIntersecting)) return;
        started = true;
        observer.disconnect();
        if (reduced.matches) {
          finish();
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 1400);
          el.textContent = `${Math.round(value * (1 - Math.pow(1 - progress, 3)))}+`;
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        el.textContent = "0+";
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    const preference = () => {
      if (reduced.matches) {
        finish();
        observer.disconnect();
      }
    };
    reduced.addEventListener("change", preference);
    observer.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      reduced.removeEventListener("change", preference);
    };
  }, [value]);
  return (
    <strong>
      <span className="sr-only">{value}+</span>
      <span ref={digits} className="counter-digits" aria-hidden="true">
        {value}+
      </span>
    </strong>
  );
}
