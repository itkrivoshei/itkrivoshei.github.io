export const profile = {
  name: 'Nikita Krivoshei',
  role: 'DevOps-focused Software Engineer',
  location: 'Berlin, Germany',
  summary: 'Software engineer with 4+ years of production experience in web platforms, CI/CD workflows, release support, debugging, and cross-team delivery.',
  about: [
    'Production experience with TypeScript, Angular, React, REST APIs, CI/CD collaboration, staging environments, release validation, and production troubleshooting.',
    'Current focus: Linux, Docker, Kubernetes, Terraform, AWS, monitoring, deployment automation, and reliable delivery pipelines.',
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/itkrivoshei' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/itkivoshei' },
    { label: 'Email', href: 'mailto:NikitaKrivoshei@gmail.com' },
    { label: 'Telegram', href: 'https://t.me/itkrivoshei' },
  ],
};

export const skillGroups = [
  { title: 'CI/CD', items: ['GitHub Actions', 'GitLab CI/CD', 'Jenkins', 'release workflows'] },
  { title: 'Infrastructure', items: ['Linux', 'Docker', 'Kubernetes', 'Terraform', 'AWS', 'Bash'] },
  { title: 'Reliability', items: ['troubleshooting', 'monitoring', 'production support'] },
  { title: 'Engineering', items: ['TypeScript', 'Angular', 'React', 'Node.js', 'REST APIs'] },
];

export const experience = [
  { company: 'SPRYLAB', role: 'Software Engineer | CI/CD & Production Delivery', period: '09/2023 – 12/2024', points: ['Built production web platforms and supported Jenkins-based release workflows, staging environments, build validation, deployment checks, debugging, and performance optimization.'] },
  { company: 'RTLabs', role: 'Software Engineer | Release & Integration Support', period: '10/2020 – 04/2022', points: ['Contributed to large-scale web systems using Angular, TypeScript, REST APIs, GitLab/Jenkins workflows, Docker/Kubernetes-based environments, release preparation, and production debugging.'] },
  { company: 'First Bit', role: 'Database Developer Intern | Business Systems', period: '02/2019 – 01/2020', points: ['Built database-driven internal tools and worked with PHP, SQL, debugging, documentation, Jira, Agile workflows, and business process automation.'] },
];

export const projects = [
  { name: 'Linux development environment', repo: 'dotfiles', description: 'Personal dotfiles and setup scripts for an Ubuntu-based development environment.', tags: ['Linux', 'Shell', 'zsh', 'Docker', 'Neovim'], href: 'https://github.com/itkrivoshei/dotfiles' },
  { name: 'Personal GitHub Pages site', repo: 'itkrivoshei.github.io', description: 'Static personal site built with Astro, TypeScript, Tailwind CSS, GitHub Actions, and GitHub Pages.', tags: ['Astro', 'TypeScript', 'GitHub Actions'], href: 'https://github.com/itkrivoshei/itkrivoshei.github.io' },
];

export const education = [
  { title: 'B.Sc. Computer Science and Digitization', place: 'Berlin School of Business & Innovation', period: '2023 – 2026' },
  { title: 'Advanced Programming Certificate', place: '42', period: '2019 – 2022' },
];

export const certifications = ['Data Protection Training', 'Certificate of Completion — 42 Curriculum of Architect in Digital Technologies'];
