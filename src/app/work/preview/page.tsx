import { ProjectCarousel } from "@/components/work/ProjectCarousel";
import { projectMetadata } from "@/lib/project-metadata";
import { EmbeddedProjects } from "@/components/work/EmbeddedProjects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getHomepageProjects } from "@/content/projects";
export const metadata = projectMetadata;
export default function Preview() {
  return (
    <EmbeddedProjects>
      <ProjectCarousel viewAllLink>
        {getHomepageProjects().map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index + 1}
            embedded
          />
        ))}
      </ProjectCarousel>
    </EmbeddedProjects>
  );
}
