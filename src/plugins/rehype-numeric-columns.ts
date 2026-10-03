import { type Element, type Root, isElement, textOf } from "./hast";

const NUMERIC = /^[\d.,+~-]+$/;

const childElements = (node: Element, tagName: string) =>
  node.children.filter(
    (child): child is Element => isElement(child) && child.tagName === tagName,
  );

const walk = (node: Root | Element, visit: (el: Element) => void) => {
  for (const child of node.children) {
    if (!isElement(child)) continue;
    visit(child);
    walk(child, visit);
  }
};

/**
 * Adds `class="num"` to every cell of table columns whose body cells are all
 * short numbers, so they can be centered without touching the markdown.
 */
export function rehypeNumericColumns() {
  return (tree: Root) => {
    walk(tree, (table) => {
      if (table.tagName !== "table") return;
      const rows = table.children
        .filter(isElement)
        .flatMap((section) => childElements(section, "tr"));
      const bodyRows = table.children
        .filter((s): s is Element => isElement(s) && s.tagName === "tbody")
        .flatMap((tbody) => childElements(tbody, "tr"));
      if (bodyRows.length === 0) return;

      const cellsOf = (row: Element) =>
        row.children.filter(
          (c): c is Element =>
            isElement(c) && (c.tagName === "td" || c.tagName === "th"),
        );
      const columns = cellsOf(bodyRows[0]).map((_, i) => i);
      const numeric = columns.filter((i) =>
        bodyRows.every((row) => {
          const cell = cellsOf(row)[i];
          return cell !== undefined && NUMERIC.test(textOf(cell).trim());
        }),
      );

      for (const row of rows) {
        const cells = cellsOf(row);
        for (const i of numeric) {
          const cell = cells[i];
          if (!cell) continue;
          const className = (cell.properties.className as string[]) ?? [];
          cell.properties.className = [...className, "num"];
        }
      }
    });
  };
}
