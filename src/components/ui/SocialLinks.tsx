import { Mail } from "lucide-react";
import { profile } from "@/content/profile";
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <nav
      className={`social-links ${className}`}
      aria-label="Social and email links"
    >
      <a href={profile.github} target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.4-1.22.72-1.5-2.51-.29-5.15-1.26-5.15-5.59 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.99 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.65 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.56.23 2.71.11 2.99.72.79 1.16 1.8 1.16 3.03 0 4.34-2.65 5.3-5.17 5.58.41.35.77 1.04.77 2.1v3.09c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
        </svg>
        <span>GitHub</span>
      </a>
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.31h.04c.39-.75 1.36-1.55 2.8-1.55 2.99 0 3.55 1.97 3.55 4.53v5.26Z" />
        </svg>
        <span>LinkedIn</span>
      </a>
      <a href={`mailto:${profile.email}`}>
        <Mail size={17} aria-hidden="true" />
        <span>Email</span>
      </a>
    </nav>
  );
}
