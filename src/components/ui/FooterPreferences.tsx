"use client";
import { Pause, Play } from "lucide-react";
import { useBackgroundMotion } from "@/lib/background-motion";
export function FooterPreferences() {
  const { paused, setPaused } = useBackgroundMotion();
  return (
    <button
      type="button"
      className="animation-preference"
      onClick={() => setPaused(!paused)}
      aria-label={
        paused ? "Resume background animation" : "Pause background animation"
      }
      aria-pressed={paused}
    >
      {paused ? (
        <Play size={13} aria-hidden="true" />
      ) : (
        <Pause size={13} aria-hidden="true" />
      )}
      <span>Animation</span>
    </button>
  );
}
