# Raselio — le cerveau de la marque

Ce dossier est tout ce que Parker sait de Raselio : la marque, le client, les concurrents, le compte publicitaire, la lecture créative posée dessus, et la méthode complète qui a produit l'ensemble. Il a été construit du **2026-09-06 au 2026-09-07**.

## La marque

**Raselio**, marque française en vente directe, un seul produit : la « Tondeuse Intime Homme Raselio™ », référence interne MS-810, **34,99 €**, vendue sur www.raselio.com (Shopify `8piiys-jj.myshopify.com`). Publicité sur Meta depuis le 2026-08-10, compte `1573950771030463`, page Facebook `1234695553067195`. Marque Parker `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, organisation « Dylan's Org ».

Fondateur et opérateur unique : **Dylan Ulry**, entrepreneur individuel, France. La marque s'appelait « Cutlab » jusqu'à fin juillet 2026. Boutique ouverte le 2026-07-24, première commande le 2026-08-26.

**Les dénominateurs, à garder en tête devant chaque chiffre de ce coffre :** 11 commandes Shopify, 6 achats attribués par Meta, 2 commentaires publicitaires sur tout le compte, 0 avis client, 0 réponse de sondage. Rien ici n'est un gagnant prouvé, et chaque document le dit lui-même.

## Par où commencer

**Ouvrez ce dossier dans Claude Code et lancez `/get-started`.** C'est le seul geste qui ne demande aucune carte : la visite guidée lit le cerveau tel qu'il est aujourd'hui, se cale sur votre familiarité avec ce genre d'outil, explique ce qui a été construit, comment les fichiers vivent et grandissent, ce que Parker peut réellement tirer et faire, et se termine sur un premier mouvement concret. Elle est rejouable à tout moment, par vous ou par n'importe quel coéquipier qui clone le dépôt.

Ensuite, dans cet ordre :

1. **`sub-context-docs/brand-profile-narrative.md`** — la synthèse d'une page, toujours chargée. Elle porte la thèse stratégique, l'index du coffre document par document, et le roll-up des boucles ouvertes. C'est le premier fichier à lire sur n'importe quelle question.
2. **`CLAUDE.md`** — le contrat de fonctionnement. Les règles dures de la marque sont en haut, et la première commande tout le reste : les chiffres de preuve sociale actuellement en ligne n'ont aucune source.
3. **`brand-lens.md`** — le savoir propre de la marque : la règle des proxys et son vocabulaire, le bloc de fidélité produit MS-810, la palette, ce qui a marché et ce qui n'a pas marché.
4. **`running-notes/missing-context.md`** — ce que la marque ne nous a pas encore dit, question par question, plus la file de re-run prioritaire. C'est le document qui empêche de prendre un blanc pour un zéro.
5. **`audits/INDEX.md`** et **`competitors/INDEX.md`** — les cartes générées des deux dossiers qui grandissent sans fin.

## Ce qui a été tiré

Toutes les sources brutes sont sauvegardées sous `source-pulls/`, datées, citables telles quelles.

| Surface | Ce qui est entré |
|---|---|
| **Shopify** | Boutique, fiche produit, deux landing pages avec leur CSS, 11 commandes, 14 fiches clients, analytics de session et d'entonnoir |
| **Meta Ads** | 183 annonces du compte dont 163 Raselio, campagnes et ad sets, ventilations âge / genre / plateforme / emplacement, corpus de copy (884 créatives, 224 paires), tendance de performance |
| **Parker MCP** | Annonces et métriques d'entonnoir, lecture média des créatives, commentaires publicitaires, corpus TikTok de niche (20 vidéos), bibliothèque concurrente, réputation de marque, historique de conversation |
| **Bibliothèque publicitaire Meta** | Relevés concurrents France : Gillette, Philips, Billy, Club Cooper, Thomyle |
| **Brandsearch** | 20 fiches de marque et le corpus publicitaire de Thomyle (1 063 annonces agrégées, 40 lues en détail) |
| **Google Drive** | Les documents de travail de l'équipe : démontage Grümwise du 13 août, les lots de 9 puis 30 puis 30 concepts statiques, les prompts Higgsfield du 3 septembre, les publications Facebook, les politiques boutique, le récap mensuel et le suivi comptable des trois boutiques |
| **Gmail** | 46 fils lus : signaux de marque, notifications de plateforme, restriction puis rétablissement du compte business le 26 juillet |
| **Web** | Recherches de catégorie, de prix en rayon, de cadre réglementaire et de lancement concurrent, le 2026-09-06 |

## Ce qui est resté noir

Ces trous sont nommés dans chaque document concerné et rassemblés dans `running-notes/missing-context.md`. Ils ne sont pas des détails : ils décident de ce qu'on peut affirmer.

- **Aucun avis client.** Ce n'est pas un problème d'accès. L'outil répond 0 et dit explicitement que l'accès n'est pas en cause. La boutique n'a aucune application d'avis installée. 11 acheteurs, 8 colis livrés, aucune question posée à aucun d'eux.
- **Aucune réponse de sondage post-achat.** `totalResponsesForBrand: 0`. Aucun outil de sondage branché.
- **Deux commentaires publicitaires**, vérifiés par deux appels indépendants, sur 183 annonces et 47 484 impressions. C'est le corpus entier, pas un échantillon.
- **Instagram est un angle mort total.** 28,2 % de la dépense Raselio y part, et aucun outil de cette installation ne rend les commentaires Instagram.
- **Aucun organique de marque.** Aucun compte Instagram, TikTok ou YouTube n'apparaît dans une source. Une seule publication Facebook existe, du 14 août, et elle décrit une offre qui n'existe plus.
- **Aucune attribution tierce.** Northbeam n'est pas connecté, vérifié le 2026-09-06. Meta en plateforme est la seule source d'attribution, et elle voit 6 achats là où Shopify en compte 11.
- **Le proxy réseau de la session a bloqué toute lecture directe du web**, y compris raselio.com lui-même (ses pages sont dans `source-pulls/shopify-store-and-product.md`), Reddit, Trustpilot, Amazon.fr, Cdiscount, Signal Arnaques et les sites de comparatif. Aucun outil Reddit n'existe dans cette installation Parker.
- **Aucune lecture visuelle des créatives concurrentes.** Brandsearch rend le format, les dates, la dépense et le texte, jamais l'image. Le seul concurrent tenu plan par plan est Grümwise, et par le document de l'équipe, donc `stated`.
- **La marque Raselio est apparue dans le Parker MCP en cours de build**, le 2026-09-06 à 09:50 UTC. Les documents écrits avant cette heure portent des mentions « injoignable » qui ne sont plus vraies. Ils sont en file de re-run prioritaire en tête de `running-notes/refresh-schedule.md`.

## La méthode voyage avec le dépôt

Ce cerveau n'est pas une pile de documents morts. Il sait se rafraîchir, se reconstruire et travailler tout seul, parce que trois choses sont dans le dossier lui-même.

- **Les compétences, dans `.claude/skills/`.** Les compétences de métier (scriptwriting, hooks, headlines, itérations, analyse de compte publicitaire, génération de créas IA, le pipeline des boucles ouvertes) et les compétences de routine (`/get-started`, `/refresh-context`, `/research-loops`, `/dream`, `/harvest-ideas`, `/evaluate-ideas`, `/self-improve`, `/update-brain`, `/setup-routines`, `/save-brain`). Elles se chargent dès que le dépôt est cloné, sans installation.
- **L'usine, montée en lecture seule dans `parker-system/`, épinglée à la version `v15`.** Elle contient `prompts/` (les prompts exacts qui ont produit chaque document, à rejouer pour rafraîchir plutôt qu'improviser), `creative-strategy-context/` (l'expertise de métier) et `system/` (l'architecture). On n'écrit jamais dedans ; les règles de refus dans `.claude/settings.json` l'empêchent.
- **`/update-brain`** propose chaque semaine ce que l'usine a de neuf et que ce cerveau n'a pas. Ce sont des propositions, jamais des écrasements : rien ne bouge sans un oui. L'état de l'épingle et l'historique des propositions vivent dans `running-notes/standard-sync.md`.
- **Les routines** (`schedules/`) rafraîchissent le contexte, chassent les idées, avancent les boucles de recherche et rangent ce que Parker apprend. Elles se déclenchent à leur cadence une fois armées par `/setup-routines`, et chaque passage laisse une ligne dans `running-notes/routine-log.md`.

## Où c'est sauvegardé

Ce cerveau est **auto-géré**. Il vit dans le dossier `raselio-brain/` du dépôt GitHub de l'équipe, `amadousn/alture-e-co`, sur la branche `claude/clone-brain-raselio-ysv5ue`. Il n'y a ni Parker Desktop, ni dépôt `parker-brain-org` derrière : la sauvegarde se fait avec le git de l'équipe, comme n'importe quel autre dossier du dépôt.
