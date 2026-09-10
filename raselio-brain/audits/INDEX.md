# Audits — index

The generated map of `audits/`. One line per audit: what it is, when it was run, and the one thing it settles. Pointers, not findings — open the doc for the read. Regenerate this file whenever the folder's contents change; the due dates live in `running-notes/refresh-schedule.md`.

**Eighteen documents are in this folder**, counted on disk on 2026-09-07: six in `2026-Q3/`, four in `2026-Q3/external/`, six in `2026-09/`, two in `2026-09/external/`. `INDEX.md` and `README.md` are not audits and are not counted. All eighteen were baselined in the cold-start build of 2026-09-06 / 2026-09-07. **This is the account's point zero:** no prior audit exists in any period, so nothing here carries a quarter-over-quarter or month-over-month trajectory, and every one of them says so in its own `data_limitations`.

## The denominators, and the fact that they do not agree

An earlier version of this index printed one flat set of numbers for the whole folder. That was wrong, and it flattened a disagreement the audits themselves carry openly. Here is what the underlying documents actually say, side by side, never added:

**Ad counts: three totals, three scopes, unreconciled.**

- **183 ads · 850,79 €** : the direct Meta API pull of 2026-09-06 08:00 UTC, account-wide, so it includes the sister brand Trael.
- **173 ads · 771,64 €** : Parker MCP, same account, lifetime. The gap against the Meta API is **10 ads and 79,15 €**, and `2026-Q3/90-day-performance-audit.md` says in plain words that its sources do not explain it, guessing at partial sync of the newest creatives without claiming it.
- **163 ads · 684,82 €** : the Raselio-only slice of the Meta API pull, 4 campaign lines. Summing the 163 ad lines instead gives **677,81 €**, a further 7,01 € the sources do not explain.

Which number an audit uses depends on which tool it read and whether its question is Raselio-only or account-wide. Read the scope on each doc rather than assuming one denominator travels across the folder. The two totals are never added.

**Purchases: 6 or 7, depending on scope.** Six Meta-attributed purchases for Raselio alone; `2026-Q3/quarterly-whitespace-analysis.md` reads **7 achats on 830,16 €** because it works at Parker's account scope, Trael included. Shopify counts **11 orders** over the same window, so five orders are seen by no ad report at all.

**Steady across every audit in the folder:** 2 ad comments account-wide, 0 customer reviews, 0 post-purchase survey responses.

**One more disagreement worth carrying:** Instagram's share of Raselio spend reads **28,2 %** in sixteen documents including the source pull, and **28,1 %** in `2026-Q3/quarterly-whitespace-analysis.md` and `2026-Q3/customer-review-audit.md`, both generated a day later against a moving account. Neither doc says it re-pulled. Both figures are carried; 28,2 % is the one the source pull holds.

## 2026-Q3 — quarterly, internal

- **`2026-Q3/90-day-creative-strategy-audit.md`** — the anchor read of the quarter. Ranks the top 10 ads by spend, deep-dives four, and lands the finding the rest of the folder keeps confirming: the "Impeccable" family carries 4 of the 6 purchases while the account sells a man in his late twenties to men over sixty. Run 2026-09-06.
- **`2026-Q3/90-day-performance-audit.md`** — delivery and efficiency for the same window: spend, CPM, CTR, funnel steps, placement and demographic breakdowns, and the two account totals that do not reconcile (Meta API 183 ads / 850,79 € against Parker 173 ads / 771,64 €). Run 2026-09-06.
- **`2026-Q3/90-day-diversity-audit.md`** — format diversity. Everything the account makes is one static box; inside it, Post-It Note takes 45,4 % of spend and does not sell, while the under-used Headline Only sub-format carries 4 of 6 purchases. Run 2026-09-06.
- **`2026-Q3/customer-review-audit.md`** — the audit whose result is a number, and the number is zero. Three review surfaces queried by three tools on 2026-09-07 with no filter and the loosest thresholds available; all three answered, none returned a line, and the tool says verbatim that this is not an access issue. What the doc actually holds is two ad comments, one of them a single word. It refuses to pass the brand's own ~224 headline/body pairs or its five documented invented testimonials off as customer language, routing that guard through `source-pulls/personas/brand-self-echo-detection.md`. Run 2026-09-07.
- **`2026-Q3/quarterly-whitespace-analysis.md`** — the most expensive empty space in the account, in two numbers that should be close and are not: 82,8 % of spend is delivered to men 45 and over, and 2,0 % of spend goes to creative that names that man. The four ads that do name him spent 16,36 € lifetime and one of them already carries a purchase at 13,85 € cost per purchase against a 118,59 € account average. It also declares its own methodological breach: the roughly 155 ad lines under 14,33 € were read in aggregate, not one by one. Run 2026-09-07.
- **`2026-Q3/gaps-opportunities-inspo.md`** — the threat-typed competitive landscape plus the unserved-use and whitespace read, built from the Thomyle corpus, the Gillette external corpus and the French ad library. Carries a 30-day cadence rather than 90 because a rival changed state inside the window. Run 2026-09-07.

