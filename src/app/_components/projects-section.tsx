import { projects } from "@/content/portfolio";
import { SectionMarker } from "@/app/_components/section-marker";

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article
      className={`project-card${project.featured ? " project-card-featured" : ""}`}
    >
      <figure className="project-media">
        {project.image ? (
          <img src={project.image} alt={`Screenshot of ${project.title}`} loading="lazy" />
        ) : (
          <>
            <span>{project.index} / Project capture</span>
            <figcaption>Add a real image or product capture</figcaption>
          </>
        )}
      </figure>
      <div className="project-copy">
        <div className="project-header">
          <span className="project-index" aria-hidden="true">
            {project.index}
          </span>
          <div className="project-title-row">
            <h3>{project.title}</h3>
            {project.year && <span className="project-year">{project.year}</span>}
          </div>
        </div>
        <p className="project-purpose">{project.purpose}</p>
        <dl className="project-meta">
          <div>
            <dt>Contribution</dt>
            <dd>{project.contribution}</dd>
          </div>
          <div>
            <dt>Built with</dt>
            <dd>{project.tools}</dd>
          </div>
        </dl>
        {(project.github || project.link) && (
          <div className="project-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                Visit ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="document-section projects"
      aria-labelledby="projects-title"
    >
      <SectionMarker index={4} />
        <div className="projects-heading">
          <h2 id="projects-title">Projects</h2>
          <p>Here are some of the projects I’ve worked on. Each one has expanded my knowledge and shaped how I approach building practical solutions.
          </p>
        </div>

        <div className="project-grid">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.index} project={project} />
          ))}
        </div>

        <details className="project-index-list">
          <summary>
            View all projects <span>/{String(projects.length).padStart(2, "0")}</span>
          </summary>
          <div className="project-grid">
            {projects.slice(3).map((project) => (
              <ProjectCard key={project.index} project={project} />
            ))}
          </div>
        </details>
      </section>
  );
}
