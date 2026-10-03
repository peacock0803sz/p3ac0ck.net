import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetWind4,
} from "unocss";

export default defineConfig({
  presets: [presetAttributify(), presetTypography(), presetWind4()],
  theme: {
    // Values live in src/styles/theme.css so they can switch with the theme.
    colors: {
      surface: { DEFAULT: "var(--sp-surface)", 2: "var(--sp-surface-2)" },
      ink: { DEFAULT: "var(--sp-ink)", 2: "var(--sp-ink-2)" },
      line: "var(--sp-line)",
      bar: "var(--sp-bar)",
      "on-ink": "var(--sp-on-ink)",
      frame: { DEFAULT: "var(--sp-frame)", outer: "var(--sp-frame-outer)" },
    },
    font: {
      serif: "var(--font-cormorant)",
      "serif-jp": "var(--font-shippori)",
      sans: "var(--font-karla)",
      "sans-jp": "var(--font-zen-kaku)",
      mono: "var(--font-plex-mono)",
      emoji: "var(--font-noto-emoji)",
    },
  },
});
