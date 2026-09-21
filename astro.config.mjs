import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://krivoshei.dev",
  integrations: [sitemap()],
  vite: {
    build: {
      chunkSizeWarningLimit: 510,
    },
    plugins: [tailwindcss()],
  },
});
