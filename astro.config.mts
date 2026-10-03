import { defineConfig, fontProviders } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import UnoCSS from "unocss/astro";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";

import remarkToc from "remark-toc";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";

import { rehypeNumericColumns } from "./src/plugins/rehype-numeric-columns";
import { rehypeTocNav } from "./src/plugins/rehype-toc-nav";
import { codeBlockTransformer } from "./src/plugins/shiki-code-block";

// Google Fonts splits CJK fonts into unicode-range chunks labeled "[0]", "[1]", ...
// Astro only keeps "latin" by default, which drops all Japanese glyphs.
const numberedSubsets = Array.from({ length: 130 }, (_, i) => `[${i}]`);
const cjkSubsets: [string, ...string[]] = [
  "latin",
  "latin-ext",
  "cyrillic",
  "cyrillic-ext",
  ...numberedSubsets,
];

// https://astro.build/config
export default defineConfig({
  site: "https://p3ac0ck.net",
  integrations: [mdx(), sitemap(), UnoCSS(), react(), partytown()],

  markdown: {
    remarkPlugins: [[remarkToc, { heading: "目次" }]],
    rehypePlugins: [
      rehypeHeadingIds,
      rehypeAccessibleEmojis,
      rehypeTocNav,
      rehypeNumericColumns,
    ],
    remarkRehype: {
      footnoteLabel: "Notes",
      footnoteLabelTagName: "p",
      footnoteLabelProperties: { className: ["footnotes-label"] },
    },
    shikiConfig: {
      // Colors are emitted as --shiki-light / --shiki-dark and picked in markdown.css.
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
      transformers: [codeBlockTransformer],
    },
  },
  fonts: [
    {
      name: "Cormorant Garamond",
      cssVariable: "--font-cormorant",
      weights: [500, 600, 700],
      styles: ["normal", "italic"],
      fallbacks: ["serif"],
      provider: fontProviders.google(),
    },
    {
      name: "Karla",
      cssVariable: "--font-karla",
      weights: [400, 500],
      fallbacks: ["sans-serif"],
      provider: fontProviders.google(),
    },
    {
      name: "Shippori Mincho",
      cssVariable: "--font-shippori",
      weights: [500, 600, 700],
      subsets: cjkSubsets,
      // Fallback metrics derived from CJK glyphs blow up non-Japanese scripts (~220%).
      optimizedFallbacks: false,
      fallbacks: ["serif"],
      provider: fontProviders.google(),
    },
    {
      name: "Zen Kaku Gothic New",
      cssVariable: "--font-zen-kaku",
      weights: [400, 500],
      subsets: cjkSubsets,
      // Fallback metrics derived from CJK glyphs blow up non-Japanese scripts (~220%).
      optimizedFallbacks: false,
      fallbacks: ["sans-serif"],
      provider: fontProviders.google(),
    },
    {
      name: "IBM Plex Mono",
      cssVariable: "--font-plex-mono",
      weights: [400, 500],
      fallbacks: ["monospace"],
      provider: fontProviders.google(),
    },
    {
      name: "Noto Emoji",
      cssVariable: "--font-noto-emoji",
      weights: [400],
      subsets: ["emoji", ...numberedSubsets] as [string, ...string[]],
      fallbacks: [],
      provider: fontProviders.google(),
    },
  ],
});
