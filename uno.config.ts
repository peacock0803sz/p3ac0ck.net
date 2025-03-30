import presetAttributify from "@unocss/preset-attributify";
import presetTypography from "@unocss/preset-typography";
import presetWebFonts from "@unocss/preset-web-fonts";
import presetWind4 from "@unocss/preset-wind4";
import { defineConfig } from "unocss";

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
