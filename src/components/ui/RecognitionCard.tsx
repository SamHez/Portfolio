import { TextLink } from "./TextLink";
import type { Recognition } from "@/content/recognition";
export function RecognitionCard({ item }: { item: Recognition }) {
  if (!item.verified) return null;
  return (
    <article className="recognition-card">
      <span className="mono recognition-year">{item.date.slice(0, 4)}</span>
      <div>
        <p className="eyebrow">{item.category}</p>
        <h3>{item.title}</h3>
        <p className="recognition-description">{item.description}</p>
        {item.sourceUrl && (
          <TextLink href={item.sourceUrl} external>
            {item.sourceTitle}
          </TextLink>
        )}
      </div>
    </article>
  );
}
