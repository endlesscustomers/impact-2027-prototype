// @ts-check
import { defineConfig } from 'astro/config';

// Served from GitHub Pages at https://endlesscustomers.github.io/impact-2027-prototype/
// Every internal link goes through `href()` in src/lib/site.ts so the base
// prefix is applied in one place.
export default defineConfig({
  site: 'https://endlesscustomers.github.io',
  base: '/impact-2027-prototype',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'never' }, // one linked stylesheet, no CSS in the HTML
});
