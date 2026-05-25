export const profile = {
  name: "Nikita Krivoshei",
  role: "DevOps-focused Software Engineer",
  location: "Berlin, Germany",
  summary:
    "Software engineer with 4+ years of production experience in web platforms, CI/CD workflows, release support, debugging, and cross-team delivery.",
  about: [
    {
      prompt: "prod",
      text: "Production experience across TypeScript web platforms, CI/CD collaboration, staging environments, release validation, and production troubleshooting.",
      highlight: "release validation",
    },
    {
      prompt: "focus",
      text: "Current focus: Linux, Docker, Kubernetes, Terraform, AWS, monitoring, deployment automation, and reliable delivery pipelines.",
      highlight: "reliable delivery pipelines",
    },
    {
      prompt: "ship",
      text: "Practical delivery style: build small, verify in CI, deploy through controlled environments, document what matters, and keep production stable.",
      highlight: "keep production stable",
    },
  ],
  links: [
    { label: "GitHub", href: "https://github.com/itkrivoshei" },
    { label: "LinkedIn", href: "https://linkedin.com/in/itkivoshei" },
    { label: "Email", href: "mailto:NikitaKrivoshei@gmail.com" },
    { label: "Telegram", href: "https://t.me/itkrivoshei" },
  ],
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
];

export const experience = [
  {
    company: "SPRYLAB",
    href: "https://sprylab.com/en/",
    note: "digital publishing software / Purple platform ecosystem",
    role: "Software Engineer | CI/CD & Production Delivery",
    period: "09/2023 – 12/2024",
    points: [
      {
        text: "Built production web platforms for German media and publishing clients, including MOPO and BikeRadar-related delivery work.",
        highlight: "production web platforms",
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
    points: [
      {
        text: "Built database-driven internal tools and business systems for company and client workflows.",
        highlight: "database-driven internal tools",
      },
      {
        text: "Worked with PHP, SQL, data models, debugging, documentation, Jira, Agile workflows, and business process automation.",
        highlight: "business process automation",
      },
    ],
    links: [],
  },
];

export const projects = [
  {
    name: "Linux development environment",
    repo: "dotfiles",
    description: "Personal dotfiles and setup scripts for an Ubuntu-based development environment.",
    highlight: "Ubuntu-based development environment",
    tags: ["Linux", "Shell", "zsh", "Docker", "Neovim"],
    links: [{ label: "Repository", href: "https://github.com/itkrivoshei/dotfiles" }],
  },
  {
    name: "Personal GitHub Pages site",
    repo: "itkrivoshei.github.io",
    description:
      "Static personal site built with Astro, TypeScript, Tailwind CSS, GitHub Actions, and GitHub Pages.",
    highlight: "Astro, TypeScript, Tailwind CSS",
    tags: ["Astro", "TypeScript", "GitHub Actions"],
    links: [
      { label: "Repository", href: "https://github.com/itkrivoshei/itkrivoshei.github.io" },
      { label: "Live site", href: "https://itkrivoshei.github.io/" },
    ],
  },
  {
    name: "Media publishing platforms",
    repo: "client work",
    description:
      "Production web delivery work for publisher platforms, including MOPO and BikeRadar-related implementation and release support.",
    highlight: "publisher platforms",
    tags: ["TypeScript", "Jenkins", "staging", "release checks"],
    links: [
      { label: "MOPO", href: "https://www.mopo.de/" },
      { label: "BikeRadar", href: "https://www.bikeradar.com/" },
    ],
  },
  {
    name: "Public services portal work",
    repo: "gosuslugi.ru",
    description:
      "Large-scale public-service platform work focused on citizen-facing flows, integration support, validation, and production debugging.",
    highlight: "citizen-facing flows",
    tags: ["Angular", "GitLab", "Jenkins", "Docker", "Kubernetes"],
    links: [{ label: "Website", href: "https://www.gosuslugi.ru/" }],
  },
];

export const education = [
  {
    title: "B.Sc. Computer Science and Digitization",
    place: "Berlin School of Business & Innovation",
    period: "2023 – 2026",
  },
  {
    title: "Advanced Programming Certificate",
    place: "42",
    period: "2019 – 2022",
  },
];

export const certifications = [
  "Data Protection Training",
  "Certificate of Completion — 42 Curriculum of Architect in Digital Technologies",
];

export const availability = {
  text: "Open to DevOps, Cloud, Platform, Build and Release, and Software Engineering roles with DevOps focus.",
  highlights: ["DevOps", "Cloud", "Platform", "Build and Release", "DevOps focus"],
};
