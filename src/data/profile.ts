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
  icon: "pipeline" | "server" | "pulse" | "code";
  items: string[];
}

export const profile = {
  name: "Nikita Krivoshei",
  role: "Infrastructure-Focused Software Engineer",
  location: "Berlin, Germany",
  summary:
    "Software engineer with 4+ years across production web platforms, release workflows, staging environments, API-driven systems, and production-oriented troubleshooting.",
  about: [
    {
      prompt: "prod",
      text: "Software engineer with 4+ years across media platforms, public-sector systems, release workflows, staging environments, and production-oriented troubleshooting.",
      highlight: "release workflows",
    },
    {
      prompt: "infra",
      text: "Focused on Linux, Docker, CI/CD, cloud infrastructure, observability, deployment automation, and reliability-focused engineering.",
      highlight: "Linux, Docker, CI/CD, cloud infrastructure",
    },
    {
      prompt: "ship",
      text: "Clear checks, documented delivery, stable releases, and practical infrastructure projects.",
      highlight: "documented delivery",
    },
  ],
  links: [
    { label: "GitHub", href: "https://github.com/itkrivoshei", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/itkivoshei", icon: "linkedin" },
    { label: "Email", href: "mailto:NikitaKrivoshei@gmail.com", icon: "email" },
    { label: "Telegram", href: "https://t.me/itkrivoshei", icon: "telegram" },
  ] satisfies SocialLink[],
};

export const skillGroups = [
  {
    title: "CI/CD",
    icon: "pipeline",
    items: ["GitHub Actions", "GitLab workflows", "Jenkins workflows", "release validation"],
  },
  {
    title: "Infrastructure",
    icon: "server",
    items: ["Linux", "Docker", "Docker Compose", "Terraform", "AWS", "Bash"],
  },
  {
    title: "Reliability",
    icon: "pulse",
    items: ["troubleshooting", "monitoring", "log analysis", "production support"],
  },
  {
    title: "Engineering",
    icon: "code",
    items: ["TypeScript", "Angular", "React", "Node.js", "REST APIs"],
  },
] satisfies SkillGroup[];

export const experience = [
  {
    company: "SPRYLAB",
    href: "https://sprylab.com/en/",
    note: "digital publishing software / Purple platform ecosystem",
    role: "Frontend Software Engineer | Client Platform Delivery",
    period: "09/2023 – 12/2024",
    skills: ["TypeScript", "Jenkins", "release workflows", "staging", "troubleshooting"],
    points: [
      {
        text: "Delivered client-facing websites and apps for German media and publishing clients, including MOPO and BikeRadar-related platform delivery work.",
      },
      {
        text: "Used Jenkins-based workflows, build logs, preview/test environments, configuration checks, REST API checks, and QA handoff to support stable client releases.",
        highlight: "Jenkins-based workflows",
      },
    ],
    links: [
      { label: "MOPO", href: "https://www.mopo.de/" },
      { label: "BikeRadar", href: "https://www.bikeradar.com/" },
    ],
  },
  {
    company: "RTLabs / Gosuslugi.ru",
    href: "https://www.gosuslugi.ru/",
    note: "national public-service platform category",
    role: "Software Engineer | Frontend Integration & Release Delivery",
    period: "10/2020 – 04/2022",
    skills: ["Angular", "TypeScript", "REST APIs", "GitLab", "release validation", "debugging"],
    points: [
      {
        text: "Contributed to Gosuslugi.ru public-service systems, including citizen-facing flows and certificate / QR-code functionality.",
        highlight: "certificate / QR-code functionality",
      },
      {
        text: "Worked with Angular, TypeScript, REST APIs, GitLab workflows, unit tests, test-environment validation, release preparation, analytics debugging, and production-oriented troubleshooting.",
        highlight: "test-environment validation",
      },
    ],
    links: [{ label: "Website", href: "https://www.gosuslugi.ru/" }],
  },
  {
    company: "First Bit",
    href: "https://en.1solution.ru/",
    note: "business software and workflow systems",
    role: "Database Developer Intern | SQL & Workflow Support",
    period: "02/2019 – 01/2020",
    skills: ["SQL", "Jira", "documentation", "workflow support"],
    points: [
      {
        text: "Worked with SQL, data modeling, documentation, and database-driven workflows for business software systems.",
      },
      {
        text: "Supported client coordination, Jira task tracking, Agile/Scrum routines, documentation handling, and basic troubleshooting.",
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
      "Production-style DevOps control center with Dockerized services, observability, CI/CD, security scans, load testing, rollback workflows, and Terraform validation.",
    featured: true,
    tags: ["Docker", "Prometheus", "Grafana", "CI/CD", "Terraform", "GitHub Actions"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/itkrivoshei/production-app-infrastructure",
        kind: "repository",
      },
      {
        label: "Live preview",
        href: "https://itkrivoshei.github.io/production-app-infrastructure/",
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
        label: "Repository",
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
        label: "Repository",
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
        label: "Repository",
        href: "https://github.com/itkrivoshei/salary-prediction-linear-regression",
        kind: "repository",
      },
    ],
  },
  {
    name: "Media publishing platforms",
    repo: "client work",
    description:
      "Production web delivery for publisher platforms, including MOPO and BikeRadar-related release support, staging validation, configuration checks, and troubleshooting.",
    highlight: "release support, staging validation, configuration checks, and troubleshooting",
    tags: ["TypeScript", "Jenkins", "staging", "release checks", "troubleshooting"],
    links: [
      { label: "MOPO", href: "https://www.mopo.de/", kind: "site" },
      { label: "BikeRadar", href: "https://www.bikeradar.com/", kind: "site" },
    ],
  },
  {
    name: "Public services portal work",
    repo: "gosuslugi.ru",
    description:
      "Large-scale public-service platform work covering citizen-facing flows, API-driven UI states, integration support, release validation, and production-oriented troubleshooting.",
    highlight: "release validation and production-oriented troubleshooting",
    tags: ["Angular", "TypeScript", "REST APIs", "GitLab", "release validation"],
    links: [{ label: "Website", href: "https://www.gosuslugi.ru/", kind: "site" }],
  },
] satisfies ProjectItem[];

export const availability = {
  text: "Available for infrastructure-focused software engineering, CI/CD, cloud operations, build/release, and junior DevOps roles.",
  highlights: [
    "infrastructure-focused software engineering",
    "CI/CD",
    "cloud operations",
    "build/release",
    "junior DevOps",
  ],
};
