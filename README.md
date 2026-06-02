<div align="center">

# Nikita Krivoshei — Personal Engineering Website

Personal engineering website presenting work history, technical background, selected projects, and repositories. Built with Astro, TypeScript, Tailwind CSS, and GitHub Actions.

[![Live site](https://img.shields.io/badge/live-site-2ea44f?style=for-the-badge\&logo=githubpages\&logoColor=white\&labelColor=0f172a)](https://itkrivoshei.github.io)
[![Check](https://img.shields.io/github/actions/workflow/status/itkrivoshei/itkrivoshei.github.io/check.yml?branch=main\&style=for-the-badge\&label=check\&logo=githubactions\&logoColor=white\&labelColor=0f172a)](https://github.com/itkrivoshei/itkrivoshei.github.io/actions/workflows/check.yml)
[![Deploy](https://img.shields.io/github/actions/workflow/status/itkrivoshei/itkrivoshei.github.io/deploy.yml?branch=main\&style=for-the-badge\&label=deploy\&logo=githubactions\&logoColor=white\&labelColor=0f172a)](https://github.com/itkrivoshei/itkrivoshei.github.io/actions/workflows/deploy.yml)
[![CodeQL](https://img.shields.io/github/actions/workflow/status/itkrivoshei/itkrivoshei.github.io/codeql.yml?branch=main\&style=for-the-badge\&label=codeql\&logo=github\&logoColor=white\&labelColor=0f172a)](https://github.com/itkrivoshei/itkrivoshei.github.io/actions/workflows/codeql.yml)
[![License](https://img.shields.io/github/license/itkrivoshei/itkrivoshei.github.io?style=for-the-badge\&labelColor=0f172a)](LICENSE)

<br />

[![GitHub](https://img.shields.io/badge/GitHub-itkrivoshei-181717?style=for-the-badge\&logo=github\&logoColor=white\&labelColor=0f172a)](https://github.com/itkrivoshei)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Nikita%20Krivoshei-0a66c2?style=for-the-badge\&logo=linkedin\&logoColor=white\&labelColor=0f172a)](https://linkedin.com/in/itkivoshei)
[![Email](https://img.shields.io/badge/Email-nikitakrivoshei%40gmail.com-d14836?style=for-the-badge\&logo=gmail\&logoColor=white\&labelColor=0f172a)](mailto:nikitakrivoshei@gmail.com)

</div>

## Content Model

The site presents work history, technical background, selected projects, availability, and contact links from a typed content source:

```text
src/data/profile.ts
```

Astro components render the content into reusable sections, while Tailwind CSS v4 is wired through Vite for styling.

Tooling is aligned around Node.js 22 via `.node-version`, GitHub Actions, and the Docker build image.

## Tech Stack

| Area      | Tools                                                  |
| --------- | ------------------------------------------------------ |
| Framework | Astro 5                                                |
| Language  | TypeScript                                             |
| Styling   | Tailwind CSS 4                                         |
| Runtime   | Node.js 22, npm                                        |
| Checks    | Prettier + Astro plugin, Astro check, production build |
| Hosting   | GitHub Pages                                           |
| Container | Docker, nginx                                          |
| Updates   | Dependabot                                             |

## Local Workflow

```bash
git clone https://github.com/itkrivoshei/itkrivoshei.github.io.git
cd itkrivoshei.github.io

# If you use nvm, this reads .node-version and selects Node.js 22.
nvm use

npm ci
npm run dev
```

Production build and preview:

```bash
npm run build
npm run preview
```

## Scripts

| Command                 | Purpose                                             |
| ----------------------- | --------------------------------------------------- |
| `npm run dev`           | Start Astro locally                                 |
| `npm run check`         | Run Astro checks                                    |
| `npm run build`         | Build `dist/`                                       |
| `npm run preview`       | Preview the production build                        |
| `npm run format`        | Format Astro, JS/TS, CSS, docs, and YAML            |
| `npm run format:check`  | Check formatting, including `.astro` files          |
| `npm run verify`        | CI-style gate: format check, Astro check, and build |
| `npm run ready`         | Format first, then check and build                  |
| `npm run hooks:install` | Enable local Git hooks                              |

Astro file formatting is backed by `prettier-plugin-astro`, so targeted checks such as `npx prettier --check src/pages/index.astro` work outside the editor too.

## Docker

```bash
docker build -t itkrivoshei-site .
docker run --rm -p 8080:80 itkrivoshei-site
```

Open `http://localhost:8080`.

## Automation

* `.github/workflows/check.yml` validates formatting, Astro checks, and production builds.
* `.github/workflows/deploy.yml` runs the same verification gate before publishing `dist` to GitHub Pages on pushes to `main`.
* `.github/workflows/codeql.yml` runs GitHub CodeQL analysis.
* `.github/dependabot.yml` tracks npm package and GitHub Actions updates.
* `.githooks/pre-commit` is intentionally non-mutating: it checks formatting and Astro diagnostics without rewriting or staging files.

## License

[MIT](LICENSE)
