# Refresh schedule — Raselio

This is the one place that tracks when every standing doc was last run and when it is due to be re-run. Each doc's own `generated_on` and `refresh_by` frontmatter is the source of truth; this file aggregates them so the whole brain's freshness can be read at a glance instead of opening every doc. The cadence policy — which doc type refreshes how often, and the real-world triggers that override the calendar — lives in `parker-system/system/refresh-cadence.md`.

Aggregated on **2026-09-07** from the frontmatter of every standing doc the 2026-09-06 / 2026-09-07 build produced. Every date below was read off a file, not assumed.

## The next three dates, so nobody has to scroll for them

Read off the files on 2026-09-07, in order:

| Date | What comes due | Where |
|---|---|---|
| **2026-09-13** | `audits/2026-09/weekly-performance-snapshot.md` | audit cadence table below |
| **2026-09-20** | `audits/2026-09/biweekly-iterations-report.md` | audit cadence table below |
| **2026-09-21** | `open-loops/2026-09-07-roll-up.md` **plus the 12 graded loops** in `open-loops/promoted/2026-09/` | event-driven table below |

The first two are cadence cuts that re-run themselves. The 2026-09-21 date is the only strategic appointment in the month, it lands on thirteen documents at once, and until the fixer pass of 2026-09-07 nothing in this ledger surfaced it, because the open-loops row read "not yet run".

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
| `strategy/persona-strategy-input.md` | 2026-09-07 | 2026-10-07 (30d, tightened) |
| `strategy/product-priority.md` | 2026-09-07 | 2026-10-07 (30d, tightened) |
| `strategy/messaging-strategy-input.md` | 2026-09-07 | 2026-10-07 (30d, tightened) |
| `strategy/creator-talent-strategy-input.md` | 2026-09-07 | 2026-10-07 (30d, tightened) |
| `strategy/strategic-roadmap.md` | 2026-09-07 | 2026-10-07 (30d, tightened) — **status: drafted, not approved** |

The five `strategy/` lines were stamped on 2026-09-07 when the Phase-2 prompts wrote their files. All five carry a 30-day rather than a 90-day cadence, and each names its own trigger in its `refresh_note`. Three reasons recur across them: every call rests on six attributed purchases and one customer sentence, so the next purchase or the first review moves the numbers underneath; the four Tier-1 loops in `open-loops/2026-09-07-roll-up.md` are promoted and will resolve inside the window; and the targeting decision the team wrote twice had still not landed in the account on 2026-09-06, which is the gate under two of the five docs.

