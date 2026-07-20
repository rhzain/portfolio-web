import { projects } from "@/content/portfolio";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="document-section projects"
      aria-labelledby="projects-title"
    >
      <div className="projects-heading">
        <h2 id="projects-title">Selected projects</h2>
        <p className="content-slot">
          Replace these entries with three or four projects that show your strongest, most
          relevant work.
        </p>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article
            className={`project-card${project.featured ? " project-card-featured" : ""}`}
            key={project.index}
          >
            <figure className="project-media">
              <span>{project.index} / Project capture</span>
              <figcaption>Add a real image or product capture</figcaption>
            </figure>
            <div className="project-copy">
              <div>
                <span className="project-index" aria-hidden="true">
                  {project.index}
                </span>
                <h3 className="content-slot">{project.title}</h3>
              </div>
              <p className="project-purpose content-slot">{project.purpose}</p>
              <dl className="project-meta">
                <div>
                  <dt>Contribution</dt>
                  <dd className="content-slot">{project.contribution}</dd>
                </div>
                <div>
                  <dt>Built with</dt>
                  <dd className="content-slot">{project.tools}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
