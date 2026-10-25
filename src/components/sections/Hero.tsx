import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HeroMedia } from "./HeroMedia";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { RevealText } from "@/components/motion/RevealText";
import { Button } from "@/components/ui/Button";
import { profile } from "@/content/profile";
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-label">
      <HeroMedia />
      <ScrollReveal entrance className="container hero-content">
        <div className="hero-topline" data-reveal>
          <p id="hero-label" className="eyebrow">
            <span className="status-dot" />
            SAMUEL EPODOI <span className="eyebrow-dash">—</span> SOFTWARE
            ENGINEER
          </p>
        </div>
        <RevealText
          lines={["Engineering", "digital experiences", "with purpose."]}
        />
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
        <div className="hero-foot" data-reveal>
          <a href="#explore" className="scroll-link mono">
            <ArrowDown size={15} /> SCROLL TO EXPLORE
          </a>
          <span className="mono hero-discipline">
            SOFTWARE × DESIGN × PURPOSE
          </span>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-github mono"
          >
            GITHUB <ArrowUpRight size={14} />
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
