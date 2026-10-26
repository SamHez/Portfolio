import Image from "next/image";
import { mission } from "@/content/mission";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
export function AboutPreview() {
  return (
    <section
      id="about"
      data-nosnippet=""
      className="about-preview homepage-section"
      aria-labelledby="about-heading"
    >
      <Container>
        <ScrollReveal className="about-layout">
          <figure className="about-photo" data-reveal>
            <Image
              src="/images/profile/samuel-epodoi-headshot.jpg"
              alt="Professional headshot of Samuel Epodoi against a gray background."
              loading="eager"
              width={2500}
              height={2474}
              sizes="(max-width: 560px) 180px, 280px"
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
              Practical Technology. <br /> Lasting Opportunity.
            </h2>
            <div className="about-body" data-reveal>
              <p>{mission.summary}</p>
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
