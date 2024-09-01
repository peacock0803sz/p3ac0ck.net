import { type CollectionEntry, getCollection } from "astro:content";
import { ImageResponse } from "@vercel/og";
import fs from "fs";
import path from "path";

interface Props {
  params: { slug: string };
  props: { post: CollectionEntry<"post"> };
}

export async function GET({ props }: Props) {
  const { post } = props;
  const html = {type: "div", props: {
    children: [{
      type: "h1",
      props: {children: post.data.title}
    }]
  }};
  const ibmPlexSansJP = fs.readFileSync(
    path.resolve("../../../../fonts/ibm-plex-sans-jp-japanese-400-normal.ttf"),
  );

  return new ImageResponse(html, {
    width: 1200,
    height: 600,
    fonts: [{ name: "IBM Plex Sans JP", data: ibmPlexSansJP, style: "normal" }],
  });
}

export async function getStaticPaths() {
  const posts: unknown[] = await getCollection("post");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
