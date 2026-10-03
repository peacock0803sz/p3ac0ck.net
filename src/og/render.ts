import fs from "node:fs/promises";
import type { ReactElement } from "react";
import satori from "satori";
import sharp from "sharp";

// Resolved from the project root: import.meta.url points into the build output.
const read = (file: string) => fs.readFile(`./src/og/fonts/${file}`);

type Weight = 400 | 500 | 600;
type FontStyle = "normal" | "italic";

const fontFiles: [string, string, Weight, FontStyle][] = [
  ["Shippori Mincho", "ShipporiMincho-SemiBold.ttf", 600, "normal"],
  ["Newsreader", "Newsreader-Italic.ttf", 400, "italic"],
  ["Newsreader", "Newsreader-MediumItalic.ttf", 500, "italic"],
  ["Cormorant Garamond", "CormorantGaramond-MediumItalic.ttf", 500, "italic"],
  ["IBM Plex Mono", "IBMPlexMono-Medium.ttf", 500, "normal"],
  ["Fragment Mono", "FragmentMono-Regular.ttf", 400, "normal"],
  ["Noto Emoji", "NotoEmoji-Regular.ttf", 400, "normal"],
];

const fonts = Promise.all(
  fontFiles.map(async ([name, file, weight, style]) => ({
    name,
    data: await read(file),
    weight,
    style,
  })),
);

export const logoDataUri = async (name: string) =>
  `data:image/svg+xml;base64,${(await fs.readFile(`./src/assets/logos/${name}.svg`)).toString("base64")}`;

export async function renderPng(element: ReactElement) {
  const loaded = await fonts;
  const emoji = loaded.filter((f) => f.name === "Noto Emoji");
  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: loaded,
    // Draw emoji with the monochrome Noto Emoji instead of fetching images.
    loadAdditionalAsset: async (code) => (code === "emoji" ? emoji : []),
  });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Uint8Array(png.buffer as ArrayBuffer, png.byteOffset, png.length);
}

export const pngResponse = (png: Uint8Array<ArrayBuffer>) =>
  new Response(png, { headers: { "Content-Type": "image/png" } });
