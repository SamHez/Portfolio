"use client";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { verifiedRecognition, type Recognition } from "@/content/recognition";

type XWindow = Window & {
  twttr?: {
    widgets: {
      createTweet: (
        id: string,
        host: HTMLElement,
        options: Record<string, string | boolean>,
      ) => Promise<HTMLElement | undefined>;
    };
  };
};

function Post({ item, ready }: { item: Recognition; ready: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const request = useRef<Promise<HTMLElement | undefined> | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const widgets = (window as XWindow).twttr?.widgets;
    if (!ready || !host.current || !widgets || !item.sourceUrl) return;
    let active = true;
    try {
      request.current ??= widgets.createTweet(
        item.sourceUrl.split("/").pop()!,
        host.current,
        { theme: "light", dnt: true, conversation: "none", align: "center" },
      );
      request.current
        .then((element) => {
          if (active) setLoaded(Boolean(element));
        })
        .catch(() => {
          /* Keep the source reference when X is unavailable. */
        });
    } catch {
      /* Keep the source reference when X is blocked. */
    }
    return () => {
      active = false;
    };
  }, [ready, item.sourceUrl, item.id]);
  return (
    <article className="recognition-post">
      <div className="recognition-post-label">
        <span className="mono">{item.date.slice(0, 4)}</span>
        <h3>{item.title}</h3>
      </div>
      <div ref={host} className="x-post-host" />
      {!loaded && (
        <div className="recognition-post-fallback">
          <p>{item.description}</p>
        </div>
      )}
      <a
        className="post-source-link"
        href={item.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        View original post on X
      </a>
    </article>
  );
}
export function RecognitionPosts() {
  const [ready, setReady] = useState(false);
  return (
    <>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        onReady={() => setReady(true)}
      />
      <div className="recognition-detail-cards recognition-post-grid">
        {verifiedRecognition.map((item) => (
          <Post key={item.id} item={item} ready={ready} />
        ))}
      </div>
    </>
  );
}
