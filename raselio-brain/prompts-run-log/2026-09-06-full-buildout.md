# Build log — Raselio — 2026-09-06 full buildout

Permanent provenance for the cold-start build. One line per document: output path, the prompt that generated it, the date it was generated, and the review status.

## Read this before you read the table

**The per-prompt fidelity review the runner specifies was not run on most of these documents, and this log does not pretend otherwise.**

`parker-system/prompts/onboarding-runner.md` § "Review pass" asks for a verdict on every prompt run — pass, re-run, or surfaced — logged here so the build carries its own quality record. That did not happen. The build ran through repeated session interruptions and a container restart, and the Phase 1 section of this file sat at "(appended as each prompt completes)" from 2026-09-06 until the fixer pass of 2026-09-07 appended everything below it. **Nothing was appended as it completed. There is no contemporaneous record of a review verdict on any document in this build.**

So the `Per-prompt review` column reads **none logged** on every row, and that is the honest value, not a placeholder. Do not read it as "failed review" and do not read it as "passed silently". It means no reviewer verdict exists.

**What carried quality instead, and it is not nothing.** Two things did the work a review pass would have done, and both are checkable on disk rather than asserted here:

1. **The fidelity contract in each prompt.** Every context-doc prompt in the mount embeds the claim-labelling rubric, the denominator rule, the verbatim-quote rule and the open-loops core block. The output carries the evidence of whether the contract was honored: `stated` / `verified` / `inferred` / `data-limited` marks in the prose, denominators travelling with every count, and a `data_limitations` frontmatter block on every doc.
2. **Each document's own frontmatter.** `built_from`, `sources_read`, `data_sources_read`, `data_limitations` and `methods_loaded` are on the docs themselves and name what was read and what was not reachable. The build-completion verification of 2026-09-07 spot-checked twelve documents across every branch against those blocks and found nothing that reads as fabricated to fill a gap; that check is written up in `prompts-run-log/2026-09-07-build-verification.md` and it is a sample, not a full review pass.

**The table below is a reconstruction, not a contemporaneous log.** It was built on 2026-09-07 by walking every `.md` outside `parker-system/` that carries `generated_on` frontmatter, reading the date off the file, and resolving the generating prompt from the factory prompt set. Every prompt path in the table was checked to exist in the mount. **116 documents carry `generated_on`.** Roughly a hundred of them had no line anywhere before this reconstruction.

**How the prompt column was resolved.** No document in this brain carries a `prompt:` or `generated_by:` frontmatter key, so the generating prompt is resolved by the path convention the runner's output map defines: `sub-context-docs/X.md` comes from `prompts/brand-profile/X.md`, `personas/voice-of-customer/voc-X.md` from `prompts/voice-of-customer/voc-X.md`, and so on. Two rows are resolved differently and are flagged in place: `competitors/_competitive-set.md` has no dedicated prompt and is seeded by the runner's own intake step, and `sprints/2026-09-07-sprint-1/retro.md` is a scaffold the sprint-plan prompt writes alongside the plan. **A future build should stamp the prompt path into each doc's frontmatter so this never has to be inferred again.**

## Phase 0 — 2026-09-06 06:00–07:00 UTC

