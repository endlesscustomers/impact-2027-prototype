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
  for (const m of read(f).matchAll(/\sstyle="[^"]*"/g)) { console.log(`inline style: ${f}: ${m[0].trim()} (add a class in global.css)`); bad++; }
}
// Type and colour literals belong in the token block. Everything after it must use var(--fs-*), var(--lh-*), var(--w-*), var(--tr-*) and token colours.
{
  const start = css.indexOf('/* ---------- Base ---------- */');
  const lines = css.slice(start).split('\n');
  const checks = [
    [/font-size:\s*(?=\S)(?!var\()[^;}]+/, 'font-size literal (use var(--fs-…))'],
    [/line-height:\s*(?=\S)(?!var\()[^;}]+/, 'line-height literal (use var(--lh-…))'],
    [/font-weight:\s*(?=\S)(?!var\()[^;}]+/, 'font-weight literal (use var(--w-…))'],
    [/letter-spacing:\s*(?=\S)(?!var\()[^;}]+/, 'letter-spacing literal (use var(--tr-…))'],
    [/#[0-9a-fA-F]{3,8}\b/, 'hex colour outside the token block (add a token)'],
    [/font-family:\s*(?=\S)(?!var\(|inherit)[^;}]+/, 'font-family literal (use var(--font-head|--font-body))'],
    [/max-width:\s*[\d.]+ch\b/, 'measure literal (use var(--measure), var(--measure-h1), var(--measure-h2))'],
    [/^(?=.*font-size: var\(--fs-)(?!.*line-height:).*$/, 'font-size without its line-height (each size token travels with an --lh-* token)'],
  ];
  lines.forEach((line, n) => {
    if (/\/\* raw \*\//.test(line) || /^\s*--/.test(line) || /^\s*\/\*/.test(line)) return;
    const code = line.replace(/\/\*.*?\*\//g, '');
    for (const [re, msg] of checks) { const m = code.match(re); if (m) { console.log(`literal: global.css:${start ? css.slice(0, start).split('\n').length + n : n + 1} ${msg}: ${m[0].trim().slice(0, 60)}`); bad++; } }
  });
}
console.log(bad ? `${bad} problem(s)` : 'stylesheet OK: no chrome collisions, no page <style> blocks');
process.exitCode = bad ? 1 : 0;
