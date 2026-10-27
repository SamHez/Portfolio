"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function ScrollReveal({
  children,
  className = "",
  entrance = false,
  entranceDuration = 0.9,
}: {
  children: React.ReactNode;
  className?: string;
  entrance?: boolean;
  entranceDuration?: number;
}) {
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
          if (entrance) {
            gsap.from("[data-reveal]", {
              y: 20,
              opacity: 0,
              duration: entranceDuration,
              stagger: entranceDuration * 0.12,
              ease: "power3.out",
              clearProps: "all",
            });
          } else {
            gsap.utils
              .toArray<HTMLElement>("[data-reveal]", root.current)
              .forEach((element) => {
                gsap.from(element, {
                  y: 28,
                  opacity: 0,
                  duration: 0.8,
                  ease: "power3.out",
                  clearProps: "all",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 94%",
                    once: true,
                  },
                });
              });
            gsap.utils
              .toArray<HTMLElement>("[data-line]", root.current)
              .forEach((element) => {
                gsap.from(element, {
                  scaleX: 0,
                  transformOrigin: "left",
                  duration: 1.1,
                  ease: "power2.out",
                  clearProps: "all",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 95%",
                    once: true,
                  },
                });
              });
            gsap.utils
              .toArray<HTMLElement>("[data-image-reveal]", root.current)
              .forEach((element) => {
                gsap.from(element, {
                  clipPath: "inset(0 0 12% 0)",
                  duration: 1.1,
                  ease: "power2.out",
                  clearProps: "all",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 92%",
                    once: true,
                  },
                });
              });
          }
        }, root);
        return () => context.revert();
      });
      dispose = () => media.revert();
    }
    if (entrance || !("IntersectionObserver" in window)) {
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
  }, [entrance, entranceDuration]);
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
