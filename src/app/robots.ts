import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { isPreviewDeployment } from "@/lib/deployment";
export default function robots(): MetadataRoute.Robots {
  // Crawlers must be able to fetch noindexed pages and read their directives.
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(!isPreviewDeployment ? { sitemap: `${SITE_URL}/sitemap.xml` } : {}),
  };
}
