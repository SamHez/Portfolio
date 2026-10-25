import { Container } from "@/components/ui/Container";
import { CapabilityGroup } from "@/components/ui/CapabilityGroup";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { skillGroups } from "@/content/skills";
export function Expertise() {
  return (
    <section
      id="expertise"
      className="expertise-section homepage-section"
      aria-labelledby="expertise-heading"
    >
      <Container>
        <ScrollReveal>
          <div className="expertise-top" data-reveal>
            <p className="eyebrow">04 / EXPERTISE & CAPABILITIES</p>
            <h2 id="expertise-heading" className="editorial-heading">
              The tools evolve.
              <br />
              The thinking remains.
            </h2>
            <p className="section-description">
              A multidisciplinary approach to software engineering, combining
              technical implementation, user-centered design and systems
              thinking.
            </p>
          </div>
        </ScrollReveal>
        <div className="capability-grid">
          {skillGroups.map((group) => (
            <ScrollReveal key={group.id}>
              <div data-reveal>
                <CapabilityGroup group={group} />
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div className="expertise-principle" data-reveal>
            <span className="mono">A PRINCIPLE, NOT A STACK</span>
            <p>
              I focus on choosing the right technology for the problem, not
              forcing every problem into the same stack.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
