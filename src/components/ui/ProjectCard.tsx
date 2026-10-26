import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
export function ProjectCard({
  project,
  index = 1,
  embedded = false,
}: {
  project: Project;
  index?: number;
  embedded?: boolean;
}) {
  if (!project.publicationApproved || project.evidenceStatus !== "verified")
    return null;
  return (
    <article className={`project-card project-${project.id}`}>
      <Link
        prefetch={false}
        className="project-card-link"
        href={project.caseStudyUrl || "/work"}
        target={embedded ? "_top" : undefined}
        aria-label={`View project: ${project.title}`}
        aria-describedby={`contribution-${project.id}`}
      >
        <div className="project-artwork">
          <span className="mono project-artwork-label" aria-hidden="true">
            SELECTED PROJECT / {String(index).padStart(2, "0")}
          </span>
          <div className="project-artwork-shape" aria-hidden="true" />
          <div data-nosnippet="" className="project-artwork-caption">
            <div className="project-contribution">
              <span
                className="contribution-badge"
                id={`contribution-${project.id}`}
              >
                {project.contribution}
              </span>
              {project.year && <span className="mono">{project.year}</span>}
            </div>
            <span className="project-wordmark" aria-hidden="true">
              {project.title}
            </span>
          </div>
        </div>
        <div data-nosnippet="" className="project-copy">
          <p className="eyebrow">{project.category}</p>
          <h2>{project.title}</h2>
          <div className="project-card-foot">
            <span className="mono">
              {String(index).padStart(2, "0")} / SELECTED WORK
            </span>
            <span className="project-view">
              View project <ArrowRight size={16} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
