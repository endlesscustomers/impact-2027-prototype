# Shared Pricing Catalog

This is the local review site's developer-managed pricing source. It has no marketer admin interface, live HubDB table, CMS module deployment or publishing workflow. Prices and package details retain the authority notes in each offer; working assumptions are review inputs, not newly approved commercial policy.

## Consumers

- `catalog.json`: schema version 1, USD, five categories, 19 services and 43 offer records.
- `engine.js`: pure price formatting, offer selection, prerequisites, exclusions, paid-media fees and estimate totals. Also usable in Node for checks.
- `page.js`: estimator UI at `../pricing.html`; reads the catalog once per page load.
- `service-prices.js`: reads the same catalog for `../hubspot.html` service starting prices and the eight `[data-offer-price]` displays in `../hubspot-onboarding.html`.
- `../impact-nav-page.html` and shared page navigation link to the relevant pricing category. They do not calculate prices.

Serve the build over HTTP so relative JSON fetching works. Changes are picked up on the next page load; there is no live editor or automatic cross-tab refresh. Use `node test-engine.cjs` from this directory to run the available engine checks. Sixteen calculation checks passed, with light/dark, responsive and navigation behavior also checked in the browser.

## Schema

| Object | Fields and meaning |
| --- | --- |
| Root | `schemaVersion`, `currency`, `updated`, ordered `categories`, `services`, `offers`, `media`, `terms`, `resources` |
| Category | Stable `id`, visible `name`, continuous `description` |
| Service | Stable `id`, category ID, `name`, `description`, ordered offer IDs, optional `note`; an offer can be referenced by more than one service |
| Offer | Stable `id`, mutually exclusive `group`, visible `title`, optional `summaryTitle`, numeric/null `min` and `max`, `basis`, `detail`, internal `authority` |
| Offer options | `requires` lists offer IDs; `firstMonth` is a first-month monthly charge; `plannedMonths` and `monthlyAllocation` describe project billing; `customQuote` marks planning ranges requiring a quote |
| Media | `minSpend`, `customThreshold`, `base`, `customBase`, ordered progressive bands with `upTo` and fractional `rate` |
| Terms | Billing, cancellation, guarantee wording and URL, third-party exclusions |
| Resource | Category ID, title and URL |

`basis` is `monthly`, `project`, `custom`, `media` or `free`. Equal min/max values mean fixed price. A numeric min with null max means an open upper range. Null prices mean unresolved or custom amounts, never zero. Only an explicitly free offer uses zero. The engine formats USD; changing `currency` alone does not implement another currency.

Stable IDs preserve saved links and shared price consumers. Offer groups make alternatives mutually exclusive. Hub-specific onboarding groups allow one edition per hub. Website packages are referenced from both Websites and HubSpot rather than duplicated. Dependencies add default required offers only when their group is absent. Existing-coaching mode omits the coaching prerequisite and explains that the existing agreement is outside this additional-service estimate.

## Calculation and state boundaries

The engine reports recurring monthly fees and finite project totals separately. Implementation allocation is descriptive and is not added again as recurring revenue. Website optimization has a distinct first-month figure. Paid-media fees use a progressive formula under the custom threshold, with platform spend shown separately. That formula remains a working assumption in `authority`.

Implementation excludes selected onboarding fees pending scope review. Other overlaps produce warnings without invented discounts. Custom offers stay visible outside numeric totals. Removing required support removes dependent selections. Adding management removes extra consulting, while adding an extra session brings consulting support.

The URL stores `category`, comma-separated offer IDs in `services`, applicable `spend`, and `existing=1`; `service` can target an initial service row. Share links contain choices, not contact information. Invalid offer IDs are ignored. Selections are not server-saved, submitted to a CRM or frozen to a catalog revision. Opening an old link recalculates against the currently served catalog.

## Proposed HubDB mapping, not implemented

A future CMS adapter can retain this normalized contract while storing categories, services and offers as separate tables. Use stable string keys independent of HubDB row IDs, explicit ordering columns, category/service relations and offer relationships. Store price numbers in numeric columns, price basis in a controlled option field, booleans as booleans, and dependency/group semantics explicitly. Keep authority/source notes in internal fields that are not rendered into buyer copy.

Use an ordered service-to-offer relation where one offer appears in several services. Model media bands as ordered records and terms as a controlled shared record. Preserve intentional null values when translating table rows into JSON. A validated adapter should emit the current catalog shape for all three consumers so shared prices cannot drift.

Before CMS implementation, decide approved fields, permissions, draft/published behavior, change validation, cache refresh and rollback. Validate referential integrity, group consistency, dependency cycles, nonnegative prices, min/max relationships, sorted bands and required text. Those safeguards are not a delivered editor feature today. The current engine includes offer-ID-specific overlap logic and presentation exceptions; making every rule marketer-editable requires further work.

## Update and release checks

Edit `catalog.json` for this review build and retain each record's authority. Confirm all referenced IDs still exist, run the engine checks, then inspect estimator totals, HubSpot starting prices and every onboarding price display in both themes. Catalog load failures intentionally show a retry or pricing link instead of stale invented values.

The current review disposition is ship for prototype review. This does not approve portal changes, commercial assumptions, publication, a complete CMS release or marketer workflow documentation. AI image disclosure is not applicable to this text-and-control addition. Website Operations Manual: **Updated** in Website 09 with the review-only maintenance location, verified consumers and future HubDB boundary.