## 2026-Q3 — quarterly, external (competitor cuts)

Four cuts, not two. Three read **Gillette Labs Body + Intimate**, the one rival Parker holds a real ad corpus for (1 085 ads recorded). All three warn on the same limit: the corpus belongs to the global page 7390944749 and is almost entirely English, so the France read rests on ten ad-library lines with no creative. The fourth reads **Thomyle**, where the opposite limit applies: the text is known word for word and not a single visual is.

- **`2026-Q3/external/90-day-creative-strategy-audit-external.md`** — how Gillette's creative works: casting, opening beats, the UGC block, and the safety vocabulary P&G is teaching the French market. Run 2026-09-06.
- **`2026-Q3/external/90-day-performance-audit-external.md`** — Gillette's delivery and reputation read, plus the seven customer-review texts reachable only through a search-engine summary because the proxy blocked every review page. Run 2026-09-06.
- **`2026-Q3/external/90-day-diversity-audit-external.md`** — who actually appears on screen in Gillette's ads, counted rather than graded. 355 body-line ads read, with casting counted off a deliberate 20-ad sample because the `creator_demographic` field saturates the response budget at twenty; everything beyond that sample is marked `inferred`, never `verified`. Run 2026-09-07.
- **`2026-Q3/external/single-competitor-ad-analysis-thomyle.md`** — the one deep cut on the direct French rival. Twenty-eight ads launched in the 9 June to 7 September window, twenty-six of them uploaded inside fifty-seven seconds on 5 August and nothing since: a light left on, not a test program. The quarter's 2 955,72 € is 3,0 % of the 97 741,09 € this account has spent across 1 063 ads, and August alone runs at about 3,68 € a day. Run 2026-09-07.

## 2026-09 — monthly

- **`2026-09/monthly-hook-audit.md`** — every hook in use, by register, with verbatim copy and spend against each. The account is 168 statics and 3 videos, so static hooks are read as spatial hooks; the six purchases sit in five ads out of 183, four of them carrying the word IMPECCABLE. Run 2026-09-06.
- **`2026-09/monthly-performance-report.md`** — the month's what-worked / what-did-not, September being six days old at pull time and said to be partial throughout. Also carries the Meta-versus-Shopify attribution gap: 6 attributed purchases against 11 orders. Run 2026-09-06.
- **`2026-09/monthly-organic-tiktok-audit.md`** — the niche organic feed, because the brand has no TikTok account at all. Twenty videos, all English-language, all creators under forty, so it reads the category and not this market. Run 2026-09-06.
- **`2026-09/monthly-tiktok-mining.md`** — ten organic videos worth adapting, scene by scene, split into brand-base and wider-corpus halves from the same 20-video library. Run 2026-09-06.

## 2026-09 — monthly, external

- **`2026-09/external/monthly-creative-landscape.md`** — what the competitive set shipped this month, and the honest statement that the four brands are not equally readable: Gillette arrives with 101 fully analysed ads, Thomyle with 26 ads whose text is known and whose visuals are not, Grümwise with a second-hand team document, Philips with nothing. First pass, so trajectory is built by comparing the 30-day window against the 30 days before it inside the same data, and it says where it does that. Run 2026-09-07.
- **`2026-09/external/monthly-top-impressions-report.md`** — Gillette's top slate by impressions, with Parker's exposed daily rank and dated rank history rather than a reconstruction from recency. Twenty ads read: no partnership disclosure anywhere, thirteen distinct media fingerprints across twenty slots, and not one of the twenty mentions money — the gap Raselio's no-refill argument walks into. Run 2026-09-07.

## 2026-09 — biweekly and weekly

- **`2026-09/biweekly-iterations-report.md`** — which ads deserve an iteration and what the iteration is, for 2026-08-24 to 2026-09-06. Eleven creative batches entered one CBO campaign in twenty-two days; the promotional register (38,8 % of the fortnight's spend, zero purchases) is filtered out before selection. Run 2026-09-06, due every 14 days.
- **`2026-09/weekly-performance-snapshot.md`** — the fastest-moving cut, week 2026-36. Risers and fallers, launches (114 ads created in six days, 70 % of the whole library), and the first breakdown filtered to Raselio alone rather than the shared account. Run 2026-09-06, due every 7 days.

## Not generated

Nothing. Every audit the Phase-1E branch calls for is on disk. An earlier version of this index listed `2026-Q3/customer-review-audit.md` and `2026-Q3/quarterly-whitespace-analysis.md` under a "Not generated, and why" heading; both were in fact written on 2026-09-07 and both are indexed above. The correction was made in the fixer pass of 2026-09-07 and is recorded in `prompts-run-log/2026-09-07-build-verification.md`.

What the folder still does not hold, and it is a different kind of absence: no second period. Every trajectory line in every audit here is waiting on the next quarter and the next month.
