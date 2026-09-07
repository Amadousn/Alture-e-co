---
name: daily-creative-run
description: Le run créatif quotidien de Raselio. Analyse le compte, classe les winners, produit ~30 statiques Meta déclinées de ce qui a déjà vendu, contrôle chaque visuel, dépose tout dans Google Drive avec son rapport et son manifeste. Se déclenche tous les matins à 8 h (Europe/Paris) par la routine `raselio-daily-creative-8h`, et se lance aussi à la demande.
---

# Run créatif quotidien — Raselio

Chaîne : **Parker / Meta / Shopify → Claude (stratège) → Higgsfield (production) → contrôle qualité → Google Drive.**

Objectif d'une exécution : **~30 statiques Meta prêtes à monter en publicité, chacune rattachable à une preuve.** Le dossier du jour doit être prêt quand Dylan ouvre son ordinateur.

## Prérequis — vérifier les outils avant tout

Ce run a besoin de cinq connecteurs : **Parker, Meta Ads, Shopify, Google Drive, Higgsfield.** Sans eux il n'y a ni donnée à lire, ni image à produire, ni dossier à livrer.

Premier geste de chaque exécution : vérifier qu'ils répondent. **S'ils manquent, ne produire rien et n'inventer rien** — écrire une ligne nommant les connecteurs absents, et s'arrêter. Un lot fabriqué sans données est pire que pas de lot.

Point d'attention connu : une routine planifiée créée depuis une session sans droits de connecteur démarre **sans aucun outil MCP**. Les connecteurs s'attachent alors depuis l'écran Routines de claude.ai, sur la routine elle-même.

## Périmètre — une seule marque

**RASELIO uniquement.** Jamais Aerozya, jamais Trael, jamais une autre boutique : ni leurs données, ni leurs créas, ni leurs concurrents, ni leurs personas.

Piège concret et récurrent : **Trael partage le compte publicitaire `1573950771030463`** avec Raselio. Ses campagnes s'appellent `Trael — …`. Toute lecture au niveau compte mélange les deux. Filtrer sur les campagnes Raselio à chaque pull, et le dire quand une ventilation ne peut pas être séparée.

## La règle qui gouverne tout le reste

**Pas 30 tests au hasard. 30 déclinaisons de ce qui a déjà montré quelque chose.** Chaque créative produite porte, dans son brief, la preuve dont elle descend : un winner interne, un angle, un hook, une structure, une offre, un visuel, une pub concurrente récurrente, une objection client, un bénéfice qui a déjà convaincu.

Une créative sans source ne sort pas. Une créative de remplissage ne sort pas.

## Le calibre de la preuve — à relire à chaque run

**Ce compte est petit. Le dénominateur doit accompagner chaque chiffre, toujours.** Au 2026-09-07 : environ 6 à 10 achats attribués par Meta selon la fenêtre, 16 commandes Shopify, sur 163 annonces Raselio et moins de 900 € dépensés.

Conséquence de méthode, non négociable : **une annonce à 1 achat n'est pas un winner.** C'est un tirage. L'unité de preuve exploitable ici n'est pas l'annonce, c'est la **famille de concept** — l'ad set, le mécanisme, le dispositif d'attention — où plusieurs annonces empilent leurs achats et leurs ajouts au panier.

Donc on classe les familles, pas les images. Et on écrit « la famille Impeccable porte 4 des 6 achats sur 112,39 € » plutôt que « cette créa est un winner ». Cette phrase-là est vraie ; l'autre ne l'est pas.

Écrire `data-limited` sur tout verdict qui repose sur moins de 3 achats.

## Étape 1 — Lire le compte

Tirer, à chaque run, la donnée fraîche. Ne jamais partir de la mémoire ni du rapport de la veille.

- **Meta** (`mcp__meta__ads_get_ad_entities`, compte `1573950771030463`) — niveau `ad` et niveau `adset`, `date_preset: maximum` pour l'historique et `last_7d` pour le mouvement. Champs : `name`, `amount_spent`, `impressions`, `clicks`, `ctr`, `cpm`, `results`, `cost_per_result`, `purchases`, `purchase_roas`. Paginer jusqu'au bout : le compte dépasse 100 annonces.
- **Shopify** (`mcp__Shopify__run-analytics-query`) — commandes, ventes, sessions, taux de conversion, panier moyen. La vérité commerciale est ici : Meta ne voit qu'une partie des commandes.
- **Parker** (`search_facebook_ads_sql`, `search_facebook_ad_comments_semantic`, `search_customer_reviews_*`, `lookup_post_purchase_survey`) — brand_id `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`. Attention : au 2026-09-07 la marque a 0 avis, 0 réponse de sondage, 2 commentaires publicitaires. Ne pas inventer ce que ces outils ne renvoient pas.

