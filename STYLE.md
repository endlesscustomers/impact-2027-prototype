# Style guide for the 2027 prototype

How to build a page so it matches every other page, on both sites. `src/styles/global.css` is the single stylesheet; this file says what is in it and the rules for adding to it. When the sites move into HubSpot, the tokens become theme fields and the page blocks become modules, so keep both clean.

Bob confirmed the copy rule, the fonts, the type scale, the themes, the writing rules, and the no-dash rule on 2026-09-19.

## Copy: capitalization

**Title case** for anything that acts as a label or a heading:

- nav labels, menu column headings, footer column headings
- buttons and calls to action, including the header pills and the section pill
- page titles, breadcrumbs, H1 to H4
- card titles, step titles, price-row labels, FAQ questions
- tooltips and tags

**Sentence case** for anything that reads as prose: body copy, ledes, intros, card descriptions, quotes, captions under a stat, the ribbon, footer text.
- Announcement ribbon: text at `--fs-body` / `--w-regular` in `--ribbon-ink` on `--ribbon-bg`, the ribbon's own pair of tokens (a solid fill one step darker than `--fill`, in the page hue, and the body gray nudged darker to hold AA on it: about 5.3:1 light, 5.1:1 dark). The bar is not a link and has no hover state; only the pill links, and it keeps `--w-ui` with the `.btn.grad` hover (Bob, 2026-09-19).

**The one exception:** a multi-sentence editorial headline stays in sentence case. *Two ways to start. Both are free.* keeps its shape. A single-sentence headline is title case and drops its period: *What It Costs, in Plain Numbers*.

How to title-case (AP style):
- Capitalize the first and last word, and every word after a colon or dash.
- Lowercase articles, conjunctions, and prepositions under four letters in the middle: a, an, the, and, but, or, nor, for, yet, as, at, by, in, of, on, to, vs, via, per. Everything else, including *is*, *it*, *with*, *from*, *up*, is capitalized.
- Capitalize both halves of a hyphenated word: *Money-Back*, *90-Day*, *In-House*. *E-commerce* is the exception; the industry list spells it that way.
- Product and company names keep their own casing: HubSpot, IMPACT, Endless Customers, AI, CRM. Domains stay lowercase: impactplus.com.

`node scripts/check-copy.mjs` lists every label and heading that breaks the rule. `--fix` rewrites them. Run it before committing copy.

## Copy: dashes

**No em dashes (—) and no en dashes (–) anywhere a visitor reads**, including dates, number ranges, times, and prices (Bob, 2026-09-19). Use a hyphen: *October 5-7, 2026*, *$30K-$60K*, *10-15%*, *4-6 weeks*, *9-11 a.m.* Where a sentence wants an em dash, use a comma, a period, or a colon instead. A dash between two words in a heading is not an exception: *What It Costs, in Plain Numbers*, not *What It Costs — in Plain Numbers*.

The one place the em dash is allowed is as a data separator: `outlines.ts` writes an item as `'Label — detail'` and `Outline.astro` splits on it, so the dash itself is never rendered. Do not use that separator in a `text` or `links` block, or in an `h`, `lede`, or `p` field, because those render as written.

`node scripts/check-copy.mjs` flags every en and em dash in copy. `--fix` turns en dashes into hyphens; an em dash needs a rewrite, so it is listed and left for a human.

## Fonts

