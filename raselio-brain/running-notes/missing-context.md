---
brand: Raselio
doc: missing-context
last_updated: 2026-09-06
sources: build-day intake gaps + data_limitations across all docs + the brand-routed section of the latest open-loops roll-up
---

# Missing context — what the brand has not yet told us

## Data sources not connected

- **Parker MCP brand** — the Parker MCP was reachable but returned no brand for this account (`get_available_brands` → `organizations: []`). Until Raselio exists as a brand in Parker, the brain has no native reach into Meta ad comments, TikTok organic, customer reviews, post-purchase surveys, Reddit, competitor ad library, swipe file, or the setup-status telemetry. Starves: ad-comments, post-purchase-surveys, reddit, other-reviews, organic-tiktok, tiktok-mining, and every "comments" read. Unblocks when connected: all persona source pulls at full depth, the hook audit on comments, the monthly organic audits. A Slack invite to `#parker-dylan-s-org-raselio` from Real Simple Labs arrived on 2026-09-06 — the onboarding may be mid-flight on Parker's side.
- **Parker Desktop** — not installed (no `~/.parker/workspace.json`). The brain is self-managed on GitHub instead. Not blocking.
- **Customer reviews** — no review app or review feed exists on the store (Shopify has no review metafields; the "4,7/5 · 1 734 avis" on the landing page has no data source behind it). Starves: customer-reviews, customer-review-audit, VoC corpus.
- **Post-purchase survey** — none running. Starves: post-purchase-surveys, persona attribution.
- **Organic social** — no Instagram/TikTok/YouTube handle was found in any connected source; Shopify shows 181 sessions from Instagram and 923 from Facebook, so at least a Facebook page (id 1234695553067195, "Raselio") exists. Handles and content history not provided.
- **Google Ads / search** — nothing connected; 24 sessions from Google in 90 days.
- **Email / SMS** — no ESP connected.
- **Northbeam / third-party attribution** — not connected; performance is read in Meta + Shopify only.

## Intake questions — ordered by what they unblock

1. **Which numbers define a winner for you?** North-star (ROAS, CPA, MER, bénéfice net?), the target value, and whether hitting it is the whole story. Unblocks: every audit's verdicts, product-priority, the roadmap's sizing.
2. **What is the max cost per purchase you will tolerate, and the real landed unit cost** (product ≈ 11,41 € per the recap sheet; Colissimo shipping cost per order; payment fees)? Unblocks: performance-targets-and-metrics, sprint-plan sizing.
3. **Where do "+17 000 hommes" and "4,7/5 · 1 734 avis" come from?** If they are placeholders inherited from a template, they are a claims risk on every ad and on the landing page. Unblocks: brand-identity (claims gate), brand-lens, every brief.
4. **Who are the competitors you actually watch, and who is inspiration?** Build-day set: Thomyle (FR direct), Gillette Labs Body + Intimate (mass FR), Grümwise (team's own inspo teardown). Confirm or replace. Unblocks: competitors/, external audits, whitespace.
5. **Your brief format** — paste it and it becomes `briefs/_brief-template.md`. Unblocks: brief-creation matching your format.
6. **When two ads in one ad set diverge on spend, does the higher-spend one win, or do you weigh efficiency too?** Unblocks: the iteration and diversity audits' selection rule.
7. **Do you read performance in Meta only, or also in Shopify, and on which attribution window?** Unblocks: every performance read's denominator.
8. **Organic handles and what exists there** (Instagram, TikTok, Facebook page, YouTube). Unblocks: organic-channels-inventory, monthly organic audit.
9. **Product spec sheet** — RPM, battery life, blade material certification, IPX rating, warranty terms. Unblocks: claims substantiation in scripts and statics.
10. **The roadmap review moment** — the build did not pause at Phase 2 (nobody was present); the strategic roadmap is drafted and awaiting your approve / adjust / reject.
11. **Anything an agency you just hired should know** — process, tools, statuses, who decides. Voice-dictate it long.

## Per-doc named blanks

Filled by each doc's `data_limitations` frontmatter as the build runs — see the individual docs under `sub-context-docs/`, `personas/`, `audits/`, `competitors/`.

## Resolved — with date and where the answer lives

- 2026-09-06 — Ad naming convention: read directly from the account → `running-notes/brand-rules.md`.
- 2026-09-06 — Primary campaign objective: verified OUTCOME_SALES from the account → `running-notes/brand-rules.md`.
- 2026-09-06 — Rough unit economics: taken from the team's own "Récap mensuel" sheet → `running-notes/brand-rules.md` (stated, partial).
