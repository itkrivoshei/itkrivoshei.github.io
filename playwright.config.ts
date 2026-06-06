import { existsSync } from "node:fs";
import { defineConfig } from "@playwright/test";

const systemChromium = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  "/snap/bin/chromium",
  "/usr/bin/chromium",
].find((candidate) => candidate && existsSync(candidate));
const testPort = process.env.PLAYWRIGHT_PORT ?? "4173";
const baseURL = `http://127.0.0.1:${testPort}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    launchOptions: systemChromium
      ? {
          executablePath: systemChromium,
          args: ["--no-sandbox"],
        }
      : undefined,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `npm run build && npm run preview -- --host 127.0.0.1 --port ${testPort}`,
    url: `${baseURL}/sitemap-index.xml`,
    reuseExistingServer: false,
  },
});
