"use client";
import { useEffect, useRef, useState } from "react";
import { heroMedia } from "@/content/profile";
export function HeroMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const element = video.current;
    if (!element) return;
    function sync() {
      if (!element) return;
      const eligible =
        !reduced.matches &&
        desktop.matches &&
        !connection?.saveData &&
        !/2g/.test(connection?.effectiveType || "");
      if (eligible) {
        if (!element.src) {
          element.src = heroMedia.video;
          element.load();
        }
        element.play().catch(() => {});
      } else {
        element.pause();
        element.removeAttribute("src");
        element.load();
      }
    }
    sync();
    reduced.addEventListener("change", sync);
    desktop.addEventListener("change", sync);
    return () => {
      reduced.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
      element.pause();
      element.removeAttribute("src");
      element.load();
    };
  }, []);
  return (
    <>
      <div className="hero-media" aria-hidden="true">
        <div className="hero-poster" />
        <video
          ref={video}
          autoPlay
          muted
          playsInline
          preload="none"
          poster={heroMedia.poster}
          onPlaying={() => {
            setReady(true);
          }}
          onTimeUpdate={(event) => {
            if (event.currentTarget.currentTime >= 4.5)
              event.currentTarget.pause();
          }}
          onError={() => setReady(false)}
          onEmptied={() => setReady(false)}
          className={ready ? "is-ready" : ""}
        />
        <div className="hero-overlay" />
        <div className="hero-grain" />
      </div>
    </>
  );
}
