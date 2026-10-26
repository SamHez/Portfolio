import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
export function ContactCTA() {
  return (
    <section
      className="contact-cta compact-connect"
      aria-labelledby="connect-heading"
    >
      <Container>
        <ScrollReveal className="connect-layout">
          <div data-reveal>
            <h2 id="connect-heading">Let’s connect.</h2>
          </div>
          <div data-reveal>
            <Button href="/contact">Get in touch</Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
