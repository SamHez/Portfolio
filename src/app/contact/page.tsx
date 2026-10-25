import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/content/profile";
export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
};
export default function Contact() {
  return (
    <section className="placeholder-page contact-page container">
      <SectionHeading
        label="06 / GET IN TOUCH"
        title="Let’s build something meaningful."
      />
      <p className="page-intro">
        A new idea, an engineering challenge, or a conversation worth having.
        I’d love to hear from you.
      </p>
      <a className="email-link" href={`mailto:${profile.email}`}>
        {profile.email}
        <ArrowUpRight />
      </a>
      <div className="contact-socials">
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub <ArrowUpRight size={16} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
