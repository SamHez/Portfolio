import Image from "next/image";
import { TextLink } from "./TextLink";
import type { Project } from "@/content/projects";
export function ProjectCard({
  project,
  featured = false,
  index = 1,
}: {
  project: Project;
  featured?: boolean;
  index?: number;
}) {
  if (!project.publicationApproved || project.evidenceStatus !== "verified")
    return null;
  const destination = project.caseStudyUrl || project.externalUrl;
  return (
    <article className={`project-card ${featured ? "project-featured" : ""}`}>
      <div className="project-visual">
        <div className="browser-bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <i>PORTFOLIO ARCHIVE / {String(index).padStart(2, "0")}</i>
        </div>
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.thumbnailAlt || project.title}
            width={1900}
            height={907}
            sizes={
              featured
                ? "(max-width: 800px) 100vw, 70vw"
                : "(max-width: 800px) 100vw, 50vw"
            }
            className="project-image"
          />
        ) : (
          <div className="project-image-placeholder">
            <span className="mono">PRODUCT VISUAL / TO BE ADDED</span>
          </div>
        )}
      </div>
      <div className="project-copy">
        <p className="eyebrow">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        {project.role && (
          <p className="project-role">
            <span>Contribution</span>
            {project.role}
          </p>
        )}
        {project.technologies.length > 0 && (
          <ul className="technology-list" aria-label="Technologies">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        )}
        <div className="project-card-foot">
          <span className="mono">
            {project.projectStatus || "ARCHIVED WEBSITE DESIGN"}
          </span>
          {destination && (
            <TextLink
              href={destination}
              external={Boolean(project.externalUrl && !project.caseStudyUrl)}
            >
              View Project<span className="sr-only">: {project.title}</span>
            </TextLink>
          )}
        </div>
      </div>
    </article>
  );
}