Lire par créative, par campagne, par ad set, par angle, par hook, par format, par période.

**L'ordre de priorité des métriques, dans cet ordre exact :** achats → revenu → CPA → ROAS → capacité à rester rentable → CVR. Le CTR et le CPC sont des signaux secondaires. **Un bon CTR n'a jamais fait un winner** : ce compte a un CTR de 2,6 %, correct, et perd de l'argent. La fuite est entre le clic et le panier.

## Étape 2 — Classer les familles

Trois niveaux, écrits dans `winners/WINNERS_MASTER_RASELIO.md`.

- **TIER 1 — WINNERS.** Famille qui a apporté des achats avec une économie tenable. La majorité des 30 en descend.
- **TIER 2 — PROMETTEURS.** Bons signaux (ajouts panier, checkout, CTR sur volume réel) mais pas encore d'achats suffisants.
- **TIER 3 — ANCIENS WINNERS.** Concepts qui ont fonctionné puis fatigué, relançables sous une exécution neuve.

## Étape 3 — Décomposer chaque winner

Constater ne suffit pas. Pour chaque famille retenue, écrire : hook · angle · promesse · douleur · bénéfice · objection traitée · preuve · headline · visuel · personne présente · contexte · offre · CTA · type de statique · structure · niveau de sophistication · niveau de conscience.

Puis nommer **l'élément à ne jamais toucher** — le cœur qui vend. C'est lui qui interdit à la variante de dériver.

## Étape 4 — L'acheteur réel, jamais l'acheteur théorique

Relire la donnée d'audience à chaque run, elle bouge.

État au 2026-09-07, verified : **9 achats sur 10 viennent d'hommes de 45 ans et plus, 8 sur 10 de 55 ans et plus. Zéro achat sous 45 ans.** Les prénoms Shopify le confirment (Jacky, Alain, Jean-Marc, Philippe, Denis, Michel…), 14 sur 15 de génération 1950-1975.

L'ICP est **Michel, 61 ans, marié, France.** Douleur 1 : se couper là où la peau est fine. Douleur 2 : ne plus bien voir ce qu'il fait. Douleur 3 : la repousse qui pique au bout de trois jours. Objections : « ma tondeuse à barbe suffit », « c'est du dropshipping », « et le colis ? », la pudeur.

**Nuance à porter, inferred :** aucun ad set n'a jamais restreint l'âge, et 70 % de la dépense est partie sur le fil Facebook, l'emplacement le plus âgé de la plateforme. L'âge de l'acheteur est peut-être un artefact d'enchère. Le test qui trancherait n'a jamais été payé. Le dire quand on s'appuie dessus.

## Étape 5 — Les concurrents

Uniquement les concurrents directs : tondeuses intimes homme, body groomers, grooming masculin, rasage des zones sensibles. Sources : `mcp__meta__ads_library_search`, `mcp__Parker__search_competitor_facebook_ads`, Brandsearch, les landings et pages produit.

**Le signal, c'est la répétition** : une pub active depuis des mois, un concept décliné en dizaines de variantes, un angle repris par plusieurs marques, un hook qui revient d'un pays à l'autre. Manscaped (des centaines de statiques actives) recycle quatre mécanismes : preuve sociale chiffrée, l'anti-coupure en argument numéro un, la liste de bénéfices à pictogrammes, la garantie en clôture.

Adapter au registre français et pudique de Raselio. Ne jamais copier une image.

## Étape 6 — Répartir les 30

La répartition suit la donnée, elle n'est pas fixe. Forme typique : le winner dominant 7 à 9 variantes, le deuxième 6 à 7, le troisième 5 à 6, un mécanisme concurrent récurrent 4, un ancien winner 4, un prometteur très proche d'un winner 3.

Puis prioriser : **A** (probabilité de performance la plus forte, à lancer en premier), **B** (variantes solides sur les mêmes winners), **C** (concepts secondaires, toujours justifiés).

## Étape 7 — Varier sans dériver

