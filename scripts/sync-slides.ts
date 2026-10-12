// Lists the talks published on slides.p3ac0ck.net into src/slugs.json, read by
// src/utils/talks.ts. Run weekly by .github/workflows/sync-slides.yml:
//   node scripts/sync-slides.ts
// The site has no index, so this reads talks/<date>_<name>/ in the slides repo.
// GITHUB_TOKEN is optional and only raises the API rate limit.
import { writeFile } from "node:fs/promises";

interface Tree {
  sha: string;
  tree: { path: string }[];
  truncated: boolean;
}

interface Package {
  scripts?: { build?: string };
}

interface Slide {
  slug: string;
  url: string;
  date: string | null;
  cover: string | null;
}

const repo = "peacock0803sz/slides";
const site = "https://slides.p3ac0ck.net";
const output = new URL("../src/slugs.json", import.meta.url);

const headers: Record<string, string> = process.env.GITHUB_TOKEN
  ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
  : {};

async function get<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`);
  return (await res.json()) as T;
}

const { sha, tree, truncated } = await get<Tree>(
  `https://api.github.com/repos/${repo}/git/trees/HEAD?recursive=1`,
  { headers },
);
if (truncated) throw new Error(`The tree of ${repo} is truncated`);

const paths = new Set(tree.map((entry) => entry.path));
const dirs = [...paths]
  .flatMap((p) => p.match(/^talks\/([^/]+)\/package\.json$/)?.[1] ?? [])
  .sort();

// Directories are named like "2024-09-07_odc2024"; some have no exact date ("2022-01-dd").
const dirPattern = /^(\d{4}-\d{2}-\w{2})_/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
// Where the build script puts the talk: Slidev's --base or Marp's --output.
const slugPattern = /--base \/([^/\s]+)\/|--output \.\.\/\.\.\/dist\/([^/\s]+)/;
// Marp writes one HTML per Markdown file, served without the extension.
const notSlides = new Set(["README", "CLAUDE", "GEMINI", "outline"]);

const slides: Slide[] = [];
for (const dir of dirs) {
  const pkg = await get<Package>(
    `https://raw.githubusercontent.com/${repo}/${sha}/talks/${dir}/package.json`,
  );
  const script = pkg.scripts?.build ?? "";
  const match = script.match(slugPattern);
  const slug = match?.[1] ?? match?.[2];
  if (!slug) throw new Error(`Cannot find the output path of talks/${dir}`);

  let url = `${site}/${slug}/`;
  if (script.startsWith("marp")) {
    const pagePattern = new RegExp(`^talks/${dir}/([^/]+)\\.md$`);
    const pages = [...paths]
      .flatMap((p) => p.match(pagePattern)?.[1] ?? [])
      .filter((name) => !notSlides.has(name));
    if (pages.length !== 1) {
      throw new Error(`talks/${dir} has ${pages.length} Marp slides`);
    }
    url += pages[0];
  }

  const date = dir.match(dirPattern)?.[1];
  slides.push({
    slug,
    url,
    date: date && datePattern.test(date) ? date : null,
    cover: paths.has(`talks/${dir}/public/cover.png`)
      ? `${site}/${slug}/cover.png`
      : null,
  });
}

await writeFile(output, `${JSON.stringify(slides, null, 2)}\n`);
console.log(`Wrote ${slides.length} talks to ${output.pathname}`);
