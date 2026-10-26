# Samuel Epodoi · Portfolio

Personal portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS and GSAP. Includes About, Work, project details, Recognition and direct email/phone contact. The site uses Outfit and Space Grotesk, a light canvas with dark sections, and an animated grayscale hero.

## Development

Use Node.js 22 (`.nvmrc`) and the existing npm lockfile.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No environment variables are required; optional settings are listed in [.env.example](.env.example).

```sh
npm run typecheck
npm run lint
npm run build
npm start
```

The production build uses Webpack. To audit a local production server:

```sh
npm run start -- --port 3100
# In another terminal:
npm run verify:production
```

## Editing

- `src/app`: routes, metadata, global styling and icons.
- `src/content`: profile, projects, clients, skills, recognition and metrics. This is the main place to update content.
- `src/components`: shared layouts, sections, interactive media and motion.
- `src/lib`: SEO, structured data, deployment context and shared behavior.
- `public`: referenced images, logos, résumé, brand assets and optional video poster.
- `netlify.toml`: the single deployment configuration.

Select the hero in `src/content/hero-background.ts`: `waves` is active; `ascii`, `silk`, `video` and `static` are preserved alternatives. Keep `public/social-card.svg` as the editable source for the generated PNG. Respect reduced-motion and static fallbacks.

All project details currently remain excluded from search indexing. Project names and client logos are rendered through separate noindex embeds; changing this policy requires explicit approval. Contact uses direct links; the form integration remains dormant. Analytics is optional and disabled without configuration and consent.

## Documentation

- [Maintenance and launch guide](docs/MAINTENANCE.md): deployment, environment, SEO, analytics, verification, remaining launch checks and recovery.
- [Project content checklist](docs/CONTENT.md): missing briefs, URLs and supplied media.
- [Third-party licenses](docs/licenses/): required React Bits and Simple Icons notices.

