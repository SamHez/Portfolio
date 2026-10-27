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
    const prefetched = new Set<string>();
    const linkFor = (event: Event) => {
      if (window.parent === window || !(event.target instanceof Element))
        return;
      const link = event.target.closest<HTMLAnchorElement>('a[target="_top"]');
      if (
        !link ||
        link.origin !== window.location.origin ||
        !/^\/work(?:\/project-\d{2})?$/.test(link.pathname)
      )
        return;
      return link;
    };
    const warm = (event: Event) => {
      const link = linkFor(event);
      if (!link || prefetched.has(link.pathname)) return;
      prefetched.add(link.pathname);
      window.parent.postMessage(
        { type: "portfolio-project-prefetch", href: link.pathname },
        window.location.origin,
      );
    };
    const navigate = (event: MouseEvent) => {
      const link = linkFor(event);
      if (
        !link ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      event.preventDefault();
      window.parent.postMessage(
        { type: "portfolio-project-navigate", href: link.pathname },
        window.location.origin,
      );
    };
    const element = root.current;
    element?.addEventListener("click", navigate);
    element?.addEventListener("pointerover", warm);
    element?.addEventListener("focusin", warm);
    element?.addEventListener("touchstart", warm, { passive: true });
    window.addEventListener("message", request);
    const observer = new ResizeObserver(scheduleNotify);
    if (root.current) observer.observe(root.current);
    scheduleNotify();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("message", request);
      element?.removeEventListener("click", navigate);
      element?.removeEventListener("pointerover", warm);
      element?.removeEventListener("focusin", warm);
      element?.removeEventListener("touchstart", warm);
    };
  }, []);
  return (
    <div data-nosnippet="" ref={root} className="embedded-projects">
      <h1 className="sr-only">{title}</h1>
      {children}
    </div>
  );
}
