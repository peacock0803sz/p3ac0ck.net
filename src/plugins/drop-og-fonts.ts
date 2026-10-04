import fs from "node:fs/promises";
import type { AstroIntegration } from "astro";

/**
 * The TTF families in `fonts` exist only to render OG images at build time;
 * no page links them, so remove them from the output instead of deploying ~10MB.
 */
export function dropOgFonts(): AstroIntegration {
  return {
    name: "drop-og-fonts",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const fontsDir = new URL("_astro/fonts/", dir);
        const files = await fs.readdir(fontsDir).catch(() => []);
        const ttf = files.filter((f) => f.endsWith(".ttf"));
        await Promise.all(ttf.map((f) => fs.rm(new URL(f, fontsDir))));
        logger.info(`Removed ${ttf.length} OG-only font files`);
      },
    },
  };
}
