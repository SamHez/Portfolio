import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};
export default function Page() {
  return (
    <section className="placeholder-page container">
      <SectionHeading
        label="02 / ABOUT & PHILOSOPHY"
        title="Thoughtful by design."
      />
      <p className="page-intro">
        Software engineering, design thinking, and an entrepreneurial approach
        to meaningful problems. A closer look at my approach is coming soon.
      </p>
      <div id="expertise" className="expertise-placeholder">
        <h2>Engineering, design & technical problem-solving.</h2>
        <p>
          Capabilities and technical context will be added alongside the work.
        </p>
      </div>
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
