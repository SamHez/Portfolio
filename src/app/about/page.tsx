import { pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/ui/StructuredData";
import { SocialLinks } from "@/components/ui/SocialLinks";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Expertise } from "@/components/sections/Expertise";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { mission } from "@/content/mission";
import { ResumeViewer } from "@/components/ui/ResumeViewer";
import { principles } from "@/content/about";
import { verifiedRecognition } from "@/content/recognition";
export const metadata = pageMetadata("/about");
export default function About() {
  return (
    <>
      <StructuredData path="/about" />
      <PageHero
        eyebrow="SAMUEL EPODOI"
        title="ABOUT ME"
        description="A closer look at the thinking, experiences and principles that shape my approach to technology."
      />
      <Container>
        <section
          className="about-introduction content-section"
          data-nosnippet=""
          aria-labelledby="introduction-heading"
        >
          <ScrollReveal className="about-portrait-column">
            <figure className="about-page-portrait" data-reveal>
              <Image
                src="/images/recognition/rubyconf-kenya-2018.jpg"
                alt="Samuel speaking at the conference hosted at Riara University."
                width={768}
                height={1024}
                sizes="(max-width: 560px) 220px, 280px"
              />
              <figcaption className="mono">
                2018 Keynote Speech · “At 13, My Journey as a Software Developer”
              </figcaption>
            </figure>
            <ResumeViewer />
          </ScrollReveal>
          <ScrollReveal>
            <div className="about-intro-copy" data-reveal>
              <p className="eyebrow">
                SOFTWARE ENGINEER / CREATIVE TECHNOLOGIST
              </p>
              <h2 id="introduction-heading" className="editorial-heading">
                Building practical solutions for growing communities.
              </h2>
              <div className="prose">
                <p>
                  I’m Samuel Epodoi. I bring together software engineering,
                  product thinking and design to build useful digital
                  experiences for people and businesses. I’m interested in how
                  technology can simplify complex tasks, connect people with
                  services and help a good idea become something people can use
                  with confidence.
                </p>
                <p>
                  My work spans web applications, interface design and visual
                  communication. I approach each project by understanding the
                  people it serves and the problem it needs to solve, then
                  balancing clear design with reliable implementation. I value
                  close collaboration, honest feedback and the care it takes to
                  build something that remains useful as a business grows.
                </p>
              </div>
              <SocialLinks className="about-social-links" />
            </div>
          </ScrollReveal>
        </section>
        <section
          data-nosnippet=""
          className="mission-section"
          aria-labelledby="mission-heading"
        >
          <p className="eyebrow">MY MISSION</p>
          <div>
            <h2 id="mission-heading">{mission.title}</h2>
            <p>{mission.statement}</p>
            <div className="mission-path" aria-label="Mission pathway">
              <span>Affordable technology</span>
              <span>Stronger businesses</span>
              <span>More opportunity</span>
            </div>
          </div>
        </section>
        <section
          className="principles-section content-section"
          aria-labelledby="principles-heading"
        >
          <div className="content-section-heading">
            <h2 id="principles-heading" className="editorial-heading">
              My Approach
            </h2>
            <p className="body-copy">
              Clear thinking, considered design and reliable engineering
            </p>
          </div>
          <div className="principle-grid">
            {principles.map((principle, index) => (
              <ScrollReveal key={principle.title}>
                <article data-reveal>
                  <span className="mono">0{index + 1}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </Container>
      <Expertise />
      <Container>
        <section
          className="journey-section content-section"
          data-nosnippet=""
          aria-labelledby="journey-heading"
        >
          <div className="content-section-heading">
            <h2 id="journey-heading" className="editorial-heading">
              A Continuing Journey
            </h2>
          </div>
          <div className="journey-layout">
            <div className="journey-photographs">
              <figure>
                <Image
                  src="/images/recognition/developer-community-session.jpg"
                  alt="Samuel participating in a developer community session."
                  width={1200}
                  height={900}
                  sizes="(max-width: 800px) 90vw, 30vw"
                />
                <figcaption className="mono">
                  LEARNING / SHARED IDEAS
                </figcaption>
              </figure>
              <figure>
                <Image
                  src="/images/recognition/hands-on-coding-session.jpg"
                  alt="Samuel working on a laptop during a hands-on coding session."
                  width={1200}
                  height={800}
                  sizes="(max-width: 800px) 90vw, 30vw"
                />
                <figcaption className="mono">BUILDING / IN PRACTICE</figcaption>
              </figure>
            </div>
            <div className="journey-list">
              {verifiedRecognition.map((item) => (
                <article key={item.id}>
                  <span className="mono">{item.date.slice(0, 4)}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
              <article>
                <span className="mono">2020 & beyond</span>
                <div>
                  <h3>Practical Project Experience</h3>
                  <p>
                    Building digital experiences through software engineering,
                    product thinking and visual design.
                  </p>
                </div>
              </article>
            </div>
          </div>
          <TextLink href="/recognition">
            Explore the recognition archive
          </TextLink>
        </section>
      </Container>
      <ContactCTA />
    </>
  );
}
