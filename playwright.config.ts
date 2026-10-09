import { defineConfig } from "@playwright/test";

// Visual regression test, run by .github/workflows/vrt.yml in two passes that
// share one snapshot directory. Relative paths are resolved from this file.
// Start from an empty directory: no pass deletes stale snapshots.
//   rm -rf vrt/.snapshots
//   VRT_DIST=<base build> playwright test --update-snapshots=all
//   VRT_DIST=dist playwright test --update-snapshots=missing
const dist = process.env.VRT_DIST ?? "dist";
const snapshots = process.env.VRT_SNAPSHOTS ?? "vrt/.snapshots";
const port = Number(process.env.VRT_PORT ?? 4400);
const ci = !!process.env.CI;

const viewports = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1280, height: 800 },
};

export default defineConfig({
  testDir: "vrt",
  // No {platform}: both passes run on the same machine.
  snapshotPathTemplate: `${snapshots}/{projectName}/{arg}{ext}`,
  fullyParallel: true,
  forbidOnly: ci,
  retries: 0,
  workers: ci ? 4 : undefined,
  timeout: 120_000,
  globalTimeout: ci ? 600_000 : 0,
  reporter: ci
    ? [
        ["list"],
        ["html", { open: "never" }],
        ["json", { outputFile: "test-results/vrt.json" }],
      ]
    : [["list"], ["html"]],
  expect: {
    timeout: 15_000,
    // Both sides come from the same browser: count every changed pixel that
    // pixelmatch does not take for anti-aliasing (Playwright has no option to
    // include those). The default threshold (0.2) misses the faint colors of
    // src/styles/theme.css, such as --sp-line on --sp-surface.
    toHaveScreenshot: {
      stylePath: "vrt/screenshot.css",
      threshold: 0,
      maxDiffPixels: 0,
    },
    toMatchSnapshot: { threshold: 0, maxDiffPixels: 0 },
  },
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    serviceWorkers: "block",
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    locale: "ja-JP",
    timezoneId: "Asia/Tokyo",
    navigationTimeout: 30_000,
  },
  webServer: {
    command: "node vrt/serve.mjs",
    env: { VRT_DIST: dist, VRT_PORT: String(port) },
    url: `http://127.0.0.1:${port}/`,
    reuseExistingServer: false,
  },
  projects: [
    // OG images and the route list; no browser is launched.
    { name: "files", testMatch: "files.spec.ts" },
    ...Object.entries(viewports).flatMap(([device, viewport]) =>
      (["light", "dark"] as const).map((colorScheme) => ({
        name: `${device}-${colorScheme}`,
        testMatch: "pages.spec.ts",
        use: { viewport, colorScheme },
      })),
    ),
  ],
});
