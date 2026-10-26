import type { Metadata } from "next";
import type { Project } from "@/content/projects";
import { isPreviewDeployment } from "./deployment";
import { canonicalUrl } from "./seo";
// Anonymous defaults also apply to the noindex carousel and logo-only embeds.
export const projectMetadata: Metadata = {
  title: { absolute: "Project Case Study" },
  description:
    "An overview of engineering decisions, design considerations and practical problem-solving behind a selected digital project.",
  alternates: { canonical: null },
  robots: { index: false, follow: true, nosnippet: true, noimageindex: true },
  openGraph: {
    title: "Project Case Study",
    description: "A selected digital project.",
    url: null,
    siteName: "Selected work",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Project Case Study",
    description: "A selected digital project.",
    images: [],
  },
};
export function metadataForProject(project: Project): Metadata {
  const index = project.searchVisibility === "index" && !isPreviewDeployment;
  return {
    ...projectMetadata,
    alternates: {
      canonical: index ? canonicalUrl(`/work/${project.slug}`) : null,
    },
    robots: { index, follow: true, nosnippet: true, noimageindex: true },
  };
}
