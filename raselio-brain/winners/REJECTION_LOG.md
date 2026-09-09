---
brand: RASELIO
doc: journal des rejets de génération
opened_on: 2026-09-09
claim_status: verified — chaque ligne est un rejet réellement prononcé pendant un run
---

# REJECTION_LOG

Chaque génération rejetée laisse une ligne ici, avec sa cause. La doctrine est claire : **on ne répète pas la même erreur le lendemain.** Le run du matin lit ce fichier avant d'écrire ses prompts.

## Les causes normalisées

`AI_FACE` · `BAD_PRODUCT` · `WEAK_COMPOSITION` · `BAD_HIERARCHY` · `GENERIC_BACKGROUND` · `LOW_CONTRAST` · `TOO_MUCH_TEXT` · `BAD_MODEL` · `NO_SCROLL_STOP` · `TOO_CANVA` · `TOO_DROPSHIPPING` · `WRONG_PERSONA` · `WRONG_FORMAT`

Une cause qui manque s'ajoute, en majuscules avec des underscores, et se documente en une ligne sous ce paragraphe.

## Forme d'une ligne

`| date | creative_id | passe | cause | ce qui a été changé au prompt | résultat |`

## Le journal

| Date | Creative ID | Passe | Cause | Correction apportée | Résultat |
|---|---|---|---|---|---|
| — | — | — | — | Aucun rejet enregistré. Le premier run sous doctrine ouvre cette table. | — |

## Ce que le run en fait chaque matin

1. Lire les causes des sept derniers jours et compter les récurrences.
2. Toute cause qui revient **trois fois ou plus** devient une contrainte écrite dans le prompt du lendemain, pas un espoir.
3. Une cause qui disparaît pendant deux semaines sort de la liste des contraintes actives et reste dans l'historique.

## Lot du 2026-09-09 — test 3 concepts, 6 exécutions

Six images générées (jobs `f49596ff`, `52cf0128`, `3d81ab00`, `1601003a`, `f71916ae`, `410f18b3`). Aucune notée : le CDN d'images est bloqué depuis cette session, `connect_rejected` sur `d8j0ntlcm91z4.cloudfront.net:443`, re-vérifié le 2026-09-09. Les causes de rejet sont à remplir par Dylan après lecture à l'écran. Points de contrôle prioritaires posés dans `sprints/2026-09-09-test-statiques/briefs.md` : orthographe et accents français, fidélité produit MS-810, et sur C1 la distinction visuelle entre la tondeuse générique et le produit héros.
