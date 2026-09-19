# Working in this repo

Read `STYLE.md` before writing copy or CSS. It is the rulebook for both sites: capitalization, dashes, fonts, type scale, themes, spacing, and the page-block modules. `README.md` says where things live.

Two copy rules that are easy to miss:

- **No em dashes and no en dashes in anything a visitor reads, including date and number ranges.** Hyphen instead: October 5-7, 2026. Where a sentence wants an em dash, use a comma, a period, or a colon. (Bob, 2026-09-19)
- **Title case for labels and headings, sentence case for prose.**

Run `node scripts/check-copy.mjs` and `node scripts/check-css.mjs` before committing. Commit only when Bob asks.
