import { projectMetadata } from "@/lib/project-metadata";
import { EmbeddedProjects } from "@/components/work/EmbeddedProjects";
import { ClientHighlights } from "@/components/sections/ClientHighlights";
export const metadata = projectMetadata;
export default function Partners() {
  return (
    <EmbeddedProjects title="Work at a glance">
      <ClientHighlights />
    </EmbeddedProjects>
  );
}
