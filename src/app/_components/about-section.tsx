import { about } from "@/content/portfolio";
import { SectionMarker } from "@/app/_components/section-marker";

export function AboutSection() {
  return (
    <section id="about" className="document-section about" aria-labelledby="about-title">
      <SectionMarker index={1} />
      <h2 id="about-title">About</h2>
      <div className="about-copy">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>

      <dl className="about-education">
        <div>
          <dt>Education</dt>
          <dd>
            <strong>{about.education.degree}</strong>
            <span>{about.education.institution}</span>
          </dd>
          <dd className="about-education-period">{about.education.period}</dd>
        </div>
      </dl>
    </section>
  );
}