General Sans for headings (`--font-head`, self-hosted, weights 400 to 700; it has no 800). Proxima Nova for body and UI (`--font-body`, self-hosted from IMPACT's own files in `src/fonts/`: 300, 400, 600, 700, 800, 900 plus 300, 400, and 700 italics; the family has no Medium 500). Bob, 2026-09-19.

## Type scale

Eight sizes, each with its line height. Every `font-size`, `line-height`, `font-weight`, `letter-spacing`, `font-family`, and `max-width` in characters is a token; `scripts/check-css.mjs` fails on a literal, and on a size token written without its line-height token.

| Token | Size | Line height | Weight | Use |
|---|---|---|---|---|
| `--fs-display` | 44 to 80 (fluid) | 1.05 | 700 | H1 on a full-width hero |
| `--fs-display-ms` | 40 to 64 (fluid) | 1.05 | 700 | H1 on a two-column microsite hero (`.hero.ms-hero`) |
| `--fs-h2` | 32 to 48 (fluid) | 1.1 | 700 | Section H2, stats |
| `--fs-h3` | 24 | 1.15 | 700 | Card, step, and block titles; prices |
| `--fs-lede` | 21 to 28 (fluid) | 1.25 | 700 | The line under the H1, tracking -.01em, colour `--ink-lg` |
| `--fs-lg` | 24 | 1.3 | 700 | Primary paragraphs (tracking `--tr-para` -.01em, colour `--ink-lg`): section intros, prose blocks, FAQ questions, checklists |
| `--fs-body` | 18 | 1.45 | 600 | Everything else that is read or names something: paragraphs, lists, links, buttons, menu links, eyebrows, breadcrumbs, captions, roles, attributions, column headers, stat labels |
| `--fs-body` + `.regular` | 18 | 1.45 | 400 | The third paragraph style, for longer reading. Bold inside it goes to `--ink-max` **and** steps up to 600 (Bob, 2026-09-19) |
| `--fs-ui` | 16 | 1.4 | 600 | Main nav items, the header pill, the section-pill button |
| `--fs-fine` | 15 | 1.45 | 400 | Fine print only: footer, legal, text under a form, chips (tags, badges), icon tooltips |

**Two paragraph sizes, one fine print (Bob, 2026-09-19).** Paragraphs are 24 or 18. Anything that names something (an eyebrow, a role, a testimonial name, a caption, a column header) is 18, not smaller. 15 is only for places that truly need small type: the footer, legal lines, help text under a form field, and chips. Skew larger: when a paragraph could be either size, take 24.

Weights are a ladder (Bob, 2026-09-19): `--w-para` 700 for the 24px paragraph, the lede, and FAQ questions; `--w-body` and `--w-ui` 600 for 18px body, nav, buttons, and titles inside lists; `--w-regular` 400 for `.regular`, fine print, and the footer; `--w-bold` 700 for headings only; `--w-regular` 400 and `--w-light` 300 exist for later. **Bold inside copy is a colour change, not a weight change** (Bob, 2026-09-19): `strong` and `b` inherit the paragraph's weight and take `--ink-max`. The one exception is the `.regular` paragraph, where bold also steps from 400 to `--w-body`. Line heights: 24 → 31 (tighter than Apple's 1.38, Bob's call), 18 → 26 and 15 → 22 (Apple's ratios).

Defaults the stylesheet applies so pages do not have to: headings are General Sans, 700, `text-wrap: balance`; paragraphs and list items are `text-wrap: pretty` at one measure (`--measure`, 56ch, which is about 70 characters in Proxima Nova; H1s take `--measure-h1`, H2s `--measure-h2`, and nothing sets a `ch` width directly); body copy is `--ink-2`; bold inside copy is `--ink-max`, the only pure black (white in dark mode); every text link outside the main navigation (copy, More links, breadcrumbs, link lists, the strategy strip, the footer) is `--accent` at rest and gains only an underline on hover, never a colour change (Bob, 2026-09-19); block links such as cards, service rows, and faces keep their own treatment. The hero fills about 88 percent of the first screen so the next section peeks below the fold. Includes the two foot links in the How We Help dropdown (guarantee, compare). The announcement ribbon is not a link: its text has no hover, and only its pill is clickable.

## Colour and themes

Every neutral is derived from the page tint with `oklch(from var(--tint) L C h)`: same lightness and chroma on every page, the hue from the page. Grays on a blue page lean blue; on a HubSpot page they lean plum. The recipe and the accent values come from the endlesscustomers.com redesign stylesheet so the two builds stay on brand. Neutrals are declared on `body`, not `:root`, because a custom property resolves where it is declared and the tint is set on the body.

| `body[data-accent]` | Pages | Tint (neutrals) | Accent (text, links) | Fill (buttons) |
|---|---|---|---|---|
| `blue` | IMPACT default | `#0A6CFF` | `#0A6CFF` | `#0A6CFF` |
| `magenta` | Website Services | `#D6269B` | `#D6269B` | `#D6269B` |
| `hubspot` | HubSpot Services | plum `#5A1E46` | `#C93600` (AA on the tinted light surfaces) | orange `#FF4701` (white on it is 3.4:1, accepted as a brand decision) |
| `swell` | Paid Media | navy `#132D62` | teal `#007A73` | teal `#007A73` |
| `black` | endlesscustomers.com, Endless Customers Coaching | none (grayscale) | `#0A6CFF`; magenta and green available | the EC gradient stays on the primary button and ribbon pill |

