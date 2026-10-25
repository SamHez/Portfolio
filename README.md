# Samuel Epodoi · Portfolio 2.0

Phases 1–2: Next.js App Router foundation, monochrome cinematic hero, accessible navigation, persistent themes, and the complete editorial homepage. Dedicated pages remain minimal until Phase 3. See [the Phase 2 report](docs/PHASE-2.md) for content evidence, withheld records, missing assets and verification results.

## Develop

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Optional configuration is documented in `.env.example`; no secrets are required. `NEXT_PUBLIC_HERO_VIDEO_URL` replaces the default supplied CloudFront video.

```sh
npm run typecheck
npm run lint
npm run build
npm start
```

## Structure

- `src/app`: server-rendered routes, metadata, optimized fonts, global design tokens.
- `src/content`: profile, navigation, media, typed project publication gates, approved capabilities and sourced recognition records.
- `src/components/layout`: shared header, keyboard-accessible mobile dialog, footer.
- `src/components/sections`: hero composition and conditional browser video loading.
- `src/components/ui`: buttons, container, section heading, theme control.
- `src/components/motion`: reusable GSAP entrance and ScrollTrigger reveals with cleanup.
- `src/providers`: next-themes system detection and persisted theme choice.
- `public/videos`: static hero poster; mobile and reduced-motion fallback.
- `docs`: migration details, deployment reference and Phase 1 verification report.

## Migration and production safety

The checkout already had all legacy tracked files deleted when work began. Those deletions were preserved. The previous static Bootstrap/jQuery implementation and all media remain available at Git revision `0fa3724`; an ignored local recovery archive is at `.migration/legacy-0fa3724.tar.gz`. It is outside `public` and is never served by Next.js. Extract it to a separate temporary location to review or recover old media. Do not restore the old index into the new app root.

Work stays in the existing repository on `main` because its initial working tree was dirty. No commit, push, deployment, production setting change, or remote branch operation is part of this implementation.

## Deployment preparation

This is a standard Next.js application compatible with Netlify's Next.js adapter. The reference `docs/netlify.toml.example` is intentionally inactive: existing live deployment settings must remain unchanged until explicitly authorized. When deploying later, review the current Netlify site's base directory, Next.js runtime support, build command (`npm run build`), publish directory (`.next`), and Node 22 setting. Do not use a static export or custom server.

## Media and accessibility

Desktop video is muted and inline, playing a brief ambient introduction before settling on a still frame. It receives no `src` on screens narrower than 1024px, with reduced motion, Save-Data, or a 2G connection. A static poster remains visible if loading or playback fails. The visible motion control was removed in the homepage refinements; automatic motion stops within five seconds. All video frames use CSS grayscale; the poster is monochrome too. System theme is the default, with the toggle cycling through light, dark and system. `next-themes` applies the saved choice before hydration. GSAP runs only without reduced motion and leaves server-rendered content visible without animation.

## Next phase

Supply verified project details and screenshots, your approved professional biography, specific technical contributions, recognition evidence and leadership context. Confirm permission to publish each project and asset. No fabricated accomplishments, testimonials or project metrics are included.
