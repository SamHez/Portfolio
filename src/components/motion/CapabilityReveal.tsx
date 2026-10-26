"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function CapabilityReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let dispose = () => {};
    let started = false;
    function initialize() {
      if (started) return;
      started = true;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const context = gsap.context(() => {
          gsap.utils
            .toArray<HTMLElement>(".capability-group", root.current)
            .forEach((card, index) => {
              gsap.from(card, {
                y: 60,
                rotationX: 7,
                opacity: 0,
                transformPerspective: 900,
                duration: 1,
                delay: window.innerWidth > 800 ? index * 0.12 : 0,
                ease: "power3.out",
                clearProps: "all",
                scrollTrigger: { trigger: card, start: "top 91%", once: true },
              });
            });
        }, root);
        return () => context.revert();
      });
      dispose = () => media.revert();
    }
    if (!("IntersectionObserver" in window)) {
      initialize();
      return () => dispose();
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          initialize();
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      dispose();
    };
  }, []);
  return (
    <div ref={root} className="capability-grid">
      {children}
    </div>
  );
}
