import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Expertise } from "@/components/sections/Expertise";
import { RecognitionPreview } from "@/components/sections/RecognitionPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";
export default function Home() {
  return (
    <>
      <Hero />
      <div id="explore">
        <AboutPreview />
      </div>
      <FeaturedWork />
      <Expertise />
      <RecognitionPreview />
      <ContactCTA />
    </>
  );
}
