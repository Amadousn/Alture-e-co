# BUILD-STATUS — Raselio brand brain

**Marque :** Raselio · **Début du build :** 2026-09-06 06:00 UTC · **Phase en cours :** Phase 1 (sources presque complètes ; branche 1A démarrée) · dernière mise à jour 2026-09-06 08:05 UTC

**En attente de vous : rien pour l'instant.** Le build tourne sans intervention. Les questions que seul vous pouvez trancher sont consignées dans `running-notes/missing-context.md` et vous seront présentées à la fin, avec la roadmap stratégique à valider.

Ce qui se passe maintenant : les sources Shopify, Gmail et une partie de Drive sont dans `source-pulls/` (sauvegardées sur la branche). Deux extractions (compte Meta ; reste de Drive + concurrents Brandsearch) avaient été coupées par la limite d'usage de la session à 07:00 UTC et ont été relancées à 08:02 UTC. La branche 1A (identité, site, opérations, calendrier) tourne en parallèle.

## Tableau de bord

| Bloc | Fait / Total |
|---|---|
| Phase 0 — dossier, méthode montée (v15), skills, hooks, notes | 6 / 7 (reste : sources brutes) |
| Phase 1E — audits de référence (interne + externe) | 0 / 17 |
| Phase 1A — fondation marque (13 tranches + synthèse) | 0 / 14 |
| Phase 1B — concurrents (3 × 10 + thèse) | 0 / 31 |
| Phase 1C — sources personas + synthèses | 0 / 12 |
| Phase 1D — voix du client | 0 / 12 |
| Phase 1 — synthèses transverses (gaps, roll-up) | 0 / 2 |
| Phase 2 — stratégie | 0 / 5 |
| Phase 3 — idées et briefs | 0 / 4 |
| Contrat, vérification, sauvegarde | 0 / 4 |

## Ledger complet des prompts

Statuts : `pending` · `running` · `done` · `blocked (raison)`.

