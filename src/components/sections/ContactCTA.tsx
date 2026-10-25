import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { profile } from "@/content/profile";
export function ContactCTA() {
  return (
    <section
      id="contact"
      className="contact-cta homepage-section"
      aria-labelledby="contact-heading"
    >
      <Container>
        <ScrollReveal>
          <p className="eyebrow" data-reveal>
            06 / LET&apos;S CONNECT
          </p>
          <h2 id="contact-heading" data-reveal>
            <Link href="/contact">
              Have something
              <br />
              in mind? <span>Let&apos;s talk.</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </h2>
          <div className="contact-cta-bottom" data-reveal>
            <p>
              Whether you&apos;re building a product, exploring a technical
              collaboration or looking to connect, I&apos;m always open to
              thoughtful conversations and interesting challenges.
            </p>
            <div>
              <Button href="/contact">Start a Conversation</Button>
              <TextLink href={profile.linkedin} external>
                Connect on LinkedIn
              </TextLink>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