- Factory cloned from https://github.com/real-simple-labs/parker-brain; highest tag `v15` (= commit b55c441, identical to `v14`); mounted at `parker-system/` as a submodule pinned to `v15`.
- Executable layer copied out of the mount: **21 craft skills** + 11-skill routine bundle (routine `dream` kept over craft `dream`), 2 review-gate agents, `scripts/voice-lint.py`, `scripts/grounding-check.py`, `.claude/output-styles/parker.md`, `.claude/settings.json`, 4 hooks, 6 schedule recipes. *(Corrected 2026-09-07: this line read "20 craft skills". `parker-system/.claude/skills/` holds 21, counted by name. The brain's `.claude/skills/` holds 26 = those 21 plus the 5 routine-only skills `disconnect-factory`, `get-started`, `research-loops`, `save-brain`, `update-brain`. The shipment was always complete; only the count in this log was wrong.)*
- Parker MCP: `get_available_brands` → `{"organizations":[]}` — no brand; `update_parker_brain_setup_status` therefore not callable (needs a brand UUID). Logged in missing-context.
- Operability test of the other surfaces (verified): Shopify store "Raselio" (1 product, 11 orders, 2 431 sessions/90d), Meta ad account 1573950771030463 (5 campaigns, 183 ads, ≈1 100 € spent since 2026-08-10), Google Drive (20 Raselio files), Gmail (64 Raselio/Cutlab threads), Brandsearch (thomyle.com corpus), Meta Ad Library (FR). Web fetch of raselio.com blocked by the sandbox proxy (page bodies read through Shopify Admin instead).
- Intake: unattended; answers derived from the team's own documents and marked stated; gaps → `running-notes/missing-context.md`.

## Phase 1 to Phase 3 — the runs, reconstructed 2026-09-07

116 documents, in the order the dependency graph ran them. `Generated` is the doc's own `generated_on`. `Per-prompt review` is **none logged** throughout, for the reason stated at the top of this file.

### Phase 1A — brand foundation — 14 documents

| Output | Generating prompt | Generated | Per-prompt review |
|---|---|---|---|
| `sub-context-docs/ad-account-evaluation.md` | `parker-system/prompts/brand-profile/ad-account-evaluation.md` | 2026-09-06 | none logged |
| `sub-context-docs/brand-identity-analysis.md` | `parker-system/prompts/brand-profile/brand-identity-analysis.md` | 2026-09-06 | none logged |
| `sub-context-docs/brand-profile-narrative.md` | `parker-system/prompts/brand-profile/brand-profile-narrative.md` | 2026-09-07 | none logged |
| `sub-context-docs/category-and-market-research.md` | `parker-system/prompts/brand-profile/category-and-market-research.md` | 2026-09-06 | none logged |
| `sub-context-docs/community-and-forums.md` | `parker-system/prompts/brand-profile/community-and-forums.md` | 2026-09-06 | none logged |
| `sub-context-docs/competitive-landscape.md` | `parker-system/prompts/brand-profile/competitive-landscape.md` | 2026-09-06 | none logged |
| `sub-context-docs/customer-journey-and-persona-discovery.md` | `parker-system/prompts/brand-profile/customer-journey-and-persona-discovery.md` | 2026-09-06 | none logged |
| `sub-context-docs/marketing-calendar-and-campaigns.md` | `parker-system/prompts/brand-profile/marketing-calendar-and-campaigns.md` | 2026-09-06 | none logged |
| `sub-context-docs/operations-and-team.md` | `parker-system/prompts/brand-profile/operations-and-team.md` | 2026-09-06 | none logged |
| `sub-context-docs/organic-channels-inventory.md` | `parker-system/prompts/brand-profile/organic-channels-inventory.md` | 2026-09-06 | none logged |
| `sub-context-docs/performance-targets-and-metrics.md` | `parker-system/prompts/brand-profile/performance-targets-and-metrics.md` | 2026-09-06 | none logged |
| `sub-context-docs/reputation-analysis.md` | `parker-system/prompts/brand-profile/reputation-analysis.md` | 2026-09-06 | none logged |
| `sub-context-docs/visual-vocabulary.md` | `parker-system/prompts/brand-profile/visual-vocabulary.md` | 2026-09-06 | none logged |
| `sub-context-docs/website-and-product-audit.md` | `parker-system/prompts/brand-profile/website-and-product-audit.md` | 2026-09-06 | none logged |

### Phase 1B — competitors — 13 documents

| Output | Generating prompt | Generated | Per-prompt review |
|---|---|---|---|
| `competitors/_competitive-set.md` | `parker-system/prompts/onboarding-runner.md (step 4 intake — no dedicated prompt)` | 2026-09-06 | none logged |
| `competitors/gillette-labs-body-intimate/competitor-snapshot.md` | `parker-system/prompts/competitor-profile/competitor-snapshot.md` | 2026-09-06 | none logged |
| `competitors/philips-oneblade-intimate/competitor-snapshot.md` | `parker-system/prompts/competitor-profile/competitor-snapshot.md` | 2026-09-06 | none logged |
| `competitors/thomyle/competitor-snapshot.md` | `parker-system/prompts/competitor-profile/competitor-snapshot.md` | 2026-09-06 | none logged |
| `competitors/thomyle/sub-context-docs/ad-account-evaluation.md` | `parker-system/prompts/competitor-profile/competitor-ad-account-evaluation.md` | 2026-09-06 | none logged |
| `competitors/thomyle/sub-context-docs/brand-identity.md` | `parker-system/prompts/competitor-profile/competitor-brand-identity-analysis.md` | 2026-09-06 | none logged |
| `competitors/thomyle/sub-context-docs/community-and-forums.md` | `parker-system/prompts/competitor-profile/competitor-community-and-forums.md` | 2026-09-06 | none logged |
| `competitors/thomyle/sub-context-docs/customer-and-persona-discovery.md` | `parker-system/prompts/competitor-profile/competitor-customer-and-persona-discovery.md` | 2026-09-06 | none logged |
| `competitors/thomyle/sub-context-docs/organic-channels-audit.md` | `parker-system/prompts/competitor-profile/competitor-organic-channels-audit.md` | 2026-09-06 | none logged |
| `competitors/thomyle/sub-context-docs/public-perception.md` | `parker-system/prompts/competitor-profile/competitor-reputation-analysis.md` | 2026-09-06 | none logged |
| `competitors/thomyle/sub-context-docs/reviews-and-customer-language.md` | `parker-system/prompts/competitor-profile/competitor-reviews-and-customer-language.md` | 2026-09-06 | none logged |
| `competitors/thomyle/sub-context-docs/website-and-product-audit.md` | `parker-system/prompts/competitor-profile/competitor-website-and-product-audit.md` | 2026-09-06 | none logged |
| `working-thesis-synthesis.md` | `parker-system/prompts/competitor-profile/working-thesis-synthesis.md` | 2026-09-07 | none logged |

### Phase 1C — persona sources and syntheses — 12 documents

| Output | Generating prompt | Generated | Per-prompt review |
|---|---|---|---|
| `personas/cross-persona-bias-notes.md` | `parker-system/prompts/personas/cross-persona-bias-notes.md` | 2026-09-07 | none logged |
| `personas/lifecycle-journey-maps.md` | `parker-system/prompts/personas/lifecycle-journey-maps.md` | 2026-09-07 | none logged |
| `personas/persona-voice-library.md` | `parker-system/prompts/personas/persona-voice-library.md` | 2026-09-07 | none logged |
| `personas/personas-profile.md` | `parker-system/prompts/personas/personas-profile.md` | 2026-09-07 | none logged |
| `source-pulls/personas/ad-account.md` | `parker-system/prompts/personas/ad-account.md` | 2026-09-07 | none logged |
| `source-pulls/personas/ad-comments.md` | `parker-system/prompts/personas/ad-comments.md` | 2026-09-07 | none logged |
| `source-pulls/personas/brand-reputation.md` | `parker-system/prompts/personas/brand-reputation.md` | 2026-09-07 | none logged |
| `source-pulls/personas/brand-self-echo-detection.md` | `parker-system/prompts/personas/brand-self-echo-detection.md` | 2026-09-07 | none logged |
| `source-pulls/personas/customer-reviews.md` | `parker-system/prompts/personas/customer-reviews.md` | 2026-09-07 | none logged |
| `source-pulls/personas/other-reviews.md` | `parker-system/prompts/personas/other-reviews.md` | 2026-09-07 | none logged |
| `source-pulls/personas/post-purchase-surveys.md` | `parker-system/prompts/personas/post-purchase-surveys.md` | 2026-09-07 | none logged |
| `source-pulls/personas/reddit.md` | `parker-system/prompts/personas/reddit.md` | 2026-09-07 | none logged |

### Phase 1D — voice of customer — 11 documents

| Output | Generating prompt | Generated | Per-prompt review |
|---|---|---|---|
| `personas/voice-of-customer/voc-anti-language.md` | `parker-system/prompts/voice-of-customer/voc-anti-language.md` | 2026-09-06 | none logged |
| `personas/voice-of-customer/voc-aspirational.md` | `parker-system/prompts/voice-of-customer/voc-aspirational.md` | 2026-09-06 | none logged |
| `personas/voice-of-customer/voc-category-jargon.md` | `parker-system/prompts/voice-of-customer/voc-category-jargon.md` | 2026-09-06 | none logged |
| `personas/voice-of-customer/voc-corpus-profile.md` | `parker-system/prompts/voice-of-customer/voc-corpus-profile.md` | 2026-09-06 | none logged |
| `personas/voice-of-customer/voc-metaphor.md` | `parker-system/prompts/voice-of-customer/voc-metaphor.md` | 2026-09-06 | none logged |
| `personas/voice-of-customer/voc-objection.md` | `parker-system/prompts/voice-of-customer/voc-objection.md` | 2026-09-06 | none logged |
| `personas/voice-of-customer/voc-outcome-phrase.md` | `parker-system/prompts/voice-of-customer/voc-outcome-phrase.md` | 2026-09-06 | none logged |
| `personas/voice-of-customer/voc-pain-phrase.md` | `parker-system/prompts/voice-of-customer/voc-pain-phrase.md` | 2026-09-06 | none logged |
| `personas/voice-of-customer/voc-surprise-delight.md` | `parker-system/prompts/voice-of-customer/voc-surprise-delight.md` | 2026-09-06 | none logged |
| `personas/voice-of-customer/voc-trigger-moment.md` | `parker-system/prompts/voice-of-customer/voc-trigger-moment.md` | 2026-09-06 | none logged |
| `personas/voice-of-customer/voice-of-customer.md` | `parker-system/prompts/voice-of-customer/voice-of-customer-assembly.md` | 2026-09-06 | none logged |

### Phase 1E — audits — 18 documents

| Output | Generating prompt | Generated | Per-prompt review |
|---|---|---|---|
| `audits/2026-09/biweekly-iterations-report.md` | `parker-system/prompts/audits-biweekly/biweekly-iterations-report.md` | 2026-09-06 | none logged |
| `audits/2026-09/external/monthly-creative-landscape.md` | `parker-system/prompts/audits-monthly-external/monthly-creative-landscape.md` | 2026-09-07 | none logged |
| `audits/2026-09/external/monthly-top-impressions-report.md` | `parker-system/prompts/audits-monthly-external/monthly-top-impressions-report.md` | 2026-09-07 | none logged |
| `audits/2026-09/monthly-hook-audit.md` | `parker-system/prompts/audits-monthly/monthly-hook-audit.md` | 2026-09-06 | none logged |
| `audits/2026-09/monthly-organic-tiktok-audit.md` | `parker-system/prompts/audits-monthly/monthly-organic-tiktok-audit.md` | 2026-09-06 | none logged |
| `audits/2026-09/monthly-performance-report.md` | `parker-system/prompts/audits-monthly/monthly-performance-report.md` | 2026-09-06 | none logged |
| `audits/2026-09/monthly-tiktok-mining.md` | `parker-system/prompts/audits-monthly/monthly-tiktok-mining.md` | 2026-09-06 | none logged |
| `audits/2026-09/weekly-performance-snapshot.md` | `parker-system/prompts/audits-weekly/weekly-performance-snapshot.md` | 2026-09-06 | none logged |
| `audits/2026-Q3/90-day-creative-strategy-audit.md` | `parker-system/prompts/audits-quarterly/90-day-creative-strategy-audit.md` | 2026-09-06 | none logged |
| `audits/2026-Q3/90-day-diversity-audit.md` | `parker-system/prompts/audits-quarterly/90-day-diversity-audit.md` | 2026-09-06 | none logged |
| `audits/2026-Q3/90-day-performance-audit.md` | `parker-system/prompts/audits-quarterly/90-day-performance-audit.md` | 2026-09-06 | none logged |
| `audits/2026-Q3/customer-review-audit.md` | `parker-system/prompts/audits-quarterly/customer-review-audit.md` | 2026-09-07 | none logged |
| `audits/2026-Q3/external/90-day-creative-strategy-audit-external.md` | `parker-system/prompts/audits-quarterly-external/90-day-creative-strategy-audit-external.md` | 2026-09-06 | none logged |
| `audits/2026-Q3/external/90-day-diversity-audit-external.md` | `parker-system/prompts/audits-quarterly-external/90-day-diversity-audit-external.md` | 2026-09-07 | none logged |
| `audits/2026-Q3/external/90-day-performance-audit-external.md` | `parker-system/prompts/audits-quarterly-external/90-day-performance-audit-external.md` | 2026-09-06 | none logged |
| `audits/2026-Q3/external/single-competitor-ad-analysis-thomyle.md` | `parker-system/prompts/audits-quarterly-external/single-competitor-ad-analysis.md` | 2026-09-07 | none logged |
| `audits/2026-Q3/gaps-opportunities-inspo.md` | `parker-system/prompts/market-synthesis/gaps-opportunities-inspo.md` | 2026-09-07 | none logged |
| `audits/2026-Q3/quarterly-whitespace-analysis.md` | `parker-system/prompts/audits-quarterly/quarterly-whitespace-analysis.md` | 2026-09-07 | none logged |

### Phase 1 synthesis — open loops — 13 documents

| Output | Generating prompt | Generated | Per-prompt review |
|---|---|---|---|
| `open-loops/2026-09-07-roll-up.md` | `parker-system/prompts/open-loops/open-loops-roll-up.md` | 2026-09-07 | none logged |
| `open-loops/promoted/2026-09/br-1-messaging-origine-des-chiffres-de-preuve.md` | `parker-system/prompts/open-loops/open-loops-roll-up.md` | 2026-09-07 | none logged |
| `open-loops/promoted/2026-09/br-2-product-cout-reel-dune-commande-livree.md` | `parker-system/prompts/open-loops/open-loops-roll-up.md` | 2026-09-07 | none logged |
| `open-loops/promoted/2026-09/br-3-product-remboursement-dune-tondeuse-utilisee.md` | `parker-system/prompts/open-loops/open-loops-roll-up.md` | 2026-09-07 | none logged |
| `open-loops/promoted/2026-09/br-4-personas-parler-aux-onze-acheteurs.md` | `parker-system/prompts/open-loops/open-loops-roll-up.md` | 2026-09-07 | none logged |
| `open-loops/promoted/2026-09/br-6-creators-origine-des-trois-videos-du-14-aout.md` | `parker-system/prompts/open-loops/open-loops-roll-up.md` | 2026-09-07 | none logged |
| `open-loops/promoted/2026-09/br-7-product-heures-disponibles-face-a-trael.md` | `parker-system/prompts/open-loops/open-loops-roll-up.md` | 2026-09-07 | none logged |
| `open-loops/promoted/2026-09/br-8-personas-decision-de-ciblage-non-appliquee.md` | `parker-system/prompts/open-loops/open-loops-roll-up.md` | 2026-09-07 | none logged |
| `open-loops/promoted/2026-09/br-9-product-valeur-au-dela-de-la-premiere-commande.md` | `parker-system/prompts/open-loops/open-loops-roll-up.md` | 2026-09-07 | none logged |
| `open-loops/promoted/2026-09/t1-1-personas-qui-achete-45-plus.md` | `parker-system/prompts/open-loops/open-loops-roll-up.md` | 2026-09-07 | none logged |
| `open-loops/promoted/2026-09/t1-2-product-trou-page-panier.md` | `parker-system/prompts/open-loops/open-loops-roll-up.md` | 2026-09-07 | none logged |
| `open-loops/promoted/2026-09/t1-3-creators-ce-que-reconnait-lhomme-de-58-ans.md` | `parker-system/prompts/open-loops/open-loops-roll-up.md` | 2026-09-07 | none logged |
| `open-loops/promoted/2026-09/t1-4-messaging-langage-client-francais.md` | `parker-system/prompts/open-loops/open-loops-roll-up.md` | 2026-09-07 | none logged |

### Phase 2 — strategy — 5 documents

| Output | Generating prompt | Generated | Per-prompt review |
|---|---|---|---|
| `strategy/creator-talent-strategy-input.md` | `parker-system/prompts/strategic-roadmap/creator-talent-strategy-input.md` | 2026-09-07 | none logged |
| `strategy/messaging-strategy-input.md` | `parker-system/prompts/strategic-roadmap/messaging-strategy-input.md` | 2026-09-07 | none logged |
| `strategy/persona-strategy-input.md` | `parker-system/prompts/strategic-roadmap/persona-strategy-input.md` | 2026-09-07 | none logged |
| `strategy/product-priority.md` | `parker-system/prompts/strategic-roadmap/product-priority.md` | 2026-09-07 | none logged |
| `strategy/strategic-roadmap.md` | `parker-system/prompts/strategic-roadmap/strategic-roadmap.md` | 2026-09-07 | none logged |

### Phase 3 — ideas — 30 documents

| Output | Generating prompt | Generated | Per-prompt review |
|---|---|---|---|
| `idea-bank/entries/2026-09-07-ce-que-coute-le-rayon-du-samedi.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-celui-qui-explique-a-celui-qui-nose-pas-demander.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-ecrit-du-point-de-vue-de-la-partenaire.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-la-bete-sauvage-qui-sommeille.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-la-demonstration-sur-lavant-bras.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-la-douleur-dabord-lautorite-ensuite.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-la-faq-qui-retourne-le-risque.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-la-garantie-comme-titre.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-la-ligne-de-test-de-loptcien.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-la-preuve-dexistence.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-la-question-posee-aux-onze.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-la-reponse-au-commentaire-du-frere-aine.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-la-tondeuse-comme-personnage.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-le-registre-aine-de-la-marque-soeur.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-le-substitut-dans-le-texte.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-les-grandes-zones-a-traiter.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-les-trois-videos-abandonnees.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-lessai-chez-soi-de-laudioprothese.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-lhomme-qui-ne-se-rase-pas-encore-la.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-limpeccable-tout-en-vouvoiement.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-on-devine-au-lieu-de-voir.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-sans-appuyer-trop-fort.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-six-lignes-dans-le-probleme.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-trois-gestes-trois-douleurs.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-un-corps-fort-derriere-une-porte-faible.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/entries/2026-09-07-un-outil-un-role.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `idea-bank/evaluation-2026-09-07.md` | `parker-system/prompts/ideas-and-briefs/idea-evaluation.md` | 2026-09-07 | none logged |
| `idea-bank/index.md` | `parker-system/prompts/ideas-and-briefs/brand-idea-bank.md` | 2026-09-07 | none logged |
| `sprints/2026-09-07-sprint-1/retro.md` | `parker-system/prompts/ideas-and-briefs/sprint-plan.md (scaffold written with the plan)` | 2026-09-07 | none logged |
| `sprints/2026-09-07-sprint-1/sprint-plan.md` | `parker-system/prompts/ideas-and-briefs/sprint-plan.md` | 2026-09-07 | none logged |

## Outputs this build produced that carry no `generated_on`, and therefore no row above

The walk that built the table keys on `generated_on`, so these are named here rather than left invisible. None of them is missing; each carries a different date key for a stated reason, or none at all because it is not a generated context doc.

- **25 raw source pulls** under `source-pulls/` (Shopify store, product, orders, customers, analytics; Meta campaigns, ad sets, ads, breakdowns, creative copy, performance trend; the Meta Ad Library competitor results; 13 Google Drive working docs; Gmail brand signals; Brandsearch competitor profiles). All carry `pulled_on: 2026-09-06`. Dated evidence captures, never refreshed, superseded by a newer pull.
- **`competitors/thomyle/sub-context-docs/running-notes-on-competitor.md`** — the ninth Thomyle slice. Carries `log_started: 2026-09-06` / `last_appended: 2026-09-06` because its prompt makes it an append-only log, not a re-run doc. Generated from `parker-system/prompts/competitor-profile/running-notes-on-competitor.md`.
- **The 4 sprint briefs** under `sprints/2026-09-07-sprint-1/briefs/` — `impeccable-a-mon-age.md`, `la-question-frequente.md`, `on-ne-devine-plus.md`, `on-ne-vous-enleve-rien.md`. All carry `last_updated: 2026-09-07`, generated from `parker-system/prompts/ideas-and-briefs/brief-creation.md`. They are living documents whose `status` moves from `drafted` through the round, which is why they are stamped that way. **A freshness walk keyed on `generated_on` will not see them.**
- **`running-notes/brand-notes-from-org.md`** (`last_updated: 2026-09-06`) and **`running-notes/missing-context.md`** (`last_updated: 2026-09-07`) — continuously updated, correctly exempt from calendar cadence.
- **The contract and map files** — `CLAUDE.md`, `README.md`, `brand-lens.md`, `audits/INDEX.md`, `competitors/INDEX.md`, `running-notes/refresh-schedule.md`, `running-notes/brand-rules.md`, `running-notes/success-definition.md`, `running-notes/standard-sync.md`, `running-notes/routine-log.md`, `users/dylan-ulry/user-profile.md`, the 7 `schedules/*.md` recipes, and the folder `README.md` files. Written by the runner rather than by a context-doc prompt, and self-cadenced.

## What this log still cannot tell you

- **Which documents would have failed a review.** No verdict was recorded, so this is unknown, not "none". The 2026-09-07 verification sampled twelve and found none, on a base of 116.
- **The order and clock time of each run.** The reconstruction has dates, not timestamps. The one timing fact that matters is recorded elsewhere and matters a lot: the Parker brand appeared at **2026-09-06 09:50 UTC**, so every document stamped 2026-09-06 that was written before that hour carries "unreachable" notes that are no longer true. The priority re-run queue at the top of `running-notes/refresh-schedule.md` names the three standing docs affected.
- **Which sources each run actually pulled.** That lives on the documents themselves, in `built_from`, `sources_read` and `data_sources_read`, not here.

---

*Phase 0 written 2026-09-06. Everything from "Read this before you read the table" onward was reconstructed and appended on 2026-09-07 by the fixer pass, which is recorded in `prompts-run-log/2026-09-07-build-verification.md`.*
