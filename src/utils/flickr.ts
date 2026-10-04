// Fetches Flickr albums at build time. Needs FLICKR_API_KEY in the environment.
const userId = "186998966@N02"; // peacock0803sz
export const albumsUrl = "https://www.flickr.com/photos/peacock0803sz/albums";

export interface FlickrImage {
  src: string;
  srcset: string;
  width: number;
  height: number;
}

export interface FlickrAlbum {
  id: string;
  /** The album description, or the title after the date (e.g. "tokyo-sakura") when it has none. */
  title: string;
  date: string;
  url: string;
  photos: number;
  cover: FlickrImage;
}

export interface FlickrPickup {
  date: string;
  url: string;
  photos: number;
  /** The large photo, then two squares. */
  images: [FlickrImage, FlickrImage, FlickrImage];
}

interface Photoset {
  id: string;
  title: { _content: string };
  description: { _content: string };
  photos: number;
  primary_photo_extras?: {
    url_n?: string;
    url_z?: string;
    width_z?: number;
    height_z?: number;
  };
}

interface Photo {
  id: string;
  url_q: string;
  url_n: string;
  url_z: string;
  url_c: string;
  width_c: number;
  height_c: number;
}

// Album titles are named like "2025-04-05-tokyo-sakura"; others ("Foods", ...) are skipped.
const titlePattern = /^(\d{4}-\d{2}-\d{2})[-_](.+)$/;

const apiKey = import.meta.env.FLICKR_API_KEY;
if (!apiKey) {
  console.warn("FLICKR_API_KEY is not set; skipping Flickr albums.");
}

async function call<T>(method: string, params: Record<string, string>) {
  const query = new URLSearchParams({
    method,
    api_key: apiKey ?? "",
    format: "json",
    nojsoncallback: "1",
    ...params,
  });
  const res = await fetch(`https://api.flickr.com/services/rest/?${query}`);
  const data = (await res.json()) as
    ({ stat: "ok" } & T) | { stat: "fail"; message: string };
  if (!res.ok || data.stat !== "ok") {
    const reason = data.stat === "fail" ? data.message : res.status;
    throw new Error(`Flickr API ${method} failed: ${reason}`);
  }
  return data;
}

// The API returns descriptions HTML-escaped.
const entities: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  "#39": "'",
};
const decodeEntities = (text: string) =>
  text.replace(/&(amp|lt|gt|quot|#39);/g, (_, name: string) => entities[name]);

// Descriptions often start with the date ("2024/10/27 赤城山"), which is shown separately.
const leadingDatePattern = /^\s*\d{4}[-/]\d{1,2}[-/]\d{1,2}\s*/;

let albumsCache: Promise<FlickrAlbum[]> | undefined;

/** Albums named with a date, newest first. Empty when no API key is set. */
export const getAlbums = () => (albumsCache ??= fetchAlbums());

async function fetchAlbums(): Promise<FlickrAlbum[]> {
  if (!apiKey) return [];
  const data = await call<{ photosets: { photoset: Photoset[] } }>(
    "flickr.photosets.getList",
    { user_id: userId, per_page: "500", primary_photo_extras: "url_n,url_z" },
  );

  return data.photosets.photoset
    .flatMap(({ id, title, description, photos, primary_photo_extras: p }) => {
      const match = title._content.match(titlePattern);
      if (!match || !p?.url_n || !p.url_z) return [];
      return [
        {
          id,
          title:
            decodeEntities(description._content)
              .replace(leadingDatePattern, "")
              .trim() || match[2],
          date: match[1],
          url: `${albumsUrl}/${id}`,
          photos,
          cover: {
            src: p.url_z,
            srcset: `${p.url_n} 320w, ${p.url_z} 640w`,
            width: Number(p.width_z),
            height: Number(p.height_z),
          },
        },
      ];
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * An album with three of its photos: the given ones, or else the album's
 * cover followed by the first two others. Undefined when no API key is set.
 */
export async function getPickup(
  albumId: string,
  photoIds?: [string, string, string],
): Promise<FlickrPickup | undefined> {
  if (!apiKey) return undefined;
  const { photoset } = await call<{
    photoset: { title: string; primary: string; total: number; photo: Photo[] };
  }>("flickr.photosets.getPhotos", {
    photoset_id: albumId,
    user_id: userId,
    per_page: "500",
    extras: "url_q,url_n,url_z,url_c",
  });

  const byId = new Map(photoset.photo.map((p) => [p.id, p]));
  const ids = photoIds ?? [
    photoset.primary,
    ...photoset.photo.map((p) => p.id).filter((id) => id !== photoset.primary),
  ];
  const [cover, ...side] = ids.slice(0, 3).map((id) => {
    const photo = byId.get(id);
    if (!photo) throw new Error(`Photo ${id} is not in album ${albumId}`);
    return photo;
  });
  if (!cover || side.length < 2) {
    throw new Error(`Album ${albumId} has fewer than 3 photos`);
  }

  const date = photoset.title.match(titlePattern)?.[1];
  if (!date) throw new Error(`Album ${albumId} title has no date`);

  return {
    date,
    url: `${albumsUrl}/${albumId}`,
    photos: photoset.total,
    images: [
      {
        src: cover.url_c,
        srcset: `${cover.url_z} 640w, ${cover.url_c} 800w`,
        width: Number(cover.width_c),
        height: Number(cover.height_c),
      },
      ...(side.map((p) => ({
        src: p.url_n,
        srcset: `${p.url_q} 150w, ${p.url_n} 320w`,
        width: 150,
        height: 150,
      })) as [FlickrImage, FlickrImage]),
    ],
  };
}
