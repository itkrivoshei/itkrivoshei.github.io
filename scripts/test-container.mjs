import { readFile } from "node:fs/promises";
import { findOpenPort, run, waitForUrl } from "./lib/process.mjs";

const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const npmVersion = packageJson.packageManager.split("@").at(-1);
const host = "127.0.0.1";
const port = await findOpenPort(host);
const baseUrl = `http://${host}:${port}`;
const image = `itkrivoshei-site-test:${process.pid}`;
const container = `itkrivoshei-site-test-${process.pid}`;

try {
  await run("docker", ["build", "--build-arg", `NPM_VERSION=${npmVersion}`, "--tag", image, "."]);
  await run("docker", [
    "run",
    "--detach",
    "--rm",
    "--name",
    container,
    "--publish",
    `${host}:${port}:80`,
    image,
  ]);
  const homeResponse = await waitForUrl(baseUrl);
  const home = await homeResponse.text();
  const assetPath = home.match(/(?:href|src)="(\/_astro\/[^"]+)"/)?.[1];

  if (!assetPath) {
    throw new Error("Could not find a hashed asset in the container response.");
  }

  const assetResponse = await fetch(`${baseUrl}${assetPath}`);
  const cacheControl = assetResponse.headers.get("cache-control") ?? "";

  if (!cacheControl.includes("immutable")) {
    throw new Error(`Hashed asset is missing immutable caching: ${cacheControl || "none"}.`);
  }

  if (assetResponse.headers.get("x-content-type-options") !== "nosniff") {
    throw new Error("Container responses are missing the X-Content-Type-Options header.");
  }

  const missingResponse = await fetch(`${baseUrl}/missing-container-route`);
  const missingPage = await missingResponse.text();

  if (missingResponse.status !== 404 || !missingPage.includes("Page not found")) {
    throw new Error("Container does not serve the branded 404 page for unknown routes.");
  }

  console.log("Container serves branded 404 responses and immutable hashed assets.");
} finally {
  await run("docker", ["rm", "--force", container]).catch(() => undefined);
  await run("docker", ["image", "rm", "--force", image]).catch(() => undefined);
}
