// @ts-check
import { defineConfig } from 'astro/config';

// Served from GitHub Pages at https://ruffolo2002.github.io/impact-2027-prototype/
// Every internal link goes through `href()` in src/lib/site.ts so the base
// prefix is applied in one place.
export default defineConfig({
  site: 'https://ruffolo2002.github.io',
  base: '/impact-2027-prototype',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
