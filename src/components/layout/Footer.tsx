import Link from "next/link";
import { SocialLinks } from "@/components/ui/SocialLinks";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link
          prefetch={false}
          href="/"
          className="brand"
          aria-label="SE. — Samuel Epodoi, home"
        >
          SE.
        </Link>
        <SocialLinks className="footer-links" />
        <span className="mono copyright">
          © {new Date().getUTCFullYear()} Samuel Epodoi
        </span>
      </div>
    </footer>
  );
}
