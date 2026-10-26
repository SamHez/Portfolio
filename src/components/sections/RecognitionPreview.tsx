import Image from "next/image";
import { RecognitionPosts } from "@/components/recognition/RecognitionPosts";
import { FloatingCollage } from "@/components/recognition/FloatingCollage";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  verifiedRecognition,
  communityPhotography,
} from "@/content/recognition";
export function RecognitionPreview({ detail = false }: { detail?: boolean }) {
  const featured = verifiedRecognition.find((item) => item.featured);
  return (
    <section
      id="recognition"
      data-nosnippet=""
      className={`recognition-section homepage-section ${detail ? "recognition-detail" : "recognition-home"}`}
      aria-labelledby={detail ? undefined : "recognition-heading"}
      aria-label={
        detail ? "Community experiences and recognition posts" : undefined
      }
    >
      <Container>
        {!detail && (
          <ScrollReveal>
            <div
              className="recognition-top centered-section-heading"
              data-reveal
            >
              <p className="eyebrow">05 / PEOPLE & EXPERIENCES</p>
              <h2 id="recognition-heading">RECOGNITION & LEADERSHIP</h2>
              <p className="section-description">
                Sharing ideas, learning alongside others and growing through the
                developer community.
              </p>
            </div>
          </ScrollReveal>
        )}
        <ScrollReveal className="recognition-compact">
          <FloatingCollage>
            {featured?.image && (
              <figure className="collage-main">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt || featured.title}
                  width={768}
                  height={1024}
                  sizes="(max-width: 560px) 210px, 270px"
                />
                <figcaption className="mono">RUBYCONF KENYA / 2018</figcaption>
              </figure>
            )}
            {communityPhotography.map((photo, i) => (
              <figure
                key={photo.image}
                className={`collage-satellite collage-satellite-${i + 1}`}
              >
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 560px) 130px, 185px"
                />
                <figcaption className="mono">
                  {i === 0 ? "SHARED IDEAS" : "HANDS-ON LEARNING"}
                </figcaption>
              </figure>
            ))}
            <span className="collage-note mono" aria-hidden="true">
              ALWAYS LEARNING.
              <br />
              ALWAYS BUILDING.
            </span>
          </FloatingCollage>
          <div className="recognition-compact-copy" data-reveal>
            <p className="eyebrow">COMMUNITY / INITIATIVE / GROWTH</p>
            <h3>
              {detail
                ? "Speaking & Community Engagement"
                : "Experience that connects."}
            </h3>
            <p>{featured?.description}</p>
            {detail && (
              <div className="recognition-story">
                <p>
                  In 2018, I spoke at RubyConf Kenya, hosted at Riara
                  University, sharing “At 13, My Journey as a Software
                  Developer.” It was an opportunity to reflect on learning
                  independently and turning curiosity into practical work.
                </p>
                <p>
                  Those early experiences continue to shape my approach: build
                  useful things, share what I learn and stay open to other
                  perspectives. My work brings together software engineering,
                  design and an interest in how technology can help people and
                  businesses.
                </p>
                <div className="recognition-story-facts">
                  <div>
                    <span className="mono">SPEAKING</span>
                    <span>RubyConf Kenya · 2018</span>
                  </div>
                  <div>
                    <span className="mono">PERSPECTIVE</span>
                    <span>Independent learning & practical work</span>
                  </div>
                </div>
              </div>
            )}
            {!detail && (
              <div className="recognition-mentions">
                {verifiedRecognition.map((item) => (
                  <div key={item.id}>
                    <span className="mono">{item.date.slice(0, 4)}</span>
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            )}
            {!detail && (
              <TextLink href="/recognition">Explore my journey</TextLink>
            )}
          </div>
        </ScrollReveal>
        {detail && <RecognitionPosts />}
      </Container>
    </section>
  );
}
