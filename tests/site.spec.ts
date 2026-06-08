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
  await expect(page.locator(".network-pattern")).toHaveCount(0);

  await context.close();
});

test("does not initialize the WebGL network on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const background = page.locator("[data-network-background]");

  await expect(background.locator("canvas")).toHaveCount(0);
  await expect(background).toHaveAttribute("data-network-mode", "static");
  await expect(page.locator("body")).toHaveAttribute("data-motion-mode", "static");
  await expect(page.locator(".ambient-glow")).toHaveCSS("animation-name", "none");

  const networkRequests = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .map(({ name }) => name)
      .filter((name) =>
        /(?:vanta(?:\.net|-three)|three\.module|ScrollTrigger|lenis|\/index\.[^/]+\.js$)/i.test(
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
  await expect(page.locator("body")).toHaveAttribute("data-motion-mode", "static");
  await expect(page.locator(".ambient-glow")).toHaveCSS("animation-name", "none");
  await expect(page.getByRole("heading", { level: 2, name: "Experience" })).toBeVisible();

  const networkRequests = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .map(({ name }) => name)
      .filter((name) =>
        /(?:vanta(?:\.net|-three)|three\.module|ScrollTrigger|lenis|\/index\.[^/]+\.js$)/i.test(
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
    maxDistance: 17,
    mouseControls: false,
    points: 6,
    provider: "vanta-net",
    spacing: 26,
    touchControls: false,
  });
  await expect(background).toHaveAttribute("data-network-provider", "vanta-net");

  await expect(page.locator("[data-cursor-spotlight]")).toHaveCount(0);
  await expect(page.locator(".network-pattern")).toHaveCount(0);
  await expect(page.locator("[data-background-theme]")).toHaveCount(0);

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

  await page.setViewportSize({ width: 800, height: 1000 });
  await expect(background.locator("canvas")).toHaveCount(0);
  await expect(background).toHaveAttribute("data-network-mode", "static");
  await expect(background).not.toHaveAttribute("data-network-config");
  await expect(background).not.toHaveAttribute("data-network-provider");
  await expect(page.locator("body")).toHaveAttribute("data-motion-mode", "static");
  await expect(page.locator("body")).not.toHaveAttribute("data-lenis-ready");

  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(background.locator(".vanta-canvas")).toHaveCount(1);
  await expect(page.locator("body")).toHaveAttribute("data-motion-mode", "desktop");
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent("pagehide")));
  await expect(background.locator("canvas")).toHaveCount(0);
  await expect(background).toHaveAttribute("data-network-mode", "static");
  await expect(page.locator("body")).not.toHaveAttribute("data-lenis-ready");
  await page.evaluate(() =>
    window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })),
  );
  await expect(background.locator(".vanta-canvas")).toHaveCount(1);
  await expect(page.locator("body")).toHaveAttribute("data-motion-mode", "desktop");
  expect(pageErrors).toEqual([]);
});

test("keeps project card links clickable and section containers visible", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  const projectsHeading = page.getByRole("heading", {
    level: 2,
    name: "Selected Engineering Work",
  });
  await projectsHeading.scrollIntoViewIfNeeded();

  const featuredProject = page.locator(".project-card-featured");
  const repositoryLink = featuredProject.locator('.project-links a[data-link-type="repository"]');
  const livePreviewLink = featuredProject.locator('.project-links a[data-link-type="site"]');

  await expect(featuredProject).toBeVisible();
  await expect(featuredProject).toHaveCSS("pointer-events", "auto");
  await expect(repositoryLink).toBeVisible();
  await expect(livePreviewLink).toBeVisible();
  expect(
    await featuredProject
      .locator(".project-copy")
      .evaluate((element) => getComputedStyle(element, "::after").pointerEvents),
  ).toBe("none");

  for (const layer of await page.locator("[data-network-background] > div").all()) {
    await expect(layer).toHaveCSS("pointer-events", "none");
  }

  for (const link of [repositoryLink, livePreviewLink]) {
    const hitTargetHref = await link.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return document
        .elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2)
        ?.closest("a")?.href;
    });
    expect(hitTargetHref).toBe(
      await link.getAttribute("href").then((href) => new URL(href!, page.url()).href),
    );
  }

  await page.evaluate(() => {
    const clicks: Array<{ defaultPrevented: boolean; href: string }> = [];
    Object.assign(window, { projectLinkClicks: clicks });
    document.addEventListener("click", (event) => {
      const link = (event.target as Element).closest("a");
      if (!link?.closest(".project-card")) return;
      clicks.push({ defaultPrevented: event.defaultPrevented, href: link.href });
      event.preventDefault();
    });
  });

  const featuredBox = await featuredProject.boundingBox();
  expect(featuredBox).not.toBeNull();
  for (const xRatio of [0.2, 0.45, 0.7]) {
    await page.mouse.move(
      featuredBox!.x + featuredBox!.width * xRatio,
      featuredBox!.y + featuredBox!.height * 0.5,
    );
    await expect(featuredProject).toHaveCSS("transform", /matrix/);
    expect(await featuredProject.evaluate((element) => element.matches(":hover"))).toBe(true);
  }

  await livePreviewLink.click();
  await repositoryLink.focus();
  await expect(repositoryLink).toBeFocused();
  await page.keyboard.press("Enter");

  const projectLinkClicks = await page.evaluate(
    () =>
      (
        window as typeof window & {
          projectLinkClicks: Array<{ defaultPrevented: boolean; href: string }>;
        }
      ).projectLinkClicks,
  );
  expect(projectLinkClicks).toHaveLength(2);
  expect(projectLinkClicks.every(({ defaultPrevented }) => !defaultPrevented)).toBe(true);

  for (const section of await page.locator(".section-block").all()) {
    await expect(section).toBeVisible();
    await expect(section).toHaveCSS("opacity", "1");
    expect((await section.boundingBox())?.height).toBeGreaterThan(100);
  }
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
