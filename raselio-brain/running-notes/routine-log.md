# Routine log — Raselio

The append-only record of everything the brain did on its own. Each standing routine (`/refresh-context`, `/research-loops`, `/dream`, `/harvest-ideas` + `/evaluate-ideas`, `/self-improve`, `/update-brain`) writes one entry here every time it runs, scheduled or manual, newest at the top. This is the history — what fired, when, what it changed, what it left, and why. It is distinct from `refresh-schedule.md`, which tracks only current due-dates; this file is never overwritten, only appended.

Read it to answer "what has the brain been doing," to see whether a scheduled routine actually fired, and to trace when a doc last changed and which run changed it.

## Entry shape

Each entry is one dated block. Keep it short — the routine's own deliverable holds the detail; this is the ledger line.

```
### {YYYY-MM-DD HH:MM} · {routine} · {scheduled | manual}
- **Checked:** what the run examined.
- **Did:** what it changed — name each, or "nothing due."
- **Left:** what it deliberately did not do, and why.
- **Surfaced:** any open loop, idea, conflict, or proposal it raised.
```

## Log

<!-- newest entries at the top; routines prepend here -->

### 2026-09-07 18:08 · self-improve · scheduled
- **Checked:** la conversation du jour, première vraie conversation entre Dylan et Parker, plus les pulls Meta, Shopify, Manscaped et Grümwise faits pendant.
- **Did:** réécrit `users/dylan-ulry/user-profile.md` en entier — chaque ligne était `[~]` inférée avant qu'il ne parle, elle est maintenant observée et porte ses mots. Ajouté à `brand-lens.md` le bloc « Ce que la semaine du 2026-09-07 a appris » : la première journée rentable et la règle du CPA glissant, la règle de montée en budget, la primauté du chiffre de marge de Dylan sur l'estimation du coffre, les quatre lectures concurrentes, et la règle de reprise concurrentielle.
- **Left:** rien à laisser. Aucune trace de raisonnement n'existait dans `dreaming/proposals/pending`, la routine de rêve n'ayant jamais tourné.
- **Surfaced:** sept règles datées et verbatim de Dylan, dont « ANALYSE → DÉCISION → EXÉCUTION » et le périmètre Raselio seul. Trois annonces à boîte Grümwise toujours actives, coupe demandée, non confirmée.

### 2026-09-07 18:08 · update-brain · scheduled
- **Checked:** l'épingle `parker-system` contre les tags de l'usine publique.
- **Did:** rien, et c'est le bon résultat. L'épingle est sur `b55c441`, qui porte `v14` et `v15`. Le tag le plus récent de l'usine **est `v15`**. Le cerveau est à jour.
- **Left:** aucune proposition de saut, il n'y en a pas à faire.
- **Surfaced:** rien.

### 2026-09-07 18:08 · research-loops · scheduled
- **Checked:** les 12 boucles promues sous `open-loops/promoted/2026-09/`, toutes dues le 2026-09-21.
- **Did:** débloqué la source de **T1-4** (« avec quels mots les hommes français parlent-ils de cette zone »). La bibliothèque concurrente Parker était **vide pour cette marque** — aucun concurrent suivi, découvert ce jour. Manscaped abonné (611 annonces classées par rang d'impressions), Thomyle et Grümwise en cours d'ingestion (`26890e9a-…` et `09f37c5c-…`).
- **Left:** aucune hypothèse écrite. `hypotheses/`, `validations/` et `re-validations/` restent en l'état : les corpus arrivent, la lecture se fait au prochain passage.
- **Surfaced:** la boucle **BR-6** monte en priorité — l'exposition n'est pas théorique, elle tourne.

### 2026-09-07 18:08 · harvest-ideas + evaluate-ideas · scheduled
- **Checked:** les 26 entrées du bac et l'évaluation du 2026-09-07.
- **Did:** rien ajouté au bac. Les huit mécanismes concurrents du jour sont écrits dans `competitors/_mecanismes-a-decliner.md` avec leur bloc de production K1 à K8, ce qui est plus utile qu'une entrée d'idée : ils portent leur preuve et leur transposition.
- **Left:** la notation contre la feuille de route n'a pas été refaite. **La feuille de route n'est toujours pas approuvée**, donc le barème est provisoire et re-noter aujourd'hui produirait un classement qui bouge dès que Dylan tranche.
- **Surfaced:** le mécanisme du lot (M2) est le plus fort du dossier et **reste bloqué** faute de lot à vendre.

### 2026-09-07 18:08 · refresh-context · scheduled
- **Checked:** la file de rattrapage en tête de `running-notes/refresh-schedule.md` et les trois prochaines échéances.
- **Did:** rien rejoué. Les trois documents de la file (`competitors/_competitive-set.md`, `sub-context-docs/brand-identity-analysis.md`, `sub-context-docs/website-and-product-audit.md`) demandent chacun un rejeu complet de leur prompt, pas une correction de note.
- **Left:** les trois, et la raison est nommée : ce passage a été consacré au travail concurrentiel que Dylan a demandé dans la journée. **Ils restent en tête de file pour le passage du 2026-09-14.**
- **Surfaced:** un fait qui change une des trois. `_competitive-set.md` dit que `brand_discovery` ne pouvait pas tourner faute de marque Parker. Il tourne, il a tourné aujourd'hui, et il a révélé que **la bibliothèque concurrente était vide**. Le rejeu de ce document est maintenant le plus urgent des trois.



## 2026-09-09 — Bibliothèque d'architectures (sur instruction Dylan, « PARKER MASTER SWIPE FILE »)

- **Ran:** lecture du corpus concurrent global via Parker MCP `search_competitor_facebook_ads` (mode `discover`), sept marques, ~31 000 annonces scrapées dont 10 725 analysées par l'IA. Écriture de `competitors/_bibliotheque-architectures.md` : 16 familles d'architecture, bloc de verrouillage, ordre de priorité des familles manquantes. Enregistré dans `CLAUDE.md`, `visual-quality-doctrine.md` et `competitors/INDEX.md`.
- **Left:** le board `YT_Statics_All` d'Alex Cooper reste illisible — `search_swipe_file` ne voit que les 8 boards vides de l'org de Dylan, et `app.heyparker.ai` est bloqué par le proxy de sortie (`EGRESS_BLOCKED`, deux tentatives). Grüns n'a aucune annonce scrapée dans Parker, donc aucune donnée. Aucune image n'a pu être vue (`auth.heyparker.ai` bloqué), donc la notation visuelle /10 des §2 et §3 de Dylan n'est pas faite et reste à lui.
