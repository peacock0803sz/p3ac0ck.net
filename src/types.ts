import type { MDXInstance } from "astro";

export interface PostsFrontMatter {
  layout: string;
  title: string;
  lang: "en" | "ja";
  emoji: string;
  published: string;
  description: string | null;
}

export interface Post extends MDXInstance<PostsFrontMatter> { }