**The roadmap is drafted, not approved.** `strategy/strategic-roadmap.md` carries `status: drafted — awaiting the founder's approve / adjust / reject` and `approved_by:` is empty — the founder was not available during the build. Everything Phase 3 produces from it (the idea bank's grading, the sprint plan, the briefs) is provisional and re-ranks on the first arbitration. Two consequences for this schedule. First, an approval or an adjustment is itself a refresh trigger for the roadmap, independent of the date above. Second, the dependency spine still applies: if any of the four strategy inputs is re-run and its read materially changes, the roadmap is stale-by-dependency, and when the roadmap changes, `idea-bank/evaluation-[YYYY-MM-DD].md` is re-graded against the new version.

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
| `working-thesis-synthesis.md` (racine) | **2026-09-07** | **2026-10-07** (30d, tightened) |

**`working-thesis-synthesis.md` is the cross-competitor synthesis and it sits at the root, not under `competitors/`.** Its own frontmatter reads `generated_on: 2026-09-07`, `refresh_by: 2026-10-07`, so it carries 30 days rather than the semi-annual default of its inputs. Two reasons sit in the doc itself: none of the three rivals is subscribed in Parker, so the corpus behind it can move without any movement tracking firing, and the most-spending French rival changed state inside the window it was written on. It is also stale-by-dependency whenever two or more of the three competitor snapshots are re-run, since it is a synthesis of them.

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
| `idea-bank/evaluation-2026-09-07.md` | **2026-09-07** | événementiel. Se re-fait quand la feuille de route est approuvée ou ajustée, quand le bac grossit assez pour changer le classement, ou quand une idée expédiée revient comme hypothèse validée. **L'approbation du fondateur est à elle seule un déclencheur, et elle re-classe les 26 entrées.** |
| `idea-bank/index.md` et `idea-bank/entries/` (26 entrées) | **2026-09-07** | capture continue, jamais périmée en bloc. **Curation mensuelle due le 2026-10-07** : fusionner les doublons, marquer les idées éventées, promouvoir en `worth testing`, marquer en `used` celles devenues concepts. |
| `sprints/2026-09-07-sprint-1/sprint-plan.md` | **2026-09-07** | artefact par round, pas de date. On en écrit un nouveau au prochain sprint. Se re-planifie seulement si la feuille de route est approuvée avec des priorités déplacées avant l'expédition, ou si une lecture fraîche de dépense change la taille portable. |
| `sprints/2026-09-07-sprint-1/briefs/` (4 briefs) | **2026-09-07** | vivants jusqu'à l'expédition. Le statut passe de `drafted` à `in-production`, `shipped` ou `shelved` au fil du round, et ce qu'ils apprennent remonte dans `idea-bank/`, `personas/`, `validations/` et `brand-lens.md`. |
| `sprints/2026-09-07-sprint-1/retro.md` | **2026-09-07**, scaffold vide | à la cadence du rétro créatif, c'est-à-dire **à l'expédition du round**, environ le 2026-10-05 si la vague A part la semaine du 2026-09-08. Ce n'est pas une date de calendrier. |
| `open-loops/2026-09-07-roll-up.md` | **2026-09-07** | **2026-09-21** |
| `open-loops/promoted/2026-09/` (12 boucles gradées) | **2026-09-07** | **2026-09-21** |
| `hypotheses/`, `validations/`, `re-validations/`, `open-loops/archived/` | jamais écrits | après la première passe `/research-loops` qui avance une boucle promue en hypothèse |

`brand-profile-narrative.md` is normally event-driven with a 90-day floor. Its own frontmatter tightens it to 30 days and names the two triggers that already fired: the Parker brand appearing at 09:50 UTC on 2026-09-06, which makes every pre-09:50 slice's data-limitation block stale, and the most-spending French rival nearly switching its media off, which changes the map several slices were written on. It is also due automatically whenever two or more of its input slices are re-run, and the three docs in the priority queue above are all input slices, so a priority re-run pass drags this doc with it.


**La Phase 3 a tourné le 2026-09-07, et tout ce qu'elle a produit est provisoire.** Les cinq lignes ci-dessus, la banque d'idées, sa notation, le plan de sprint, les quatre briefs et le gabarit de rétro, descendent de `strategy/strategic-roadmap.md`, qui porte `status: drafted — awaiting the founder's approve / adjust / reject`. La règle de dépendance du modèle en trois phases s'applique en entier : **quand la feuille de route est approuvée, ajustée ou rejetée, `idea-bank/evaluation-2026-09-07.md` est périmé le jour même**, et le plan de sprint et les quatre briefs le sont avec lui s'ils n'ont pas encore été expédiés. La capture elle-même, les 26 entrées, survit à un changement de direction : elle est non notée par construction, c'est son classement qui bouge.

**Le roll-up des boucles ouvertes a tourné, et il porte la date la plus proche du cerveau.** `open-loops/2026-09-07-roll-up.md` a été écrit le 2026-09-07, et `open-loops/promoted/2026-09/` porte **12 boucles gradées**, `t1-1` à `t1-4` et `br-1` à `br-9` moins `br-5`, chacune stampée `generated_on: 2026-09-07` et `refresh_by: 2026-09-21`. Une version antérieure de ce fichier disait que le roll-up n'avait pas tourné, ce qui rendait invisibles treize documents et leur échéance. Trois dates seulement tombent avant la fin septembre, et les voici dans l'ordre relevé sur les fichiers : **2026-09-13** pour `weekly-performance-snapshot.md`, **2026-09-20** pour `biweekly-iterations-report.md`, **2026-09-21** pour le roll-up et ses douze boucles. Les deux premières sont des coupes de cadence qui se refont d'elles-mêmes. La troisième est la seule échéance stratégique du mois, elle porte treize documents d'un coup, et c'est celle qu'aucune version antérieure de ce fichier ne montrait : à cette date, soit les boucles Tier 1 sont avancées en hypothèses, soit le roll-up est re-gradé parce que le terrain a bougé. `archived/` reste vide, aucune boucle n'a été tuée après promotion.

**Deux échéances datées à surveiller, toutes deux hors calendrier de refresh.** **BR-3** ferme sa fenêtre du premier acheteur vers le **2026-09-25** : tant qu'elle est ouverte, une variation de `RS-S1-02` et l'entrée « L'essai chez soi de l'audioprothèse » restent bloquées. Et **BR-8**, le ciblage écrit deux fois et jamais appliqué, verrouille la lisibilité de deux concepts sur quatre du round : sans elle, `RS-S1-01` et `RS-S1-03` sont produisibles mais illisibles.

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
| `audits/2026-Q3/external/90-day-diversity-audit-external.md` (Gillette) | **2026-09-07** | **2026-12-06** |
| `audits/2026-Q3/external/single-competitor-ad-analysis-thomyle.md` | **2026-09-07** | **2026-12-06** |
| `audits/2026-Q3/gaps-opportunities-inspo.md` | 2026-09-07 | 2026-10-07 (30d, tightened) |
| `audits/2026-Q3/customer-review-audit.md` | **2026-09-07** | **2026-12-06** |
| `audits/2026-Q3/quarterly-whitespace-analysis.md` | **2026-09-07** | **2026-12-06** |
| `audits/2026-09/external/monthly-creative-landscape.md` | **2026-09-07** | **2026-10-07** |
| `audits/2026-09/external/monthly-top-impressions-report.md` | **2026-09-07** | **2026-10-07** |
| `audits/2026-09/monthly-hook-audit.md` | 2026-09-06 | 2026-10-06 |
| `audits/2026-09/monthly-performance-report.md` | 2026-09-06 | 2026-10-06 |
| `audits/2026-09/monthly-organic-tiktok-audit.md` | 2026-09-06 | 2026-10-06 |
| `audits/2026-09/monthly-tiktok-mining.md` | 2026-09-06 | 2026-10-06 |
| `audits/2026-09/biweekly-iterations-report.md` | 2026-09-06 | 2026-09-20 |
| `audits/2026-09/weekly-performance-snapshot.md` | 2026-09-06 | **2026-09-13** |

**Eighteen documents live in `audits/` and all eighteen are in the table above.** Counted on disk on 2026-09-07: six in `2026-Q3/`, four in `2026-Q3/external/`, six in `2026-09/`, two in `2026-09/external/`. `audits/INDEX.md` and `audits/README.md` are not audits and are not counted.

`customer-review-audit.md` **was written on 2026-09-07**, and the earlier line here saying it was never generated was wrong. It ran against an empty pool rather than skipping: four independent queries return N = 0, the tool says in plain words that access is not the problem, and the doc records `0 avis, 0 réponses de sondage post-achat, 2 commentaires publicitaires` and refuses to pass the brand's own copy off as customer language. It is due again on 2026-12-06, and the day the brand collects its first real reviews is a trigger that pulls it forward.

`quarterly-whitespace-analysis.md` **was also written on 2026-09-07**, 353 lines, due 2026-12-06. It reads 581,16 € of 830,16 € of spend, 70,0 %, treats the roughly 155 ad lines under 14,33 € in aggregate, and declares that aggregation as a knowing breach of the method's counting rule rather than hiding it. `gaps-opportunities-inspo.md` covers adjacent ground on a 30-day cadence; the two are complementary, not substitutes.

The four external audits added to the table above were absent from every earlier version of this ledger. Two of them, `monthly-creative-landscape.md` and `monthly-top-impressions-report.md`, come due on **2026-10-07**, and nothing surfaced them before this pass.

`gaps-opportunities-inspo.md` carries a 30-day rather than 90-day cadence for a stated reason: a rival changed state inside the window, and the monthly count of Gillette lines in the French ad library is named as the one metric to track each month.

### Exempt — self-cadenced or always-on, no entry needed

- `running-notes/` — `brand-rules.md`, `success-definition.md`, `brand-notes-from-org.md`, `missing-context.md`, `standard-sync.md` and `routine-log.md` update continuously as the brand teaches Parker something, not on a calendar.
- `brand-lens.md` — grows by accretion. The refresh and self-improve routines add to it; it is never re-run wholesale.
- `source-pulls/` — dated evidence captures. They are never refreshed, they are superseded by a newer pull with a newer date.
- `audits/INDEX.md` and `competitors/INDEX.md` — regenerated when their folder's contents change, not on a date.
- `idea-bank/entries/` — captured continuously. `briefs/` and `sprints/` are per-campaign artifacts, not refreshed. **Mise à jour du 2026-09-07 :** ces dossiers ne sont plus vides. `idea-bank/entries/` porte 26 entrées, `idea-bank/` porte son index et sa première notation, et `sprints/2026-09-07-sprint-1/` porte un plan, quatre briefs et un gabarit de rétro. Ils restent exempts de cadence calendaire, puisqu'un artefact par round ne se rafraîchit pas mais se remplace, et ils sont désormais listés dans le tableau événementiel ci-dessus avec leur déclencheur, parce qu'ils ont un déclencheur réel : l'arbitrage du fondateur sur la feuille de route.
