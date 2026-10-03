import { SiteCard } from "../og/cards";
import { logoDataUri, pngResponse, renderPng } from "../og/render";

export async function GET() {
  const png = await renderPng(
    SiteCard({ logo: await logoDataUri("studio-peacock-horizontal") }),
  );
  return pngResponse(png);
}
