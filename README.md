# itkrivoshei.github.io

[![Check](https://github.com/itkrivoshei/itkrivoshei.github.io/actions/workflows/check.yml/badge.svg)](https://github.com/itkrivoshei/itkrivoshei.github.io/actions/workflows/check.yml)
[![Deploy](https://github.com/itkrivoshei/itkrivoshei.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/itkrivoshei/itkrivoshei.github.io/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-2ea44f?logo=github)](https://itkrivoshei.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Personal GitHub Pages site for a DevOps-focused software engineering profile.

Live site: [itkrivoshei.github.io](https://itkrivoshei.github.io)

## Stack

![Astro](https://img.shields.io/badge/Astro-5.x-ff5d01?logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38bdf8?logo=tailwindcss&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088ff?logo=githubactions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-deploy-222222?logo=github&logoColor=white)
![Dependabot](https://img.shields.io/badge/Dependabot-enabled-025e8c?logo=dependabot&logoColor=white)

## What this repository contains

- Static site built with Astro and TypeScript
- Tailwind CSS v4 styling through Vite
- Profile content stored in TypeScript data files
- GitHub Actions workflow for checks
- GitHub Actions workflow for GitHub Pages deployment
- Dependabot configuration for npm and GitHub Actions updates
- Prettier formatting setup
- Local pre-commit hook for formatting and Astro checks

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
├── .vscode/
│   ├── extensions.json
│   └── settings.json
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Local development

Install dependencies:

```bash
npm ci
```

Start the local development server:

```bash
npm run dev
```

Run Astro checks:

```bash
npm run check
```

Build the site:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Formatting and verification

Format files:

```bash
npm run format
```

Check formatting without writing changes:

```bash
npm run format:check
```

Run the same verification flow used before pushing:

```bash
npm run verify
```

Format, check, and build before a final commit:

```bash
npm run ready
```

## Git hooks

Install local hooks:

```bash
npm run hooks:install
```

Remove local hooks:

```bash
npm run hooks:remove
```

The pre-commit hook formats files, stages formatting changes, and runs the Astro check before the commit.

## CI/CD

The repository uses GitHub Actions for:

- formatting check
- Astro type/content check
- production build
- GitHub Pages deployment

The deployment workflow builds the site and publishes the `dist` output through GitHub Pages.

## Dependency updates

Dependabot checks:

- npm dependencies
- GitHub Actions versions

Updates are checked weekly.

## License

MIT — see [LICENSE](LICENSE).
