/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly FLICKR_API_KEY?: string;
}

declare module "rehype-accessible-emojis" {
  import type { Root } from "hast";
  import type { Plugin } from "unified";

  interface Options {
    ignore: string[];
  }

  export const rehypeAccessibleEmojis: Plugin<[Options?], Root>;
}
