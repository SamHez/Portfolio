"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useReportWebVitals } from "next/web-vitals";

type Consent = "granted" | "denied" | "unset";
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};
const consentKey = "portfolio-analytics-consent";
let memoryConsent: Consent = "unset";
const consentEvent = "portfolio-analytics-consent-change";
const subscribe = (callback: () => void) => {
  window.addEventListener(consentEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(consentEvent, callback);
    window.removeEventListener("storage", callback);
  };
};
function snapshot(): Consent {
  try {
    const value = localStorage.getItem(consentKey);
    return value === "granted" || value === "denied" ? value : memoryConsent;
  } catch {
    return memoryConsent;
  }
}
function updateConsent(value: Consent) {
  memoryConsent = value;
  try {
    localStorage.setItem(consentKey, value);
  } catch {}
  window.dispatchEvent(new Event(consentEvent));
}

function Metrics({ ready }: { ready: boolean }) {
  useReportWebVitals((metric) => {
    if (!ready || snapshot() !== "granted") return;
    (window as AnalyticsWindow).gtag?.("event", "web_vitals", {
      metric_name: metric.name,
      value: metric.value,
      metric_id: metric.id,
      non_interaction: true,
    });
  });
  return null;
}

export function AnalyticsConsent({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribe,
    snapshot,
    () => "unset" as const,
  );
  const [ready, setReady] = useState(false);
  const projectRoute = pathname.startsWith("/work/");
  useEffect(() => {
    if (!ready || consent !== "granted" || projectRoute) return;
    const ga = (window as AnalyticsWindow).gtag;
    // Deliberately omit URL queries, hashes, client names and contact values.
    ga?.("set", {
      page_location: `${location.origin}${pathname}`,
      page_title: document.title,
      page_referrer: "",
    });
    ga?.("event", "page_view", {
      page_path: pathname,
      page_location: `${location.origin}${pathname}`,
      page_title: document.title,
    });
    const click = (event: MouseEvent) => {
      const link =
        event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      const href = link.getAttribute("href");
      if (href === "/contact" || href === "/work")
        ga?.("event", href === "/contact" ? "contact_cta" : "work_navigation");
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, [ready, consent, pathname, projectRoute]);

  if (projectRoute) return null;
  function withdraw() {
    Reflect.set(window, `ga-disable-${measurementId}`, true);
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) continue;
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${location.hostname}; SameSite=Lax`;
    }
    updateConsent("unset");
    // Reload unloads the third-party runtime. Do not send a withdrawal event.
    location.reload();
  }
  return (
    <>
      {consent === "unset" ? (
        <section className="analytics-consent" aria-label="Optional analytics">
          <p>
            Allow usage and performance measurements? Analytics is optional. You
            can change your choice later.
          </p>
          <div>
            <button type="button" onClick={() => updateConsent("granted")}>
              Allow analytics
            </button>
            <button type="button" onClick={() => updateConsent("denied")}>
              Decline
            </button>
          </div>
        </section>
      ) : (
        <button type="button" className="analytics-settings" onClick={withdraw}>
          Analytics preferences
        </button>
      )}
      {consent === "granted" && (
        <>
          <Script
            id="portfolio-ga"
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
            onReady={() => {
              const ga = window as AnalyticsWindow;
              ga.dataLayer ??= [];
              ga.gtag ??= (...args: unknown[]) => {
                ga.dataLayer!.push(args);
              };
              ga.gtag("consent", "default", {
                analytics_storage: "granted",
                ad_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied",
              });
              ga.gtag("js", new Date());
              ga.gtag("config", measurementId, {
                send_page_view: false,
                page_location: `${location.origin}${pathname}`,
                page_title: document.title,
                page_referrer: "",
                allow_google_signals: false,
                allow_ad_personalization_signals: false,
              });
              setReady(true);
            }}
          />
          <Metrics ready={ready} />
        </>
      )}
    </>
  );
}
