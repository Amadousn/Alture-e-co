# Refresh schedule — Raselio

This is the one place that tracks when every standing doc was last run and when it is due to be re-run. Each doc's own `generated_on` and `refresh_by` frontmatter is the source of truth; this file aggregates them so the whole brain's freshness can be read at a glance instead of opening every doc. The cadence policy — which doc type refreshes how often, and the real-world triggers that override the calendar — lives in `parker-system/system/refresh-cadence.md`.

Aggregated on **2026-09-07** from the frontmatter of every standing doc the 2026-09-06 / 2026-09-07 build produced. Every date below was read off a file, not assumed.

## How Parker uses this

- When you load this brain or consult a standing doc, read this schedule and compare each `due` date to today. A doc whose due date has passed is overdue; one inside roughly two weeks of its due date is due soon.
- Surface what is overdue or due soon plainly, and offer to re-run the generating prompt by name — "your ad-account read is from September and it is now November, want me to refresh it." Do not silently keep using a doc past its due date, and do not re-run without surfacing the recommendation first.
- A refresh is a re-run of the generating prompt. It takes the prior version as context, carries forward what is still true, and re-stamps `generated_on` and `refresh_by`. After a re-run, update that doc's line here and prepend one entry to `running-notes/routine-log.md`.
- The triggers in `parker-system/system/refresh-cadence.md` outrank the calendar. A rebrand, a new SKU, a pricing move, a new competitor, an attribution change, or a validated finding that changes the read makes a doc due early regardless of the date here. When a trigger has fired, flag the doc as due now and note the trigger.
- When two or more sub-context slices have been re-run, `sub-context-docs/brand-profile-narrative.md` is due regardless of its own date, because it is a synthesis of them.

---

## ⚠ Priority re-run queue — run these first, ahead of any calendar date

