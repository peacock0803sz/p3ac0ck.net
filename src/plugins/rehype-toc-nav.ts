import { type Element, type Root, isElement, textOf } from "./hast";

const TOC_HEADING = "目次";
const HEADING = /^h[1-6]$/;

/**
 * Wraps the heading generated for remark-toc ("# 目次") and the list after it
 * into `<nav class="toc">`, replacing the heading with a "Contents" label.
 */
export function rehypeTocNav() {
  return (tree: Root) => {
    const children = tree.children;
    const start = children.findIndex(
      (node) =>
        isElement(node) &&
        HEADING.test(node.tagName) &&
        textOf(node).trim() === TOC_HEADING,
    );
    if (start === -1) return;

    let end = start + 1;
    while (end < children.length && !isElement(children[end])) end++;
    const list = children[end];
    if (!isElement(list) || list.tagName !== "ul") return;

    const nav: Element = {
      type: "element",
      tagName: "nav",
      properties: { className: ["toc"], ariaLabel: "Contents" },
      children: [
        {
          type: "element",
          tagName: "p",
          properties: { className: ["toc-label"] },
          children: [{ type: "text", value: "Contents" }],
        },
        list,
      ],
    };
    children.splice(start, end - start + 1, nav);
  };
}
