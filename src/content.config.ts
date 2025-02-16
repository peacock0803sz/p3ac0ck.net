import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/posts" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    emoji: z.string().emoji(),
    lang: z.enum(["en", "ja"]),
    pubDate: z.date(),
    description: z.string().optional(),
  }),
});

export const collections = { posts };
