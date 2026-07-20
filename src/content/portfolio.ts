type ExperienceEntry = {
  period: string;
  role: string;
  organization: string;
  location: string;
  summary: string;
  details?: readonly string[];
};

type ExperienceGroup = {
  id: string;
  label: string;
  entries: readonly ExperienceEntry[];
};

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
];

export const identity = {
  initials: "YN",
  name: "Your Name",
  role: "Add your primary role",
  lede:
    "Add one concise sentence about the software you build, the problems you understand, and the kind of work you want to do next.",
  location: "City, Country",
  status: "Add availability wording",
};

export const identityContacts = [
  { label: "Email", mark: "@", pending: "Add public email address" },
  { label: "GitHub", mark: "GH", pending: "Add GitHub URL" },
  { label: "LinkedIn", mark: "in", pending: "Add LinkedIn URL" },
  { label: "Résumé", mark: "CV", pending: "Add resume URL" },
];

export const about = {
  paragraphs: [
    "Add a short first-person introduction. Name the work you care about, the perspective you bring, and the environments where you do your best work.",
    "Use a second paragraph only when it adds something concrete: a current focus, a formative background, or a principle that shapes how you build.",
  ],
  education: {
    degree: "Bachelor’s Degree in Computer Science",
    institution: "Universitas Padjadjaran · GPA 3.86 / 4.00",
    period: "2023 — 2027 (Expected)",
  },
};

export const experienceGroups: readonly ExperienceGroup[] = [
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

export const stack = [
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
    tools:
      "Add the product, design, accessibility, or research capabilities relevant to your work.",
  },
];

export const projects = [
  {
    index: "01",
    title: "Add your strongest project",
    purpose:
      "One sentence describing the product, its audience, and the problem it addresses.",
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
    purpose:
      "Use a different kind of work here to show range without diluting the portfolio.",
    contribution: "Your role and contribution",
    tools: "Primary technologies",
    featured: false,
  },
];

export const contact = {
  introduction:
    "Add a direct invitation that reflects the roles, collaborations, or project conversations you want to receive.",
  details: [
    { label: "Email", value: "Add public email address" },
    { label: "GitHub", value: "Add GitHub URL" },
    { label: "LinkedIn", value: "Add LinkedIn URL" },
    { label: "Resume", value: "Add resume URL" },
  ],
};

export const footerCopy = "Your Name · Portfolio content draft · 2026";
