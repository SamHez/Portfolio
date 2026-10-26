import assert from "node:assert/strict";
import http from "node:http";
import https from "node:https";

const base = (
  process.env.PORTFOLIO_TEST_URL || "http://localhost:3100"
).replace(/\/$/, "");
const preview = process.env.EXPECT_PREVIEW === "true";
const origin = "https://samhez.tech";
const routes = ["/", "/about", "/work", "/recognition", "/contact"];
const titles = [
  "Samuel Epodoi | Software Engineer & Creative Technologist",
  "About Samuel Epodoi | Engineering & Philosophy",
  "Selected Work | Samuel Epodoi",
  "Recognition & Leadership | Samuel Epodoi",
  "Contact Samuel Epodoi | Engineering & Collaboration",
];
const restricted =
  /Swave|Kampala|Uganda|Rwanda|university|\bstudent\b|\bALU\b|\bbirth|\bage\b|\byears old\b|Ardent|EABB|sellerdo|trustable|Juba|Emerging Nursing|Complaints Bureau|Zimbabwe National Debate|Ministry of Health/i;
const decode = (text) =>
  text
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
const attributes = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [
      key,
      decode(value),
    ]),
  );
async function get(path, options) {
  const response = await fetch(base + path, options);
  return { response, text: await response.text() };
}
let checks = 0;
for (const [index, path] of routes.entries()) {
  const { response, text } = await get(path);
  assert.equal(response.status, 200, path);
  const meta = [...text.matchAll(/<meta\b[^>]*>/g)].map(([tag]) =>
    attributes(tag),
  );
  const content = (name) =>
    meta.find((tag) => tag.name === name || tag.property === name)?.content;
  assert.equal(
    decode(text.match(/<title>(.*?)<\/title>/s)?.[1] || ""),
    titles[index],
    path + " title",
  );
  assert(content("description")?.length > 70);
  assert.equal(
    new URL(content("og:url")).href,
    origin + (path === "/" ? "/" : path),
  );
  assert.equal(content("og:locale"), "en_US");
  assert.equal(content("twitter:card"), "summary_large_image");
  assert.equal(content("og:image"), origin + "/social-card.png");
  assert(
    !restricted.test(meta.map((tag) => tag.content || "").join(" ")),
    path + " restricted metadata",
  );
  assert.equal(
    content("robots").includes("noindex"),
    preview,
    path + " robots",
  );
  assert.equal(
    response.headers.get("x-robots-tag")?.includes("noindex") || false,
    preview,
    path + " indexing header",
  );
  const canonical = [...text.matchAll(/<link\b[^>]*>/g)]
    .map(([tag]) => attributes(tag))
    .find((tag) => tag.rel === "canonical");
  assert.equal(
    new URL(canonical?.href).href,
    origin + (path === "/" ? "/" : path),
    path + " canonical",
  );
  const graphs = [
    ...text.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
    ),
  ].map(([, json]) => JSON.parse(json));
  assert.equal(graphs.length, 1);
  const graph = graphs[0];
  assert.equal(graph["@context"], "https://schema.org");
  const person = graph["@graph"].find((node) => node["@type"] === "Person");
  assert.equal(person.name, "Samuel Epodoi");
  assert.equal(person.jobTitle, "Software Engineer");
  assert.deepEqual(person.sameAs, [
    "https://www.linkedin.com/in/samuel-epodoi-a4106523b/",
    "https://github.com/SamHez/",
  ]);
  assert(!restricted.test(JSON.stringify(graph)), path + " restricted schema");
  for (const node of graph["@graph"]) {
    assert(node["@id"].startsWith(origin + "/"));
    if (node["@type"] === "BreadcrumbList")
      assert.deepEqual(
        node.itemListElement.map((item) => item.position),
        [1, 2],
      );
  }
  if (path === "/about")
    assert(graph["@graph"].some((node) => node["@type"] === "ProfilePage"));
  if (path === "/" || path === "/work")
    assert(
      !/Emerging Nursing|EABB Africa|sellerdo\.co|trustable\.rw|Juba Institute|Uganda Law Society/.test(
        text,
      ),
      path + " project isolation",
    );
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
  checks++;
}
const sitemap = await get("/sitemap.xml");
assert.equal(sitemap.response.status, 200);
const locations = [...sitemap.text.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  ([, url]) => url,
);
assert.deepEqual(locations, preview ? [] : routes.map((path) => origin + path));
assert(!sitemap.text.includes("<lastmod>"));
const robots = await get("/robots.txt");
assert.equal(robots.response.status, 200);
assert(robots.text.includes("Allow: /"));
assert(!robots.text.includes("Disallow: /work"));
assert.equal(
  robots.text.includes("Sitemap: https://samhez.tech/sitemap.xml"),
  !preview,
);
for (const slug of [
  "project-02",
  "project-03",
  "project-04",
  "project-05",
  "project-06",
  "project-07",
  "project-08",
  "project-09",
  "project-10",
  "project-11",
  "project-12",
  "project-13",
  "preview",
  "collection",
  "clients",
  "partners",
]) {
  const { response, text } = await get("/work/" + slug);
  assert.equal(response.status, 200, slug);
  assert(response.headers.get("x-robots-tag")?.includes("noindex"), slug);
  assert(
    /<meta name="robots" content="noindex, follow/.test(text),
    slug + " metadata",
  );
  assert(
    !text.includes('type="application/ld+json"'),
    slug + " identity schema",
  );
  assert(text.includes("data-nosnippet"), slug + " snippet boundary");
  checks++;
}
for (const file of [
  "uls-portal.png",
  "complaints-system.png",
  "jil-south-sudan-thumb.webp",
  "emerging-nursing-thumb.webp",
  "sellerdo-thumb.webp",
  "zimbabwe-debating-thumb.webp",
  "images/Resume%202026%20Samuel%20Epodoi.pdf",
]) {
  const response = await fetch(base + "/" + file, { method: "HEAD" });
  assert.equal(response.status, 200, file);
  assert(response.headers.get("x-robots-tag")?.includes("noindex"), file);
}
for (const file of [
  "social-card.png",
  "apple-touch-icon.png",
  "favicon.ico",
  "icon-192.png",
  "icon-512.png",
  "manifest.webmanifest",
]) {
  const response = await fetch(base + "/" + file);
  assert.equal(response.status, 200, file);
}
for (const path of [
  "/unknown-phase4-route",
  "/work/project-01",
  "/.env.local",
  "/.migration/phase4-pre-hardening-5fYXxj.tar.gz",
])
  assert.equal((await fetch(base + path)).status, 404, path);
const legacy = await fetch(base + "/index.html", { redirect: "manual" });
assert.equal(legacy.status, 308);
assert.equal(new URL(legacy.headers.get("location"), base).pathname, "/");
if (["localhost", "127.0.0.1", "::1"].includes(new URL(base).hostname)) {
  const www = await new Promise((resolve, reject) => {
    const target = new URL(base + "/work?source=check");
    const transport = target.protocol === "https:" ? https : http;
    const request = transport.request(
      target,
      { headers: { host: "www.samhez.tech" } },
      (response) => {
        response.resume();
        resolve({
          status: response.statusCode,
          location: response.headers.location,
        });
      },
    );
    request.on("error", reject);
    request.end();
  });
  assert.equal(www.status, 308);
  assert.equal(www.location, "https://samhez.tech/work?source=check");
}

console.log(
  `Passed ${checks} route checks plus sitemap, robots, schemas, headers, icons, redirects and private-file checks (${preview ? "preview" : "production"}).`,
);
