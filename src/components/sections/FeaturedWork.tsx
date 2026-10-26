import { Container } from "@/components/ui/Container";
import { ProjectShowcase } from "@/components/work/ProjectShowcase";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function FeaturedWork() {
  return (
    <section
      id="work"
      className="featured-work homepage-section"
      aria-labelledby="work-heading"
    >
      <Container>
        <ScrollReveal>
          <div className="work-heading-row" data-reveal>
            <div>
              <h2 id="work-heading" className="editorial-heading">
                Ideas into impact.
              </h2>
            </div>
            <div className="work-intro">
              <p>
                Thoughtful work, shaped around real people and practical needs.
              </p>
            </div>
          </div>
        </ScrollReveal>
        <ProjectShowcase />
      </Container>
    </section>
  );
}
