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
  vite: {
    // Vite 8 defaults to Lightning CSS, which (with no browser targets set) dropped the unprefixed
    // `backdrop-filter` and `mask-composite` from the build and kept only the -webkit- forms, so
    // Chrome lost the menu blur on the live site (2026-09-19). PostCSS + esbuild ship the source as written.
    css: { transformer: 'postcss' },
    build: { cssMinify: 'esbuild' },
  },
});
