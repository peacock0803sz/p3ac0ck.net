import type { ShikiConfig } from "@astrojs/markdown-remark";

type ShikiTransformer = NonNullable<ShikiConfig["transformers"]>[number];

// Wraps each <pre> so the language label and copy button stay put while the
// code scrolls horizontally.
export const codeBlockTransformer: ShikiTransformer = {
  name: "code-block-wrapper",
  root(root) {
    return {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "div",
          properties: {
            className: ["code-block"],
            dataLanguage: this.options.lang,
          },
          children: root.children as never,
        },
      ],
    };
  },
};
