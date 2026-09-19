# Ce dossier a déménagé

**Le cerveau Raselio vit désormais dans son propre dépôt privé : [`parker-brain/dylan-s-org-raselio`](https://github.com/parker-brain/dylan-s-org-raselio).**

Ce qui reste ici est une copie historique. On n'y écrit plus, et les deux copies ne sont pas synchronisées : toute modification faite ici serait perdue.

## Pourquoi il était ici

Le build a démarré le 2026-09-06. Ce jour-là, le Parker MCP ne connaissait aucune marque Raselio (`get_available_brands` renvoyait `organizations: []`), donc il n'existait aucun dépôt Parker où écrire. Le cerveau a été construit dans le seul dépôt auquel la session avait accès, celui d'Alture & Co, dans le sous-dossier `raselio-brain/`. La marque est apparue en cours de build, à 09:50 UTC.

Le 2026-09-07, `setup_parker_brain` a créé le dépôt Parker de la marque et le cerveau y a été transféré, à plat à la racine.

## Deux raisons pour lesquelles le déménagement comptait

1. **Deux marques sans rapport dans le même dépôt.** Alture & Co (gestion de patrimoine) et Raselio (produit de rasage) n'ont rien à voir. Une marque, un dépôt : c'est le modèle Parker, et c'est ce qui permet d'inviter l'équipe de Raselio sans lui ouvrir le reste.
2. **Ce dépôt-ci est public.** Tout ce qui a été écrit ici — les chiffres du compte publicitaire, le chiffre d'affaires, les verbatims clients, la stratégie, les briefs — était lisible par n'importe qui sur internet, y compris depuis une branche non fusionnée. Le dépôt Parker, lui, est privé.

**Ce qu'il reste à faire côté ménage :** supprimer le dossier `raselio-brain/` de ce dépôt public, et considérer que ce qui y a été publié a pu être vu. Rien dans le cerveau n'est un identifiant ou un mot de passe — c'est de la donnée commerciale et stratégique, pas un secret technique — mais c'est de la donnée commerciale qui n'avait pas à être publique.
