"use client";
import { useEffect, useState, type RefObject } from "react";
// Native iframe lazy loading can start several thousand pixels early, booting
// multiple copies of the app during hero hydration. Load shortly before view.
export function useDeferredFrame(ref: RefObject<HTMLIFrameElement | null>) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || ready) return;
    if (!("IntersectionObserver" in window)) {
      const timer = setTimeout(() => setReady(true), 0);
      return () => clearTimeout(timer);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, ready]);
  return { ready, activate: () => setReady(true) };
}
