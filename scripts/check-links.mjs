// Crawls dist/ and checks every internal href and img src resolves to a built file.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
const root = 'dist', base = '/impact-2027-prototype';
const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(root);
const bad = []; let n = 0;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    let u = m[1];
    if (/^(https?:|mailto:|tel:|#|data:|javascript:)/.test(u)) continue;
    u = u.split('#')[0].split('?')[0];
    if (!u.startsWith(base)) { bad.push([relative(root, f), m[1], 'not under base']); continue; }
    const rel = u.slice(base.length);
    const target = rel.endsWith('/') ? join(root, rel, 'index.html') : join(root, rel);
    n++;
    if (!existsSync(target) && !existsSync(join(root, rel, 'index.html'))) bad.push([relative(root, f), m[1], 'missing']);
  }
}
console.log(`${files.length} pages, ${n} internal links checked, ${bad.length} broken`);
for (const b of bad.slice(0, 40)) console.log('  ' + b.join('  →  '));
process.exit(bad.length ? 1 : 0);
