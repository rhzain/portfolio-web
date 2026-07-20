import { ThemeToggle } from "@/components/motion/theme-toggle";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
];

const identityContacts = [
  { label: "Email", mark: "@", pending: "Add public email address" },
  { label: "GitHub", mark: "GH", pending: "Add GitHub URL" },
  { label: "LinkedIn", mark: "in", pending: "Add LinkedIn URL" },
  { label: "Résumé", mark: "CV", pending: "Add resume URL" },
];

const experienceGroups = [
  {
    id: "roles",
    label: "Roles",
    entries: [
      {
        period: "Feb 2026 — Present",
        role: "Backend Engineer Intern",
        organization: "Teaching and Learning Innovation · Universitas Padjadjaran",
        location: "Jatinangor, Indonesia",
        summary:
          "Built the Laravel 11 REST API and PostgreSQL data model for a question-bank management system.",
        details: [
          "Developed autosave, bulk actions, Word and Excel import/export, and Redis-backed retrieval.",
          "Containerized the stack with Docker Compose and documented API contracts with Swagger/OpenAPI.",
        ],
      },
      {
        period: "Oct 2025 — Present",
        role: "Software Developer",
        organization: "medphoto.booth",
        location: "Remote",
        summary:
          "Co-developed Node.js infrastructure for real-time data ingestion and multi-laptop synchronization.",
        details: [
          "Built image enhancement, GIF generation, and local asset synchronization pipelines with Sharp and Omggif.",
          "Automated media delivery with Nodemailer and SMTP fallbacks.",
        ],
      },
      {
        period: "Feb 2026 — Present",
        role: "Artificial Intelligence Laboratory Assistant",
        organization: "Informatics · Universitas Padjadjaran",
        location: "Jatinangor, Indonesia",
        summary:
          "Supported students through practical AI sessions and managed assignments, assessments, and grading.",
      },
    ],
  },
  {
    id: "programs",
    label: "Programs",
    entries: [
      {
        period: "Feb 2026 — Present",
        role: "AI Engineering Cohort",
        organization: "Coding Camp powered by DBS Foundation",
        location: "Remote",
        summary:
          "Selected for a program focused on machine learning, deep learning, and AI system integration.",
        details: [
          "Developed financial-profile prediction and explored LLM-powered advisory features for the CuanSelor capstone.",
          "Supported model integration through API deployment while collaborating across Data Science and Full-Stack Development.",
        ],
      },
      {
        period: "Feb 2025 — May 2025",
        role: "IoT Engineering Participant",
        organization: "Samsung Innovation Campus · Batch 6",
        location: "Remote",
        summary:
          "Built an ESP32 sensor pipeline that transmitted real-time telemetry over MQTT and HTTP.",
        details: [
          "Designed the MongoDB data layer and built a Flask API with a Streamlit monitoring dashboard.",
          "Ranked first in the Stage 2 evaluation and advanced to Stage 3 among the top 500 national innovators.",
        ],
      },
    ],
  },
];

const stack = [
  {
    label: "Interface",
    tools: "Add the languages, frameworks, and UI tools you use with confidence.",
  },
  {
    label: "Systems",
    tools: "Add the runtime, database, API, and infrastructure tools you know well.",
  },
  {
    label: "Delivery",
    tools: "Add your testing, version control, CI, deployment, and collaboration tools.",
  },
  {
    label: "Practice",
    tools: "Add the product, design, accessibility, or research capabilities relevant to your work.",
  },
];

