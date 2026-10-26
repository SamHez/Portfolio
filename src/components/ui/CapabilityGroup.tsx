import type { SkillGroup } from "@/content/skills";
import { technologyIcons } from "@/content/technology-icons";
export function CapabilityGroup({ group }: { group: SkillGroup }) {
  return (
    <article className={`capability-group capability-${group.id}`}>
      <div className="capability-card-top">
        <span className="mono">{group.number} / EXPERTISE</span>
        <span className="capability-orbit" aria-hidden="true" />
      </div>
      <h3>
        {group.id === "engineering" ? (
          <>
            Software
            <br />
            Engineering
          </>
        ) : (
          group.title
        )}
      </h3>
      <p>{group.description}</p>
      <ul>
        {group.skills
          .filter((skill) => skill.approved)
          .map((skill) => {
            const icon = skill.icon ? technologyIcons[skill.icon] : undefined;
            return (
              <li key={skill.name}>
                <span
                  className={`skill-logo ${skill.monogram ? "skill-monogram" : ""}`}
                  aria-hidden="true"
                >
                  {icon ? (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d={icon} />
                    </svg>
                  ) : (
                    skill.monogram
                  )}
                </span>
                <span>{skill.name}</span>
              </li>
            );
          })}
      </ul>
    </article>
  );
}
