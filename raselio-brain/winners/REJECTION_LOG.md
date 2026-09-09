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
