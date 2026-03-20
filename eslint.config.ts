import { defineConfig } from "eslint/config";
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.astro"],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^Props$",
        },
      ],
    },
  },
  {
    files: ["src/env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
]);
