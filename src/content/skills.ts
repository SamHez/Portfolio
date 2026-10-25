export interface Capability {
  name: string;
  approved: boolean;
  evidence?: string;
}
export interface SkillGroup {
  id: string;
  number: string;
  title: string;
  description: string;
  skills: readonly Capability[];
}
const confirmed = (name: string, evidence: string): Capability => ({
  name,
  approved: true,
  evidence,
});
const pending = (name: string): Capability => ({ name, approved: false });
export const skillGroups: readonly SkillGroup[] = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend Engineering",
    description: "Clear interfaces. Considered implementation.",
    skills: [
      ...[
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "HTML / CSS",
        "Responsive Interfaces",
        "UI Architecture",
      ].map((name) =>
        confirmed(name, "Implemented in this portfolio’s App Router frontend."),
      ),
    ],
  },
  {
    id: "application",
    number: "02",
    title: "Backend & Application Development",
    description: "Structure that makes room for what comes next.",
    skills: [
      confirmed(
        "Application Architecture",
        "Typed content models, modular server/client boundaries and reusable components in this repository.",
      ),
      ...[
        "Node.js",
        "Python",
        "PHP / Laravel",
        "REST API Integration",
        "Relational Databases",
      ].map(pending),
    ],
  },
  {
    id: "design",
    number: "03",
    title: "Product & Interface Design",
    description: "Making complexity feel intuitive.",
    skills: [
      ...[
        "Interface Design",
        "Design Systems",
        "Accessibility",
        "Interaction Design",
      ].map((name) =>
        confirmed(
          name,
          "Responsive theme tokens, semantic components, keyboard navigation and reduced-motion support in this portfolio.",
        ),
      ),
      pending("User Experience"),
      pending("Prototyping"),
    ],
  },
  {
    id: "delivery",
    number: "04",
    title: "Engineering & Delivery",
    description: "Care in the details, from source to screen.",
    skills: [
      confirmed("Git / GitHub", "Existing versioned portfolio repository."),
      confirmed(
        "Performance Optimization",
        "Conditional video loading, optimized fonts and responsive image sizes.",
      ),
      pending("Deployment Workflows"),
      pending("Cloud Infrastructure"),
      pending("Technical Problem Solving"),
      pending("Cross-functional Collaboration"),
    ],
  },
];
