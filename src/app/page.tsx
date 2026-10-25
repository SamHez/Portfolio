import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
const sections = [
  {
    id: "about",
    number: "02",
    title: "The thinking behind the work",
    label: "About & philosophy",
    href: "/about",
  },
  {
    id: "work",
    number: "03",
    title: "Ideas, built with intention",
    label: "Selected work",
    href: "/work",
  },
  {
    id: "expertise",
    number: "04",
    title: "Engineering meets design",
    label: "Expertise & capabilities",
    href: "/about#expertise",
  },
  {
    id: "recognition",
    number: "05",
    title: "Initiative beyond the screen",
    label: "Recognition & leadership",
    href: "/recognition",
  },
];
export default function Home() {
  return (
    <>
      <Hero />
      <section
        id="explore"
        className="explore-section container"
        aria-labelledby="explore-heading"
      >
        <ScrollReveal>
          <div className="section-top" data-reveal>
            <p className="eyebrow">A CLOSER LOOK</p>
            <h2 id="explore-heading">
              Good work begins
              <br />
              with a thoughtful approach.
            </h2>
            <p className="section-note">
              A portfolio in progress.
              <br />
              More of the story, coming soon.
            </p>
          </div>
          <div className="section-index">
            {sections.map((item) => (
              <Link
                id={item.id}
                data-reveal
                href={item.href}
                className="index-row"
                key={item.id}
              >
                <span className="mono row-number">{item.number}</span>
                <span className="row-label">{item.label}</span>
                <span className="row-title">{item.title}</span>
                <ArrowUpRight size={22} />
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>
      <section id="contact" className="home-contact container">
        <p className="eyebrow">06 / START A CONVERSATION</p>
        <Link href="/contact">
          Have something
          <br />
          in mind? <span>Let’s talk.</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
