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
  loader: file("./src/posts/_externals.yaml"),
  schema: z.object({
    // The article URL. The file loader uses `slug` as the entry id.
    slug: z.url(),
    title: z.string(),
    lang: z.enum(["en", "ja"]),
    pubDate: z.date(),
  }),
});

// Metadata of the talks in src/slugs.json, joined by src/utils/talks.ts.
const talks = defineCollection({
  loader: file("./src/pages/talks.yaml"),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    event: z.string(),
    video: z.url().optional(),
    date: z.date().optional(),
  }),
});

export const collections = { posts, externalPosts, talks };
