export interface ProfileLink {
  label: string;
  href: string;
}

export interface SocialLink extends ProfileLink {
  icon: "github" | "linkedin" | "email" | "telegram";
}

export interface ProjectLink extends ProfileLink {
  kind: "repository" | "site";
}

export interface ExperiencePoint {
  text: string;
  highlight?: string;
}

export interface ExperienceItem {
  company: string;
  href?: string;
  note?: string;
  role: string;
  period: string;
  skills: string[];
  points: ExperiencePoint[];
  links?: ProfileLink[];
}

export interface ProjectItem {
  name: string;
  repo: string;
  description: string;
  highlight?: string;
  featured?: boolean;
  tags: string[];
  links?: ProjectLink[];
}

export interface SkillGroup {
  title: string;
  icon: "cloud" | "container" | "pipeline" | "pulse" | "code" | "git";
  items: string[];
}

export const profile = {
  name: "Nikita Krivoshei",
  role: "Infrastructure-Focused Software Engineer",
  location: "Berlin, Germany",
  summary:
    "Software engineer experienced in customer-facing applications, API-driven systems, release workflows, production troubleshooting, and infrastructure automation.",
  metaDescription:
    "Portfolio of Nikita Krivoshei, a Berlin-based software engineer focused on technical support, APIs, Linux, CI/CD, cloud infrastructure, observability, and reliable software delivery.",
  about: [
    {
      prompt: "support",
      text: "Experience reproducing and diagnosing API, data, authentication, configuration, build, and runtime issues across customer-facing applications and test environments.",
      highlight: "API, data, authentication, configuration, build, and runtime issues",
    },
    {
      prompt: "infra",
      text: "Focused on Linux, Docker, CI/CD, cloud infrastructure, observability, deployment automation, and reliable delivery workflows.",
      highlight: "Linux, Docker, CI/CD, cloud infrastructure",
    },
    {
      prompt: "ship",
      text: "Reproducible diagnostics, automated checks, clear documentation, and stable releases.",
      highlight: "automated checks",
    },
  ],
  links: [
    { label: "GitHub", href: "https://github.com/itkrivoshei", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/itkrivoshei", icon: "linkedin" },
    { label: "Email", href: "mailto:nikitakrivoshei@gmail.com", icon: "email" },
    { label: "Telegram", href: "https://t.me/itkrivoshei", icon: "telegram" },
  ] satisfies SocialLink[],
};

export const heroLinks = profile.links.filter((link) => link.icon !== "telegram");

export const skillGroups = [
  {
    title: "Support & Troubleshooting",
    icon: "git",
    items: [
      "Application support",
      "Issue reproduction",
      "Root cause analysis",
      "Incident triage",
      "Jira",
      "Technical documentation",
    ],
  },
  {
    title: "APIs & Data",
    icon: "pipeline",
    items: [
      "REST APIs",
      "HTTP/JSON",
      "OAuth/JWT",
      "Postman/cURL",
      "SQL/PostgreSQL",
      "API debugging",
    ],
  },
  {
    title: "Infrastructure & Cloud",
    icon: "cloud",
    items: ["Linux", "Bash", "AWS", "Terraform", "Kubernetes", "Nginx"],
  },
  {
    title: "CI/CD & Delivery",
    icon: "container",
    items: [
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "GitLab CI/CD",
      "Jenkins",
      "Deployment automation",
    ],
  },
  {
    title: "Observability & Reliability",
    icon: "pulse",
    items: [
      "Prometheus",
      "Grafana",
      "Loki",
      "Log analysis",
      "Monitoring & alerting",
      "Health checks",
    ],
  },
  {
    title: "Software Engineering",
    icon: "code",
    items: ["TypeScript", "JavaScript", "Node.js", "Python", "Angular", "React"],
  },
] satisfies SkillGroup[];

export const experience = [
  {
    company: "SPRYLAB",
    href: "https://sprylab.com/en/",
    note: "digital publishing platform for media brands",
    role: "Frontend Software Engineer | Client Platform Support",
    period: "09/2023 – 01/2025",
    skills: ["TypeScript", "REST APIs", "Jenkins", "Release validation", "Troubleshooting"],
    points: [
      {
        text: "Supported customer-facing websites and applications for German media clients, including MOPO and BikeRadar, within SPRYLAB's Purple platform.",
      },
      {
        text: "Reproduced and diagnosed configuration, REST API, authentication/token, build, and frontend issues; reviewed Jenkins logs, validated preview/test environments, and coordinated fixes and releases with QA and engineering.",
        highlight:
          "Reproduced and diagnosed configuration, REST API, authentication/token, build, and frontend issues",
      },
    ],
    links: [
      { label: "MOPO", href: "https://www.mopo.de/" },
      { label: "BikeRadar", href: "https://www.bikeradar.com/" },
    ],
  },
  {
    company: "RT Labs",
    note: "e-government platform development",
    role: "Frontend Software Engineer | Integration & Release Support",
    period: "10/2020 – 04/2022",
    skills: ["Angular", "TypeScript", "REST APIs", "GitLab CI/CD", "Release support", "Debugging"],
    points: [
      {
        text: "Built and supported Angular/TypeScript modules for nationwide COVID-19 certificate and QR-code workflows, including API-driven states, localization, print/download behavior, and browser compatibility.",
        highlight: "COVID-19 certificate and QR-code workflows",
      },
      {
        text: "Reproduced migration, build, runtime, REST API, and analytics/data issues; supported GitLab releases, unit tests, test-environment validation, QA handoffs, and hotfixes.",
      },
    ],
    links: [{ label: "Website", href: "https://www.gosuslugi.ru/" }],
  },
  {
    company: "First Bit",
    href: "https://en.1solution.ru/",
    note: "business software and workflow systems · university placement",
    role: "Application Support | Business Systems Configuration",
    period: "01/2019 – 07/2019",
    skills: ["Application support", "SQL", "Jira", "Troubleshooting", "Documentation"],
    points: [
      {
        text: "Supported and configured business applications in customer environments, troubleshooting operational issues during on-site visits.",
      },
      {
        text: "Used SQL and database checks to investigate data, configuration, and workflow issues; documented findings in Jira and coordinated with users to verify resolution.",
        highlight: "SQL and database checks",
      },
    ],
    links: [],
  },
] satisfies ExperienceItem[];

export const projects = [
  {
    name: "Production App Infrastructure",
    repo: "production-app-infrastructure",
    description:
      "Support-oriented infrastructure lab for reproducing and diagnosing REST API, readiness, performance, and logging failures using Docker Compose, Prometheus, Grafana, Loki, Bash/cURL runbooks, automated CI/CD, rollback workflows, Terraform validation, and Kubernetes readiness checks.",
    highlight: "reproducing and diagnosing REST API, readiness, performance, and logging failures",
    featured: true,
    tags: ["Docker", "Prometheus", "Grafana", "CI/CD", "Terraform", "Kubernetes readiness"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/itkrivoshei/production-app-infrastructure",
        kind: "repository",
      },
      {
        label: "Live UI preview",
        href: "https://itkrivoshei.github.io/production-app-infrastructure/",
        kind: "site",
      },
    ],
  },
  {
    name: "Engineering Portfolio Delivery Pipeline",
    repo: "itkrivoshei.github.io",
    description:
      "Astro portfolio packaged with Docker/nginx and delivered through GitHub Actions with linting, type checks, HTML and link validation, Playwright accessibility tests, container smoke tests, bundle budgets, CodeQL, and GitHub Pages deployment.",
    highlight:
      "linting, type checks, HTML and link validation, Playwright accessibility tests, container smoke tests",
    tags: ["Astro", "Docker", "nginx", "GitHub Actions", "Playwright", "CodeQL"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/itkrivoshei/itkrivoshei.github.io",
        kind: "repository",
      },
      {
        label: "Live site",
        href: "https://krivoshei.dev/",
        kind: "site",
      },
    ],
  },
  {
    name: "Linux workstation automation",
    repo: "dotfiles",
    description:
      "Ubuntu-focused dotfiles and bootstrap scripts with shell health checks, ShellCheck, shfmt, and GitHub Actions.",
    highlight: "ShellCheck, shfmt, and GitHub Actions",
    tags: ["Linux", "Bash", "zsh", "ShellCheck", "GitHub Actions"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/itkrivoshei/dotfiles",
        kind: "repository",
      },
    ],
  },
  {
    name: "Serverless commerce dashboard",
    repo: "angular-serverless-commerce-dashboard",
    description:
      "Angular and NgRx commerce dashboard using an AWS API Gateway/Lambda data proxy, tests, and GitHub Pages deployment.",
    highlight: "AWS API Gateway/Lambda data proxy",
    tags: ["Angular", "NgRx", "AWS Lambda", "API Gateway", "CI/CD"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/itkrivoshei/angular-serverless-commerce-dashboard",
        kind: "repository",
      },
      {
        label: "Live app",
        href: "https://itkrivoshei.github.io/angular-serverless-commerce-dashboard/",
        kind: "site",
      },
    ],
  },
  {
    name: "Dockerized ML app pipeline",
    repo: "salary-prediction-linear-regression",
    description:
      "Streamlit salary prediction app packaged with Docker and validated by pytest, ruff, CI, and an image build.",
    highlight: "Docker",
    tags: ["Python", "Docker", "Streamlit", "pytest", "GitHub Actions"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/itkrivoshei/salary-prediction-linear-regression",
        kind: "repository",
      },
    ],
  },
  {
    name: "React/TypeScript app gallery",
    repo: "react-typescript-web-apps",
    description:
      "Routed React and TypeScript app gallery covering Redux state management, API integrations, form validation, and unit tests, shipped through GitHub Actions to GitHub Pages.",
    highlight: "Redux state management, API integrations, form validation, and unit tests",
    tags: ["React", "TypeScript", "Redux Toolkit", "Vitest", "GitHub Actions"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/itkrivoshei/react-typescript-web-apps",
        kind: "repository",
      },
      {
        label: "Live app",
        href: "https://itkrivoshei.github.io/react-typescript-web-apps/",
        kind: "site",
      },
    ],
  },
] satisfies ProjectItem[];

export const availability = {
  text: "Open to Technical/Application Support, Production Support, Cloud Operations, CI/CD, Build/Release, DevOps, and infrastructure-focused software engineering roles.",
  highlights: [
    "Technical/Application Support",
    "Production Support",
    "Cloud Operations",
    "CI/CD",
    "Build/Release",
    "DevOps",
    "infrastructure-focused software engineering",
  ],
};
