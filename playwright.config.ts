import { existsSync } from "node:fs";
import { defineConfig } from "@playwright/test";

const systemChromium = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  "/snap/bin/chromium",
  "/usr/bin/chromium",
].find((candidate) => candidate && existsSync(candidate));

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4321",
    launchOptions: systemChromium
      ? {
          executablePath: systemChromium,
          args: ["--no-sandbox"],
        }
      : undefined,
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4321",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: !process.env.CI,
  },
});
