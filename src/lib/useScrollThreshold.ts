"use client";
import { useCallback, useSyncExternalStore } from "react";
function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const serverSnapshot = () => false;
export function useScrollThreshold(threshold: number) {
  const snapshot = useCallback(() => window.scrollY > threshold, [threshold]);
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
