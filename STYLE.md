# Style guide for the 2027 prototype

How to build a page so it matches every other page, on both sites. `src/styles/global.css` is the single stylesheet; this file says what is in it and the rules for adding to it. When the sites move into HubSpot, the tokens become theme fields and the page blocks become modules, so keep both clean.

Bob confirmed the copy rule, the fonts, the type scale, the themes, and the writing rules on 2026-09-19.

## Copy: capitalization

**Title case** for anything that acts as a label or a heading:

- nav labels, menu column headings, footer column headings
- buttons and calls to action, including the header pills and the section pill
- page titles, breadcrumbs, H1 to H4
- card titles, step titles, price-row labels, FAQ questions
- tooltips and tags

**Sentence case** for anything that reads as prose: body copy, ledes, intros, card descriptions, quotes, captions under a stat, the ribbon, footer text.

**The one exception:** a multi-sentence editorial headline stays in sentence case. *Two ways to start. Both are free.* keeps its shape. A single-sentence headline is title case and drops its period: *What It Costs, in Plain Numbers*.

How to title-case (AP style):
- Capitalize the first and last word, and every word after a colon or dash.
- Lowercase articles, conjunctions, and prepositions under four letters in the middle: a, an, the, and, but, or, nor, for, yet, as, at, by, in, of, on, to, vs, via, per. Everything else, including *is*, *it*, *with*, *from*, *up*, is capitalized.
- Capitalize both halves of a hyphenated word: *Money-Back*, *90-Day*, *In-House*. *E-commerce* is the exception; the industry list spells it that way.
- Product and company names keep their own casing: HubSpot, IMPACT, Endless Customers, AI, CRM. Domains stay lowercase: impactplus.com.

`node scripts/check-copy.mjs` lists every label and heading that breaks the rule. `--fix` rewrites them. Run it before committing copy.

## Fonts

General Sans for headings (`--font-head`, self-hosted, weights 400 to 700; it has no 800). Proxima Nova for body and UI (`--font-body`, loaded from the four weights impactplus.com already serves). Bob, 2026-09-19.

## Type scale

Eight sizes, each with its line height. Every `font-size`, `line-height`, `font-weight`, `letter-spacing`, `font-family`, and `max-width` in characters is a token; `scripts/check-css.mjs` fails on a literal, and on a size token written without its line-height token.

| Token | Size | Line height | Weight | Use |
|---|---|---|---|---|
| `--fs-display` | 44 to 80 (fluid) | 1.05 | 700 | H1 |
| `--fs-h2` | 32 to 48 (fluid) | 1.08 | 700 | Section H2, stats |
| `--fs-h3` | 24 | 1.15 | 700 | Card, step, and block titles; prices |
| `--fs-lede` | 21 to 28 (fluid) | 1.3 | 400 | The line under the H1 |
| `--fs-lg` | 24 | 1.35 | 500 | Primary paragraphs: section intros, prose blocks, FAQ questions, checklists |
| `--fs-body` | 18 | 1.5 | 400 | Everything else that is read or names something: paragraphs, lists, links, buttons, menu links, eyebrows, breadcrumbs, captions, roles, attributions, column headers, stat labels |
| `--fs-ui` | 16 | 1.5 | 500 | Main nav items, the header pill, the section-pill button |
| `--fs-fine` | 15 | 1.45 | 400 | Fine print only: footer, legal, text under a form, chips (tags, badges), icon tooltips |

**Two paragraph sizes, one fine print (Bob, 2026-09-19).** Paragraphs are 24 or 18. Anything that names something (an eyebrow, a role, a testimonial name, a caption, a column header) is 18, not smaller. 15 is only for places that truly need small type: the footer, legal lines, help text under a form field, and chips. Skew larger: when a paragraph could be either size, take 24.

Weights: `--w-body` 400, `--w-ui` 500, `--w-bold` 700. The 24px paragraph is 500 (Bob, 2026-09-19); every other paragraph is 400. Tracking: `--tr-display` -.025em, `--tr-heading` -.02em, `--tr-title` -.01em, `--tr-label` .02em. Skew larger: when in doubt between two sizes, take the bigger one.

