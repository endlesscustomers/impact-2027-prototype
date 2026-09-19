// Guards the one-stylesheet setup. Fails if a page-specific rule (body[data-page] section of global.css)
// uses a class that also appears in the shared chrome (header, footer, ribbon, section pill), or if any
// .astro file still carries a <style> block. Run: node scripts/check-css.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const walk = (d) => fs.readdirSync(path.join(root, d), { withFileTypes: true, recursive: true }).filter((e) => e.isFile()).map((e) => path.relative(root, path.join(e.parentPath ?? e.path, e.name)));
let bad = 0;

const chrome = ['src/components/Header.astro', 'src/components/Footer.astro', 'src/components/Ribbon.astro', 'src/components/SectionBar.astro', 'src/layouts/Site.astro']
  .map(read).join('\n').match(/class(?::list)?=(?:"[^"]*"|\{[^}]*\})/g)?.flatMap((m) => m.match(/[a-z][a-z0-9-]*/g) ?? []) ?? [];
const chromeSet = new Set(chrome.filter((c) => !['class', 'list', 'true', 'false'].includes(c)));
const css = read('src/styles/global.css');
const pageSection = css.slice(css.indexOf('Page-specific ===='));
for (const m of new Map([...pageSection.matchAll(/\[data-page="([^"]+)"\] \.([a-z0-9-]+)/g)].map((m) => [m[0], m])).values()) {
  if (chromeSet.has(m[2])) { console.log(`collision: [data-page="${m[1]}"] .${m[2]} also names a header/footer/ribbon/pill element`); bad++; }
}
for (const f of walk('src').filter((f) => f.endsWith('.astro'))) {
  if (/<style[\s>]/.test(read(f))) { console.log(`style block: ${f} (move it into global.css)`); bad++; }
}
console.log(bad ? `${bad} problem(s)` : 'stylesheet OK: no chrome collisions, no page <style> blocks');
process.exitCode = bad ? 1 : 0;
