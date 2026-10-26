# Maintenance and launch guide

This guide replaces the historical phase/refinement reports. Local hardening was verified on 26 October 2026; deployment and external account changes have not been performed. Content gaps are tracked separately in [CONTENT.md](CONTENT.md).

## Build and verify

Use Node 22 and `npm ci`. Run `npm run typecheck`, `npm run lint`, and `npm run build`. The build deliberately uses `next build --webpack`; Turbopack's worker-port operation failed in the restricted local environment. Keep the standard App Router output, without static export, custom server or SPA rewrite.

Start `npm run start -- --port 3100`, then run `npm run verify:production`. The reusable audit checks five public pages, twelve numbered case studies, four embeds, metadata/schema, assets, headers, redirects, sitemap, robots and private-file exclusion.

For a separately built preview:

```sh
CONTEXT=deploy-preview SITE_NOINDEX=true npm run build
npm run start -- --port 3100
# In another terminal:
EXPECT_PREVIEW=true npm run verify:production
```

Rebuild without preview flags before production. To audit an authorized remote preview, use `PORTFOLIO_TEST_URL=https://your-preview-host EXPECT_PREVIEW=true npm run verify:production`. Host-header redirect checks run only on loopback.

## Hydration and development tools

Grammarly can add `data-new-gr-c-s-check-loaded` and `data-gr-ext-installed` to `<body>` before React hydrates. This exact warning was reproduced locally and resolved by scoping `suppressHydrationWarning` to the root body. This tolerates extension-added body attributes; it does not suppress mismatches in page descendants or remove the extension. Keep server/client rendering deterministic rather than adding suppression to ordinary components.

`devIndicators: false` removes Next’s development badge/menu from the main page and embedded sliders. Compilation/runtime errors still surface during development. Production uses `npm run build` and the Netlify adapter, without the development overlay. The existing `next/font/google` configuration downloads fonts at build time and serves them locally at runtime; a clean build needs access to Google Fonts.

## Deployment and environment

Use the existing Netlify project and root `netlify.toml`: repository root, `npm run build`, publish `.next`, Node 22. The file explicitly enables the unversioned `@netlify/plugin-nextjs` adapter and sets `NETLIFY_NEXT_PLUGIN_SKIP=false`. This migrated site was observed publishing raw `.next` files without application routing: `/BUILD_ID` and `/server/app/index.html` returned 200 while `/` returned Netlify’s default 404. Explicit adapter activation avoids relying on the old site’s framework detection; do not pin an adapter version in package.json. The duplicate example configuration was removed.

| Build variable               | Use                                                                                                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `SITE_NOINDEX`               | Blank in production; `true` in previews and branch deploys. Non-production Netlify `CONTEXT` also enables preview protection. Do not redefine Netlify's `CONTEXT`. |
| `GOOGLE_SITE_VERIFICATION`   | Optional public Search Console HTML verification token.                                                                                                            |
| `NEXT_PUBLIC_GA_ID`          | Optional valid GA4 `G-...` identifier; production only and subject to consent.                                                                                     |
| `NEXT_PUBLIC_HERO_VIDEO_URL` | Optional video override, dormant while Waves is selected.                                                                                                          |
| `NEXT_PUBLIC_EMAILJS_*`      | Dormant public identifiers. Not needed for direct-contact links.                                                                                                   |

No server secret is required. Keep `.env.local` ignored; never expose private credentials through `NEXT_PUBLIC_*`.

For the next authorized deployment, ensure the production branch is `main`, the base directory is the repository root, and deploy the commit containing this configuration. Retry with a cleared build cache. The build log must show `npm run build` and the Next.js/OpenNext adapter processing output, including server functions and routing; “Site is live” alone only confirms that files were published. Check that no site environment or context overrides disable the adapter. Do not add a SPA rewrite to `/index.html` or publish `.next/server/app` directly.

After deployment authorization, validate the real adapter/runtime, Image CDN, logs and headers. Confirm `samhez.tech` is primary, `www.samhez.tech` is its alias, and the platform enforces HTTPS with a valid certificate. Check HTTP/HTTPS and www/non-www redirect chains for loops. Application redirects for www and `/index.html` were verified locally; actual DNS/TLS/CDN behavior remains pending.

