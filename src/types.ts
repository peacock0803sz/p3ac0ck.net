import type { MDXInstance } from "astro";

export interface PostsFrontMatter {
  slug: string;
  layout: string;
  title: string;
  lang: "en" | "ja";
  emoji: string;
  pubDate: string;
  description: string | null;
  ogImage: string | null;
}

export interface Post extends MDXInstance<PostsFrontMatter> { }
