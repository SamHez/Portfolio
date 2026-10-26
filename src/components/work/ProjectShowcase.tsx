"use client";
import { useEffect, useRef } from "react";
import { useDeferredFrame } from "@/lib/use-deferred-frame";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function ProjectShowcase({ rows = 1 }: { rows?: 1 | 2 }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const { ready, activate } = useDeferredFrame(frame);
  const src = rows === 2 ? "/work/collection" : "/work/preview";
  const title =
    rows === 2
      ? "Project collection in two scrolling rows"
      : "Selected project previews";
  useEffect(() => {
    const resize = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== frame.current?.contentWindow ||
        event.data?.type !== "portfolio-project-height"
      )
        return;
      const height = Number(event.data.height);
      if (
        Number.isFinite(height) &&
        height > 0 &&
        height < 12000 &&
        frame.current
      ) {
        const nextHeight = `${Math.ceil(height) + 2}px`;
        if (frame.current.style.height !== nextHeight) {
          frame.current.style.height = nextHeight;
          ScrollTrigger.refresh();
        }
      }
    };
    window.addEventListener("message", resize);
    frame.current?.contentWindow?.postMessage(
      { type: "portfolio-project-measure" },
      window.location.origin,
    );
    return () => window.removeEventListener("message", resize);
  }, []);
  return (
    <>
      <iframe
        ref={frame}
        className={`project-showcase ${rows === 2 ? "project-showcase-double" : ""}`}
        src={ready ? src : undefined}
        title={title}
        onFocus={activate}
        loading="lazy"
      />
      <noscript>
        <iframe
          className={`project-showcase ${rows === 2 ? "project-showcase-double" : ""}`}
          src={src}
          title={title}
          loading="lazy"
        />
      </noscript>
    </>
  );
}
