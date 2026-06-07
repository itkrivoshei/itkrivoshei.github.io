import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://itkrivoshei.github.io",
  integrations: [sitemap()],
  vite: {
    build: {
      chunkSizeWarningLimit: 510,
    },
    plugins: [tailwindcss()],
  },
});
