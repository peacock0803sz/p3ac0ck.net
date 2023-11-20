import type { APIContext } from "astro";
import rss, { pagesGlobToRssItems } from "@astrojs/rss";

import { SiteName } from "../constants.ts";

export async function GET(context: APIContext) {
  const posts = await pagesGlobToRssItems(import.meta.glob("./posts/*.mdx"))
  return rss({
    title: SiteName,
    description: "Peacockが執筆した記事のフィード",
    site: context.site || "https://p3ac0ck.net" + "/posts",
    items: posts.map((p) => ({
      title: p.title,
      pubDate: p.pubDate,
      description: p.description,
      link: p.link
    })),
    customData: "<language>ja</language>",
  });
}
