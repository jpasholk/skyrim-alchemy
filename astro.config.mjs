import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  // TODO: Add URL here before deplying
  // site: '',
  integrations: [tailwind(), sitemap(), mdx()]
});