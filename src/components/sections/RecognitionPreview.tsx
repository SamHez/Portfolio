import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { RecognitionCard } from "@/components/ui/RecognitionCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { verifiedRecognition } from "@/content/recognition";
export function RecognitionPreview() {
  const featured = verifiedRecognition.find((item) => item.featured);
  return (
    <section
      id="recognition"
      className="recognition-section homepage-section"
      aria-labelledby="recognition-heading"
    >
      <Container>
        <ScrollReveal>
          <div className="recognition-top" data-reveal>
            <p className="eyebrow">05 / RECOGNITION & LEADERSHIP</p>
            <h2 id="recognition-heading" className="editorial-heading">
              Built through curiosity.
              <br />
              <span>Shaped by experience.</span>
            </h2>
            <p className="section-description">
              From early engagement with developer communities to building
              practical technology solutions, my journey has been shaped by
              initiative, continuous learning and opportunities to share ideas
              with others.
            </p>
          </div>
        </ScrollReveal>
        {featured && (
          <ScrollReveal>
            <div className="recognition-feature" data-reveal>
              <figure className="archive-figure">
                <div className="archive-image" data-image-reveal>
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={featured.imageAlt || featured.title}
                      fill
                      sizes="(max-width: 800px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="archive-photo-placeholder">
                      <div className="archive-cross" aria-hidden="true" />
                      <span className="archive-large-year" aria-hidden="true">
                        2018
                      </span>
                      <div className="archive-placeholder-caption">
                        <span className="mono">CONFERENCE ARCHIVE / 001</span>
                        <p>
                          One stage.
                          <br />A shared curiosity.
                        </p>
                        <span className="mono">
                          ARCHIVAL PHOTOGRAPH TO BE ADDED
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <figcaption className="mono">
                  RUBYCONF KENYA / 2018 <span>DEVELOPER COMMUNITY</span>
                </figcaption>
              </figure>
              <div className="recognition-narrative">
                <p className="eyebrow">{featured.category}</p>
                <h3>
                  Sharing the journey.
                  <br />
                  Joining the conversation.
                </h3>
                <p className="recognition-event">{featured.title} — 2018</p>
                <p className="recognition-description">
                  {featured.description}
                </p>
                {featured.sourceUrl && (
                  <TextLink href={featured.sourceUrl} external>
                    {featured.sourceTitle}
                  </TextLink>
                )}
                <p className="archive-source-note">
                  An archival reference, preserved from the original portfolio.
                </p>
              </div>
            </div>
          </ScrollReveal>
        )}
        <div className="recognition-supporting">
          {verifiedRecognition
            .filter((item) => !item.featured)
            .map((item) => (
              <ScrollReveal key={item.id}>
                <div data-reveal>
                  <RecognitionCard item={item} />
                </div>
              </ScrollReveal>
            ))}
        </div>
        <div className="recognition-end">
          <p className="mono">
            CONTINUOUS LEARNING. SHARED IDEAS. FORWARD MOTION.
          </p>
          <TextLink href="/recognition">Explore My Journey</TextLink>
        </div>
      </Container>
    </section>
  );
}
