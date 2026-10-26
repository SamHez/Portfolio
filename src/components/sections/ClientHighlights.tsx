"use client";
import { useRef } from "react";
import { useDeferredFrame } from "@/lib/use-deferred-frame";
import { CountUp } from "@/components/motion/CountUp";
import { portfolioMetrics } from "@/content/metrics";
export function ClientHighlights() {
  const frame = useRef<HTMLIFrameElement>(null);
  const { ready, activate } = useDeferredFrame(frame);
  return (
    <section
      data-nosnippet=""
      className="project-signals"
      aria-label="Work at a glance"
    >
      <div className="signal-metrics">
        {portfolioMetrics.map((metric) => (
          <div key={metric.label}>
            <CountUp value={metric.value} />
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
      <div className="signal-landscape">
        <iframe
          className="client-logos-frame"
          ref={frame}
          src={ready ? "/work/clients" : undefined}
          onFocus={activate}
          title="Client logos"
          loading="lazy"
        />
        <noscript>
          <iframe
            className="client-logos-frame"
            src="/work/clients"
            title="Client logos"
            loading="lazy"
          />
        </noscript>
      </div>
    </section>
  );
}
