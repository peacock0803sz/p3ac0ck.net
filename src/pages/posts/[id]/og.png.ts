import { getCollection, type CollectionEntry } from "astro:content";

import { format } from "date-fns";

import { PostCard } from "../../../og/cards";
import { logoDataUri, pngResponse, renderPng } from "../../../og/render";

interface Props {
  params: { id: string };
  props: { post: CollectionEntry<"posts"> };
}

export async function GET({ props }: Props) {
  const { post } = props;
  const png = await renderPng(
    PostCard({
      title: post.data.title,
      emoji: post.data.emoji,
      date: format(post.data.pubDate, "yyyy.MM.dd"),
      seal: await logoDataUri("kujakuya-horizontal"),
    }),
  );
  return pngResponse(png);
}

export async function getStaticPaths() {
  const posts = await getCollection("posts");
  return posts.map((post) => ({
    params: { id: post.id },
    props: { post },
  }));
}
