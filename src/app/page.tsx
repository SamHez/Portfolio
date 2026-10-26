import { pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/ui/StructuredData";
import { ClientHighlights } from "@/components/sections/ClientHighlights";
import { Container } from "@/components/ui/Container";
import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Expertise } from "@/components/sections/Expertise";
import { RecognitionPreview } from "@/components/sections/RecognitionPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";
export const metadata = pageMetadata("/");
export default function Home() {
  return (
    <>
      <StructuredData path="/" />
      <Hero />
      <div id="explore">
        <AboutPreview />
      </div>
      <section className="work-signals-section">
        <Container>
          <ClientHighlights />
        </Container>
      </section>
      <FeaturedWork />
      <Expertise />
      <RecognitionPreview />
      <ContactCTA />
    </>
  );
}
