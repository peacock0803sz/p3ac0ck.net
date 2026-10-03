import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetWind4,
} from "unocss";

export default defineConfig({
  presets: [presetAttributify(), presetTypography(), presetWind4()],
  theme: {
    colors: {
      surface: { DEFAULT: "#FFFFFF", 2: "#F1F5F1" },
      ink: { DEFAULT: "#123D22", 2: "#4A6B52" },
      line: "#D6DDD0",
      code: {
        bg: "#F5F8F6",
        ink: "#1C2B22",
        muted: "#6E8577",
        key: "#1E6B45",
        str: "#F2D9A6",
      },
    },
    font: {
      serif: "var(--font-cormorant)",
      "serif-jp": "var(--font-shippori)",
      sans: "var(--font-karla)",
      "sans-jp": "var(--font-zen-kaku)",
      mono: "var(--font-fragment-mono)",
      code: "var(--font-plex-mono)",
      emoji: "var(--font-noto-emoji)",
    },
  },
});