`Site.astro` sets the accent from the site and path. The black theme opens in dark mode unless the visitor has picked a mode. In dark mode text accents brighten and fills stay on brand so white button text keeps its contrast.

| Token | Use |
|---|---|
| `--bg` `--bg-panel` `--bg-page` | Sections and cards; raised panels; the page |
| `--ink` `--ink-2` `--ink-3` `--ink-max` | Headings; body copy and captions (one gray, about 4.7:1 on the darkest surface a paragraph sits on: just above AA, so bold pops); captions (AA everywhere); bold and the nav hover |
| `--line` `--line-strong` | Rules and card borders; button outlines and list heads |
| `--accent` `--accent-hover` `--accent-fill` `--accent-fill-hover` `--accent-ink` | Text accents; button fills; text on a fill |
| `--menu-bg` `--frost` `--bar-bg` `--fill` `--fill-hover` | Dropdown card; the header band and the whole page behind an open menu (one surface, no seam); section pill; soft fills |
| `--ribbon-bg` `--ribbon-ink` | The announcement ribbon only: its solid fill, one step darker than `--fill`, and its text gray (AA on that fill); the black theme's dark ribbon is the panel gray |
| `--shadow` `--shadow-card` `--shadow-bar` | Site cards; dropdown card; section pill |
| `--header-h` `--logo-h` `--logo-ec-h` `--ctrl-h` `--cta-font` `--cta-pad` | Tall header at the top of the page; `html[data-scrolled]` swaps in the compact set |
| `--ease` | The one curve. .15s colour, .2 to .25s size and position, .28 to .32s panels arriving |

A hex value belongs in the token block or the theme block, nowhere else. Two mask images use `#000` as a shape, marked `/* raw */`.

## Writing rules

Read like Apple, HubSpot, and Orbit Media. Sentences average under 20 words. A paragraph is one to three sentences, under 50 words. A section carries one idea and under about 120 words of prose, plus a list or cards. Three or more parallel items become a list. Lines run 45 to 75 characters; `--measure` handles it, and anything wider is a layout bug. No orphan words in headings or body; the wrap defaults handle it, so do not force line breaks. No em or en dashes anywhere, including date ranges; a hyphen instead (see Copy: dashes).

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
| FAQ | `.faqs` > `details.faq` | Accordion with a plus that turns. The question is a 24px Proxima sentence, not a heading face. |
| Quote | `blockquote.quote` | Left rule, attribution in the footer. |
| Faces | `.faces` > `.face` | Round portraits, name, role. |
| Link list | `.list-links` | Rows with an arrow. |
| Connects | `.section.connects` | The strategy strip at the foot of a page. |
| Notes | `.also`, `.more`, `.tag`, `.badge`, `.stat` | Small furniture. |
| Success stories | `.st-index` (hero with featured card, search, Filter toggle, four `details.st-filter` menus, `.st-card` grid, Load More), `.st-story` (facts card, services used, share, `.st-stat`, `.st-quote`, narrative, related) | The success stories listing and story page, both sites, after zoom.com's customer stories (Bob, 2026-09-19). Data in `src/data/stories.ts` (one record per story, the HubDB row) and `story-bodies.json` (the narrative). Filters: Problem, Service, Company Size, Industry. |

**No page carries its own `<style>` block or `style=""` attribute, and the build never inlines CSS.** A one-off margin is a class (`.intro.tight`, `.intro.last`, `.actions.close`), not an attribute. Every page links one stylesheet (Bob, 2026-09-19: "all the CSS not on the page but in our global CSS file"). Rules that are genuinely unique to one page, such as a credential card, a diagram, or a logo bar, go at the end of `global.css` under "Page-specific", prefixed with that page's hook: `[data-page="impact-hubspot"] .creds { … }`. The hook is `body[data-page]`, set by `Site.astro` from the site and path (`impact-home`, `impact-hubspot`, `ec-coaching`, `ec-how-to-implement`; the entry page is `entry`). If a second page needs the same rule, move it up into "Page blocks" and add a row here. **Page classes must not reuse a name the header, footer, ribbon, or section pill uses** (`services`, `who`, `foot`, `group`, `more`, `wrap` …), because the page hook is on `<body>` and the rule would reach the chrome too; that is how a border landed on the How We Help menu on 2026-09-19. `node scripts/check-css.mjs` catches collisions, stray `<style>` blocks, and inline `style` attributes. Fonts are declared in the stylesheet too; Vite prefixes the `/fonts/` paths with the site base at build time. The build uses PostCSS and esbuild, not Lightning CSS, because Lightning CSS without browser targets dropped unprefixed `backdrop-filter` and `mask-composite` from the live site (2026-09-19). Keep writing the unprefixed property first and the `-webkit-` twin after it.

