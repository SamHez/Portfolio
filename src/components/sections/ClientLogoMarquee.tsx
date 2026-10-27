"use client";
import Image from "next/image";
import { useBackgroundMotion } from "@/lib/background-motion";
import { clientLogos } from "@/content/clients";
import { useEffect, useRef } from "react";
export function ClientLogoMarquee() {
  const { paused } = useBackgroundMotion();
  const viewport = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = viewport.current;
    const group = element?.querySelector<HTMLElement>(".wordmark-track > div");
    if (!element || !group) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let width = group.offsetWidth;
    let visible = false;
    let frame = 0;
    let previous = 0;
    // Keep subpixel progress: some browsers round scrollLeft, especially at 120Hz.
    let position = element.scrollLeft;
    let pointer: { id: number; x: number; scroll: number } | undefined;
    const wrap = (value: number) =>
      !reduced.matches && !paused && width
        ? ((value % width) + width) % width
        : value;
    const tick = (now: number) => {
      if (previous && !pointer) {
        if (Math.abs(element.scrollLeft - position) > 1)
          position = element.scrollLeft;
        position = wrap(
          position + (width / 48000) * Math.min(now - previous, 50),
        );
        element.scrollLeft = position;
      }
      previous = now;
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (visible && !document.hidden && !paused && !reduced.matches)
        frame = requestAnimationFrame(tick);
    };
    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      pointer = {
        id: event.pointerId,
        x: event.clientX,
        scroll: element.scrollLeft,
      };
      element.setPointerCapture(event.pointerId);
      element.dataset.dragging = "true";
    };
    const move = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return;
      position = wrap(pointer.scroll + pointer.x - event.clientX);
      element.scrollLeft = position;
    };
    const up = () => {
      pointer = undefined;
      delete element.dataset.dragging;
    };
    const resize = new ResizeObserver(() => {
      width = group.offsetWidth;
    });
    resize.observe(group);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    element.addEventListener("pointerdown", down);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerup", up);
    element.addEventListener("pointercancel", up);
    element.addEventListener("lostpointercapture", up);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      element.removeEventListener("pointerdown", down);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerup", up);
      element.removeEventListener("pointercancel", up);
      element.removeEventListener("lostpointercapture", up);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, [paused]);
  return (
    <section className="client-logo-strip" aria-label="Client logos">
      <p className="mono">CLIENTS & COLLABORATORS</p>
      <div
        ref={viewport}
        className="wordmark-window"
        role="region"
        aria-label="Client logo slider"
        tabIndex={0}
      >
        <div className="wordmark-track" data-paused={paused}>
          {[false, true].map((duplicate) => (
            <div key={String(duplicate)} aria-hidden={duplicate || undefined}>
              {clientLogos.map((logo) => (
                <div
                  key={logo.src}
                  className={`client-logo-tile client-logo-${logo.surface} ${logo.src === "/uls-logo.jpg" ? "client-logo-uls" : ""}`}
                >
                  <Image
                    src={logo.src}
                    alt={duplicate ? "" : logo.name}
                    sizes="(max-width: 560px) 139px, 174px"
                    width={190}
                    height={84}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
