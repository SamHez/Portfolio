import { pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/ui/StructuredData";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageHero } from "@/components/layout/PageHero";
import { RecognitionPreview } from "@/components/sections/RecognitionPreview";
export const metadata = pageMetadata("/recognition");
export default function Recognition() {
  return (
    <>
      <StructuredData path="/recognition" />
      <PageHero
        eyebrow="EXPERIENCES / COMMUNITY"
        title="RECOGNITION / LEADERSHIP"
        description="A collection of experiences, conversations and moments that have helped shape my professional journey."
      />
      <RecognitionPreview detail />
      <ContactCTA />
    </>
  );
}
