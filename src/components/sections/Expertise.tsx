import { Container } from "@/components/ui/Container";
import { CapabilityGroup } from "@/components/ui/CapabilityGroup";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CapabilityReveal } from "@/components/motion/CapabilityReveal";
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
          <div className="expertise-top centered-section-heading" data-reveal>
            <p className="eyebrow">04 / WHAT I BRING</p>
            <h2 id="expertise-heading">EXPERTISE & CAPABILITIES</h2>
            <p className="section-description">
              Engineering, design and motion — working together to turn ideas
              into thoughtful digital experiences.
            </p>
          </div>
        </ScrollReveal>
        <CapabilityReveal>
          {skillGroups.map((group) => (
            <CapabilityGroup key={group.id} group={group} />
          ))}
        </CapabilityReveal>
      </Container>
    </section>
  );
}
