import { siteGraph } from "@/lib/structured-data";
import type { PublicPath } from "@/lib/seo";
export function StructuredData({ path }: { path: PublicPath }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(siteGraph(path)).replace(/</g, "\\u003c"),
      }}
    />
  );
}
