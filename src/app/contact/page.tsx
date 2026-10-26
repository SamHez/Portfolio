import { pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/ui/StructuredData";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Mail, Phone } from "lucide-react";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/content/profile";
export const metadata = pageMetadata("/contact");
export default function Contact() {
  return (
    <>
      <StructuredData path="/contact" />
      <PageHero
        eyebrow="CONTACT / COLLABORATION"
        title="LET’S CONNECT"
        description="Have a project, opportunity or idea worth exploring? Get in Touch."
      />
      <Container>
        <section
          className="contact-layout content-section"
          aria-labelledby="contact-intro-heading"
        >
          <div className="contact-introduction">
            <p className="eyebrow">LET’S CONNECT</p>
            <h2 id="contact-intro-heading" className="editorial-heading">
              Discuss a project or collaboration.
            </h2>
            <p className="body-copy">
              For project enquiries, professional opportunities or collaboration,
              contact me by email or phone and I will respond within 1hr.
            </p>
            <SocialLinks className="contact-social-links" />
          </div>
          <address
            className="contact-methods"
            aria-label="Direct contact details"
          >
            <a href={`mailto:${profile.email}`} className="contact-method">
              <span className="contact-method-label">
                <Mail size={18} aria-hidden="true" /> Email
              </span>
              <span className="contact-method-value">{profile.email}</span>
            </a>
            <a href={`tel:${profile.phone}`} className="contact-method">
              <span className="contact-method-label">
                <Phone size={18} aria-hidden="true" /> Phone
              </span>
              <span className="contact-method-value">{profile.phone}</span>
            </a>
          </address>
        </section>
      </Container>
    </>
  );
}
