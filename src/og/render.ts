import fs from "node:fs/promises";
import { experimental_getFontFileURL, fontData } from "astro:assets";
import type { ReactElement } from "react";
import satori, { type Font } from "satori";
import sharp from "sharp";

// TTF families registered for OG images in astro.config.mts.
const ogFamilies = {
  "--og-shippori": "Shippori Mincho",
  "--og-newsreader": "Newsreader",
  "--og-cormorant": "Cormorant Garamond",
  "--og-plex-mono": "IBM Plex Mono",
  "--og-noto-emoji": "Noto Emoji",
} as const;

let fonts: Promise<Font[]> | undefined;

// Fetched from Astro's font server once per build; each subset becomes its own
// entry and satori falls back across them per glyph.
function loadFonts(requestUrl: URL) {
  fonts ??= Promise.all(
    Object.entries(ogFamilies).flatMap(([cssVariable, name]) =>
      fontData[cssVariable as keyof typeof fontData].map(async (face) => {
        const url = experimental_getFontFileURL(face.src[0].url, requestUrl);
        const data = await fetch(url).then((res) => res.arrayBuffer());
        return {
          name,
          data,
          weight: Number(face.weight) as Font["weight"],
          style: face.style as Font["style"],
        };
      }),
    ),
  );
  return fonts;
}

// The logos use currentColor for the site theme; OG cards are always light.
export async function logoDataUri(name: string) {
  const svg = (
    await fs.readFile(`./src/assets/logos/${name}.svg`, "utf8")
  ).replaceAll("currentColor", "#123D22");
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export async function renderPng(element: ReactElement, requestUrl: URL) {
  const loaded = await loadFonts(requestUrl);
  const emoji = loaded.filter((f) => f.name === "Noto Emoji");
  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: loaded,
    // Draw emoji with the monochrome Noto Emoji instead of fetching images.
    loadAdditionalAsset: (code) =>
      Promise.resolve(code === "emoji" ? emoji : []),
  });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return Uint8Array.from(png);
}

export const pngResponse = (png: Uint8Array<ArrayBuffer>) =>
  new Response(png, { headers: { "Content-Type": "image/png" } });
