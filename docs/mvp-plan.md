# MVP plan

Goal: build a small, clean personal static site that is useful for a DevOps-focused software engineering profile.

## Target stack

- Astro
- TypeScript
- Tailwind CSS
- GitHub Pages
- GitHub Actions
- Dependabot
- Optional Dockerfile for local build and build verification

## Phase 0 — repository reset

Status: complete.

Scope:

- Remove old Gatsby/React/template files.
- Remove old placeholder content and demo links.
- Keep the repository public and minimal.
- Add only baseline files required before starting the new implementation.

Result:

- `README.md`
- `LICENSE`
- `.gitignore`
- `.editorconfig`
- `docs/mvp-plan.md`

## Phase 1 — Astro base

Create a new Astro project in the existing repository.

Recommended wizard choices:

```text
Template: Empty
TypeScript: Yes
Install dependencies: Yes
Initialize git repository: No
```

Expected files after this phase:

- `astro.config.mjs`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `src/pages/index.astro`

## Phase 2 — Tailwind and styling

Add Tailwind CSS and global styling.

Scope:

- Add Tailwind integration.
- Add a clean responsive layout.
- Keep the design simple and readable.
- Avoid animation-heavy portfolio effects.

## Phase 3 — site content

Add one-page resume-style content.

Sections:

- Hero
- About
- Skills
- Experience
- DevOps focus
- Resume
- Contact

Rules:

- No fake projects.
- No placeholder cards.
- No "coming soon" sections.
- No inflated DevOps claims.

## Phase 4 — check workflow

Add `.github/workflows/check.yml`.

Required checks:

- `npm ci`
- `npm run check`
- `npm run build`

Purpose: verify the site builds cleanly before deployment.

## Phase 5 — GitHub Pages deployment

Add `.github/workflows/deploy.yml`.

Deployment model:

- Trigger: push to `main`.
- Build static site.
- Upload Pages artifact.
- Deploy to GitHub Pages.

Manual GitHub setting:

```text
Settings → Pages → Source → GitHub Actions
```

## Phase 6 — Dependabot

Add `.github/dependabot.yml`.

Update ecosystems:

- npm
- GitHub Actions

Schedule: weekly.

## Phase 7 — optional Dockerfile

Add a simple Dockerfile only for local build/dev verification.

Rules:

- Do not use Docker for GitHub Pages deployment.
- Do not add Docker Compose for MVP.
- Do not add Kubernetes or Terraform for this repository.

## Not in MVP

- Dev Container
- Lighthouse CI
- Kubernetes
- Terraform
- Backend
- Database
- Fake badges
- Fake demo links

## GitHub About values

Description:

```text
Personal static site for a DevOps-focused software engineer.
```

Website:

```text
https://itkrivoshei.github.io
```

Topics:

```text
astro, typescript, tailwindcss, github-pages, github-actions, portfolio, resume
```

Homepage sections:

- Releases: No
- Deployments: Yes, after Pages deployment exists
- Packages: No
