import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/posts" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    emoji: z.emoji(),
    lang: z.enum(["en", "ja"]),
    pubDate: z.date(),
    description: z.string().optional(),
  }),
});

export const collections = { posts };
