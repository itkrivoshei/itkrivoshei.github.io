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
  role: "DevOps-focused Software Engineer",
  location: "Berlin, Germany",
  summary:
    "Software engineer with 4+ years across TypeScript web platforms, release workflows, staging environments, and production troubleshooting.",
  about: [
    {
      prompt: "prod",
      text: "Software engineer with 4+ years across TypeScript web platforms, release workflows, staging environments, and production troubleshooting.",
      highlight: "release workflows",
    },
    {
      prompt: "infra",
      text: "Working with Linux, Docker, Kubernetes, Terraform, AWS, CI/CD, monitoring, and deployment automation.",
      highlight: "Linux, Docker, Kubernetes, Terraform, AWS",
    },
    {
      prompt: "ship",
      text: "Small changes, clear checks, documented delivery, and stable releases.",
      highlight: "clear checks",
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
    items: ["GitHub Actions", "GitLab CI/CD", "Jenkins", "release workflows"],
  },
  {
    title: "Infrastructure",
    icon: "server",
    items: ["Linux", "Docker", "Kubernetes", "Terraform", "AWS", "Bash"],
  },
  {
    title: "Reliability",
    icon: "pulse",
    items: ["troubleshooting", "monitoring", "production support"],
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
    role: "Software Engineer | CI/CD & Production Delivery",
    period: "09/2023 – 12/2024",
    skills: ["TypeScript", "Jenkins", "CI/CD", "Staging", "Production support"],
    points: [
      {
        text: "Built production web platforms for German media and publishing clients, including MOPO and BikeRadar-related delivery work.",
      },
      {
        text: "Supported Jenkins-based release workflows, staging environments, build validation, deployment checks, debugging, and performance optimization.",
        highlight: "Jenkins-based release workflows",
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
    note: "national citizen-service portal category",
    role: "Software Engineer | Release & Integration Support",
    period: "10/2020 – 04/2022",
    skills: ["Angular", "TypeScript", "REST APIs", "Docker", "Kubernetes", "GitLab CI"],
    points: [
      {
        text: "Contributed to Gosuslugi.ru public-service systems, including citizen-facing flows and high-traffic certificate functionality.",
        highlight: "high-traffic certificate functionality",
      },
      {
        text: "Worked with Angular, TypeScript, REST APIs, GitLab/Jenkins workflows, Docker/Kubernetes-based environments, release preparation, and production debugging.",
        highlight: "Docker/Kubernetes-based environments",
      },
    ],
    links: [{ label: "Website", href: "https://www.gosuslugi.ru/" }],
  },
  {
    company: "First Bit",
    href: "https://en.1solution.ru/",
    note: "business automation and enterprise software implementation",
    role: "Database Developer Intern | Business Systems",
    period: "02/2019 – 01/2020",
    skills: ["PHP", "SQL", "Jira", "Debugging", "Documentation"],
    points: [
      {
        text: "Built database-driven internal tools and business systems for company and client workflows.",
      },
      {
        text: "Worked with PHP, SQL, data models, debugging, documentation, Jira, Agile workflows, and business process automation.",
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
      "DevOps control center with Dockerized services, observability, CI/CD, security scans, load testing, and rollback.",
    featured: true,
    tags: ["Docker", "Prometheus", "Grafana", "CI/CD", "Terraform"],
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
      "Production web delivery for publisher platforms, including MOPO and BikeRadar-related release support, staging validation, and troubleshooting.",
    highlight: "release support, staging validation, and troubleshooting",
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
      "Large-scale public-service platform work covering citizen-facing flows, integration support, release validation, and production debugging.",
    highlight: "release validation, and production debugging",
    tags: ["Angular", "GitLab", "Jenkins", "Docker", "Kubernetes"],
    links: [{ label: "Website", href: "https://www.gosuslugi.ru/", kind: "site" }],
  },
] satisfies ProjectItem[];

export const availability = {
  text: "Available for DevOps, Cloud, Platform, Build & Release, and Software Engineering roles.",
  highlights: ["DevOps", "Cloud", "Platform", "Build & Release", "Software Engineering"],
};