const projects = [
  {
    index: "01",
    title: "Add your strongest project",
    purpose: "One sentence describing the product, its audience, and the problem it addresses.",
    contribution: "Your role and most important contribution",
    tools: "Primary technologies",
    featured: true,
  },
  {
    index: "02",
    title: "Add a second project",
    purpose: "Explain why this project exists and what makes it worth examining.",
    contribution: "Your role and contribution",
    tools: "Primary technologies",
    featured: false,
  },
  {
    index: "03",
    title: "Add a third project",
    purpose: "Use a different kind of work here to show range without diluting the portfolio.",
    contribution: "Your role and contribution",
    tools: "Primary technologies",
    featured: false,
  },
];

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id}>{children}</h2>;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="utility-shell">
        <nav className="utility-nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Back to top">
            <span className="brand-mark" aria-hidden="true">
              YN
            </span>
            <span className="brand-name">Your Name</span>
          </a>

          <ul className="desktop-nav">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          <details className="mobile-nav">
            <summary>Menu</summary>
            <ul>
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </details>

          <div className="utility-actions">
            <ThemeToggle
              variant="circle-blur"
              start="bottom-up"
              className="theme-toggle"
              iconClassName="theme-toggle-icon"
            />
            <a className="nav-contact" href="#contact">
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main id="main-content" className="site-shell">
        <section id="top" className="identity" aria-labelledby="identity-title">
          <div className="identity-mark" aria-hidden="true">
            YN
          </div>

          <div className="identity-copy">
            <p className="identity-role content-slot">Add your primary role</p>
            <h1 id="identity-title">Your Name</h1>
            <p className="identity-lede content-slot">
              Add one concise sentence about the software you build, the problems you
              understand, and the kind of work you want to do next.
            </p>

            <dl className="identity-facts">
              <div>
                <dt>Location</dt>
                <dd className="content-slot">City, Country</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd className="content-slot">Add availability wording</dd>
              </div>
            </dl>

            <div className="identity-links" aria-label="Profile links">
              {identityContacts.map((contact) => (
                <span
                  className="identity-contact"
                  aria-disabled="true"
                  aria-label={`${contact.label} link pending`}
                  title={contact.pending}
                  key={contact.label}
                >
                  <span className="contact-mark" aria-hidden="true">
                    {contact.mark}
                  </span>
                  {contact.label}
                </span>
              ))}

              <a className="identity-work-link" href="#projects">
                <span className="contact-mark identity-work-mark" aria-hidden="true">
                  ↘
                </span>
                View projects
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="document-section about" aria-labelledby="about-title">
          <SectionHeading id="about-title">About</SectionHeading>
          <div className="about-copy">
            <p className="content-slot">
              Add a short first-person introduction. Name the work you care about, the
              perspective you bring, and the environments where you do your best work.
            </p>
            <p className="content-slot">
              Use a second paragraph only when it adds something concrete: a current
              focus, a formative background, or a principle that shapes how you build.
            </p>
          </div>

          <dl className="about-education">
            <div>
              <dt>Education</dt>
              <dd>
                <strong>Bachelor’s Degree in Computer Science</strong>
                <span>Universitas Padjadjaran · GPA 3.86 / 4.00</span>
              </dd>
              <dd className="about-education-period">2023 — 2027 (Expected)</dd>
            </div>
          </dl>
        </section>

        <section
          id="experience"
          className="document-section experience"
          aria-labelledby="experience-title"
        >
          <div className="experience-heading">
            <SectionHeading id="experience-title">Experience</SectionHeading>
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

        <section id="stack" className="document-section stack" aria-labelledby="stack-title">
          <SectionHeading id="stack-title">Technical stack</SectionHeading>
          <dl className="stack-list">
            {stack.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd className="content-slot">{item.tools}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          id="projects"
          className="document-section projects"
          aria-labelledby="projects-title"
        >
          <div className="projects-heading">
            <SectionHeading id="projects-title">Selected projects</SectionHeading>
            <p className="content-slot">
              Replace these entries with three or four projects that show your strongest,
              most relevant work.
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

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div>
            <SectionHeading id="contact-title">Let’s talk about useful work.</SectionHeading>
            <p className="content-slot">
              Add a direct invitation that reflects the roles, collaborations, or project
              conversations you want to receive.
            </p>
          </div>

          <dl className="contact-list">
            <div>
              <dt>Email</dt>
              <dd className="content-slot">Add public email address</dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd className="content-slot">Add GitHub URL</dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd className="content-slot">Add LinkedIn URL</dd>
            </div>
            <div>
              <dt>Resume</dt>
              <dd className="content-slot">Add resume URL</dd>
            </div>
          </dl>
        </section>
      </main>

      <footer className="site-footer">
        <p>Your Name · Portfolio content draft · 2026</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
