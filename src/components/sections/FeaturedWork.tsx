import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { getPublishedProjects } from "@/content/projects";
export function FeaturedWork() {
  const projects = getPublishedProjects()
    .filter((project) => project.featured)
    .slice(0, 3);
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
              <p className="eyebrow">03 / SELECTED WORK</p>
              <h2 id="work-heading" className="editorial-heading">
                Selected work.
                <br />
                <span>Real-world thinking.</span>
              </h2>
            </div>
            <div className="work-intro">
              <p>
                A selection of digital products and technology solutions shaped
                by practical challenges, thoughtful design and engineering
                decisions.
              </p>
              <TextLink href="/work">View All Work</TextLink>
            </div>
          </div>
        </ScrollReveal>
        <div className="project-grid">
          {projects.length ? (
            projects.map((project, index) => (
              <ScrollReveal key={project.id}>
                <div data-reveal>
                  <ProjectCard project={project} index={index + 1} />
                </div>
              </ScrollReveal>
            ))
          ) : (
            <div className="work-empty">
              <p className="eyebrow">A CONSIDERED SELECTION</p>
              <h3>Good work deserves the full story.</h3>
              <p>Project details are being prepared for publication.</p>
            </div>
          )}
        </div>
        <p className="archive-note mono">
          FROM THE PORTFOLIO ARCHIVE / Original website designs. Detailed
          engineering case studies to follow.
        </p>
      </Container>
    </section>
  );
}
