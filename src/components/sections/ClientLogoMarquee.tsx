"use client";
import Image from "next/image";
import { useBackgroundMotion } from "@/lib/background-motion";
import { clientLogos } from "@/content/clients";
export function ClientLogoMarquee() {
  const { paused } = useBackgroundMotion();
  return (
    <section className="client-logo-strip" aria-label="Client logos">
      <p className="mono">CLIENTS & COLLABORATORS</p>
      <div
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
