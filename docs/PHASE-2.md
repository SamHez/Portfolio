# Phase 2 — Homepage development

## Completed experience

The homepage now follows the requested six-section sequence: the cinematic hero, About & Philosophy, Selected Work, Expertise & Technical Capabilities, Recognition & Leadership, and the closing Contact CTA. Dedicated content pages remain Phase 1 placeholders; Phase 3, EmailJS and deployment have not begun.

About now pairs a larger recovered photograph on the left with one concise paragraph and a View More CTA on the right. Work presents three equal cards in color. Expertise uses four numbered capability groups. Recognition combines a clearly identified archival image placeholder, the conference narrative and two source-attributed entries. Contact preserves the oversized typographic concept and adds the approved supporting description and both CTAs.

The hero now uses smaller centered typography and centered supporting copy. The editorial tagline and visible motion control were removed at the user’s request. Background video now settles after a 4.5-second ambient introduction, retaining motion accessibility without a visible pause control. Navigation blends into the hero at the top and becomes a compact inset glass bar on scroll. Theme management, media fallbacks, reduced-motion support, palette, metadata and fonts remain intact. No dependency was added or changed. No commit, push or deployment was performed.

## Components and content architecture

New server-rendered sections: `AboutPreview`, `FeaturedWork`, `Expertise`, `RecognitionPreview`, `ContactCTA`.

New reusable UI: `ProjectCard`, `CapabilityGroup`, `RecognitionCard`, `TextLink`.

Typed reusable models and data: `src/content/projects.ts`, `src/content/skills.ts`, `src/content/recognition.ts`. Project evidence and publication approval are separate gates. `getPublishedProjects` excludes a record unless both are satisfied, and the card component also checks them. Recognition components exclude unverified records. Skills expose only approved entries. Withheld records are used by server components and are not serialized as client props.

`ProjectCard` supports descriptions, contribution, verified technology lists, optional status, responsive Next.js images and optional project destinations. It can render a clearly labelled CSS visual placeholder when no real screenshot exists. It only renders a project link when an actual destination is supplied. This Phase 2 dataset supplies no unverified destinations or current production-status claims.

## Projects included

| Project                      | Evidence and contribution                                                                          | Public status                     |
| ---------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------- |
| The Roots Restaurant         | Previously published as Website Design in `0fa3724:index.html`; original `img/roots.png` recovered | Archived website design; featured |
| Edgepoint                    | Previously published as Website Design in the same archive; `img/edge.png` recovered               | Archived website design           |
| Royal Life Christian Academy | Previously published as Website Design in the same archive; `img/royal.png` recovered              | Archived website design           |

The brief explicitly permits previously approved legacy portfolio items. Their existing public inclusion and matching assets support reuse here. Descriptions describe visible site content, and the only claimed contribution is the archived Website Design role. No backend features, framework stacks, traffic metrics, outcomes or current operational status are inferred. Existing screenshots are lazy-loaded through Next.js Image, with explicit dimensions and responsive sizes, and displayed in their original colors. No proprietary asset was downloaded from a client website.

## Projects withheld

JIL Learning Management System, Smartel Agritech Yield Management, EABB Africa Corporate Platform and Urban Mobility Data Explorer remain `publicationApproved: false` and `evidenceStatus: "pending"`. Their descriptions, roles, technology stacks, screenshots, completion status and publication permission need confirmation. All four requested asset directories exist, without fake screenshots. No public cards, case studies or metadata identify those candidate projects.

Current legacy project URLs were not verified, so cards have no misleading View Project control. View All Work links to the functional `/work` placeholder. Confirm canonical project URLs or supply case-study details before Phase 3.

## Capabilities

The public list is limited to capabilities demonstrated by this repository and archived design work: React, Next.js, TypeScript, JavaScript, HTML/CSS, responsive interfaces, UI architecture, application architecture, interface design, design systems, accessibility, interaction design, Git/GitHub and performance optimization. This is a scope of work, not an expert proficiency rating.

Unconfirmed proposed capabilities remain in the typed model with `approved: false`: Node.js backend development, Python, PHP/Laravel, REST API integration, relational databases, user-experience practice, prototyping, deployment workflows, cloud infrastructure, technical problem solving and cross-functional collaboration. Confirm these against actual project experience before expanding the public list.

## Recognition references

All three narratives use the approved brief and are corroborated by embedded source text and dates in the original portfolio at `0fa3724:index.html`:

