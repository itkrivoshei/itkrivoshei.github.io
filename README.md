<div align="center">

# itkrivoshei.github.io

Personal GitHub Pages site for Nikita Krivoshei, built with Astro, TypeScript, Tailwind CSS, and GitHub Actions.

[![Check](https://github.com/itkrivoshei/itkrivoshei.github.io/actions/workflows/check.yml/badge.svg)](https://github.com/itkrivoshei/itkrivoshei.github.io/actions/workflows/check.yml)
[![Deploy](https://github.com/itkrivoshei/itkrivoshei.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/itkrivoshei/itkrivoshei.github.io/actions/workflows/deploy.yml)
[![Live site](https://img.shields.io/badge/Live%20site-itkrivoshei.github.io-2ea44f?logo=githubpages&logoColor=white)](https://itkrivoshei.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[![GitHub](https://img.shields.io/badge/GitHub-itkrivoshei-181717?logo=github&logoColor=white)](https://github.com/itkrivoshei)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Nikita%20Krivoshei-0a66c2?logo=linkedin&logoColor=white)](https://linkedin.com/in/itkivoshei)
[![Email](https://img.shields.io/badge/Email-NikitaKrivoshei%40gmail.com-d14836?logo=gmail&logoColor=white)](mailto:NikitaKrivoshei@gmail.com)

</div>

## Site Model

The site presents experience, skills, selected work, availability, and contact links from a typed content source:

```text
src/data/profile.ts
```

Astro components render the content into reusable sections, while Tailwind CSS v4 is wired through Vite for styling.

## Stack

| Area      | Tools                                   |
| --------- | --------------------------------------- |
| Framework | Astro 5                                 |
| Language  | TypeScript                              |
| Styling   | Tailwind CSS 4                          |
| Checks    | Prettier, Astro check, production build |
| Hosting   | GitHub Pages                            |
| Container | Docker, nginx                           |
| Updates   | Dependabot                              |

## Local Workflow

```bash
git clone https://github.com/itkrivoshei/itkrivoshei.github.io.git
cd itkrivoshei.github.io
npm ci
npm run dev
```

Production build and preview:

```bash
npm run build
npm run preview
```

## Scripts

| Command                 | Purpose                              |
| ----------------------- | ------------------------------------ |
| `npm run dev`           | Start Astro locally                  |
| `npm run check`         | Run Astro checks                     |
| `npm run build`         | Build `dist/`                        |
| `npm run preview`       | Preview the production build         |
| `npm run format`        | Format supported files               |
| `npm run format:check`  | Check formatting                     |
| `npm run verify`        | Format check, Astro check, and build |
| `npm run ready`         | Format, check, and build             |
| `npm run hooks:install` | Enable local Git hooks               |

## Docker

```bash
docker build -t itkrivoshei-site .
docker run --rm -p 8080:80 itkrivoshei-site
```

Open `http://localhost:8080`.

## Automation

- `.github/workflows/check.yml` validates formatting, Astro checks, and production builds.
- `.github/workflows/deploy.yml` publishes `dist` to GitHub Pages on pushes to `main`.
- `.github/dependabot.yml` tracks npm package and GitHub Actions updates.

## License

[MIT](LICENSE)