## Both sites, one stylesheet

The two sites share every rule. Endless Customers differs only by its logo, its gradient on buttons and the ribbon pill, and its nav data. Do not fork the stylesheet per site; add a token or a class.

## Module library (`/modules/`, 2026-09-19)

`src/pages/modules.astro` stacks every reusable section in real page context, one bar above each naming the module and its class. Build a module here before using it on a page; a page assembles modules, it does not restyle them. Linked from the entry page ("Module Library →").

- **Hero, centred** `.hero.center`: crumbs, H1, lede, actions, all centred. For pages that open on a promise (guarantee, pricing).
- **Hero, side media** `.hero.side`: text left, a 16:9 frame right (`.media .frame` takes an `img` or `video`; the play button is the placeholder). Stacks under 900px. Not `.split`, which is the two-column content block.
- **Logo bar** `LogoBar` component, `.logobar`: zoom.com's "Trusted by" pattern. Centred heading at `--fs-h3`, a continuous marquee of uniform 184 x 70 tiles that bleeds off both edges (masked), and an accent pause/play button right-aligned under the strip. Keeps scrolling on phones, as Zoom's does; starts paused under `prefers-reduced-motion`. State is `data-paused` on the section. The IMPACT home page uses this component.
- **Ratings** `Ratings` component, `.ratings`: zoom.com's review strip. Up to three columns divided by vertical hairlines, each a score at `--fs-h2` (one decimal, the "/5" in regular `--ink-3`), five stars filled to the nearest 10% (`data-fill`), "out of N reviews" at `--fs-body`, and the review site's name as the column's only link, on the site-wide link rule (accent, underline on hover, `--w-ui`). Score, stars, and count are plain text. A logo file replaces the name inside the same link when one exists. Under 760px the columns stack and the hairlines turn horizontal. Figures come from the `/results/reviews` outline; never invent a count.
- **Feature** `Feature` component, `.feature`: media one side, content the other (zoom.com Workplace page, Orbit Media service pages). Props: `media` left or right; `ratio` 30, 40, 50, 60, or 70 for the media column's share; `eyebrow` (accent, plain text), `heading`, one `cta`, and a copy slot that takes `.intro` (24px), `.regular` (18px at 400), or both, Orbit's lede-then-detail rhythm. Image corners 24px, columns vertically centred, 64px gap. Under 900px it stacks with the media above the content whichever side it sat on.
- **FAQ** `.section.center` + `.faqs`: mirrors the EC guarantee page. Centred H2, one 800px column, hairlines between questions, General Sans bold question at `--fs-h3`, a 25px plus circle drawn by `summary::after` that becomes a minus when open, 18px regular answer in `--ink-2`. `details[name="faq"]` keeps one open at a time. The old `.plus` span is no longer needed and is hidden if present.

### From georgebthomas.com/coaching (2026-09-19)

All built on the existing primitives (`.section`, `.grid`, `.card`, `.tag`, `.badge`, `.quote`, `.btn`, `.actions`, the eyebrow, the link rule). The reference page's layouts were kept; its decoration (glows, pulses, action dots, serif prices) was not.

