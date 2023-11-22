import type { MDXInstance } from "astro";

export interface PostsFrontMatter {
  layout: string;
  title: string;
  lang: "en" | "ja";
  emoji: string;
  pubDate: string;
  description: string | null;
}

export interface Post extends MDXInstance<PostsFrontMatter> { }