- RubyConf Kenya, 2018: [conference reference by Yasuhiro Yoshida](https://twitter.com/yoppuyoppu/status/1012222722817122304).
- Patrick Bitature, 2018: [original acknowledgment](https://twitter.com/patrickbitature/status/989348844579192838).
- Innovation Village / StartupDigest Africa, 2018: [coverage reference recovered from the legacy portfolio](https://twitter.com/InnovationVilla/status/983278463577739264).

Direct attempts to fetch these posts were unavailable in this environment. The evidence basis is the supplied history and matching archived embeds; live-post availability is not claimed. Innovation Village's exact post URL was recovered; the original StartupDigest article URL was not verified or invented. No social feed, widget, age-focused quotation or tracking script is embedded. External source controls clearly identify attribution and open safely in a new tab.

## Assets and missing photography

Three original project PNGs were recovered into `public/images/projects/legacy/`. No conference or recognition photo was found among the archived recognition references, project imagery and inspected miscellaneous/profile assets.

The homepage uses an intentionally designed CSS archival frame explicitly labelled “ARCHIVAL PHOTOGRAPH TO BE ADDED.” Four non-photographic `.svg` placeholders with the requested filename stems are available in `public/images/recognition/`; none is represented as authentic photography. Supply the following originals to replace them:

- `public/images/recognition/rubyconf-kenya-2018.jpg`
- `public/images/recognition/early-coding-2018.jpg`
- `public/images/recognition/tech-event-2018.jpg`
- `public/images/recognition/bitature-post-2018.jpg`

After confirming image ownership, identity, dates and captions, set the appropriate recognition record's `image` and `imageAlt`. Do not rename a graphic placeholder to `.jpg` or present it as a source photograph. The About preview now uses `public/images/profile/samuel-at-work.png`, recovered from the original `img/sam1.png`. A separate professional portrait can still be supplied for the Phase 3 About page.

## Motion and responsive behavior

The entrance-animation branch used by the hero and header retains its original settings. Scroll reveals now trigger per element so long editorial sections do not animate all their content before it reaches view. Optional rules scale horizontally, the archival frame has a restrained mask reveal, and project images scale subtly on hover. Source links and CTAs have understated underline/arrow motion. GSAP contexts and media-query handlers clean up on unmount; reduced motion disables animation and hover scaling. Content is present in the server HTML and visible without JavaScript.

Desktop layouts combine an image/text About grid, three equal project cards, four capability columns and an archival feature. Tablet uses a two-column capability grid; narrow phones use a single-column project/recognition composition. Typography, spacing and captions adjust at 1100, 800 and 560 pixels. Decorative elements do not intercept interaction.

## Verification

- `npm run typecheck`: passed.
- `npm run lint`: passed without warnings.
- `npm run build`: passed; all application routes prerendered successfully, with no new dependencies.
- Publication-gate checks: passed for both approval and evidence failures. Exactly three published legacy records, four withheld candidates, four capability groups and three verified archival recognition records.
- Production HTML inspection: approved projects and source references present; withheld candidate names and restricted identity/organization references absent.
- Chrome: all six sections rendered in order, one H1 and five H2 headings, all three responsive project images loaded, and all dedicated navigation destinations returned HTTP 200.
- Responsive widths 320, 390, 768, 1024 and 1440px: no horizontal overflow.
- Axe WCAG 2 A/AA and 2.1 AA scans: zero violations across the full homepage in both themes with reduced motion enabled (so no content is concealed by unrevealed animations).
- Initial desktop cumulative layout shift after the refinements: approximately 0.00085 in both themes in the local test sessions.
- Scroll reveals: visible content verified after scrolling through each section with motion enabled. Hero video playback and theme persistence after reload passed. Narrow-screen/reduced-motion contexts retained the source-free video fallback.
- Mobile menu Escape behavior, section CTAs and existing page routes passed. No JavaScript errors, console errors, console warnings or hydration issues were captured in the final automated browser run.
- JavaScript disabled: all five new homepage sections and headings remained present and visible.
- Desktop light/dark and mobile light screenshots captured under `docs/screenshots/` and visually reviewed. Reduced motion was used for stable full-page captures.

The first browser attempt used `127.0.0.1` against an existing user-owned server advertised at `localhost`; Next.js’s development-origin protection prevented client initialization. Reusing `http://localhost:3000` resolved it without configuration changes or stopping that server. Initial image checks were adjusted to scroll lazy-loaded images into view before checking decoded dimensions. The final run used the hydrated app and passed.

Limits: browser verification used Chrome, not a complete cross-browser or manual screen-reader audit. Video playback used the real MP4 downloaded during Phase 1 through local request interception. Live social-post retrieval was unavailable; source URLs and narratives are corroborated by supplied material and the archived original portfolio. Photography, candidate project publication and unconfirmed skills remain content inputs for Phase 3, not fabricated substitutes. No production deployment was attempted.

Screenshots: [desktop light](screenshots/phase-2-desktop-light.png), [desktop dark](screenshots/phase-2-desktop-dark.png), [mobile light](screenshots/phase-2-mobile-light.png).

## Phase 3 preparation

Supply approved project scope, individual contributions, repositories or canonical links, verified technology choices, implementation status and screenshots. Confirm the additional capability list against real work. Supply original archival photos and the professional portrait, plus the approved longer biography, recognition context and any surviving primary article links. Keep confidential systems and unapproved material withheld. Dedicated About, Work, case-study, Recognition and EmailJS form work remains Phase 3.
