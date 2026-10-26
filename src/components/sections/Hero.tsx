import { HeroBackground } from "@/components/backgrounds/HeroBackground";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { Button } from "@/components/ui/Button";
import { profile } from "@/content/profile";
export function Hero() {
  return (
    <div className="hero-shell">
      <section className="hero dark-hero" aria-labelledby="hero-label">
        <HeroBackground />
        <ScrollReveal entrance className="container hero-content">
          <div className="hero-topline" data-reveal>
            <p id="hero-label" className="eyebrow">
              <span className="status-dot" />
              SAMUEL EPODOI <span className="eyebrow-dash">—</span> SOFTWARE
              ENGINEER
            </p>
          </div>
          <HeroHeadline />
          <div className="hero-bottom">
            <div className="hero-description" data-reveal>
              <p>{profile.introduction}</p>
              <div className="hero-ctas">
                <Button href="/work">Explore My Work</Button>
                <Button href="/contact" secondary>
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
      <div className="hero-section-bridge" aria-hidden="true">
        <span className="hero-bridge-line" />
      </div>
    </div>
  );
}
