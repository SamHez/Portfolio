import type { SkillGroup } from "@/content/skills";
export function CapabilityGroup({ group }: { group: SkillGroup }) {
  const skills = group.skills.filter((skill) => skill.approved);
  if (!skills.length) return null;
  return (
    <article className="capability-group">
      <span className="mono capability-number">{group.number}</span>
      <h3>{group.title}</h3>
      <p>{group.description}</p>
      <ul>
        {skills.map((skill) => (
          <li key={skill.name}>{skill.name}</li>
        ))}
      </ul>
    </article>
  );
}
