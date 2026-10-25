import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
export function AboutPreview() {
  return (
    <section
      id="about"
      className="about-preview homepage-section"
      aria-labelledby="about-heading"
    >
      <Container>
        <ScrollReveal className="about-layout">
          <figure className="about-photo" data-reveal>
            <Image
              src="/images/profile/samuel-at-work.png"
              alt="Samuel working on software at a laptop."
              loading="eager"
              width={535}
              height={703}
              sizes="(max-width: 800px) 100vw, 45vw"
            />
            <figcaption className="mono">
              THOUGHTFUL SOFTWARE. PURPOSEFUL DESIGN.
            </figcaption>
          </figure>
          <div className="about-main">
            <p className="eyebrow" data-reveal>
              02 / ABOUT & PHILOSOPHY
            </p>
            <h2 id="about-heading" className="editorial-heading" data-reveal>
              Engineering is more than writing code.
            </h2>
            <div className="about-body" data-reveal>
              <p>
                I&apos;m Samuel Epodoi, a software engineer and creative
                technologist bringing together engineering, product thinking and
                design to build thoughtful digital products and turn complex
                challenges into intuitive, reliable experiences.
              </p>
            </div>
            <div className="about-closing" data-reveal>
              <TextLink href="/about">View more about me</TextLink>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
