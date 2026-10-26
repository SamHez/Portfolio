// Netlify injects CONTEXT at build time. Local production builds remain indexable
// unless explicitly marked as previews; this never derives canonicals from a host.
export const isPreviewDeployment =
  process.env.SITE_NOINDEX === "true" ||
  (Boolean(process.env.CONTEXT) && process.env.CONTEXT !== "production");
