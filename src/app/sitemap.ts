import type { MetadataRoute } from "next";
import { publicPages, canonicalUrl } from "@/lib/seo";
import { isPreviewDeployment } from "@/lib/deployment";
import { getPublishedProjects } from "@/content/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreviewDeployment) return [];
  return [
    ...Object.keys(publicPages).map((path) => ({ url: canonicalUrl(path) })),
    ...getPublishedProjects()
      .filter((project) => project.searchVisibility === "index")
      .map((project) => ({ url: canonicalUrl(`/work/${project.slug}`) })),
  ];
}
