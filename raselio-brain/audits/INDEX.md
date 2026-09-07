# Audits — index

The generated map of `audits/`. One line per audit: what it is, when it was run, and the one thing it settles. Pointers, not findings — open the doc for the read. Regenerate this file whenever the folder's contents change; the due dates live in `running-notes/refresh-schedule.md`.

Twelve audits exist, all baselined in the cold-start build of 2026-09-06 / 2026-09-07. **This is the account's point zero:** no prior audit exists in any period, so nothing here carries a quarter-over-quarter or month-over-month trajectory, and every one of them says so in its own `data_limitations`. The shared denominators across the whole folder: 163 Raselio ads, 6 Meta-attributed purchases, 11 Shopify orders, 2 ad comments, 0 customer reviews.

## 2026-Q3 — quarterly, internal

- **`2026-Q3/90-day-creative-strategy-audit.md`** — the anchor read of the quarter. Ranks the top 10 ads by spend, deep-dives four, and lands the finding the rest of the folder keeps confirming: the "Impeccable" family carries 4 of the 6 purchases while the account sells a man in his late twenties to men over sixty. Run 2026-09-06.
- **`2026-Q3/90-day-performance-audit.md`** — delivery and efficiency for the same window: spend, CPM, CTR, funnel steps, placement and demographic breakdowns, and the two account totals that do not reconcile (Meta API 183 ads / 850,79 € against Parker 173 ads / 771,64 €). Run 2026-09-06.
- **`2026-Q3/90-day-diversity-audit.md`** — format diversity. Everything the account makes is one static box; inside it, Post-It Note takes 45,4 % of spend and does not sell, while the under-used Headline Only sub-format carries 4 of 6 purchases. Run 2026-09-06.
- **`2026-Q3/gaps-opportunities-inspo.md`** — the threat-typed competitive landscape plus the unserved-use and whitespace read, built from the Thomyle corpus, the Gillette external corpus and the French ad library. Carries a 30-day cadence rather than 90 because a rival changed state inside the window. Run 2026-09-07.

## 2026-Q3 — quarterly, external (competitor cuts)

Both external cuts read **Gillette Labs Body + Intimate**, the one rival Parker holds a real ad corpus for (1 085 ads). Both warn on the same limit: the corpus belongs to the global page 7390944749 and is almost entirely English, so the France read rests on ten ad-library lines with no creative.

- **`2026-Q3/external/90-day-creative-strategy-audit-external.md`** — how Gillette's creative works: casting, opening beats, the UGC block, and the safety vocabulary P&G is teaching the French market. Run 2026-09-06.
- **`2026-Q3/external/90-day-performance-audit-external.md`** — Gillette's delivery and reputation read, plus the seven customer-review texts reachable only through a search-engine summary because the proxy blocked every review page. Run 2026-09-06.

## 2026-09 — monthly

- **`2026-09/monthly-hook-audit.md`** — every hook in use, by register, with verbatim copy and spend against each. The account is 168 statics and 3 videos, so static hooks are read as spatial hooks; the six purchases sit in five ads out of 183, four of them carrying the word IMPECCABLE. Run 2026-09-06.
- **`2026-09/monthly-performance-report.md`** — the month's what-worked / what-did-not, September being six days old at pull time and said to be partial throughout. Also carries the Meta-versus-Shopify attribution gap: 6 attributed purchases against 11 orders. Run 2026-09-06.
- **`2026-09/monthly-organic-tiktok-audit.md`** — the niche organic feed, because the brand has no TikTok account at all. Twenty videos, all English-language, all creators under forty, so it reads the category and not this market. Run 2026-09-06.
- **`2026-09/monthly-tiktok-mining.md`** — ten organic videos worth adapting, scene by scene, split into brand-base and wider-corpus halves from the same 20-video library. Run 2026-09-06.

## 2026-09 — biweekly and weekly

- **`2026-09/biweekly-iterations-report.md`** — which ads deserve an iteration and what the iteration is, for 2026-08-24 to 2026-09-06. Eleven creative batches entered one CBO campaign in twenty-two days; the promotional register (38,8 % of the fortnight's spend, zero purchases) is filtered out before selection. Run 2026-09-06, due every 14 days.
- **`2026-09/weekly-performance-snapshot.md`** — the fastest-moving cut, week 2026-36. Risers and fallers, launches (114 ads created in six days, 70 % of the whole library), and the first breakdown filtered to Raselio alone rather than the shared account. Run 2026-09-06, due every 7 days.

## Not generated, and why

- **`2026-Q3/customer-review-audit.md`** — blocked, not skipped. Four independent queries on 2026-09-06 return N = 0: the store has no review app and no reviews. It runs the day the brand collects its first ones.
- **`2026-Q3/quarterly-whitespace-analysis.md`** — not reached in the cold start. `gaps-opportunities-inspo.md` covers part of the same ground until it runs.

Both are logged in `running-notes/missing-context.md`.
