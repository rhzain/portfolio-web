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

export const previewNavigation = [
  {
    id: "about",
    label: "About",
    description: "Know about me.",
    href: "#about",
  },
  {
    id: "experience",
    label: "Experience",
    description: "What I've been through.",
    href: "#experience",
  },
  {
    id: "stack",
    label: "Stack",
    description: "My tools.",
    href: "#stack",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Made by me (and friends).",
    href: "#projects",
  },
  {
    id: "contact",
    label: "Contact",
    description: "Let's get in touch.",
    href: "#contact",
  },
];

export const identity = {
  initials: "rhzain",
  name: "Muhammad Raihan Rizky Zain",
  role: "Add your primary role",
  lede:
    "AI and Software Engineer; Building Practical Solutions and Tinkering with AI;",
  location: "Bogor, Indonesia",
  status: "Available",
};

export const identityContacts = [
  { label: "Email", mark: "@", href: "mailto:mrrzzain@gmail.com" },
  { label: "GitHub", mark: "GH", href: "https://github.com/rhzain" },
  {
    label: "LinkedIn",
    mark: "in",
    href: "https://www.linkedin.com/in/raihanzain/",
  },
  { label: "Résumé", mark: "CV", href: "/resume.pdf" },
];

export const about = {
  paragraphs: [
    "I’m a Computer Science undergraduate at Universitas Padjadjaran, currently exploring the intersection of software development and artificial intelligence. I enjoy understanding a problem, shaping a practical solution, and improving it through experimentation and feedback.",
    "My experience spans Laravel and Node.js backend systems, real-time media and IoT pipelines, and AI projects involving retrieval, prediction, and model integration. I work best in collaborative environments where I can exchange ideas, learn quickly, and help turn ambitious concepts into dependable products.",
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
        period: "Feb 2026 — Jul 2026",
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
        period: "Feb 2026 — Jul 2026",
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
    label: "Software",
    tools: [
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "PHP", icon: "php" },
      { name: "Java", icon: "openjdk" },
      { name: "C# / .NET", icon: "dotnet" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express", icon: "express" },
      { name: "Laravel", icon: "laravel" },
      { name: "Flask", icon: "flask" },
      { name: "Streamlit", icon: "streamlit" },
      { name: "Unity", icon: "unity" },
    ],
  },
  {
    label: "AI & Vision",
    tools: [
      { name: "Python", icon: "python" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "Scikit-learn", icon: "scikitlearn" },
      { name: "LangChain", icon: "langchain" },
      { name: "OpenCV", icon: "opencv" },
    ],
  },
  {
    label: "Data & Infrastructure",
    tools: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "MySQL", icon: "mysql" },
      { name: "Redis", icon: "redis" },
      { name: "Docker", icon: "docker" },
      { name: "Nginx", icon: "nginx" },
      { name: "Tailscale", icon: "tailscale" },
      { name: "Linux", icon: "linux" },
    ],
  },
  {
    label: "Tools",
    tools: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Swagger", icon: "swagger" },
      { name: "Postman", icon: "postman" },
      { name: "Notion", icon: "notion" },
      { name: "Figma", icon: "figma" },
    ],
  },
] as const;

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
    "Let’s share our thoughts and see what we can build together.",
  details: [
    {
      label: "Email",
      value: "mrrzzain@gmail.com",
      href: "mailto:mrrzzain@gmail.com",
    },
    {
      label: "GitHub",
      value: "github.com/rhzain",
      href: "https://github.com/rhzain",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/raihanzain",
      href: "https://www.linkedin.com/in/raihanzain/",
    },
    { label: "Résumé", value: "résumé-pdf", href: "/resume.pdf" },
  ],
};

export const footerCopy = "rhzain's portfolio · 2026";
