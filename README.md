<div align="center">

# itkrivoshei.github.io

DevOps-focused software engineering portfolio built with Astro, TypeScript, Tailwind CSS, and GitHub Pages.

[![Check](https://github.com/itkrivoshei/itkrivoshei.github.io/actions/workflows/check.yml/badge.svg)](https://github.com/itkrivoshei/itkrivoshei.github.io/actions/workflows/check.yml)
[![Deploy](https://github.com/itkrivoshei/itkrivoshei.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/itkrivoshei/itkrivoshei.github.io/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-2ea44f?logo=github)](https://itkrivoshei.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[![Live site](https://img.shields.io/badge/Live%20site-itkrivoshei.github.io-2ea44f?logo=githubpages&logoColor=white)](https://itkrivoshei.github.io)
[![GitHub](https://img.shields.io/badge/GitHub-itkrivoshei-181717?logo=github&logoColor=white)](https://github.com/itkrivoshei)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Nikita%20Krivoshei-0a66c2?logo=linkedin&logoColor=white)](https://linkedin.com/in/itkivoshei)
[![Email](https://img.shields.io/badge/Email-NikitaKrivoshei%40gmail.com-d14836?logo=gmail&logoColor=white)](mailto:NikitaKrivoshei@gmail.com)

</div>

## What it is

A fast static portfolio site for **Nikita Krivoshei**, presenting a DevOps-focused software engineering profile with production experience, selected work, skills, and contact links.

The site is designed to be simple to maintain: profile content lives in [`src/data/profile.ts`](src/data/profile.ts), UI is split into Astro components, and deployment runs automatically through GitHub Actions.

## Tech stack

| Area      | Stack                                                                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Framework | ![Astro](https://img.shields.io/badge/Astro-5.x-ff5d01?logo=astro&logoColor=white)                                                                                             |
| Language  | ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)                                                                              |
| Styling   | ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38bdf8?logo=tailwindcss&logoColor=white)                                                                       |
| CI/CD     | ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-checks%20%2B%20deploy-2088ff?logo=githubactions&logoColor=white)                                               |
| Hosting   | ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-static%20hosting-222222?logo=github&logoColor=white)                                                               |
| Container | ![Docker](https://img.shields.io/badge/Docker-build-2496ed?logo=docker&logoColor=white) ![nginx](https://img.shields.io/badge/nginx-runtime-009639?logo=nginx&logoColor=white) |
| Updates   | ![Dependabot](https://img.shields.io/badge/Dependabot-enabled-025e8c?logo=dependabot&logoColor=white)                                                                          |

## Features

- Static Astro portfolio optimized for GitHub Pages.
- TypeScript content model for profile, skills, experience, projects, education, and availability.
- Component-based layout for reusable sections, cards, hero content, and social links.
- Tailwind CSS v4 styling through Vite.
- Automated formatting, Astro checks, and production builds.
- GitHub Pages deployment from [`deploy.yml`](.github/workflows/deploy.yml).
- Optional Docker production image using [`Dockerfile`](Dockerfile).

## Project structure

```text
.
├── .github/
│   ├── dependabot.yml
│   └── workflows/
│       ├── check.yml
│       └── deploy.yml
├── .githooks/
│   └── pre-commit
├── src/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
├── Dockerfile
├── package.json
└── tsconfig.json
```

## Local development

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Build and preview the production output:

```bash
npm run build
npm run preview
```

## Available scripts

| Command                | Purpose                                       |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Start the Astro development server.           |
| `npm run check`        | Run Astro checks.                             |
| `npm run build`        | Build the production site.                    |
| `npm run preview`      | Preview the production build locally.         |
| `npm run format`       | Format supported files with Prettier.         |
| `npm run format:check` | Check formatting without writing changes.     |
| `npm run verify`       | Run formatting check, Astro check, and build. |
| `npm run ready`        | Format, check, and build before committing.   |

## CI/CD

The repository uses GitHub Actions for validation and deployment:

- [`check.yml`](.github/workflows/check.yml) runs formatting checks, Astro checks, and production builds.
- [`deploy.yml`](.github/workflows/deploy.yml) builds the site and publishes `dist` to GitHub Pages.

Dependabot monitors npm packages and GitHub Actions versions through [`.github/dependabot.yml`](.github/dependabot.yml).

## Docker

Build the production image:

```bash
docker build -t itkrivoshei-site .
```

Run the site with nginx:

```bash
docker run --rm -p 8080:80 itkrivoshei-site
```

Then open `http://localhost:8080`.

## Maintenance

Profile content is edited in [`src/data/profile.ts`](src/data/profile.ts). Most visual changes should go through the Astro components in `src/components/` and global styles in `src/styles/`.

Local Git hooks can be enabled when needed:

```bash
npm run hooks:install
```

## License

MIT license. See [`LICENSE`](LICENSE).
