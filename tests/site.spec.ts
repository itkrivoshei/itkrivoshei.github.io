import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("renders the primary content and passes the accessibility smoke test", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Nikita Krivoshei" })).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Selected Engineering Work" }),
  ).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  const blockingViolations = results.violations.filter(
    ({ impact }) => impact === "critical" || impact === "serious",
  );

  expect(blockingViolations).toEqual([]);
});

test("keeps all content visible without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Nikita Krivoshei" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "About" })).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Selected Engineering Work" }),
  ).toBeVisible();
  await expect(page.locator("[data-terminal-typewriter]")).toContainText(
    "deploy engineering-site --target github-pages",
  );
  await expect(page.locator("[data-terminal-typewriter]")).toContainText("ready");

  await context.close();
});

test("does not initialize particles on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const background = page.locator("[data-network-background]");

  await expect(background.locator("canvas")).toHaveCount(0);
  await expect(background).toHaveAttribute("data-background-theme", "hero");
  await expect(background).toHaveAttribute("data-spotlight-active", "false");
  await expect(page.locator(".ambient-glow-primary")).toHaveCSS("animation-name", "none");

  const particleRequests = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .map(({ name }) => name)
      .filter((name) => /(Container|MovePlugin|InteractivityPlugin|LinkInstance)/.test(name)),
  );

  expect(particleRequests).toEqual([]);
});

test("does not initialize particles when reduced motion is enabled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const background = page.locator("[data-network-background]");

  await expect(background.locator("canvas")).toHaveCount(0);
  await expect(background).toHaveAttribute("data-background-theme", "hero");
  await expect(background).toHaveAttribute("data-spotlight-active", "false");
  await expect(page.locator(".ambient-glow-primary")).toHaveCSS("animation-name", "none");
  await expect(page.getByRole("heading", { level: 2, name: "Experience" })).toBeVisible();
});

test("runs the desktop background system and destroys it on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  const background = page.locator("[data-network-background]");
  const spotlight = page.locator("[data-cursor-spotlight]");

  await expect(background.locator("canvas")).toHaveCount(1, {
    timeout: 10_000,
  });
  await expect(background).toHaveAttribute("data-network-ready", "true");
  await expect(background).toHaveAttribute("data-network-hover-modes", "grab bubble");

  await page.mouse.move(160, 180);
  await expect(background).toHaveAttribute("data-spotlight-active", "true");
  const firstTransform = await spotlight.evaluate((element) => element.style.transform);

  await page.mouse.move(1180, 720);
  await expect
    .poll(() => spotlight.evaluate((element) => element.style.transform))
    .not.toBe(firstTransform);

  await page.evaluate(() => {
    window.dispatchEvent(new PointerEvent("pointerout", { relatedTarget: null }));
  });
  await expect(background).toHaveAttribute("data-spotlight-active", "false");

  for (const theme of ["skills", "experience", "projects"]) {
    await page
      .locator(`[data-background-theme="${theme}"]:not([data-network-background])`)
      .evaluate((element) => element.scrollIntoView({ block: "center" }));
    await expect(background).toHaveAttribute("data-background-theme", theme);
  }

  await page.setViewportSize({ width: 800, height: 1000 });
  await expect(background.locator("canvas")).toHaveCount(0);
  await expect(background).toHaveAttribute("data-network-mode", "static");
  await expect(background).toHaveAttribute("data-background-theme", "hero");
  await expect(background).toHaveAttribute("data-spotlight-active", "false");
});

test("publishes SEO metadata and static discovery files", async ({ page, request }) => {
  await page.goto("/");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://itkrivoshei.github.io/",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://itkrivoshei.github.io/og-image.png",
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );

  for (const path of ["/404.html", "/og-image.png", "/robots.txt", "/sitemap-index.xml"]) {
    const response = await request.get(path);
    expect(response.ok(), `${path} should be available`).toBe(true);
  }
});
