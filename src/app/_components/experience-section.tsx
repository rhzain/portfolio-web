import { experienceGroups } from "@/content/portfolio";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="document-section experience"
      aria-labelledby="experience-title"
    >
      <div className="experience-heading">
        <h2 id="experience-title">Experience</h2>
        <p>Selected engineering roles and structured technical programs.</p>
      </div>

      <div className="experience-groups">
        {experienceGroups.map((group) => (
          <section
            className="experience-group"
            aria-labelledby={`experience-${group.id}`}
            key={group.id}
          >
            <h3 className="experience-group-title" id={`experience-${group.id}`}>
              <span>{group.label}</span>
              <span aria-label={`${group.entries.length} entries`}>
                / {String(group.entries.length).padStart(2, "0")}
              </span>
            </h3>

            <ol className="timeline">
              {group.entries.map((item) => (
                <li key={`${item.period}-${item.role}`}>
                  <div className="timeline-marker" aria-hidden="true" />
                  <div className="timeline-copy">
                    <h4>{item.role}</h4>
                    <p className="timeline-organization">
                      {item.organization} · {item.location}
                    </p>
                    <p className="timeline-summary">{item.summary}</p>

                    {item.details ? (
                      <details className="timeline-details">
                        <summary>More details</summary>
                        <ul>
                          {item.details.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      </details>
                    ) : null}
                  </div>
                  <span className="timeline-period">{item.period}</span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </section>
  );
}