On change : hook · headline · première phrase · image · personne · cadrage · environnement · preuve · bénéfice · objection · format · layout · CTA · mise en scène · type de native ad.

On garde le cœur du concept.

**Diversité visuelle obligatoire — 30 images qui se ressemblent, ce n'est pas un lot, c'est une image.** Piocher dans : produit + headline · homme en usage · selfie natif · faux screenshot · témoignage · avis client · comparatif · checklist · problème/solution · bullets de bénéfices · advertorial · style magazine · style presse · démonstration · gros plan lame · étanchéité · lifestyle · packaging · preuve sociale · FAQ · objections · « 3 raisons » · « pourquoi les hommes changent » · commentaire client transformé en créative.

**Et une raison technique de forcer la variété, inferred :** Meta regroupe deux annonces sous une même empreinte quand composition, décor, palette, style et position du texte se ressemblent. Ce compte a 163 identifiants de créa pour beaucoup moins d'entités distinctes aux yeux du système — ce qui explique le mieux que 105 annonces neuves aient reçu 3 707 impressions à elles toutes. Tenir la charte est bon pour la marque et coûteux pour la diffusion. Les deux sont vrais, et c'est la variété de structure qui arbitre.

## Étape 8 — Le brief, avant l'image

Un brief par créative, jamais l'inverse. Chacun porte : Creative ID · winner source · raison du choix · angle · hook · persona ciblé · objection · bénéfice · headline · copy d'accompagnement · CTA · structure visuelle · type de créative · références · composition · produit · scène · modèle si nécessaire · ratio · style · **prompt Higgsfield final**.

### Les références fournies par Dylan sont contraignantes

Screenshots, pubs de concurrents, dossiers de créas, fichiers `.md`, liens Parker, références visuelles : **s'en servir, structure comprise.** Ne jamais remplacer un format demandé par un « produit + fond + texte ». Si une référence porte une structure particulière, la décomposer et la transposer à Raselio.

Référence de base du système, à relire à chaque run : `RASELIO_30_STATIQUES_WINNERS.md` dans le Drive, plus les lots antérieurs sous `source-pulls/drive-*`.

## Étape 9 — Higgsfield

Réglages verified, repris du jeu de prompts du 2026-09-03 :

- modèle `nano_banana_pro`, `aspect_ratio` 4:5, résolution 2k
- image de référence produit obligatoire : media `8f86e875-a8fa-4024-aec2-cedfb22fc165` (packshot RUILANG 810)
- `generate_image_batch` par groupes de 12 maximum, puis `jobs_wait`

### Le bloc de fidélité produit, collé verbatim à la fin de chaque prompt

> `[FIDÉLITÉ PRODUIT] Reproduis exactement la tondeuse de référence : corps vertical noir mat légèrement galbé, large grip texturé en losanges sur la face avant, unique bouton power rond en bas de la face avant avec fin anneau lumineux vert, petite LED blanche allumée sous la tête, tête large arrondie à peigne métallique argenté, socle noir cylindrique évasé. Aucune inscription sur le produit.`

Jamais de mémoire, toujours ce texte. **Ne jamais inventer** une lame, un bouton, une forme, une couleur, une fonction ou un accessoire qui n'existe pas. Quand un appareil générique doit apparaître à côté, le distinguer explicitement : « La tondeuse à barbe générique doit être clairement différente (grise, plate, lame droite). »

### La palette, identique au site

| Couleur | Code | Rôle |
|---|---|---|
| Crème | `#F7F3EC` | fond de studio dominant |
| Terracotta | `#C15D2F` | accent de marque (variantes `#B5502A`, `#A84D24`) |
| Ardoise | `#22252A` | registre sombre minoritaire |
| Noir profond | `#0B0B0D` | aplats sombres, socle |

Encre `#211C17`, doré `#D9A441`, rouge d'annotation `#D93025`, vert citron pour les pastilles et le soulignement ondulé. Titres Fraunces serif, corps Inter, mot-symbole « RASELIO » en Inter 600 espacé de 0,3 em, en bas à droite.

### Contrôle qualité — ne jamais valider la première génération

Regarder chaque image. Régénérer si : produit incorrect, texte faux ou mal orthographié, logo inventé, main étrange, anatomie étrange, tondeuse déformée, proportions fausses, rendu « trop IA », cadrage raté, illisible en petit sur mobile.

