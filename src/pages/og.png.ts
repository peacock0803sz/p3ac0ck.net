import type { APIContext } from "astro";

import { SiteCard } from "../og/cards";
import { logoDataUri, pngResponse, renderPng } from "../og/render";

export async function GET({ url }: APIContext) {
  const png = await renderPng(
    SiteCard({ logo: await logoDataUri("studio-peacock-horizontal") }),
    url,
  );
  return pngResponse(png);
}