On the deployed site, check anonymous social-card retrieval, optimized images, video controls, X embeds, inline résumé viewing, direct email/telephone links and unknown-route 404s. The limited CSP restricts base/object/ancestor contexts; it is not a full nonce-based script policy. Preserve compatibility with Next, GSAP, same-origin embeds, PDF viewing and X widgets.

References: [Netlify Next.js](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/), [environment contexts](https://docs.netlify.com/build/configure-builds/environment-variables/), [HTTPS](https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/).

## Search visibility

Approved metadata lives in `src/lib/seo.ts`; structured data lives in `src/lib/structured-data.ts`. Canonicals use HTTPS on `samhez.tech`, without trailing slashes on internal pages. Root canonical forms with/without the final slash are equivalent.

| Route          | Title                                                      |
| -------------- | ---------------------------------------------------------- |
| `/`            | Samuel Epodoi \| Software Engineer & Creative Technologist |
| `/about`       | About Samuel Epodoi \| Engineering & Philosophy            |
| `/work`        | Selected Work \| Samuel Epodoi                             |
| `/recognition` | Recognition & Leadership \| Samuel Epodoi                  |
| `/contact`     | Contact Samuel Epodoi \| Engineering & Collaboration       |

Each public route has its own description, canonical, OG/X metadata and the branded 1200×630 PNG. JSON-LD includes Person, WebSite, WebPage, About's ProfilePage and internal BreadcrumbList. Keep age, location, student status, companies, client names, invented awards and testimonials out of metadata/schema. Historical approved content remains visible within snippet boundaries.

All current `Project.searchVisibility` values default to `noindex`. Case studies use generic metadata, `noindex, follow, nosnippet, noimageindex`, and no inherited social image. Their numbered routes remain accessible, including the unlisted Trustable page; project-01 remains removed. Home/Work use noindex embeds to avoid project names in indexable parent markup. Keep server-rendered `data-nosnippet` containers and direct/optimized asset and résumé noindex headers.

Only change a project's indexing status after explicit approval, updating the production-audit expectations as well. Header overrides and sitemap inclusion derive from the visibility flag. Do not block Work in robots.txt or add `indexifembedded`. Search directives do not make public content confidential or guarantee how search engines display it.

The production sitemap lists only the five public URLs, without invented modification dates. Robots allows crawling so directives can be read. Preview builds have noindex headers/meta and an empty sitemap. Keep preview hosts out of canonicals.

References: [Google robots and snippet controls](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag), [Next metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images).

## Search Console after launch

1. Verify the Domain property `samhez.tech` using Google's actual DNS TXT value with the domain administrator. Alternatively, use an HTTPS URL-prefix property and the optional `GOOGLE_SITE_VERIFICATION` token, then rebuild.
2. Inspect the five public URLs using URL Inspection → Test live URL. Confirm 200 responses, indexing allowed and HTTPS non-www canonicals.
3. Submit `https://samhez.tech/sitemap.xml`. Request indexing for the public pages after successful live tests; exclude project pages, embeds and the résumé PDF.
4. Monitor indexing, Google's selected canonical, last crawl date, professional search queries and Core Web Vitals. Run external structured-data validation once live. No specific search feature or immediate update is guaranteed.

Do not use temporary URL removals just to refresh an old title. See [Search Console guidance](https://developers.google.com/search/docs/monitor-debug/search-console-start) and [recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl). No ownership verification, submission or indexing request has been performed.

## Analytics and contact

With no valid GA4 ID, there is no analytics UI, tag or delivery. If activating GA4, first disable the stream's Enhanced Measurement automatic events (history pageviews, outbound links, forms and downloads). Provide appropriate privacy information and verify real collection separately.

The integration loads one tag only after opt-in, persists Allow/Decline, strips URL queries/referrers and sends explicit aggregate navigation/contact/performance events. Advertising storage/signals are denied. Withdrawal disables the runtime, clears first-party GA cookies and reloads. Tracking stays absent on case-study subroutes and previews. Web Vitals collection requires consent and representative traffic; lab TBT is not field INP.

Contact remains `mailto:samuelepodoi@gmail.com` and `tel:+256754377715`, with social links. The EmailJS form code is dormant; no real email delivery was tested. Do not restore the form or theme selector based on obsolete prompts.

## Verification record and remaining checks

Prior local hardening checks passed on Node 22.20.0 / Chrome 139: clean install, lint, typecheck, Webpack build and production/preview HTTP audits. Dependency audit reported zero vulnerabilities at that time; ESLint 9 emitted a deprecation notice. These are dated results, not an ongoing security guarantee.

Responsive checks covered 17 routes at ten widths (320–1440px), plus twelve landscape checks. Automated axe-core WCAG A/AA checks found no violations. Keyboard/menu focus handling, carousel controls, inline résumé/Escape/focus restoration, direct contact, forced light mode, no-JavaScript fallbacks and live X embeds were checked. Twelve initial-viewport before/after comparisons showed no changed pixels. Analytics was tested with intercepted mock Google requests, without real delivery.

Lighthouse 13.5.0 used a production build and headless Chrome with SwiftShader, not a physical phone GPU. Mobile used simulated 4× CPU, 150ms RTT and about 1.6Mbps. Baseline is one run; final mobile is the median of three sequential runs; desktop is one run.

| Measurement                          | Baseline mobile | Final mobile median |         Desktop |
| ------------------------------------ | --------------: | ------------------: | --------------: |
| Performance score                    |              66 |                  70 |             100 |
| LCP                                  |           3.81s |               2.20s |           0.60s |
| FCP                                  |           1.43s |               1.29s |           0.38s |
| CLS                                  |               0 |                   0 |               0 |
| TBT                                  |           743ms |             1,743ms |            42ms |
| Speed Index                          |           5.60s |               3.01s |           0.92s |
| Accessibility / best practices / SEO | 100 / 100 / 100 |     100 / 100 / 100 | 100 / 100 / 100 |

**Mobile performance remains unresolved:** scores ranged 51–72, LCP 2.04–4.51s and TBT 1.15–2.00s. Blocking did not improve against the single baseline. Field INP and real-user p75 values are unavailable. Reproduce audits sequentially against production, with consistent CPU/network settings.

Existing optimizations defer iframe/GSAP startup near view, disable speculative link prefetch, and match logo image sizes to rendered widths. Initial documents fell from three to one and JS requests from 36 to 14, but transferred script bytes remained about 218KiB. Final initial mobile requests contained 222,753 JS bytes, 76,896 font bytes and one 6,363-byte image; largest shared chunk was 242,566 uncompressed bytes. This excludes deferred media.

Hero rendering retains its one-million-pixel budget, 20/30fps caps, offscreen/hidden pause and reduced-motion/static failure fallback. Instrumentation observed 22 mobile/33 desktop draws in 1.1s. A separate throttled scrolling check measured about 0.00030 cumulative shift while deferred content loaded. These are local diagnostics, not field guarantees.

Before launch:

- [ ] Profile remaining mobile blocking on real devices and the authorized Netlify preview.
- [ ] Test Safari/iOS and Firefox on a supported host. Their Playwright installs were blocked by this machine's macOS 12; only Chrome was verified.
- [ ] Perform manual screen-reader and real touch-device checks.
- [ ] Validate deployment runtime, CDN, DNS/TLS/redirects, social retrieval and external schema checks.
- [ ] Recheck the approved Zimbabwe and Emerging Nursing domains independently; both timed out here. Sellerdo returned 200; Complaints returned 200 after sign-in redirect. Preserve supplied URLs until confirmed changes.
- [ ] Complete outstanding [project content](CONTENT.md), then authorized Search Console setup.
- [ ] If analytics is enabled, validate consent/privacy settings and actual delivery.

## Recovery and repository hygiene

No commit, push or deployment has been performed. Keep existing dirty work intact. The old static site is available at Git revision `0fa3724`, with a local ignored `.migration/legacy-0fa3724.tar.gz`. A pre-hardening source/assets snapshot is `.migration/phase4-pre-hardening-5fYXxj.tar.gz`. Neither archive is publicly served. Extract to a separate temporary directory and compare individual files; never reset the tree or blindly overwrite later changes. An authorized deployment rollback can republish the last successful Netlify deploy.

Keep only current documentation and referenced public assets. Preserve required [license notices](licenses/), the editable social-card SVG, résumé, authentic photographs, client/project media and the poster used by the optional video/static fallback. Do not commit generated `.next`, dependencies, local environment files, private recovery archives, screenshots or raw audit runs. Regenerate verification evidence when needed rather than accumulating phase reports in the repository.
