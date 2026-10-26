import { projectMetadata } from "@/lib/project-metadata";
import { EmbeddedProjects } from "@/components/work/EmbeddedProjects";
import { ClientLogoMarquee } from "@/components/sections/ClientLogoMarquee";
export const metadata = projectMetadata;
export default function Clients() {
  return (
    <EmbeddedProjects title="Client logos">
      <ClientLogoMarquee />
    </EmbeddedProjects>
  );
}
