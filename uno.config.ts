import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetWebFonts,
  presetWind4,
} from "unocss";

export default defineConfig({
  presets: [
    presetAttributify(),
    presetTypography(),
    presetWebFonts({
      provider: "google",
      fonts: {
        "sans-serif": ["IBM Plex Sans JP"],
        "Carter One": ["Carter One"],
      },
    }),
    presetWind4(),
  ],
});
