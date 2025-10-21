import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetWind4,
} from "unocss";

export default defineConfig({
  presets: [
    presetAttributify(),
    presetTypography(),
    presetWind4(),
  ],
});
