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
        gsap.from("[data-reveal]", {
          y: entrance ? 20 : 28,
          opacity: 0,
          duration: 0.9,
          stagger: 0.11,
          ease: "power3.out",
          clearProps: "all",
          ...(entrance
            ? {}
            : {
                scrollTrigger: {
                  trigger: root.current,
                  start: "top 90%",
                  once: true,
                },
              }),
        });
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
