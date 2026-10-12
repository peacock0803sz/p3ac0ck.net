import { getCollection } from "astro:content";

import slides from "../slugs.json";

export interface Talk {
  slug: string;
  title: string;
  event: string;
  date: string;
  url: string;
  cover?: string;
  video?: string;
}

/**
 * The talks published on slides.p3ac0ck.net (src/slugs.json) with their
 * metadata from src/pages/talks.yaml, newest first.
 */
export async function getTalks(): Promise<Talk[]> {
  const entries = new Map(
    (await getCollection("talks")).map((entry) => [entry.id, entry.data]),
  );

  const published = new Set(slides.map((slide) => slide.slug));
  const unpublished = [...entries.keys()].filter((s) => !published.has(s));
  if (unpublished.length > 0) {
    throw new Error(
      `src/pages/talks.yaml has talks missing from src/slugs.json: ${unpublished.join(", ")}`,
    );
  }

  const talks: Talk[] = [];
  for (const slide of slides) {
    const data = entries.get(slide.slug);
    // Talks without metadata are published but not listed.
    if (!data) {
      console.warn(
        `${slide.slug} is not in src/pages/talks.yaml; skipping it.`,
      );
      continue;
    }

    // YAML dates are UTC midnight.
    const date = data.date?.toISOString().slice(0, 10) ?? slide.date;
    if (!date) {
      throw new Error(`${slide.slug} needs a date in src/pages/talks.yaml`);
    }

    talks.push({
      slug: slide.slug,
      title: data.title,
      event: data.event,
      date,
      url: slide.url,
      cover: slide.cover ?? undefined,
      video: data.video,
    });
  }
  return talks.sort((a, b) => b.date.localeCompare(a.date));
}
