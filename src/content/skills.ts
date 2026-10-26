export interface Capability {
  name: string;
  approved: boolean;
  evidence?: string;
  icon?: string;
  monogram?: string;
}
export interface SkillGroup {
  id: string;
  number: string;
  title: string;
  description: string;
  skills: readonly Capability[];
}
const skill = (name: string, icon?: string, monogram?: string): Capability => ({
  name,
  icon,
  monogram,
  approved: true,
  evidence: "User-approved expertise and tools for the portfolio refinement.",
});
export const skillGroups: readonly SkillGroup[] = [
  {
    id: "engineering",
    number: "01",
    title: "Software Engineering",
    description: "Responsive interfaces and the systems behind them.",
    skills: [
      skill("React", "react"),
      skill("JavaScript", "javascript"),
      skill("PHP / Laravel", "laravel"),
      skill("Python / Django & Flask", "python"),
      skill("Node.js", "nodedotjs"),
    ],
  },
  {
    id: "design",
    number: "02",
    title: "Product & Interface Design",
    description: "From the first idea to an intuitive experience.",
    skills: [
      skill("Figma", "figma"),
      skill("Interface Design", undefined, "UI"),
      skill("User Experience", undefined, "UX"),
      skill("Design Systems", undefined, "DS"),
      skill("Prototyping", undefined, "PR"),
    ],
  },
  {
    id: "creative",
    number: "03",
    title: "Motion & Graphic Design",
    description: "Visual identities, compelling stories and movement.",
    skills: [
      skill("Photoshop", undefined, "Ps"),
      skill("Illustrator", undefined, "Ai"),
      skill("Premiere Pro", undefined, "Pr"),
      skill("After Effects", undefined, "Ae"),
    ],
  },
];