**Jamais d'anatomie explicite. Les zones se disent, elles ne se montrent pas** — proxies uniquement : kiwi, ballon, mosaïque de pixels, serviette, boxer, post-it, pancarte, bandeau de censure.

## Étape 10 — La contrainte de conformité, active et non négociable

La marque fait tourner des chiffres de preuve sociale **sans aucune source** : « 4,7/5 », « 1 734 avis », « +17 000 hommes », « 35 000 hommes », et cinq témoignages signés que l'équipe documente elle-même comme inventés. En face : 16 commandes, 0 avis installés, 2 commentaires.

**Parker n'écrit jamais une nouvelle affirmation de cette forme.** Pas de note moyenne, pas de compteur d'avis, pas de compteur de clients, pas de témoignage à prénom et âge, tant que le chiffre ne vient pas d'un pull réel avec son dénominateur et la citation d'un vrai client avec sa source.

Quand une référence fournie en contient une : la produire **sans la ligne**, et le signaler dans le rapport du jour avec le chiffre réel à côté. Une créative se tient très bien sans ligne de preuve inventée. Elle ne se tient pas du tout devant un signalement Meta.

## Étape 11 — Ce que le run ne fait pas tout seul

- Il **ne monte pas** les publicités et ne dépense rien. Il produit les fichiers et le plan de lancement ; Dylan lance.
- Il **ne touche pas** aux campagnes, budgets ou ciblages existants.
- Il **ne fabrique jamais** une donnée. Si une source est inaccessible, il continue avec les autres et écrit ce qui manquait.

## Étape 12 — Google Drive

Arborescence, une seule marque :

```
META_CREATIVES/
  RASELIO/
    YYYY-MM-DD/
      FINAL/
      REFERENCES/
      REPORT/
      ARCHIVE/
```

Nommage : `RASELIO_YYYY-MM-DD_W01_V01.png` — `W` = famille winner source, `V` = numéro de variante. Jamais `image.png`, `final2.png`, `higgsfield3.png`.

## Étape 13 — Les deux livrables écrits

**`REPORT/DAILY_REPORT.md`**
- PERFORMANCE — résumé Meta / Shopify / Parker du jour, avec les dénominateurs.
- WINNERS DU JOUR — par famille : creative ID, angle, hook, performances, raison du choix.
- CRÉATIVES CRÉÉES — par créative : creative ID, winner source, angle, hook, type de variante, fichier, priorité.
- SIGNALEMENTS — toute affirmation retirée pour absence de source, tout écart de données, toute génération reprise.
- RECOMMANDATION DE LANCEMENT — les créatives à tester en premier, et dans quel ordre.

**`REPORT/CREATIVES_MANIFEST.csv`**

Colonnes exactes : `date,brand,creative_id,winner_source,angle,hook,format,variant_type,priority,filename,drive_path`. La colonne `brand` vaut toujours `RASELIO`.

## Étape 14 — La mémoire

Mettre à jour `winners/WINNERS_MASTER_RASELIO.md` à chaque run : date, creative ID, image, hook, angle, structure, format, dépense, achats, CPA, ROAS, nombre de variantes déjà tirées, dernières variantes, statut.

Statuts : `ACTIVE WINNER` · `PROMISING` · `FATIGUING` · `RETEST` · `ARCHIVED`.

**La fatigue ne tue pas l'angle, elle tue l'exécution.** Quand une famille fatigue, on garde ce qui vend et on renouvelle ce que l'homme voit. On ne l'abandonne pas.

Vérifier avant de produire : hooks trop réutilisés, mêmes photos, mêmes layouts, mêmes headlines, mêmes concepts, mêmes modèles. Un lot qui répète le lot de la veille est un lot perdu.

## Étape 15 — Sauver le travail

Écrire les fichiers de la journée dans le cerveau (`winners/`, `sprints/`), puis sauver selon le modèle décrit dans `CLAUDE.md` → « How this brain saves itself ». Le Drive porte les images ; le cerveau porte la mémoire.

## Le ton

Aucune question inutile. Pas de « quel winner veux-tu ? », pas de « je continue ? », pas de « je génère ? ». **Analyse → décision → exécution.** Chercher l'information, trancher, produire, et rendre compte de ce qui a été décidé et pourquoi.

Une seule chose mérite d'interrompre : une donnée qui rendrait le lot faux. Alors on le dit en une ligne, on livre quand même le reste, et on nomme ce qui manque.
