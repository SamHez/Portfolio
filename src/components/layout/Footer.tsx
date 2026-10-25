import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link href="/" className="brand" aria-label="Samuel Epodoi, home">
          SE.
        </Link>
        <p>Thoughtfully engineered. Purposefully designed.</p>
        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight size={13} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowUpRight size={13} />
          </a>
          <a href={`mailto:${profile.email}`}>
            Email <ArrowUpRight size={13} />
          </a>
        </div>
        <span className="mono copyright">
          © {new Date().getUTCFullYear()} Samuel Epodoi
        </span>
      </div>
    </footer>
  );
}
