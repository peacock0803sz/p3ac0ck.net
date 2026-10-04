/**
 * Plain-text summary of a post body for meta descriptions: the first prose
 * paragraphs, skipping MDX imports, headings, code, lists and components.
 */
export function excerpt(markdown: string, length = 120) {
  const text = markdown
    .replace(/^```[\s\S]*?^```/gm, "")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(
      (block) =>
        block && !/^(import |export |#|[-*+] |\d+\. |>|\||<|:::)/.test(block),
    )
    .join(" ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const chars = [...text];
  return chars.length > length
    ? `${chars.slice(0, length).join("").trimEnd()}…`
    : text;
}
