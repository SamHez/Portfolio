import Link from "next/link";
import type { HeroBackgroundVariant } from "@/content/hero-background";
import { HeroBackground } from "@/components/backgrounds/HeroBackground";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  cta,
  height = "standard",
  background,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; href: string };
  cta?: { label: string; href: string };
  height?: "standard" | "compact";
  background?: HeroBackgroundVariant;
}) {
  return (
    <section
      className={`page-hero dark-hero page-hero-${height}`}
      aria-labelledby="page-title"
    >
      <HeroBackground variant={background} />
      <Container>
        <ScrollReveal entrance className="page-hero-content">
          {breadcrumb && (
            <Link
              prefetch={false}
              data-reveal
              className="hero-breadcrumb mono"
              href={breadcrumb.href}
            >
              ← {breadcrumb.label}
            </Link>
          )}
          <p data-reveal className="eyebrow">
            {eyebrow}
          </p>
          <h1 data-reveal id="page-title">
            {title}
          </h1>
          {description && (
            <p data-reveal className="page-hero-description">
              {description}
            </p>
          )}
          {cta && (
            <div data-reveal>
              <Button href={cta.href}>{cta.label}</Button>
            </div>
          )}
        </ScrollReveal>
      </Container>
    </section>
  );
}
