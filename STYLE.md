# Style guide for the 2027 prototype

How to build a page so it matches every other page, on both sites. `src/styles/global.css` is the single stylesheet; this file says what is in it and the rules for adding to it. When the sites move into HubSpot, the tokens become theme fields and the page blocks become modules, so keep both clean.

Bob confirmed the copy rule and this file on 2026-09-19. Type sizes, weights, and spacing below are what the prototype uses today; aligning them is the next conversation, so treat that section as a record, not a decision.

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

## Tokens

Everything that can be a token is one. Never write a hex value or an rgba in a rule; add a token. Dark mode keys off `html[data-dark]`, which `Base.astro` sets before first paint from the system preference or the visitor's choice, so each dark value is declared once.

| Group | Tokens | Use |
|---|---|---|
| Surfaces | `--bg` `--bg-panel` `--bg-page` | `--bg-page` is the page; `--bg` is the header, hero, alt sections, and cards; `--bg-panel` is a raised panel on the page colour. In light mode `--bg` and `--bg-panel` are both white. |
| Menus | `--menu-bg` `--menu-tint` `--bar-bg` | Dropdown card, the tint behind an open menu, the frosted section pill. |
| Fills | `--fill` `--fill-hover` | Soft fills on the ribbon, ghost button hover, small-menu row hover. |
| Ink | `--ink` `--ink-2` `--ink-3` `--ink-max` | Headings; body and nav at rest; captions; the nav item on hover (pure black or white). |
| Lines | `--line` `--line-strong` | Rules and card borders; the stronger one for button outlines and list heads. |
| Accent | `--accent` `--accent-ink` `--grad` | Blue and the text on it. `--grad` is the Endless Customers gradient and appears only on that site's buttons, the ribbon pill, and the EC step numbers. |
| Elevation | `--shadow` `--shadow-card` `--shadow-bar` | Site cards; the dropdown card; the section pill. |
| Header | `--header-h` `--logo-h` `--logo-ec-h` `--ctrl-h` `--cta-font` `--cta-pad` | The tall header at the top of the page. `html[data-scrolled]` swaps in the compact set. |
| Motion | `--ease` | The one curve. Durations are .15s for colour, .2s to .25s for size and position, .28s to .32s for panels arriving. |

## Type (current, alignment pending)

One family: General Sans, weights 400, 500, 600 loaded (700 is loaded but unused). Body is 16px / 1.5.

| Role | Size | Weight | Tracking |
|---|---|---|---|
| H1, `.display` | clamp(34, 5vw, 56) | 600 | -.03em, line-height 1.06 |
| Section H2 | clamp(26, 3vw, 36) | 600 | -.025em, line-height 1.12 |
| Stat | clamp(36, 4vw, 52) | 600 | -.03em |
| Price | 28 | 600 | -.02em |
| Big card / service H3 | 22 to 24 | 600 | -.02em |
| Card H3, FAQ question | 18 | 600 / 500 | -.015em / -.01em |
| Lede | 19 | 400 | |
| Intro, prose, link list | 17 | 400 / 500 | |
| Body | 16 | 400 | |
| Nav, buttons, card text, notes | 15 | 500 / 400 | |
| Small buttons, "More" links, footer | 14 | 500 / 400 | |
| Captions, tooltips, crumbs, eyebrows | 13 | 400 / 500 | .01em on eyebrows |
| Tags, group labels | 12 | 400 / 500 | |
| Badges | 11 | 500 | .02em |

That is fourteen sizes. The alignment conversation should decide the scale and cut it to something like eight.

## Space and shape

- Spacing runs on 4px: 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 72, 88, 96.
- Sections are 72px top and bottom (48 on mobile). The hero is 88 / 72. The final section adds to 96.
- Content width is 1200px with 24px gutters (`.wrap`); reading width is 760px (`.wrap.narrow`, `.steps`, `.prices`). The header and ribbon are full-bleed with 32px gutters.
- Radii: 4 focus rings, 8 controls and tooltips, 12 the ribbon, 16 cards and panels, 20 dropdown cards and site cards, 999 pills and buttons.
- Buttons are pills: `.btn` in the page (44px), `.cta` in the header (token-sized), `.pillbar .go` in the section pill (36px).

## Page blocks

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

A page's own `<style>` block is for what is genuinely unique to that page: a credential card, a diagram, a logo bar. If a second page needs it, move it into the stylesheet and add a row here.

## Both sites, one stylesheet

The two sites share every rule. Endless Customers differs only by its logo, its gradient on buttons and the ribbon pill, and its nav data. Do not fork the stylesheet per site; add a token or a class.
