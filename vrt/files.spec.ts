import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { dist, ogImages, pages } from "./routes.ts";

// Pages and OG images that only one side has show up in the diff of this list.
test("routes", () => {
  const routes = [...pages, ...ogImages.map((file) => `/${file}`)].sort();
  expect(`${routes.join("\n")}\n`).toMatchSnapshot(["routes.txt"]);
});

// OG images are compared by pixels, so re-encoding alone is not a difference.
for (const file of ogImages) {
  test(`/${file}`, () => {
    const image = readFileSync(path.join(dist, file));
    expect(image).toMatchSnapshot(["og", ...file.split("/")]);
  });
}