Defaults the stylesheet applies so pages do not have to: headings are General Sans, 700, `text-wrap: balance`; paragraphs and list items are `text-wrap: pretty` at one measure (`--measure`, 56ch, which is about 70 characters in Proxima Nova; H1s take `--measure-h1`, H2s `--measure-h2`, and nothing sets a `ch` width directly); body copy is `--ink-2`; bold inside copy is `--ink-max`, the only pure black (white in dark mode); every text link outside the main navigation (copy, More links, breadcrumbs, link lists, the strategy strip, the footer) is `--accent` at rest and gains only an underline on hover, never a colour change (Bob, 2026-09-19); block links such as cards, service rows, and faces keep their own treatment. The hero fills about 88 percent of the first screen so the next section peeks below the fold.

## Colour and themes

Every neutral is derived from the page tint with `oklch(from var(--tint) L C h)`: same lightness and chroma on every page, the hue from the page. Grays on a blue page lean blue; on a HubSpot page they lean plum. The recipe and the accent values come from the endlesscustomers.com redesign stylesheet so the two builds stay on brand. Neutrals are declared on `body`, not `:root`, because a custom property resolves where it is declared and the tint is set on the body.

| `body[data-accent]` | Pages | Tint (neutrals) | Accent (text, links) | Fill (buttons) |
|---|---|---|---|---|
| `blue` | IMPACT default | `#0A6CFF` | `#0A6CFF` | `#0A6CFF` |
| `magenta` | Website Services | `#D6269B` | `#D6269B` | `#D6269B` |
| `hubspot` | HubSpot Services | plum `#5A1E46` | `#DE3E00` | orange `#FF4701` (white on it is 3.4:1, accepted as a brand decision) |
| `swell` | Paid Media | navy `#132D62` | teal `#007A73` | teal `#007A73` |
| `black` | endlesscustomers.com, Endless Customers Coaching | none (grayscale) | `#0A6CFF`; magenta and green available | the EC gradient stays on the primary button and ribbon pill |

`Site.astro` sets the accent from the site and path. The black theme opens in dark mode unless the visitor has picked a mode. In dark mode text accents brighten and fills stay on brand so white button text keeps its contrast.

| Token | Use |
|---|---|
| `--bg` `--bg-panel` `--bg-page` | Sections and cards; raised panels; the page |
| `--ink` `--ink-2` `--ink-3` `--ink-max` | Headings; body copy; captions (AA on every light surface); bold and the nav hover |
| `--line` `--line-strong` | Rules and card borders; button outlines and list heads |
| `--accent` `--accent-hover` `--accent-fill` `--accent-fill-hover` `--accent-ink` | Text accents; button fills; text on a fill |
| `--menu-bg` `--frost` `--bar-bg` `--fill` `--fill-hover` | Dropdown card; the header band and the whole page behind an open menu (one surface, no seam); section pill; soft fills |
| `--shadow` `--shadow-card` `--shadow-bar` | Site cards; dropdown card; section pill |
| `--header-h` `--logo-h` `--logo-ec-h` `--ctrl-h` `--cta-font` `--cta-pad` | Tall header at the top of the page; `html[data-scrolled]` swaps in the compact set |
| `--ease` | The one curve. .15s colour, .2 to .25s size and position, .28 to .32s panels arriving |

A hex value belongs in the token block or the theme block, nowhere else. Two mask images use `#000` as a shape, marked `/* raw */`.

## Writing rules

Read like Apple, HubSpot, and Orbit Media. Sentences average under 20 words. A paragraph is one to three sentences, under 50 words. A section carries one idea and under about 120 words of prose, plus a list or cards. Three or more parallel items become a list. Lines run 45 to 75 characters; `--measure` handles it, and anything wider is a layout bug. No orphan words in headings or body; the wrap defaults handle it, so do not force line breaks.

