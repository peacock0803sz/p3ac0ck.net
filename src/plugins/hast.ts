// Minimal hast shapes; @types/hast is not a direct dependency.
export interface Text {
  type: "text";
  value: string;
}
export interface Element {
  type: "element";
  tagName: string;
  properties: Record<string, unknown>;
  children: ElementContent[];
}
export type ElementContent = Element | Text | { type: "comment" | "raw" };
export type RootContent = ElementContent | { type: "doctype" };
export interface Root {
  type: "root";
  children: RootContent[];
}

export const textOf = (node: ElementContent): string =>
  node.type === "text"
    ? node.value
    : node.type === "element"
      ? node.children.map(textOf).join("")
      : "";

export const isElement = (
  node: RootContent | ElementContent | undefined,
): node is Element => node?.type === "element";
