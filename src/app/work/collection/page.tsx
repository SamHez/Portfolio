import { projectMetadata } from "@/lib/project-metadata";
import { EmbeddedProjects } from "@/components/work/EmbeddedProjects";
import { ProjectCarousel } from "@/components/work/ProjectCarousel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getPublishedProjects, getWebProjects } from "@/content/projects";
export const metadata = projectMetadata;
export default function Collection() {
  const projects = getPublishedProjects();
  const rows = [
    {
      label: "Web Applications & Systems",
      items: getWebProjects(),
    },
    {
      label: "Graphics & Motion Design",
      items: projects.filter((project) => project.discipline === "creative"),
    },
  ];
  return (
    <EmbeddedProjects title="Project collection">
      <div className="project-row-stack">
        {rows.map(({ items, label }) => (
          <section key={label} aria-label={label}>
            <ProjectCarousel label={label}>
              {items.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={project.order}
                  embedded
                />
              ))}
            </ProjectCarousel>
          </section>
        ))}
      </div>
    </EmbeddedProjects>
  );
}
