export type ProjectStatus =
  "Live" | "Completed" | "In development" | "Concept / Prototype";
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  description?: string;
  role?: string;
  technologies: readonly string[];
  thumbnail?: string;
  thumbnailAlt?: string;
  featured: boolean;
  order: number;
  externalUrl?: string;
  caseStudyUrl?: string;
  projectStatus?: ProjectStatus;
  publicationApproved: boolean;
  evidenceStatus: "verified" | "pending";
  evidence?: string;
}
const legacyEvidence =
  "Previously published under Website Design in index.html at Git revision 0fa3724; screenshot recovered from the same revision. No stack or present-day production status verified.";
export const projects: readonly Project[] = [
  {
    id: "roots",
    slug: "the-roots-restaurant",
    title: "The Roots Restaurant",
    category: "Hospitality / Website Design",
    summary:
      "A restaurant website bringing its atmosphere, menu, gallery and contact information into one visual experience.",
    role: "Website design",
    technologies: [],
    thumbnail: "/images/projects/legacy/roots.png",
    thumbnailAlt:
      "Archived Roots Restaurant homepage with navigation, garden photography and gallery and booking calls to action.",
    featured: true,
    order: 1,
    publicationApproved: true,
    evidenceStatus: "verified",
    evidence: legacyEvidence,
  },
  {
    id: "edgepoint",
    slug: "edgepoint",
    title: "Edgepoint",
    category: "Corporate / Website Design",
    summary:
      "A corporate web presence introducing a business consultancy and organizing its services, company information and contact pathways.",
    role: "Website design",
    technologies: [],
    thumbnail: "/images/projects/legacy/edge.png",
    thumbnailAlt:
      "Archived Edgepoint corporate homepage showing company navigation, a business introduction and service links.",
    featured: true,
    order: 2,
    publicationApproved: true,
    evidenceStatus: "verified",
    evidence: legacyEvidence,
  },
  {
    id: "royal",
    slug: "royal-life-christian-academy",
    title: "Royal Life Christian Academy",
    category: "Education / Website Design",
    summary:
      "An education website presenting the school’s learning approach, admissions information and ways for families to connect.",
    role: "Website design",
    technologies: [],
    thumbnail: "/images/projects/legacy/royal.png",
    thumbnailAlt:
      "Archived Royal Life school homepage with educational photography, admissions navigation and learning information.",
    featured: true,
    order: 3,
    publicationApproved: true,
    evidenceStatus: "verified",
    evidence: legacyEvidence,
  },
  ...[
    [
      "jil-lms",
      "JIL Learning Management System",
      "Education Technology / Full-Stack Development",
    ],
    [
      "smartel-agritech",
      "Smartel Agritech Yield Management",
      "Agricultural Technology / Application Architecture",
    ],
    [
      "eabb-africa",
      "EABB Africa Corporate Platform",
      "Corporate Technology / Web Engineering",
    ],
    [
      "urban-mobility",
      "Urban Mobility Data Explorer",
      "Data Visualization / Frontend Engineering",
    ],
  ].map(([slug, title, category], index): Project => ({
    id: slug,
    slug,
    title,
    category,
    summary: "",
    technologies: [],
    featured: false,
    order: index + 4,
    publicationApproved: false,
    evidenceStatus: "pending",
  })),
];
export function getPublishedProjects(
  items: readonly Project[] = projects,
): Project[] {
  return items
    .filter(
      (item) => item.publicationApproved && item.evidenceStatus === "verified",
    )
    .sort((a, b) => a.order - b.order);
}
