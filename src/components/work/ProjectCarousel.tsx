"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
export function ProjectCarousel({
  children,
  label = "Selected projects",
  viewAllLink = false,
}: {
  children: React.ReactNode;
  label?: string;
  viewAllLink?: boolean;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () =>
      setEdges({
        start: el.scrollLeft < 5,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 5,
      });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);
  function move(direction: number) {
    const el = rail.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left:
        direction *
        ((el.firstElementChild?.getBoundingClientRect().width ||
          el.clientWidth) +
          22),
      behavior: reduced ? "instant" : "smooth",
    });
  }
  return (
    <>
      <div className="project-carousel-controls">
        {viewAllLink ? (
          <Link
            prefetch={false}
            href="/work"
            target="_top"
            className="carousel-all-work"
          >
            View all work <ArrowRight size={15} aria-hidden="true" />
          </Link>
        ) : (
          <p className="mono">{label}</p>
        )}
        <div>
          <button
            aria-label={`Previous projects: ${label}`}
            onClick={() => move(-1)}
            disabled={edges.start}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            aria-label={`Next projects: ${label}`}
            onClick={() => move(1)}
            disabled={edges.end}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <div
        ref={rail}
        className="project-carousel"
        role="region"
        aria-label={`${label}, scroll horizontally`}
        tabIndex={0}
      >
        {children}
      </div>
    </>
  );
}
