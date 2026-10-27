<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Working rules

- Continue in this repository. Do not create a replacement folder/repository, commit, push, deploy, change DNS or use external accounts without explicit authorization.
- Preserve all user edits, including staged/uncommitted work. Never reset the working tree. New user instructions take precedence over old pasted phase prompts.
- Current documentation is README.md, docs/MAINTENANCE.md and docs/CONTENT.md. Keep required docs/licenses notices. Do not recreate historical phase reports, duplicate deployment configs, screenshots or raw audit dumps in the repository.
- Use Node 22 and the lockfile. Build with the existing verified Webpack command. Run checks appropriate to changes; npm run verify:production audits a running production server.

## Approved appearance and behavior

- Force light mode despite saved/OS dark preferences. No theme selector or footer animation control. Respect reduced motion and retain static/no-JavaScript/failure fallbacks.
- Outfit body, Space Grotesk display/bold navigation, IBM Plex Mono labels. Compact inset navbar is transparent/light over the hero with white Get in Touch CTA; scrolling restores liquid glass/dark navigation and black CTA. Straight right arrow, no back arrow beside CTA. Navigation: Home, About, Work, Recognition, Contact. Active navigation uses an underline on desktop and mobile, never a dot.
- Preserve the actual current two-line hero capitalization and underlined Purpose. No flipping text, tagline, scroll cue, curved edge or bottom gradient; keep the decorative vertical boundary line. Hero, Home bio and About mission use broad positioning around useful technology, people and business growth; do not restore Africa-only positioning or the growing urban communities copy.
- Grayscale GradientWaves is default. GradientASCII, Silk, video and static remain selectable through src/content/hero-background.ts; mount one renderer. Preserve frame/DPR limits and offscreen/hidden pause. Keep the optional video poster.
- Small authentic headshot on Home, compact speaking portrait on About. Do not replace real photos with placeholders. About caption: “Keynote speech · At 13, My Journey as a Software Developer”.
- About hero says ABOUT ME. My Approach sits left with a concise, right-aligned sentence at the far right (at most two lines); stack on mobile. Final principle: “Learn and improve.” Mission label has its own row; journey uses a line/dots and ends 2020 & beyond.
- Résumé opens in a compact native modal with document icon, lazy PDF, Download, Close, Escape, focus restoration and scroll locking. No new-tab-only trigger.
- Compact Selected Work heading with View all work in the carousel toolbar. Outer cards are shorter color illustrations with contribution badges inside, above titles. Screenshots/artwork/video belong only on detail pages. Keep native horizontal touch/keyboard scrolling and controls, hide scrollbars and prevent vertical iframe scroll.
- Exactly three compact white expertise cards on a dark-gray #262628 section: Software / Engineering (two lines), Product & Interface Design, Motion & Graphic Design. Horizontal wrapping skill chips; preserve approved tools. Do not restore public TypeScript, Next.js, HTML/CSS, Interaction Design or Engineering & Delivery.
- Dark closing Let’s connect section and footer. Desktop footer: SE. left, social icon links centered, copyright right; stack on mobile. No slogan or diagonal social/email arrows. Keep scroll-to-top.
- Direct contact only: samuelepodoi@gmail.com and +256754377715 with approved socials. Do not restore dormant EmailJS form UI.

## Content and publication

- Home order: Uganda Law Society, Emerging Nursing Australia, Ministry of Health, Juba Institute of Languages, Complaints Bureau System, EABB Africa, sellerdo.co, Zimbabwe National Debate, Miss Universe Tanzania, Lguard Rwanda, Biplous Uganda.
- Work rows: Web Applications & Systems (ULS, Complaints, Juba, Nursing, EABB, Sellerdo, Zimbabwe) and Graphics & Motion Design (four approved creative entries). Trustable is excluded from selections but retains project-03. EABB keeps project-02; removed project-01 stays 404. Never reuse identifiers.
- Show confirmed project years beside the contribution badge; source dates from src/content/projects.ts and do not invent missing years. Web badges say Web Development. Motion entries say Motion & Graphic Design; Ministry of Health says Graphic Design. Never invent scope, stacks, outcomes or testimonials. Missing content is in docs/CONTENT.md.
- Detail pages retain compact media/copy layout, prominent bold white underlined All work back link, supplied screenshots and user-provided domains. Motion clips use native controls/inline playback without autoplay; external Swave media stays on the relevant detail routes.
- Ministry of Health contribution is 2022; the supplied PNG cover is printed October 2021. Keep dates distinct. List eight resource titles without download links until actual PDFs are supplied. Do not infer medical claims or outcomes.
- Recognition uses RubyConf, Patrick Bitature and Outbox Hub / Richard Zulu (26 January 2018, https://x.com/richardzulu/status/956923823118483457). Do not restore Innovation Village or its 2019 override. Recognition page uses three official X embeds and a top-aligned fuller narrative; no duplicate heading above its collage. Home title: “Experience that connects.”
- KPI counters are exactly 110+ completed projects / 72+ trusted clients, counting once on view (final values with reduced motion). Use actual supplied logos in the separate compact client slider, never project cards or sample logos. The logo slider supports pointer dragging and keyboard scrolling; automatic motion continues on hover and pauses offscreen/when hidden or reduced motion is requested. No Millen background tile; preserve its readability filter and ULS background blending.

## Search, performance and operations

- Preserve exact public metadata in src/lib/seo.ts and typed JSON-LD on five public pages only. Keep age, location, student/company/client details out of metadata/schema. Keep Home/Work client-name isolation through noindex embeds and existing server-rendered data-nosnippet boundaries.
- All projects default searchVisibility: "noindex"; changing indexing requires explicit user approval. Keep generic case metadata, noindex/follow/nosnippet/noimageindex headers/meta, asset/PDF noindex including optimized variants, and no current project sitemap entries. Header/sitemap policy derives from the visibility flag; update audit expectations with approved changes. Do not block Work crawling or add indexifembedded. These are search controls, not confidentiality guarantees.
- Root netlify.toml is canonical: Node 22, npm build, .next, explicit unversioned @netlify/plugin-nextjs adapter, NETLIFY_NEXT_PLUGIN_SKIP=false; no pinned adapter dependency/static export/custom server. The explicit adapter fixes the migrated site's raw .next publication (BUILD_ID/server/app/index.html publicly served while / returned 404). Preview CONTEXT or SITE_NOINDEX=true adds noindex and an empty sitemap; production must not inherit preview flags.
- Preserve deferred iframe/GSAP initialization, no-JavaScript iframe fallbacks, public navbar/CTA prefetch, intent-only project prefetch through the validated iframe bridge, and existing animation. Do not remove approved motion just to improve an audit score.
- GA4 stays absent without valid public ID and opt-in; preserve decline/withdrawal and sanitized aggregate events. Disable stream Enhanced Measurement before activation. No real identifier/delivery was configured.
- Local verification is documented, not a declaration that launch is complete: mobile blocking/variance, real-device/field data, Safari/Firefox, screen-reader and actual Netlify/CDN checks remain pending. Do not claim untested browser support or field INP.
- Private ignored recovery archives under .migration are never served/published. Restore only by comparing extracted individual files; never reset later user work.
