// Reads a page's og:image at build time.
const cache = new Map<string, Promise<string | undefined>>();

/** The og:image (or twitter:image) URL of a page; undefined when it can't be read. */
export const getOgImage = (url: string) => {
  let image = cache.get(url);
  if (!image) {
    image = fetchOgImage(url);
    cache.set(url, image);
  }
  return image;
};

const metaPattern = /<meta\s[^>]*>/gi;
const keyPattern =
  /(?:property|name)\s*=\s*["'](?:og:image|twitter:image)["']/i;
const contentPattern = /content\s*=\s*["']([^"']+)["']/i;

async function fetchOgImage(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const content = html
      .match(metaPattern)
      ?.find((tag) => keyPattern.test(tag))
      ?.match(contentPattern)?.[1];
    if (!content) throw new Error("no og:image");
    return new URL(content.replaceAll("&amp;", "&"), url).href;
  } catch (error) {
    console.warn(`Could not read og:image of ${url}: ${String(error)}`);
    return undefined;
  }
}
