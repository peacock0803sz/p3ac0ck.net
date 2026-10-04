import { phraseBoundaries } from "../utils/budoux";
import {
  type Element,
  type ElementContent,
  type Root,
  type Text,
  isElement,
} from "./hast";

// Inline elements whose text belongs to the surrounding sentence.
const INLINE = new Set([
  "a",
  "abbr",
  "b",
  "bdi",
  "bdo",
  "cite",
  "data",
  "del",
  "dfn",
  "em",
  "i",
  "ins",
  "mark",
  "q",
  "s",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "time",
  "u",
  "var",
]);
// Elements whose text must not get line break hints.
const SKIP = new Set([
  "code",
  "kbd",
  "math",
  "pre",
  "samp",
  "script",
  "style",
  "svg",
]);

type Parent = Root | Element;
interface Run {
  node: Text;
  parent: Parent;
}

const wbr = (): Element => ({
  type: "element",
  tagName: "wbr",
  properties: {},
  children: [],
});

/**
 * Inserts `<wbr>` between Japanese phrases found by BudouX. Each sentence is
 * parsed as a whole, so phrases spanning links or emphasis are kept intact.
 * Pair with `word-break: keep-all` so lines only break at these hints.
 */
export function rehypeBudoux() {
  return (tree: Root) => {
    const replacements = new Map<
      Text,
      { parent: Parent; nodes: ElementContent[] }
    >();
    let run: Run[] = [];

    const flush = () => {
      const text = run.map((r) => r.node.value).join("");
      const boundaries = phraseBoundaries(text);
      let start = 0;
      for (const { node, parent } of run) {
        const end = start + node.value.length;
        const cuts = boundaries.filter((b) => b >= start && b < end);
        if (cuts.length > 0) {
          const nodes: ElementContent[] = [];
          let prev = start;
          for (const cut of cuts) {
            if (cut > prev) {
              nodes.push({ type: "text", value: text.slice(prev, cut) });
            }
            nodes.push(wbr());
            prev = cut;
          }
          nodes.push({ type: "text", value: text.slice(prev, end) });
          replacements.set(node, { parent, nodes });
        }
        start = end;
      }
      run = [];
    };

    const walk = (parent: Parent) => {
      for (const child of parent.children) {
        if (child.type === "text") {
          run.push({ node: child, parent });
        } else if (isElement(child)) {
          if (INLINE.has(child.tagName)) {
            walk(child);
          } else {
            flush();
            if (!SKIP.has(child.tagName)) walk(child);
            flush();
          }
        }
      }
    };
    walk(tree);
    flush();

    for (const [node, { parent, nodes }] of replacements) {
      const children = parent.children as ElementContent[];
      children.splice(children.indexOf(node), 1, ...nodes);
    }
  };
}
