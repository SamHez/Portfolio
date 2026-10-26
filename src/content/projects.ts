export interface Project {
  id: string;
  discipline: "web" | "creative";
  contribution: string;
  searchVisibility: "index" | "noindex";
  year?: string;
  video?: string;
  resources?: readonly string[];
  sample?: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  };
  slug: string;
  title: string;
  category: string;
  summary: string;
  description?: string;
  technologies: readonly string[];
  thumbnail?: string;
  thumbnailAlt?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  featured: boolean;
  order: number;
  externalUrl?: string;
  caseStudyUrl?: string;
  publicationApproved: boolean;
  evidenceStatus: "verified" | "pending";
}
const project = (
  id: string,
  slug: string,
  title: string,
  category: string,
  order: number,
  extra: Partial<Project> = {},
): Project => ({
  id,
  discipline: "web",
  contribution: "Web Development",
  searchVisibility: "noindex",
  slug,
  title,
  category,
  summary: "A selected project from my work.",
  technologies: [],
  featured: true,
  order,
  caseStudyUrl: `/work/${slug}`,
  publicationApproved: true,
  evidenceStatus: "verified",
  ...extra,
});
// Names selected by the user. No unconfirmed contribution, stack or results are claimed.
export const projects: readonly Project[] = [
  project(
    "zimbabwe",
    "project-04",
    "Zimbabwe National Debate",
    "Debate / Community",
    2,
    {
      thumbnail: "/zimbabwe-debating-thumb.webp",
      thumbnailAlt:
        "Zimbabwe National Debate website with a public-speaking hero and programme navigation.",
      thumbnailWidth: 1200,
      thumbnailHeight: 750,
      externalUrl: "https://zimbabwedebating.com/",
    },
  ),
  project("eabb", "project-02", "EABB Africa", "Corporate Website", 3, {
    year: "2026",
    thumbnail: "/images/eabb.png",
    thumbnailAlt:
      "East Africa Business Bureau homepage with cityscape imagery and sector navigation.",
  }),
  project(
    "nursing",
    "project-05",
    "Emerging Nursing Australia",
    "Selected Project",
    1,
    {
      year: "2026",
      thumbnail: "/emerging-nursing-thumb.webp",
      thumbnailAlt:
        "Emerging Nursing and Disability Services website with support services and referral navigation.",
      thumbnailWidth: 1200,
      thumbnailHeight: 750,
      externalUrl: "https://emergingnursing.com/",
    },
  ),
  project(
    "complaints",
    "project-06",
    "Complaints Bureau System",
    "Public Services",
    4,
    {
      year: "2022",
      externalUrl: "https://iracomplaints.go.ug/",
      thumbnail: "/complaints-system.png",
      thumbnailAlt:
        "Insurance Regulatory Authority complaints system sign-in screen and complaint registration instructions.",
      thumbnailWidth: 2880,
      thumbnailHeight: 1472,
    },
  ),
  project("juba", "project-07", "Juba Institute of Languages", "Education", 5, {
    year: "2026",
    thumbnail: "/jil-south-sudan-thumb.webp",
    thumbnailAlt:
      "Juba Institute of Languages website with language courses and enrolment navigation.",
    thumbnailWidth: 1200,
    thumbnailHeight: 750,
  }),
  project("sellerdo", "project-08", "sellerdo.co", "Selected Project", 6, {
    year: "2026",
    externalUrl: "https://sellerdo.co/",
    thumbnail: "/sellerdo-thumb.webp",
    thumbnailAlt:
      "Sellerdo storefront with electronics categories and a featured product.",
    thumbnailWidth: 1200,
    thumbnailHeight: 750,
  }),
  project("trustable", "project-03", "trustable.rw", "Selected Project", 7, {
    externalUrl: "https://trustable.rw/",
    featured: false,
  }),
  project(
    "uls",
    "project-09",
    "Uganda Law Society",
    "Web Applications & Systems",
    8,
    {
      year: "2023",
      thumbnail: "/uls-portal.png",
      thumbnailAlt:
        "Uganda Law Society member portal dashboard with subscriptions, pro bono cases and events.",
      thumbnailWidth: 2880,
      thumbnailHeight: 1464,
    },
  ),
  project(
    "miss-universe",
    "project-10",
    "Miss Universe Tanzania",
    "Graphics & Motion Design",
    9,
    {
      year: "2025",
      discipline: "creative",
      contribution: "Motion & Graphic Design",
      video: "https://swavemedia.co/assets/video/motion2.mp4",
    },
  ),
  project(
    "lguard",
    "project-11",
    "Lguard Rwanda",
    "Graphics & Motion Design",
    10,
    {
      year: "2026",
      discipline: "creative",
      contribution: "Motion & Graphic Design",
      video: "https://swavemedia.co/assets/video/motion1.mp4",
    },
  ),
  project(
    "biplous",
    "project-12",
    "Biplous Uganda",
    "Graphics & Motion Design",
    11,
    {
      year: "2026",
      discipline: "creative",
      contribution: "Motion & Graphic Design",
      video: "https://swavemedia.co/assets/video/motion3.mp4",
    },
  ),
  project(
    "health",
    "project-13",
    "Ministry of Health",
    "Public Health / Graphic Design",
    12,
    {
      discipline: "creative",
      contribution: "Graphic Design",
      year: "2022",
      summary:
        "Graphic design for elephantiasis awareness resources in northern Uganda.",
      description:
        "In 2022, I designed graphical assets for Ministry of Health elephantiasis awareness resources in northern Uganda. The resource set includes community leaders’ and teachers’ fact sheets, language versions, and a health workers’ flip chart.",
      sample: {
        src: "/Screen%20Shot%202026-10-26%20at%209.27.23%20AM.png",
        alt: "Supplied Ministry of Health teachers’ fact-sheet cover for discussions about elephantiasis and COVID-19.",
        caption:
          "SUPPLIED TEACHERS’ FACT-SHEET COVER / COVER DATED OCTOBER 2021",
        width: 992,
        height: 1404,
      },
      resources: [
        "Community Leaders Fact Sheet-LF LANGO.pdf",
        "Community Leaders Fact Sheet-LF Translation.pdf",
        "Health Workers_ Flip Chart [FINAL].pdf",
        "Teachers Fact Sheet-LF Translation.pdf",
        "Teachers Fact Sheet-LF [Complete-DRAFT].pdf",
        "Teachers Fact Sheet-LF.pdf",
        "[English] Community Leaders Fact Sheet-LF.pdf",
        "[Lango] Community Leaders Fact Sheet-LF.pdf",
      ],
    },
  ),
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

// The homepage sequence differs from the discipline-based Work collection.
export function getHomepageProjects(): Project[] {
  const order = [
    "uls",
    "nursing",
    "health",
    "juba",
    "complaints",
    "eabb",
    "sellerdo",
    "zimbabwe",
    "miss-universe",
    "lguard",
    "biplous",
  ];
  return getPublishedProjects()
    .filter((item) => order.includes(item.id))
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}
export function getWebProjects(): Project[] {
  const order = [
    "uls",
    "complaints",
    "juba",
    "nursing",
    "eabb",
    "sellerdo",
    "zimbabwe",
    "trustable",
  ];
  return getPublishedProjects()
    .filter((item) => item.discipline === "web" && item.featured)
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}
