"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function ScrollReveal({
  children,
  className = "",
  entrance = false,
}: {
  children: React.ReactNode;
  className?: string;
  entrance?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        if (entrance) {
          gsap.from("[data-reveal]", {
            y: 20,
            opacity: 0,
            duration: 0.9,
            stagger: 0.11,
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
    return () => media.revert();
  }, [entrance]);
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
