import { loadDefaultJapaneseParser } from "budoux";

const parser = loadDefaultJapaneseParser();

const JAPANESE = /[\p{scx=Hira}\p{scx=Kana}\p{scx=Han}]/u;

/**
 * Offsets in `text` where a line may break between Japanese phrases.
 * Breaks between two non-Japanese characters are dropped so Latin words
 * are never split.
 */
export const phraseBoundaries = (text: string): number[] =>
  JAPANESE.test(text)
    ? parser
        .parseBoundaries(text)
        .filter((i) => JAPANESE.test(text[i - 1]) || JAPANESE.test(text[i]))
    : [];

/** Splits `text` into phrases that should stay on one line. */
export const phrases = (text: string): string[] => {
  const result: string[] = [];
  let start = 0;
  for (const i of phraseBoundaries(text)) {
    result.push(text.slice(start, i));
    start = i;
  }
  result.push(text.slice(start));
  return result;
};
