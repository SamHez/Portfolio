"use client";
import { useEffect, useRef } from "react";
export function EmbeddedProjects({
  children,
  title = "Selected projects",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const notify = () => {
      if (root.current)
        window.parent.postMessage(
          {
            type: "portfolio-project-height",
            height: root.current.getBoundingClientRect().height,
          },
          window.location.origin,
        );
    };
    const scheduleNotify = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(notify);
    };
    const request = (event: MessageEvent) => {
      if (
        event.origin === window.location.origin &&
        event.source === window.parent &&
        event.data?.type === "portfolio-project-measure"
      )
        scheduleNotify();
    };
    window.addEventListener("message", request);
    const observer = new ResizeObserver(scheduleNotify);
    if (root.current) observer.observe(root.current);
    scheduleNotify();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("message", request);
    };
  }, []);
  return (
    <div data-nosnippet="" ref={root} className="embedded-projects">
      <h1 className="sr-only">{title}</h1>
      {children}
    </div>
  );
}
