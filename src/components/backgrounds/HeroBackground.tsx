"use client";
import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useBackgroundMotion } from "@/lib/background-motion";
import {
  DEFAULT_HERO_BACKGROUND,
  type HeroBackgroundVariant,
} from "@/content/hero-background";
import { HeroMedia } from "@/components/sections/HeroMedia";
const GradientWaves = dynamic(() => import("./GradientWaves"), { ssr: false });
const Silk = dynamic(() => import("./Silk"), { ssr: false });
const GradientASCII = dynamic(() => import("./GradientASCII"), { ssr: false });
const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribe = (callback: () => void) => {
  const query = matchMedia(reducedQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const touchSubscribe = (callback: () => void) => {
  const query = matchMedia("(pointer: coarse), (max-width: 800px)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const colors = ["#111111", "#353535", "#858585", "#E8E8E8"];
export function HeroBackground({
  variant = DEFAULT_HERO_BACKGROUND,
}: {
  variant?: HeroBackgroundVariant;
}) {
  const reduced = useSyncExternalStore(
    subscribe,
    () => matchMedia(reducedQuery).matches,
    () => true,
  );
  const touch = useSyncExternalStore(
    touchSubscribe,
    () => matchMedia("(pointer: coarse), (max-width: 800px)").matches,
    () => true,
  );
  const { paused } = useBackgroundMotion();
  if (variant === "video") return <HeroMedia />;
  return (
    <div
      className="cinematic-background"
      data-background={variant}
      aria-hidden="true"
    >
      <div
        className={`ascii-static ${variant === "silk" ? "silk-static" : variant === "waves" ? "waves-static" : ""}`}
      />
      {variant === "waves" && !reduced && (
        <GradientWaves
          horizonColor="#242424"
          waveColor="#808080"
          crestColor="#dedede"
          backgroundColor="#0b0b0b"
          speed={touch ? 0.16 : 0.24}
          amplitude={2.5}
          relief={0.8}
          sheen={0.25}
          grain={0.08}
          quality={touch ? "low" : "medium"}
          mouseInteraction={!touch && !paused}
          swellOnClick={false}
          intro={false}
          paused={paused}
          dpr={touch ? 1 : 1.25}
          maxFps={touch ? 20 : 30}
        />
      )}
      {variant === "silk" && !reduced && (
        <Silk
          color="#686868"
          sheenColor="#d6d6d6"
          speed={touch ? 1.3 : 2}
          scale={1}
          noiseIntensity={0.65}
          sheen={0.3}
          depth={0.6}
          glow={touch ? 0 : 0.12}
          mouseInteraction={!touch && !paused}
          clickRipple={false}
          intro={false}
          paused={paused}
          dpr={touch ? 1 : 1.25}
          maxFps={touch ? 20 : 30}
        />
      )}
      {variant === "ascii" && !reduced && !paused && (
        <GradientASCII
          colors={colors}
          shape="horizon"
          characters=" =+xX0S8#@"
          cellSize={touch ? 24 : 18}
          density={0.8}
          glyphOpacity={0.65}
          glow={touch ? 0 : 0.15}
          depthOfField={0.1}
          flicker={0.04}
          softness={0.65}
          flow={0.3}
          speed={touch ? 0.2 : 0.35}
          gradientOpacity={0.8}
          grain={0.035}
          mouseInteraction={!touch}
          scrambleRadius={0.08}
          clickEffect={touch ? "none" : "wave"}
          intro
          lightMode={false}
          dpr={touch ? 1 : 1.25}
          maxFps={touch ? 20 : 30}
        />
      )}
      <div className="ascii-overlay" />
    </div>
  );
}
