import { z, defineCollection } from "astro:content"

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    lang: z.enum(["en", "ja"]),
    emoji: z.string(),
    pubDate: z.string(),
    description: z.string().optional(),
  })
})

export const collections = {
  posts: postsCollection,
}
