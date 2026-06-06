import { readdir, stat } from "node:fs/promises";

const assetDirectory = new URL("../dist/_astro/", import.meta.url);
const budgets = [
  {
    label: "generated CSS",
    limit: 28 * 1024,
    pattern: /^BaseLayout\..+\.css$/,
  },
  {
    label: "background bootstrap",
    limit: 8 * 1024,
    pattern: /^NetworkBackground\..+\.js$/,
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