### Phase 0
- [done] Dossier plat créé dans `raselio-brain/`
- [done] `parker-system/` monté en sous-module, épinglé `v15`
- [done] Skills craft + bundle routines → `.claude/skills/` ; agents de revue ; scripts ; output-style
- [done] `parker_config.json`, `running-notes/standard-sync.md`
- [done] Intake (à partir des documents de l'équipe) → `running-notes/brand-rules.md`, `success-definition.md`, `missing-context.md`
- [done] `BUILD-STATUS.md`
- [running] Sources brutes → `source-pulls/` (Shopify ✓, Gmail ✓, Drive 7/10, Meta en cours, Brandsearch en cours)

### Phase 1E — audits de référence
- [pending] audits-quarterly/90-day-creative-strategy-audit → `audits/2026-Q3/90-day-creative-strategy-audit.md`
- [pending] audits-quarterly/90-day-performance-audit → `audits/2026-Q3/90-day-performance-audit.md`
- [pending] audits-quarterly/90-day-diversity-audit → `audits/2026-Q3/90-day-diversity-audit.md`
- [pending] audits-quarterly/customer-review-audit → `audits/2026-Q3/customer-review-audit.md`
- [pending] audits-quarterly/quarterly-whitespace-analysis → `audits/2026-Q3/quarterly-whitespace-analysis.md`
- [pending] audits-monthly/monthly-hook-audit → `audits/2026-09/monthly-hook-audit.md`
- [pending] audits-monthly/monthly-performance-report → `audits/2026-09/monthly-performance-report.md`
- [pending] audits-monthly/monthly-organic-tiktok-audit → `audits/2026-09/monthly-organic-tiktok-audit.md`
- [pending] audits-monthly/monthly-tiktok-mining → `audits/2026-09/monthly-tiktok-mining.md`
- [pending] audits-biweekly/biweekly-iterations-report → `audits/2026-09/biweekly-iterations-report.md`
- [pending] audits-weekly/weekly-performance-snapshot → `audits/2026-09/weekly-performance-snapshot.md`
- [pending] audits-quarterly-external/90-day-creative-strategy-audit-external → `audits/2026-Q3/external/…`
- [pending] audits-quarterly-external/90-day-performance-audit-external → `audits/2026-Q3/external/…`
- [pending] audits-quarterly-external/90-day-diversity-audit-external → `audits/2026-Q3/external/…`
- [pending] audits-quarterly-external/single-competitor-ad-analysis → `audits/2026-Q3/external/…`
- [pending] audits-monthly-external/monthly-creative-landscape → `audits/2026-09/external/…`
- [pending] audits-monthly-external/monthly-top-impressions-report → `audits/2026-09/external/…`

### Phase 1A — fondation marque
- [running] brand-identity-analysis · operations-and-team · website-and-product-audit · marketing-calendar-and-campaigns
- [pending] category-and-market-research · competitive-landscape · customer-journey-and-persona-discovery · community-and-forums · reputation-analysis · visual-vocabulary → `sub-context-docs/`
- [pending] ad-account-evaluation · performance-targets-and-metrics · organic-channels-inventory (bloqués sur 1E) → `sub-context-docs/`
- [pending] brand-profile-narrative → `sub-context-docs/brand-profile-narrative.md`

### Phase 1B — concurrents (thomyle, gillette-labs-body-intimate, grumwise)
- [pending] pour chaque rival : competitor-brand-identity-analysis · competitor-website-and-product-audit · competitor-organic-channels-audit · competitor-ad-account-evaluation · competitor-reviews-and-customer-language · competitor-reputation-analysis · competitor-community-and-forums · competitor-customer-and-persona-discovery · running-notes-on-competitor · competitor-snapshot
- [pending] working-thesis-synthesis → `working-thesis-synthesis.md`

### Phase 1C — personas
- [pending] sources : ad-account · ad-comments · customer-reviews · other-reviews · post-purchase-surveys · reddit · brand-reputation · brand-self-echo-detection → `source-pulls/` (personas/sources)
- [pending] personas-profile → puis persona-voice-library · lifecycle-journey-maps · cross-persona-bias-notes → `personas/`

### Phase 1D — voix du client
- [pending] voc-corpus-profile · voc-pain-phrase · voc-outcome-phrase · voc-metaphor · voc-objection · voc-aspirational · voc-trigger-moment · voc-surprise-delight · voc-category-jargon · voc-anti-language → `personas/voice-of-customer/`
- [pending] voice-of-customer-assembly → `personas/voice-of-customer/voice-of-customer.md`

### Phase 1 — synthèses
- [pending] market-synthesis/gaps-opportunities-inspo → `audits/2026-Q3/gaps-opportunities-inspo.md`
- [pending] open-loops/open-loops-roll-up → `open-loops/`

### Phase 2
- [pending] persona-strategy-input · product-priority · messaging-strategy-input · creator-talent-strategy-input → `strategy/`
- [pending] strategic-roadmap → `strategy/strategic-roadmap.md` (présenté pour validation à la fin, pas de pause en cours de build)

### Phase 3
- [pending] brand-idea-bank → `idea-bank/` · idea-evaluation → `idea-bank/evaluation-2026-09-06.md` · sprint-plan → `sprints/2026-09-06-…/sprint-plan.md` · brief-creation → `sprints/…/briefs/`

### Contrat et vérification
- [pending] CLAUDE.md · README.md · refresh-schedule · brand-lens · index concurrents/audits · routines armées
- [pending] revue de complétude du build
- [pending] sauvegarde (commit + push sur la branche `claude/clone-brain-raselio-ysv5ue`)

## Points d'attention

- Parker MCP : aucune marque Raselio configurée → les sources « commentaires pubs, avis, sondages post-achat, Reddit, TikTok » seront **data-limited**. Rien n'est inventé pour combler.
- Parker Desktop absent → sauvegarde par git sur votre dépôt GitHub (self-managed).
- Tag `v15` de la fabrique = même commit que `v14` ; les vraies v15/v16 sont sur `main` sans tag. Consigné dans `running-notes/standard-sync.md`.

## La suite

Dès que `source-pulls/` est rempli : Phase 1E (audits) et 1A/1B/1C/1D en parallèle, revues, puis synthèses et roll-up des boucles ouvertes.