## Space and shape

- Spacing runs on 4px: 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 72, 88, 96.
- Sections are 72px top and bottom (48 on mobile). The final section adds to 96.
- Content width is 1200px with 24px gutters (`.wrap`); reading width is 760px (`.wrap.narrow`, `.steps`, `.prices`). The header and ribbon are full-bleed with 32px gutters.
- Radii: 4 focus rings, 8 controls and tooltips, 12 the ribbon, 16 cards and panels, 20 dropdown cards and site cards, 999 pills and buttons.
- Buttons are pills: `.btn` in the page (48px, body size), `.cta` in the header (token-sized), `.pillbar .go` in the section pill (36px).

## Page blocks (modules)

**Module first.** Before writing a section, check this table. If the module exists, use it unchanged. If it does not, build it in the stylesheet, add a row here, then build the section with it. No page restyles a module, and no page builds its own FAQ, steps, quote, or card from scratch.

Use these before writing new CSS. They live in the "Page blocks" section of the stylesheet and render the same on drafted pages and on outline pages.

| Block | Class | What it is |
|---|---|---|
| Hero | `.hero`, `.hero.ms-hero` + `.hero-grid` | Page top. The microsite variant is two columns. |
| Section | `.section`, `.section.alt`, `.section.final` | Alt is the white band with rules; final adds bottom room. |
| Split | `.split` | Text beside a figure, 1.2 : 1. Override the ratio on the page if needed. |
| Grid and cards | `.grid.c2/.c3/.c4`, `.card`, `.card.rec`, `.card .price`, `.card > .badge` | Cards; the recommended one; a price; a corner badge. |
| Steps | `.steps` | Numbered list with a blue disc. |
| Prices | `.prices` | Label left, price right, rule between rows. |
| FAQ | `.faqs` > `details.faq` | Accordion with a plus that turns. |
| Quote | `blockquote.quote` | Left rule, attribution in the footer. |
| Faces | `.faces` > `.face` | Round portraits, name, role. |
| Link list | `.list-links` | Rows with an arrow. |
| Connects | `.section.connects` | The strategy strip at the foot of a page. |
| Notes | `.also`, `.more`, `.tag`, `.badge`, `.stat` | Small furniture. |

**No page carries its own `<style>` block or `style=""` attribute, and the build never inlines CSS.** A one-off margin is a class (`.intro.tight`, `.intro.last`, `.actions.close`), not an attribute. Every page links one stylesheet (Bob, 2026-09-19: "all the CSS not on the page but in our global CSS file"). Rules that are genuinely unique to one page, such as a credential card, a diagram, or a logo bar, go at the end of `global.css` under "Page-specific", prefixed with that page's hook: `[data-page="impact-hubspot"] .creds { … }`. The hook is `body[data-page]`, set by `Site.astro` from the site and path (`impact-home`, `impact-hubspot`, `ec-coaching`, `ec-how-to-implement`; the entry page is `entry`). If a second page needs the same rule, move it up into "Page blocks" and add a row here. **Page classes must not reuse a name the header, footer, ribbon, or section pill uses** (`services`, `who`, `foot`, `group`, `more`, `wrap` …), because the page hook is on `<body>` and the rule would reach the chrome too; that is how a border landed on the How We Help menu on 2026-09-19. `node scripts/check-css.mjs` catches collisions, stray `<style>` blocks, and inline `style` attributes. Fonts are declared in the stylesheet too; Vite prefixes the `/fonts/` paths with the site base at build time. The build uses PostCSS and esbuild, not Lightning CSS, because Lightning CSS without browser targets dropped unprefixed `backdrop-filter` and `mask-composite` from the live site (2026-09-19). Keep writing the unprefixed property first and the `-webkit-` twin after it.

## Both sites, one stylesheet

The two sites share every rule. Endless Customers differs only by its logo, its gradient on buttons and the ribbon pill, and its nav data. Do not fork the stylesheet per site; add a token or a class.
