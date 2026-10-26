"use client";
import { useSyncExternalStore } from "react";
let memoryPaused = false;
const key = "portfolio-background-paused";
const event = "portfolio-background-motion";
const subscribe = (callback: () => void) => {
  window.addEventListener(event, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(event, callback);
    window.removeEventListener("storage", callback);
  };
};
const snapshot = () => {
  try {
    const stored = localStorage.getItem(key);
    return stored === null ? memoryPaused : stored === "true";
  } catch {
    return memoryPaused;
  }
};
export function useBackgroundMotion() {
  const paused = useSyncExternalStore(subscribe, snapshot, () => false);
  const setPaused = (value: boolean) => {
    memoryPaused = value;
    try {
      localStorage.setItem(key, String(value));
    } catch {}
    window.dispatchEvent(new Event(event));
  };
  return { paused, setPaused };
}
