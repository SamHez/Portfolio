import type { NextConfig } from "next";
import { isPreviewDeployment } from "./src/lib/deployment";
import { getPublishedProjects } from "./src/content/projects";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Avoid a separate Next development badge/menu inside each embedded carousel.
  // Compilation and runtime errors remain visible in the development overlay.
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Restrict embedding/base/object contexts without breaking Next inline
          // scripts, WebGL, same-origin project embeds, PDF viewing or X widgets.
          {
            key: "Content-Security-Policy",
            value: "base-uri 'self'; object-src 'self'; frame-ancestors 'self'",
          },
        ],
      },
      {
        source:
          "/:asset(ira-logo[.]png|winspire[.]png|uls-logo[.]jpg|MoH-Logo[.]png|zim-debate[.]png|emerging-nursing[.]png|millen-logo[.]png|jil-logo[.]png|biplous.*[.]png|Screen.*[.]png|uls-portal[.]png|complaints-system[.]png|jil-south-sudan-thumb[.]webp|emerging-nursing-thumb[.]webp|sellerdo-thumb[.]webp|zimbabwe-debating-thumb[.]webp)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, noimageindex" }],
      },
      {
        source: "/_next/image",
        has: [
          {
            type: "query",
            key: "url",
            value:
              "/(?:ira-logo[.]png|winspire[.]png|uls-logo[.]jpg|MoH-Logo[.]png|zim-debate[.]png|emerging-nursing[.]png|millen-logo[.]png|jil-logo[.]png|biplous.*[.]png|Screen.*[.]png|uls-portal[.]png|complaints-system[.]png|jil-south-sudan-thumb[.]webp|emerging-nursing-thumb[.]webp|sellerdo-thumb[.]webp|zimbabwe-debating-thumb[.]webp)",
          },
        ],
        headers: [{ key: "X-Robots-Tag", value: "noindex, noimageindex" }],
      },
      {
        source: "/images/eabb.png",
        headers: [{ key: "X-Robots-Tag", value: "noindex, noimageindex" }],
      },
      {
        source: "/_next/image",
        has: [{ type: "query", key: "url", value: "/images/eabb[.]png" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, noimageindex" }],
      },
      {
        source: "/work/:path+",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, follow, nosnippet, noimageindex",
          },
        ],
      },
      {
        source: "/images/:document(.*[.]pdf)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, noimageindex" }],
      },
      {
        source: "/eabb.png",
        headers: [{ key: "X-Robots-Tag", value: "noindex, noimageindex" }],
      },
      {
        source: "/images/projects/legacy/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, noimageindex" }],
      },
      // Only an explicit per-project approval can override the conservative default.
      ...getPublishedProjects()
        .filter((project) => project.searchVisibility === "index")
        .map((project) => ({
          source: `/work/${project.slug}`,
          headers: [
            {
              key: "X-Robots-Tag",
              value: "index, follow, nosnippet, noimageindex",
            },
          ],
        })),
      ...(isPreviewDeployment
        ? [
            {
              source: "/:path*",
              headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
            },
          ]
        : []),
    ];
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "www.samhez.tech" }],
        destination: "https://samhez.tech/:path*",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