**Why this queue exists.** The Raselio brand did not exist in the Parker MCP when this build started. `get_available_brands` returned `organizations: []` at 06:00 UTC on 2026-09-06. The brand appeared mid-build at **2026-09-06 09:50 UTC** (`brand_id a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, org "Dylan's Org"), which opened ad comments, customer reviews, post-purchase surveys, the TikTok corpus, creative media analysis and `brand_discovery`.

**Every doc written before 09:50 UTC therefore carries "no brand_id" and "unreachable" notes that are no longer true.** Their conclusions may still hold; their stated reasons for not knowing something do not. Three standing docs are affected, all verified by their own timestamps and their own `data_limitations` blocks:

| Doc | Written | The stale note it carries | Due |
|---|---|---|---|
| `competitors/_competitive-set.md` | 2026-09-06 05:37 UTC | "`brand_discovery` (Parker MCP) could not run — no Raselio brand in Parker on build day." It runs now. | **now** (calendar date 2027-03-06) |
| `sub-context-docs/brand-identity-analysis.md` | 2026-09-06 08:16 UTC | "Aucun brand_id Parker : pas de lecture des commentaires publicitaires, des avis, ni de la bibliothèque concurrente via Parker MCP." Also: "Aucun fichier brand-lens.md à la racine du brain" — `brand-lens.md` now exists. | **now** (calendar date 2026-12-06) |
| `sub-context-docs/website-and-product-audit.md` | 2026-09-06 08:21 UTC | "Pas de brand_id Parker : aucune lecture de commentaires publicitaires ni de sondage post-achat." Both are reachable now. | **now** (calendar date 2026-12-06) |

**What a re-run must correct, in all three.** The buyer surfaces are not "unpulled", they were queried and they are empty, which is a different fact calling for a different action: `search_customer_reviews_sql` returns 0 reviews with an explicit message that access is not the problem; `semantic_search_post_purchase_survey` returns `totalResponsesForBrand: 0`; `search_facebook_ad_comments_sql` returns exactly 2 comments account-wide, verified twice. Those three emptinesses are closed by an action from the brand, not by an access grant. What remains a genuine access hole and must stay marked as one: no Reddit tool exists in this Parker install, all direct web reads are refused by the session proxy, and no tool returns Instagram comments while 28,2 % of Raselio spend goes there.

The full correction note is in `running-notes/missing-context.md` under "Note transversale sur les huit passes de source persona".

---

## The schedule, by cadence

### Quarterly — roughly 90 days

| Doc | Last run | Due |
|---|---|---|
| `sub-context-docs/ad-account-evaluation.md` | 2026-09-06 | 2026-10-06 (30d, tightened) |
| `sub-context-docs/performance-targets-and-metrics.md` | 2026-09-06 | 2026-10-06 (30d, tightened) |
| `sub-context-docs/organic-channels-inventory.md` | 2026-09-06 | 2026-12-06 |
| `sub-context-docs/visual-vocabulary.md` | 2026-09-06 | 2026-10-06 (30d, tightened) |
| `sub-context-docs/marketing-calendar-and-campaigns.md` | 2026-09-06 | 2026-11-01 |
| `strategy/persona-strategy-input.md` | not yet run | on first run |
| `strategy/product-priority.md` | not yet run | on first run |
| `strategy/messaging-strategy-input.md` | not yet run | on first run |
| `strategy/creator-talent-strategy-input.md` | not yet run | on first run |
| `strategy/strategic-roadmap.md` | not yet run | on first run |

The five `strategy/` lines are stamped as soon as the Phase-2 prompts write their files; the folder is empty at the time this schedule was aggregated. Whoever writes them fills the line in the same pass.

### Semi-annual — roughly 180 days

| Doc | Last run | Due |
|---|---|---|
| `sub-context-docs/reputation-analysis.md` | 2026-09-06 | 2026-12-06 |
| `sub-context-docs/customer-journey-and-persona-discovery.md` | 2026-09-06 | 2026-12-06 |
| `sub-context-docs/category-and-market-research.md` | 2026-09-06 | 2026-12-06 |
| `sub-context-docs/competitive-landscape.md` | 2026-09-06 | 2026-12-06 |
| `sub-context-docs/community-and-forums.md` | 2026-09-06 | 2026-10-06 (30d, tightened) |
| `sub-context-docs/website-and-product-audit.md` | 2026-09-06 | 2026-12-06 — **but overdue now, see priority queue** |
| `personas/personas-profile.md` | 2026-09-07 | 2026-12-07 |
| `personas/persona-voice-library.md` | 2026-09-07 | 2026-12-07 |
| `personas/lifecycle-journey-maps.md` | 2026-09-07 | 2026-12-07 |
| `personas/cross-persona-bias-notes.md` | 2026-09-07 | 2026-12-07 |
| `personas/voice-of-customer/voice-of-customer.md` | 2026-09-06 | 2026-12-06 |
| `personas/voice-of-customer/voc-*.md` (10 category files) | 2026-09-06 | 2026-12-06 |
| `competitors/thomyle/competitor-snapshot.md` | 2026-09-06 | 2026-12-06 |
| `competitors/gillette-labs-body-intimate/competitor-snapshot.md` | 2026-09-06 | 2026-12-06 |
| `competitors/philips-oneblade-intimate/competitor-snapshot.md` | 2026-09-06 | 2026-12-06 |
| `competitors/thomyle/sub-context-docs/` (9 docs) | 2026-09-06 | 2027-03-06 |
| `competitors/_competitive-set.md` | 2026-09-06 | 2027-03-06 — **but overdue now, see priority queue** |

The ten voice-of-customer category files are `voc-anti-language`, `voc-aspirational`, `voc-category-jargon`, `voc-corpus-profile`, `voc-metaphor`, `voc-objection`, `voc-outcome-phrase`, `voc-pain-phrase`, `voc-surprise-delight`, `voc-trigger-moment`. All ten carry the same dates. The nine Thomyle sub-context docs are `ad-account-evaluation`, `brand-identity`, `community-and-forums`, `customer-and-persona-discovery`, `organic-channels-audit`, `public-perception`, `reviews-and-customer-language`, `running-notes-on-competitor`, `website-and-product-audit`.

### Annual — roughly 365 days

| Doc | Last run | Due |
|---|---|---|
| `sub-context-docs/brand-identity-analysis.md` | 2026-09-06 | 2026-12-06 — **but overdue now, see priority queue** |
| `sub-context-docs/operations-and-team.md` | 2026-09-06 | 2026-12-06 |

Both carry a tighter date than the annual default. The brand is 46 days old at build time and both docs say their own subject is still moving.

### Event-driven — no calendar date, re-run when the trigger fires

| Doc | Last run | Due |
|---|---|---|
| `sub-context-docs/brand-profile-narrative.md` | 2026-09-07 | 2026-10-07 |
| `idea-bank/evaluation-[YYYY-MM-DD].md` | not yet run | after the first `/harvest-ideas` run |
| Open-loops roll-up (`open-loops/`) | not yet run | after the first `/research-loops` run |

`brand-profile-narrative.md` is normally event-driven with a 90-day floor. Its own frontmatter tightens it to 30 days and names the two triggers that already fired: the Parker brand appearing at 09:50 UTC on 2026-09-06, which makes every pre-09:50 slice's data-limitation block stale, and the most-spending French rival nearly switching its media off, which changes the map several slices were written on. It is also due automatically whenever two or more of its input slices are re-run, and the three docs in the priority queue above are all input slices, so a priority re-run pass drags this doc with it.

Competitor rotation: the constant set (Thomyle, Gillette, Philips) refreshes on the semi-annual cadence; affinity and inspiration rivals rotate each audit cycle rather than being re-run.

### Audit cadence — baselined at build, then re-run on each audit's named interval

Generated once at the cold start and re-run from each audit's own `generated_on`.

| Audit | Last run | Due |
|---|---|---|
| `audits/2026-Q3/90-day-creative-strategy-audit.md` (anchor) | 2026-09-06 | 2026-12-05 |
| `audits/2026-Q3/90-day-performance-audit.md` | 2026-09-06 | 2026-12-05 |
| `audits/2026-Q3/90-day-diversity-audit.md` | 2026-09-06 | 2026-12-05 |
| `audits/2026-Q3/external/90-day-creative-strategy-audit-external.md` (Gillette) | 2026-09-06 | 2026-12-05 |
| `audits/2026-Q3/external/90-day-performance-audit-external.md` (Gillette) | 2026-09-06 | 2026-12-05 |
| `audits/2026-Q3/gaps-opportunities-inspo.md` | 2026-09-07 | 2026-10-07 (30d, tightened) |
| `audits/2026-Q3/customer-review-audit.md` | never generated | when the store has reviews |
| `audits/2026-Q3/quarterly-whitespace-analysis.md` | never generated | next quarterly pass |
| `audits/2026-09/monthly-hook-audit.md` | 2026-09-06 | 2026-10-06 |
| `audits/2026-09/monthly-performance-report.md` | 2026-09-06 | 2026-10-06 |
| `audits/2026-09/monthly-organic-tiktok-audit.md` | 2026-09-06 | 2026-10-06 |
| `audits/2026-09/monthly-tiktok-mining.md` | 2026-09-06 | 2026-10-06 |
| `audits/2026-09/biweekly-iterations-report.md` | 2026-09-06 | 2026-09-20 |
| `audits/2026-09/weekly-performance-snapshot.md` | 2026-09-06 | **2026-09-13** |

`customer-review-audit.md` was not generated because the review pool is empty, verified by four independent queries returning N = 0 on 2026-09-06. It is not a skipped step, it is a blocked one, and the block lifts the day the brand collects its first reviews. `quarterly-whitespace-analysis.md` was not reached in the cold start; `gaps-opportunities-inspo.md` covers part of the same ground in the meantime. Both are logged in `running-notes/missing-context.md`.

`gaps-opportunities-inspo.md` carries a 30-day rather than 90-day cadence for a stated reason: a rival changed state inside the window, and the monthly count of Gillette lines in the French ad library is named as the one metric to track each month.

### Exempt — self-cadenced or always-on, no entry needed

- `running-notes/` — `brand-rules.md`, `success-definition.md`, `brand-notes-from-org.md`, `missing-context.md`, `standard-sync.md` and `routine-log.md` update continuously as the brand teaches Parker something, not on a calendar.
- `brand-lens.md` — grows by accretion. The refresh and self-improve routines add to it; it is never re-run wholesale.
- `source-pulls/` — dated evidence captures. They are never refreshed, they are superseded by a newer pull with a newer date.
- `audits/INDEX.md` and `competitors/INDEX.md` — regenerated when their folder's contents change, not on a date.
- `idea-bank/entries/` — captured continuously. `briefs/` and `sprints/` are per-campaign artifacts, not refreshed.
