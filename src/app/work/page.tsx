import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
export const metadata: Metadata = {
  title: "Work",
  alternates: { canonical: "/work" },
};
export default function Page() {
  return (
    <section className="placeholder-page container">
      <SectionHeading
        label="03 / SELECTED WORK"
        title="Ideas into experiences."
      />
      <p className="page-intro">
        A considered selection of software and digital products. Project details
        and case studies are coming soon.
      </p>
      <div className="page-actions">
        <Button href="/contact">Start a conversation</Button>
        <Button href="/" secondary>
          Back to home
        </Button>
      </div>
      <p className="mono page-footnote">MORE TO COME / PORTFOLIO 2.0</p>
    </section>
  );
}
