import { getCollection, type CollectionEntry } from "astro:content";

import fs from "fs/promises";
import * as react from "react";
import satori from "satori";
import sharp from "sharp";
import { tailwindToCSS, type TailwindConfig } from "tw-to-css";

import OGImage from "../../../components/OGImage";

interface Props {
  params: { id: string };
  props: { post: CollectionEntry<"posts"> };
}

const { twj } = tailwindToCSS({
  config: (await import("../../../../tailwind.config.mjs"))
    .default as TailwindConfig,
});

// ref: https://skyfall.dev/posts/satori-with-tailwind-config
function inlineTailwind(el: react.JSX.Element): react.JSX.Element {
  const { tw, children, style: originalStyle, ...props } = el.props;
  // Generate style from the `tw` prop
  const twStyle = tw ? twj(tw.split(" ")) : {};
  // Merge original and generated styles
  const mergedStyle = { ...originalStyle, ...twStyle };
  // Recursively process children
  const processedChildren = react.Children.map(children, (child) =>
    react.isValidElement(child)
      ? inlineTailwind(child as react.JSX.Element)
      : child,
  );
  // Return cloned element with updated props
  return react.cloneElement(
    el,
    { ...props, style: mergedStyle },
    processedChildren,
  );
}

export async function SVG(component: any) {
  return await satori(component, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "IBMPlexSansJP",
        data: await fs.readFile(
          "./public/fonts/IBM_Plex_Sans_JP/IBMPlexSansJP-Thin.ttf",
        ),
        weight: 200,
      },
      {
        name: "IBMPlexSansJP",
        data: await fs.readFile(
          "./public/fonts/IBM_Plex_Sans_JP/IBMPlexSansJP-Light.ttf",
        ),
        weight: 300,
      },
      {
        name: "IBMPlexSansJP",
        data: await fs.readFile(
          "./public/fonts/IBM_Plex_Sans_JP/IBMPlexSansJP-Regular.ttf",
        ),
        weight: 400,
      },
      {
        name: "IBMPlexSansJP",
        data: await fs.readFile(
          "./public/fonts/IBM_Plex_Sans_JP/IBMPlexSansJP-Medium.ttf",
        ),
        weight: 500,
      },
      {
        name: "IBMPlexSansJP",
        data: await fs.readFile(
          "./public/fonts/IBM_Plex_Sans_JP/IBMPlexSansJP-SemiBold.ttf",
        ),
        weight: 600,
      },
      {
        name: "IBMPlexSansJP",
        data: await fs.readFile(
          "./public/fonts/IBM_Plex_Sans_JP/IBMPlexSansJP-Bold.ttf",
        ),
        weight: 700,
      },
    ],
  });
}

export async function PNG(component: any) {
  return await sharp(Buffer.from(await SVG(component)))
    .png()
    .toBuffer();
}

export async function GET({ props }: Props) {
  const { post } = props;
  const element = OGImage(post);

  const png = await PNG(inlineTailwind(element));
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
}

export async function getStaticPaths() {
  const posts = await getCollection("posts");
  return posts.map((post) => ({
    params: { id: post.id },
    props: { post },
  }));
}