- **Heading room** `.section h2 + .grid / .faqs / .timeline / .testimonials { margin-top: 36px }`: a heading with no intro under it gets the intro's room, so cards and questions never sit 12px under the H2 (Bob, 2026-09-20). Inside `.section.center`, `.grid` and `.faqs` reset to left alignment so cards keep their own.
- **Section eyebrow** `.section .eyebrow`: accent, `--w-ui`, plain text, above the H2. Use with `.section.center` for the centred header pattern (eyebrow, H2, `.intro`).
- **Dark band** `.section.dark`: a section that keeps the page hue and flips to the dark neutrals (same oklch formulas as dark mode). Its text accent is `--accent-dark`, a per-theme token next to `--accent`. Cards inside take `--fill` and `--line`. Body gray on a card in the band measures 4.68:1.
- **Detail cards** `.grid.c2` + `.card.detail`: left-aligned even inside `.section.center`. `.head` (H3 and a `.tag`), optional `ul.stats` as a soft `--fill` panel with equal centred columns (value at `--fs-h3`, label at `--fs-body`), a paragraph, `ul.checks` (accent check marks), and one `.more` link pinned to the bottom above a hairline.
- **Icon cards** `.grid.c3` + `.card.icon`: centred, a 64px `.disc` in 14% accent holding a 28px line icon, H3, one paragraph. Lives on a normal section and works in light and dark mode; add `.dark` to the section only when a dark band is wanted (Bob, 2026-09-20).
- **Timeline** `ol.timeline`: four numbered discs on a hairline (drawn by each item's `::before` and `::after`, so any count works), a centred `.card` under each with a `.tag`, H3, one line. One column without the rule under 900px.
- **Pricing tiers** `.grid.c3` + `.card.tier`: H3, `.hours`, `.price` at `--fs-h2`, `.rate`, a paragraph, `ul.checks`, a full-width `.btn` pinned to the bottom. `.rec` plus a corner `.badge` marks the recommended tier. Prices come from a verified source; the library uses the live-site HubSpot training programs.
- **Callout** `.callout`: one soft `--fill` panel, 760px, centred: H3, paragraph, optional `.price`, one button. Sits under a grid with `margin-top: 40px`.
- **Story card** `.story`: 760px `--bg-panel` card with a 180px round `.photo` lifted 90px over its top edge, eyebrow, H2, `.regular` paragraphs, the standard `blockquote.quote`, one button.
- **Testimonial slider** `Testimonials` component, `.testimonials`: one quote at a time (`--fs-lg`, `--w-para`, `--ink`) in a 900px panel, the person under it (`b` name, `--ink-3` title), 44px outline arrows, 10px position dots (accent when selected), a counter. Quotes verbatim and checked against the banned list.
- **CTA band** `.section.alt.center.closer`: H2, `.intro`, two buttons. Buttons stack full width under 560px. Named `closer` because `.cta` is the header pill.

## Accent as text (2026-09-19)

Text accents and button fills are separate tokens. In light mode the blue and magenta text accents are 4% darker than their fills (`#0966F2` for `#0A6CFF`, `#CB2393` for `#D6269B`) so an 18px link clears 4.5:1 on the tinted page surface, the darkest place a link sits; measured 4.57 and 4.53. HubSpot and Swell already clear it. Dark mode accents are unchanged and measure 4.58 or better on every surface. Buttons keep the brighter fill. If a new theme is added, measure its accent on `--bg-page` before using it for text.

## Standing rules for modules (2026-09-19)

- **Build from this guide, not from the reference site.** A pattern borrowed from zoom.com or Orbit Media keeps its layout and loses any decoration that conflicts with the decisions here: the link rule, the type scale, the colours, the existing classes (`.eyebrow`, `.intro`, `.regular`, `.actions`, the site-wide link list). Do not add a parallel selector for something that already has one.
- **No dots, circles, or icons beside an eyebrow, ever.** Bob: it is a common AI vibe-coding tell. An eyebrow is plain text in the accent colour at `--fs-body` and `--w-ui`.
- **Centre the box, not just the text.** `main p` and `main li` are capped at `--measure`, so inside a centred section a paragraph, eyebrow, breadcrumb, or list item hugs the left edge unless it also gets `margin-left: auto; margin-right: auto` (or `max-width: none` when it should fill its panel). `text-align: center` alone looks right at 1440 and is wrong on a wide monitor. `.section.center` handles `h2`, `.intro`, `.eyebrow`, and `.crumbs`; anything new gets added there. **Verify every module at 1920 and 2560, not only 1440** (Bob, 2026-09-19: "your centers are all off" on full desktop).
- **Only the thing that goes somewhere is a link.** In the ratings module that is the review site's name; the score, stars, and count are text.

