import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("renders the primary content and passes the accessibility smoke test", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Nikita Krivoshei" })).toBeVisible();
  const projectsHeading = page.getByRole("heading", {
    level: 2,
    name: "Selected Engineering Work",
  });
  await projectsHeading.scrollIntoViewIfNeeded();
  await expect(projectsHeading).toBeVisible();

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
  await expect(page.locator("[data-network-background]")).toHaveAttribute(
    "data-network-mode",
    "static",
  );
  await expect(page.locator(".network-pattern")).toBeVisible();
  await expect(page.locator("[data-atropos-card]")).toBeVisible();
  await expect(page.locator(".atropos-shadow")).toHaveCount(0);

  await context.close();
});

test("does not initialize the WebGL network on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const background = page.locator("[data-network-background]");

  await expect(background.locator("canvas")).toHaveCount(0);
  await expect(background).toHaveAttribute("data-network-mode", "static");
  await expect(background).toHaveAttribute("data-background-theme", "hero");
  await expect(page.locator("body")).toHaveAttribute("data-motion-mode", "static");
  await expect(page.locator("[data-atropos-card]")).not.toHaveAttribute("data-atropos-ready");
  await expect(page.locator(".atropos-shadow")).toHaveCount(0);
  await expect(page.locator(".ambient-glow-primary")).toHaveCSS("animation-name", "none");

  const networkRequests = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .map(({ name }) => name)
      .filter((name) =>
        /(?:vanta(?:\.net|-three)|three\.module|ScrollTrigger|lenis|atropos|\/index\.[^/]+\.js$)/i.test(
          name,
        ),
      ),
  );

  expect(networkRequests).toEqual([]);
});

test("does not initialize the WebGL network when reduced motion is enabled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const background = page.locator("[data-network-background]");

  await expect(background.locator("canvas")).toHaveCount(0);
  await expect(background).toHaveAttribute("data-network-mode", "static");
  await expect(background).toHaveAttribute("data-background-theme", "hero");
  await expect(page.locator("body")).toHaveAttribute("data-motion-mode", "static");
  await expect(page.locator("[data-atropos-card]")).not.toHaveAttribute("data-atropos-ready");
  await expect(page.locator(".atropos-shadow")).toHaveCount(0);
  await expect(page.locator(".ambient-glow-primary")).toHaveCSS("animation-name", "none");
  await expect(page.getByRole("heading", { level: 2, name: "Experience" })).toBeVisible();

  const networkRequests = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .map(({ name }) => name)
      .filter((name) =>
        /(?:vanta(?:\.net|-three)|three\.module|ScrollTrigger|lenis|atropos|\/index\.[^/]+\.js$)/i.test(
          name,
        ),
      ),
  );

  expect(networkRequests).toEqual([]);
});

