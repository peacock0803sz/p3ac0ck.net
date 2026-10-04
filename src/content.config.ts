import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
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

// Articles published on other sites, listed on /posts alongside our own.
const externalPosts = defineCollection({
  loader: file("./src/external-posts.yaml"),
  schema: z.object({
    // The article URL. The file loader uses `slug` as the entry id.
    slug: z.url(),
    title: z.string(),
    lang: z.enum(["en", "ja"]),
    pubDate: z.date(),
  }),
});

export const collections = { posts, externalPosts };
