import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import UnoCSS from "unocss/astro";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";

import remarkToc from "remark-toc";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";

// https://astro.build/config
export default defineConfig({
  site: "https://p3ac0ck.net",
  integrations: [mdx(), sitemap(), UnoCSS(), react(), partytown()],
  markdown: {
    remarkPlugins: [[remarkToc, { heading: "目次" }]],
    rehypePlugins: [rehypeHeadingIds, rehypeAccessibleEmojis],
  },
});
