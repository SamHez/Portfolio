"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { heroMedia } from "@/content/profile";
export function HeroMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
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
  function toggle() {
    const element = video.current;
    if (!element) return;
    if (element.paused) {
      element
        .play()
        .then(() => setPaused(false))
        .catch(() => {});
    } else {
      element.pause();
      setPaused(true);
    }
  }
  return (
    <>
      <div className="hero-media" aria-hidden="true">
        <div className="hero-poster" />
        <video
          ref={video}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={heroMedia.poster}
          onPlaying={() => {
            setReady(true);
            setPaused(false);
          }}
          onError={() => setReady(false)}
          onEmptied={() => setReady(false)}
          className={ready ? "is-ready" : ""}
        />
        <div className="hero-overlay" />
        <div className="hero-grain" />
      </div>
      {ready && (
        <button
          className="video-toggle mono"
          onClick={toggle}
          aria-label={
            paused ? "Play background video" : "Pause background video"
          }
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}
          <span>Motion {paused ? "off" : "on"}</span>
        </button>
      )}
    </>
  );
}
