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
const preview = startProcess(npmCommand, [
  "run",
  "preview",
  "--",
  "--host",
  host,
  "--port",
  String(port),
]);

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
