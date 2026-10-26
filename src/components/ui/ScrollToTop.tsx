"use client";
import { ArrowUp } from "lucide-react";
import { useScrollThreshold } from "@/lib/useScrollThreshold";
export function ScrollToTop() {
  const visible = useScrollThreshold(480);
  function goToTop() {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
    document
      .querySelector<HTMLElement>(".site-header .brand")
      ?.focus({ preventScroll: true });
  }
  return (
    <button
      type="button"
      className={`scroll-to-top${visible ? " is-visible" : ""}`}
      onClick={goToTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={19} aria-hidden="true" />
    </button>
  );
}
