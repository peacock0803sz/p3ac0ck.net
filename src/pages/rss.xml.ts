import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

import { compareDesc } from "date-fns";

import { SiteName } from "../constants.ts";
import { excerpt } from "../utils/excerpt";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");
  return rss({
    title: SiteName,
    description: "Peacockが執筆した記事のフィード",
    site: context.site ?? "https://p3ac0ck.net",
    items: posts
      .sort((a, b) => compareDesc(a.data.pubDate, b.data.pubDate))
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description ?? excerpt(post.body ?? ""),
        link: `/posts/${post.id}/`,
      })),
    customData: "<language>ja</language>",
  });
}
