import {
  findOpenPort,
  npmCommand,
  npxCommand,
  run,
  startProcess,
  stopProcess,
  waitForUrl,
} from "./lib/process.mjs";

const host = "127.0.0.1";
const port = await findOpenPort(host);
const baseUrl = `http://${host}:${port}`;
const preview = startProcess(
  npmCommand,
  ["run", "preview", "--", "--ignore-lock", "--host", host, "--port", String(port)],
  {
    env: { ...process.env, ASTRO_PREVIEW_BACKGROUND: "0" },
  },
);

try {
  await waitForUrl(`${baseUrl}/sitemap-index.xml`);
  await run(npxCommand, [
    "--no-install",
    "linkinator",
    baseUrl,
    "--recurse",
    "--check-css",
    "--check-fragments",
    "--skip",
    `^https?://(?!${host}:${port})`,
    "--skip",
    "^mailto:",
  ]);
} finally {
  await stopProcess(preview);
}
