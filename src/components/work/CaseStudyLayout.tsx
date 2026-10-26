import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { ContactCTA } from "@/components/sections/ContactCTA";
import type { Project } from "@/content/projects";
export function CaseStudyLayout({
  project,
  next,
}: {
  project: Project;
  next?: Project;
}) {
  return (
    <div data-nosnippet="" className={`case-study-page project-${project.id}`}>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        height="compact"
        breadcrumb={{ label: "All work", href: "/work" }}
      />
      <Container>
        <section className="case-overview" aria-label="Project overview">
          <div className="case-overview-copy">
            <p className="eyebrow">
              PROJECT / {String(project.order).padStart(2, "0")}
            </p>
            <h2>
              {project.video
                ? "Motion in focus."
                : project.sample
                  ? "Design for community awareness."
                  : "Project overview."}
            </h2>
            <p className="body-copy">
              {project.description ||
                `${project.contribution} for ${project.title}.`}
            </p>
            <dl className="case-facts">
              <div>
                <dt>Contribution</dt>
                <dd>{project.contribution}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{project.category}</dd>
              </div>
              {project.year && (
                <div>
                  <dt>Year</dt>
                  <dd>{project.year}</dd>
                </div>
              )}
            </dl>
            {project.externalUrl && (
              <TextLink href={project.externalUrl} external>
                Visit project
              </TextLink>
            )}
          </div>
          <div className="case-media-panel">
            {project.video ? (
              <figure className="case-motion-sample">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={`${project.title} motion design showcase`}
                >
                  <source src={project.video} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
                <figcaption className="mono">
                  MOTION SHOWCASE / {project.title}
                </figcaption>
                <a
                  className="post-source-link"
                  href={project.video}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open video
                </a>
              </figure>
            ) : project.sample ? (
              <figure className="case-design-sample">
                <Image
                  src={project.sample.src}
                  alt={project.sample.alt}
                  width={project.sample.width}
                  height={project.sample.height}
                  sizes="(max-width: 800px) 90vw, 560px"
                />
                <figcaption className="mono">
                  {project.sample.caption}
                </figcaption>
              </figure>
            ) : project.thumbnail ? (
              <figure className="case-image">
                <Image
                  src={project.thumbnail}
                  alt={project.thumbnailAlt || project.title}
                  width={project.thumbnailWidth || 2874}
                  height={project.thumbnailHeight || 1450}
                  sizes="(max-width: 800px) 90vw, 60vw"
                />
                <figcaption className="mono">PROJECT PREVIEW</figcaption>
              </figure>
            ) : (
              <div
                className="project-artwork case-illustration"
                aria-hidden="true"
              >
                <div className="project-artwork-shape" />
                <div className="project-artwork-caption">
                  <span className="contribution-badge">
                    {project.contribution}
                  </span>
                  <span className="project-wordmark">{project.title}</span>
                </div>
              </div>
            )}
          </div>
        </section>
        {project.resources && (
          <section
            className="project-resources"
            aria-labelledby="resources-heading"
          >
            <div>
              <p className="eyebrow">
                RESOURCE SET / {project.resources.length} ITEMS
              </p>
              <h2 id="resources-heading">Resources I worked on</h2>
            </div>
            <ul>
              {project.resources.map((resource) => (
                <li key={resource}>{resource}</li>
              ))}
            </ul>
          </section>
        )}
        <div className="case-navigation">
          <TextLink href="/work">Back to all work</TextLink>
          {next && (
            <TextLink href={`/work/${next.slug}`}>Next project</TextLink>
          )}
        </div>
      </Container>
      <ContactCTA />
    </div>
  );
}
