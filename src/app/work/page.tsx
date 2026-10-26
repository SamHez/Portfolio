import { pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/ui/StructuredData";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ProjectShowcase } from "@/components/work/ProjectShowcase";

export const metadata = pageMetadata("/work");
export default function Work() {
  return (
    <>
      <StructuredData path="/work" />
      <PageHero
        eyebrow="WORK / PROJECTS"
        title="DIGITAL EXPERIENCES"
        description="An exploration of digital products, technical challenges and thoughtful solutions."
      />
      <Container>
        <section
          className="work-archive content-section"
          data-nosnippet=""
          aria-label="Project collection"
        >
          <ProjectShowcase rows={2} />
        </section>
      </Container>
      <ContactCTA />
    </>
  );
}
