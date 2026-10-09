import { expect, test, type Page } from "@playwright/test";
import { pages } from "./routes.ts";

// Taller pages are captured in segments, as Chromium may not capture more
// than 16384px at once.
const maxHeight = 16_000;
const segmentHeight = 8_000;
// An assertion may take several full-page captures of a long page.
const screenshotTimeout = 60_000;

// A transparent 1x1 PNG, served for every external image.
const placeholder = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64",
);

type Clip = { x: number; y: number; width: number; height: number };

test.beforeEach(async ({ context }) => {
  // Only the local build is reachable. External images still load, so that
  // `onerror` handlers (src/components/TalkCard.astro) keep the same DOM.
  await context.route(
    (url) => url.hostname !== "127.0.0.1",
    (route) =>
      route.request().resourceType() === "image"
        ? route.fulfill({ contentType: "image/png", body: placeholder })
        : route.abort(),
  );
});

for (const path of pages) {
  test(path, async ({ page, colorScheme }) => {
    await open(page, path, colorScheme);
    const { width, height } = await page.evaluate(fullPageSize);
    const capture = (file: string, clip?: Clip) =>
      expect.soft(page).toHaveScreenshot(snapshot(path, file), {
        fullPage: true,
        clip,
        timeout: screenshotTimeout,
      });
    if (height <= maxHeight) {
      await capture("page.png");
    } else {
      for (let y = 0, i = 1; y < height; y += segmentHeight, i++) {
        const h = Math.min(segmentHeight, height - y);
        await capture(`page-${i}.png`, { x: 0, y, width, height: h });
      }
    }
    // Pass 2 writes the snapshots that pass 1 did not take instead of failing,
    // so a page that gains or loses segments is caught by its height.
    expect.soft(`${height}\n`).toMatchSnapshot(snapshot(path, "height.txt"));
  });
}

test("menu", async ({ page, colorScheme, viewport }) => {
  test.skip(
    (viewport?.width ?? 0) >= 768,
    "The menu button is hidden from md up",
  );
  await open(page, "/", colorScheme);
  // Open the popover without a click, which would leave hover and focus styles.
  await page.evaluate(() => {
    const menu = document.getElementById("site-menu");
    if (!menu) throw new Error("#site-menu not found");
    menu.showPopover();
  });
  await expect(page.locator("#site-menu")).toBeVisible();
  // The menu may use font faces that the page did not.
  expect(await page.evaluate(settle), "web fonts that failed").toEqual([]);
  await expect.soft(page).toHaveScreenshot(["menu.png"]);
});

/** Snapshot path segments of a page: "/posts/x/" has pages/posts/x/<file>. */
function snapshot(path: string, file: string) {
  return ["pages", ...path.split("/").filter(Boolean), file];
}

async function open(page: Page, path: string, colorScheme: string | null) {
  const response = await page.goto(path, { waitUntil: "load" });
  expect(response?.status(), `HTTP status of ${path}`).toBe(200);
  // The theme follows prefers-color-scheme (src/layouts/Base.astro).
  const theme = colorScheme === "dark" ? "dark" : "light";
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  expect(await page.evaluate(settle), "web fonts that failed").toEqual([]);
}

// The functions below run in the page.

/** Loads every image and web font, and returns the fonts that failed. */
async function settle() {
  const images = Array.from(document.images);
  for (const image of images) {
    image.loading = "eager";
    image.decoding = "sync";
  }
  await Promise.all(
    images.map(
      (image) =>
        image.complete ||
        new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        }),
    ),
  );
  await Promise.all(
    images.map(
      (image) => image.naturalWidth > 0 && image.decode().catch(() => {}),
    ),
  );
  await document.fonts.ready;
  const failed: string[] = [];
  document.fonts.forEach((font) => {
    // Astro's metric fallbacks ("<family> fallback: Arial") only have local()
    // sources, which the Linux runner does not have.
    if (font.status === "error" && !font.family.includes(" fallback: ")) {
      failed.push(`${font.family} ${font.weight}`);
    }
  });
  await new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve)),
  );
  return failed;
}

/** The size that Playwright captures for a full-page screenshot. */
function fullPageSize() {
  const { body, documentElement: root } = document;
  return {
    width: Math.max(
      body.scrollWidth,
      body.offsetWidth,
      body.clientWidth,
      root.scrollWidth,
      root.offsetWidth,
      root.clientWidth,
    ),
    height: Math.max(
      body.scrollHeight,
      body.offsetHeight,
      body.clientHeight,
      root.scrollHeight,
      root.offsetHeight,
      root.clientHeight,
    ),
  };
}