test("runs the desktop background system and destroys it on mobile", async ({ page }) => {
  const pageErrors: Error[] = [];
  page.on("pageerror", (error) => pageErrors.push(error));

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  const background = page.locator("[data-network-background]");

  await expect(background.locator("canvas")).toHaveCount(1, {
    timeout: 10_000,
  });
  await expect(background).toHaveAttribute("data-network-ready", "true");
  await expect(page.locator("body")).toHaveAttribute("data-motion-mode", "desktop");
  await expect(page.locator("body")).toHaveAttribute("data-lenis-ready", "true");
  await expect(page.locator("body")).toHaveAttribute("data-scrolltrigger-ready", "true");

  const networkConfig = await background.evaluate((element) =>
    JSON.parse(element.getAttribute("data-network-config") ?? "{}"),
  );

  expect(networkConfig).toMatchObject({
    backgroundAlpha: 0,
    gyroControls: false,
    maxDistance: 18,
    mouseControls: true,
    points: 7,
    provider: "vanta-net",
    spacing: 23,
    touchControls: false,
  });
  await expect(background).toHaveAttribute("data-network-provider", "vanta-net");

  await expect(page.locator("[data-cursor-spotlight]")).toHaveCount(0);
  const featuredCard = page.locator("[data-atropos-card]");
  await expect(featuredCard).toHaveCount(1);
  await expect(featuredCard).toHaveAttribute("data-atropos-ready", "true");
  await expect(featuredCard.locator(".atropos-shadow")).toHaveCount(1);

  await background.locator(".vanta-canvas").evaluate((canvas) => {
    canvas.setAttribute("data-smoke-canvas", "stable");
  });

  for (const [x, y] of [
    [1, 120],
    [1, 500],
    [1, 880],
    [1439, 120],
    [1439, 500],
    [1439, 880],
    [360, 1],
    [1080, 1],
    [360, 999],
    [1080, 999],
  ]) {
    await page.mouse.move(x, y);
    await page.waitForTimeout(80);
  }
  await page.mouse.move(720, 500);

  await expect(background.locator(".vanta-canvas")).toHaveCount(1);
  await expect(background.locator(".vanta-canvas")).toHaveAttribute("data-smoke-canvas", "stable");

  await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });

  for (const theme of ["skills", "experience", "projects"]) {
    await page
      .locator(`[data-background-theme="${theme}"]:not([data-network-background])`)
      .evaluate((element) => element.scrollIntoView({ block: "center" }));
    await expect(background).toHaveAttribute("data-background-theme", theme);
  }
  await expect(background).toHaveAttribute("data-network-color", "#a6e3a1");

  const atroposRotate = featuredCard.locator(".atropos-rotate");
  const firstAtroposTransform = await atroposRotate.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  const featuredCardBox = await featuredCard.boundingBox();
  expect(featuredCardBox).not.toBeNull();
  await page.mouse.move(
    featuredCardBox!.x + featuredCardBox!.width * 0.72,
    featuredCardBox!.y + featuredCardBox!.height * 0.28,
  );
  await expect
    .poll(() => atroposRotate.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe(firstAtroposTransform);

  await page.setViewportSize({ width: 800, height: 1000 });
  await expect(background.locator("canvas")).toHaveCount(0);
  await expect(background).toHaveAttribute("data-network-mode", "static");
  await expect(background).not.toHaveAttribute("data-network-config");
  await expect(background).not.toHaveAttribute("data-network-provider");
  await expect(background).toHaveAttribute("data-background-theme", "hero");
  await expect(page.locator("body")).toHaveAttribute("data-motion-mode", "static");
  await expect(page.locator("body")).not.toHaveAttribute("data-lenis-ready");
  await expect(featuredCard).not.toHaveAttribute("data-atropos-ready");
  await expect(featuredCard.locator(".atropos-shadow")).toHaveCount(0);

  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(background.locator(".vanta-canvas")).toHaveCount(1);
  await expect(page.locator("body")).toHaveAttribute("data-motion-mode", "desktop");
  await expect(featuredCard).toHaveAttribute("data-atropos-ready", "true");
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent("pagehide")));
  await expect(background.locator("canvas")).toHaveCount(0);
  await expect(background).toHaveAttribute("data-network-mode", "static");
  await expect(page.locator("body")).not.toHaveAttribute("data-lenis-ready");
  await expect(featuredCard).not.toHaveAttribute("data-atropos-ready");
  await page.evaluate(() =>
    window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })),
  );
  await expect(background.locator(".vanta-canvas")).toHaveCount(1);
  await expect(page.locator("body")).toHaveAttribute("data-motion-mode", "desktop");
  await expect(featuredCard).toHaveAttribute("data-atropos-ready", "true");
  expect(pageErrors).toEqual([]);
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

  await page.goto("/404.html");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);

  const missingResponse = await request.get("/missing-smoke-route");
  expect(missingResponse.status()).toBe(404);
  expect(await missingResponse.text()).toContain("Page not found");
});
