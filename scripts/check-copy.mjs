// Case checker for labels and headings. Rule (STYLE.md → Copy): title case for nav labels, buttons,
// headings, card titles, step titles, tooltips, and price-row labels; sentence case for body copy and
// for multi-sentence editorial headlines. Run `node scripts/check-copy.mjs` to list what is off,
// `node scripts/check-copy.mjs --fix` to rewrite it.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fix = process.argv.includes('--fix');

// AP-style: lowercase articles, conjunctions, and prepositions under four letters, unless first or last.
const SMALL = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'yet', 'as', 'at', 'by', 'in', 'of', 'on', 'to', 'vs', 'via', 'per']);
const capFirst = (w) => {
  const m = w.match(/^([^A-Za-z0-9]*)(.)(.*)$/s);
  return m ? m[1] + m[2].toUpperCase() + m[3] : w;
};
const hasInnerCap = (w) => /^[^A-Za-z]*[A-Za-z]/.test(w) && /[A-Z]/.test(w.replace(/^[^A-Za-z]*[A-Za-z]/, ''));
const isDomain = (w) => /\.[a-z]{2,}(\/|$)/i.test(w);
const KEEP = new Set(['E-commerce']); // spelled this way in the locked industry list
const capWord = (w) => {
  if (KEEP.has(w) || /^&\w+;$/.test(w)) return w; // "E-commerce", HTML entities
  if (hasInnerCap(w) || isDomain(w) || /^\d/.test(w) === false && /^[^A-Za-z]+$/.test(w)) return w; // HubSpot, IMPACT, AI, impactplus.com, "—", "·"
  if (w.includes('-')) return w.split('-').map((p, i) => (i === 0 || p.length > 0 ? capWord(p) : p)).join('-');
  return capFirst(w);
};

export function titleCase(s) {
  const words = s.split(' ');
  const n = words.length;
  let afterBreak = true; // capitalise the word after a colon, dash, or sentence end
  return words.map((w, i) => {
    if (w === '') return w;
    const bare = w.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, '').toLowerCase();
    let out;
    if (hasInnerCap(w) || isDomain(w)) out = w;
    else if (!afterBreak && i !== n - 1 && SMALL.has(bare)) out = w.toLowerCase();
    else out = capWord(w);
    afterBreak = /[:.?!—]$/.test(w) || w === '—' || w === '·';
    return out;
  }).join(' ');
}

/** Multi-sentence editorial headline: leave alone. */
const multiSentence = (s) => /[.!?]['”’]?\s+[A-Z“‘]/.test(s.trim());
/** What a heading or label becomes under the rule, or null to leave it. */
export function normalize(s) {
  const t = s.trim();
  if (!t || t.startsWith('/') || /^https?:/.test(t) || t.includes('{') || /^\S+\.[a-z]{2,}\S*$/i.test(t)) return null;
  if (multiSentence(t)) return null;
  if (!t.includes(' ') && t.endsWith('.')) return null; // one-word punch lines ("Known.") keep their period
  let out = titleCase(t.replace(/\.$/, '')); // single sentence: title case, no trailing period
  if (t.endsWith('.') === false) out = titleCase(t);
  return out === t ? null : s.replace(t, out);
}

const files = (dir, ext) => fs.readdirSync(dir, { withFileTypes: true, recursive: true })
  .filter((d) => d.isFile() && ext.test(d.name)).map((d) => path.join(d.parentPath ?? d.path, d.name));

const changes = [];
const note = (file, from, to) => changes.push({ file: path.relative(root, file), from, to });

// 1. Key-based strings in data files and component front matter.
const KEYS = /(\b(?:label|heading|title|h|h1|name)\s*:\s*)'((?:[^'\\]|\\.)*)'/g;
// 2. Markup: headings, tooltips, buttons, step titles.
const MARKUP = [
  /(<h[1-4](?:\s[^>]*)?>)([^<{]+?)(<\/h[1-4]>)/g,
  /(<span class="(?:tip[^"]*|more)"[^>]*>)([^<{]+?)(<)/g,
  /(<a class(?::list)?=(?:"[^"]*\b(?:btn|more|go)\b[^"]*"|\{\['(?:btn|cta)'[^}]*\}\})[^>]*>)([^<{]+?)(<|$)/gm,
  /(^\s*<li[^>]*>(?:<span class="n">\d+<\/span>)?(?:<div>)?<b>)([^<{]+?)(<\/b>)/gm,
];

for (const file of [...files(path.join(root, 'src/data'), /\.ts$/).filter((f) => !f.endsWith('recent.ts')), // real article titles, quoted as published
   ...files(path.join(root, 'src/pages'), /\.astro$/), ...files(path.join(root, 'src/components'), /\.astro$/), ...files(path.join(root, 'src/layouts'), /\.astro$/)]) {
  let src = fs.readFileSync(file, 'utf8');
  const orig = src;
  src = src.replace(KEYS, (m, k, v) => { const n = normalize(v); if (n == null) return m; note(file, v, n); return `${k}'${n}'`; });
  if (file.endsWith('.astro')) {
    for (const re of MARKUP) src = src.replace(re, (m, a, v, z) => { const n = normalize(v); if (n == null) return m; note(file, v, n); return a + n + z; });
  }
  if (fix && src !== orig) fs.writeFileSync(file, src);
}

// 3. Outline items: the part before " — " is a card title, step title, question, or price-row label.
//    Blocks are one object per line in outlines.ts, so a line-based scan is enough.
{
  const file = path.join(root, 'src/data/outlines.ts');
  let src = fs.readFileSync(file, 'utf8');
  const seen = new Set();
  for (const line of src.split('\n')) {
    if (!/kind: '(?:cards|steps|faq|pricing)'/.test(line)) continue;
    const m = line.match(/items: \[(.*?)\](?:,| \})/);
    if (!m) continue;
    for (const q of m[1].matchAll(/'((?:[^'\\]|\\.)*)'/g)) {
      const it = q[1];
      if (it.includes('\\') || seen.has(it)) continue;
      seen.add(it);
      const i = it.indexOf(' — ');
      const a = i < 0 ? it : it.slice(0, i);
      const n = normalize(a);
      if (n == null) continue;
      note(file, a, n);
      src = src.split(`'${it}'`).join(`'${n + (i < 0 ? '' : it.slice(i))}'`);
    }
  }
  if (fix) fs.writeFileSync(file, src);
}

const byFile = new Map();
for (const c of changes) { if (!byFile.has(c.file)) byFile.set(c.file, []); byFile.get(c.file).push(c); }
for (const [f, list] of byFile) {
  console.log(`\n${f} (${list.length})`);
  for (const c of list) console.log(`  ${c.from}  →  ${c.to}`);
}
console.log(`\n${changes.length} ${fix ? 'strings rewritten' : 'strings off the rule'}${fix ? '' : ' (run with --fix to apply)'}`);
process.exitCode = fix || changes.length === 0 ? 0 : 1;
