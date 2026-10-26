import {
  canonicalUrl,
  publicPages,
  SITE_NAME,
  SITE_URL,
  type PublicPath,
} from "./seo";

type Reference = { "@id": string };
interface PersonNode {
  "@type": "Person";
  "@id": string;
  name: string;
  url: string;
  jobTitle: string;
  description: string;
  sameAs: string[];
}
interface WebsiteNode {
  "@type": "WebSite";
  "@id": string;
  url: string;
  name: string;
  inLanguage: "en-US";
  about: Reference;
}
interface PageNode {
  "@type": "WebPage" | "ProfilePage";
  "@id": string;
  url: string;
  name: string;
  description: string;
  isPartOf: Reference;
  mainEntity?: Reference;
  breadcrumb?: Reference;
}
interface BreadcrumbNode {
  "@type": "BreadcrumbList";
  "@id": string;
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
}
export interface SiteGraph {
  "@context": "https://schema.org";
  "@graph": (PersonNode | WebsiteNode | PageNode | BreadcrumbNode)[];
}

export function siteGraph(path: PublicPath): SiteGraph {
  const url = canonicalUrl(path);
  const page = publicPages[path];
  const graph: SiteGraph["@graph"] = [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      jobTitle: "Software Engineer",
      description:
        "A software engineer and creative technologist focused on thoughtful digital products and modern software experiences.",
      sameAs: [
        "https://www.linkedin.com/in/samuel-epodoi-a4106523b/",
        "https://github.com/SamHez/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: "en-US",
      about: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": path === "/about" ? "ProfilePage" : "WebPage",
      "@id": `${url}#page`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      ...(path === "/about"
        ? { mainEntity: { "@id": `${SITE_URL}/#person` } }
        : {}),
      ...(path !== "/" ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    },
  ];
  if (path !== "/")
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        { "@type": "ListItem", position: 2, name: page.label, item: url },
      ],
    });
  return { "@context": "https://schema.org", "@graph": graph };
}
