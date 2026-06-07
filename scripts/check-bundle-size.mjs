import { readdir, stat } from "node:fs/promises";

const assetDirectory = new URL("../dist/_astro/", import.meta.url);
const budgets = [
  {
    label: "generated CSS",
    limit: 25 * 1024,
    pattern: /^BaseLayout\..+\.css$/,
  },
  {
    label: "background bootstrap",
    limit: 4 * 1024,
    pattern: /^NetworkBackground\..+\.js$/,
  },
  {
    label: "motion bootstrap",
    limit: 4 * 1024,
    pattern: /^BaseLayout\..+\.js$/,
  },
  {
    label: "lazy WebGL runtime",
    limit: 510 * 1024,
    pattern: /^vanta-three\..+\.js$/,
  },
  {
    label: "lazy GSAP runtime",
    limit: 75 * 1024,
    pattern: /^index\..+\.js$/,
  },
  {
    label: "lazy ScrollTrigger runtime",
    limit: 48 * 1024,
    pattern: /^ScrollTrigger\..+\.js$/,
  },
  {
    label: "lazy Lenis runtime",
    limit: 22 * 1024,
    pattern: /^lenis\..+\.js$/,
  },
  {
    label: "lazy Atropos runtime",
    limit: 10 * 1024,
    pattern: /^atropos\..+\.js$/,
  },
];
const assets = await readdir(assetDirectory);

for (const budget of budgets) {
  const asset = assets.find((name) => budget.pattern.test(name));

  if (!asset) {
    throw new Error(`Could not find ${budget.label} asset.`);
  }

  const { size } = await stat(new URL(asset, assetDirectory));
  console.log(
    `${budget.label}: ${size.toLocaleString()} bytes / ${budget.limit.toLocaleString()} bytes`,
  );

  if (size > budget.limit) {
    throw new Error(`${budget.label} exceeds its bundle budget.`);
  }
}
