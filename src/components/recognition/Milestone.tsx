import Image from "next/image";
import { TextLink } from "@/components/ui/TextLink";
import type { Recognition } from "@/content/recognition";
export function Milestone({ item }: { item: Recognition }) {
  if (!item.verified) return null;
  return (
    <article className={`milestone ${item.image ? "milestone-featured" : ""}`}>
      <div className="milestone-copy">
        <time className="mono" dateTime={item.date}>
          {new Date(item.date).toLocaleDateString("en", {
            year: "numeric",
            month: "long",
            timeZone: "UTC",
          })}
        </time>
        <p className="eyebrow">{item.category}</p>
        <h2>{item.title}</h2>
        <p className="body-copy">{item.description}</p>
        {item.sourceUrl && (
          <TextLink href={item.sourceUrl} external>
            {item.sourceTitle}
          </TextLink>
        )}
      </div>
      {item.image && (
        <figure>
          <Image
            src={item.image}
            alt={item.imageAlt || item.title}
            width={768}
            height={1024}
            sizes="(max-width: 800px) 100vw, 45vw"
          />
          <figcaption className="mono">
            CONFERENCE SPEAKING / RUBYCONF KENYA, 2018
          </figcaption>
        </figure>
      )}
    </article>
  );
}
