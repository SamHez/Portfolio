import type { Metadata } from "next";
import { isPreviewDeployment } from "./deployment";

export const SITE_URL = "https://samhez.tech";
export const SITE_NAME = "Samuel Epodoi";
export const SOCIAL_IMAGE = `${SITE_URL}/social-card.png`;
export const publicPages = {
  "/": {
    label: "Home",
    title: "Samuel Epodoi | Software Engineer & Creative Technologist",
    description:
      "Explore the work of Samuel Epodoi, a software engineer and creative technologist building thoughtful digital products and modern web experiences.",
  },
  "/about": {
    label: "About",
    title: "About Samuel Epodoi | Engineering & Philosophy",
    description:
      "Learn about Samuel Epodoi's approach to software engineering, product thinking, technical problem-solving and continuous professional growth.",
  },
  "/work": {
    label: "Selected Work",
    title: "Selected Work | Samuel Epodoi",
    description:
      "Explore a curated selection of digital products, software engineering work and thoughtfully designed technology solutions.",
  },
  "/recognition": {
    label: "Recognition & Leadership",
    title: "Recognition & Leadership | Samuel Epodoi",
    description:
      "Explore professional milestones, leadership experiences, developer-community engagement and recognition from Samuel Epodoi's journey in technology.",
  },
  "/contact": {
    label: "Contact",
    title: "Contact Samuel Epodoi | Engineering & Collaboration",
    description:
      "Get in touch with Samuel Epodoi to discuss software engineering, digital product development, technical collaboration and professional opportunities.",
  },
} as const;
export type PublicPath = keyof typeof publicPages;
export const canonicalUrl = (path: string) =>
  `${SITE_URL}${path === "/" ? "/" : path}`;

export function pageMetadata(path: PublicPath): Metadata {
  const page = publicPages[path];
  const title =
    path === "/"
      ? "Samuel Epodoi — Software Engineer & Creative Technologist"
      : page.title;
  const description =
    path === "/"
      ? "Engineering digital experiences with purpose. Explore my work, technical expertise and approach to building meaningful technology solutions."
      : page.description;
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: new URL(canonicalUrl(path)) },
    robots: { index: !isPreviewDeployment, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      url: canonicalUrl(path),
      title,
      description,
      images: [
        {
          url: SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: "SE. — Samuel Epodoi, Software Engineer & Creative Technologist",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE],
    },
  };
}
