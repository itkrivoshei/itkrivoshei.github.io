# itkrivoshei.github.io

Source repository for a small GitHub Pages site built with Astro, TypeScript, Tailwind CSS, GitHub Actions, and GitHub Pages.

## Stack

- Astro
- TypeScript
- Tailwind CSS
- GitHub Actions
- GitHub Pages
- Dependabot

## Development

Install dependencies:

    npm ci

Run locally:

    npm run dev

Run the full local check before pushing:

    npm run ready

`npm run ready` formats the project, runs Astro type checks, and builds the site.

## Git hooks

Install the local pre-commit hook:

    npm run hooks:install

The hook formats files, stages formatting changes, and runs the Astro check before each commit.

## CI/CD

The repository uses GitHub Actions for:

- pull/push checks
- formatting verification
- Astro type checking
- production build
- GitHub Pages deployment

Dependabot checks npm and GitHub Actions updates weekly.

## License

MIT — see [LICENSE](LICENSE).
