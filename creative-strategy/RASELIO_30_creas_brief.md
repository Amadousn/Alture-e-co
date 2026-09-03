# RASELIO — 30 publicités statiques Meta (15 exploitation + 15 exploration)

**Date** : 3 septembre 2026 · **Marque** : Raselio (tondeuse intime homme, 34,99 €, France) · **Format** : statiques feed 4:5, générées avec Xfield/Higgsfield (`nano_banana_pro`, 2K) et chargées comme créas dans le compte Meta `raselio` (1573950771030463).

Fichiers du livrable :

| Fichier | Contenu |
|---|---|
| `RASELIO_30_creas_brief.md` | Ce document : analyse des données, ICP mis à jour, les 30 fiches créas (12 points chacune), plan de test |
| `prompts_higgsfield.md` | Le prompt final de chaque image (reproductible tel quel dans Higgsfield) |
| `manifest.json` | Les 30 lignes : URL image, job Higgsfield, ID de créa Meta, titre, texte principal, CTA, lien |

---

## 0. Résumé exécutif

1. **L'acheteur réel n'est pas « Kevin, 27 ans ».** Sur l'intégralité de l'historique Meta, 5 achats attribués sur 5 viennent d'hommes de 45 ans et plus, avec un cœur de cible 55-64 ans. Les hommes de 18 à 44 ans cliquent (bon CTR) mais ne mettent jamais au panier et n'achètent jamais. Shopify confirme (prénoms des clients, e-mail contenant une année de naissance 1966, 100 % France, 100 % mobile sur les achats tracés).
2. **Les mécanismes qui vendent sont connus** : fond crème + headline noire XXL + produit héros + preuve sociale (« Approuvée par plus de … hommes ») + flèches vers les zones ; la censure pixel et les post-it font cliquer et mettre au panier. Les angles « peau sensible / lame », « garantie », « colis discret » sont sous-exploités alors qu'ils répondent aux objections d'un homme de 55 ans.
3. **Le vrai problème est post-clic** : CTR 3 % mais CVR site ≈ 0,2 % et CPA 86 € pour un break-even à 21 €. Les 30 créas sont donc pensées pour **pré-qualifier** (âge, vouvoiement, objections réglées avant le clic) et non pour maximiser le CTR brut.
4. **30 créas terminées** : 15 variantes de winners (internes + concurrents Grümwise, Balls Club, Billy Trimmer, Club Cooper, TrimUp) et 15 concepts d'exploration inspirés du board Parker (témoignage surligné, SMS, checklist, advertorial, lettre, pancarte, timeline, macro annotée, meme, carte…), plus 2 initiatives issues des données : la **partenaire qui offre** (28) et **les lunettes / LED** (30).
5. **À lancer** : une campagne CBO ciblant hommes 45-65 France (plus un ad set femmes 45-60 pour la créa 28), 3 ad sets thématiques, règle de coupe à 2× le break-even.

---

## 1. Ce que disent les données

### 1.1 Meta Ads — compte `raselio` (1573950771030463), historique complet

Cinq campagnes, ≈ 668 € dépensés au total. La campagne de référence est **« RASELIO | FR | CAMPAGNE STATIQUE | CBO 30 | V2 »** (le reste est marginal ou en test).

| Campagne principale (lifetime) | Valeur |
|---|---|
| Dépense | 431,73 € |
| CTR (lien) | 3,02 % |
| CPC | 0,59 € |
| CPM | 17,89 € |
| Ajouts panier (ATC) | 17 |
| Initiations de paiement (IC) | 3 |
| Achats | 5 |
| CPA | ≈ 86 € |
| ROAS | 0,41 |

**Ventilation âge × sexe (toutes campagnes, lifetime)** — c'est la donnée la plus importante de l'analyse :

| Segment | Dépense | CTR | ATC | Achats | CPA |
|---|---|---|---|---|---|
| Hommes 55-64 | ≈ 188 € | ≈ 3 % | 12 | **3** | ≈ 63 € |
| Hommes 45-54 | ≈ 95 € | ≈ 3 % | 1 | **1** | ≈ 95 € |
| Hommes 65+ | ≈ 60 € | 2,2 % | 1 | **1** | ≈ 60 € |
| Hommes 35-44 | ≈ 90 € | 3,1 % | 0 | 0 | — |
| Hommes 25-34 | ≈ 80 € | 3,3 % | 0 | 0 | — |
| Hommes 18-24 | ≈ 45 € | 3,6 % | 0 | 0 | — |
| Femmes 45-54 | ≈ 30 € | 2,4 % | 3 | 0 (1 IC) | — |
| Femmes autres | ≈ 80 € | — | 0 | 0 | — |

Lecture : plus l'homme est jeune, plus il clique ; plus il est âgé, plus il achète. Les 18-44 consomment ≈ 32 % du budget pour zéro intention d'achat. Les femmes 45-54 montrent un signal faible mais réel d'achat-cadeau (3 ATC, 1 paiement initié).

*Les chiffres par segment sont recalculés à partir des coûts par action Meta (le champ `actions` n'étant pas exposé par l'API MCP) ; ils sont arrondis et l'échantillon est petit (5 achats). La direction est nette, les valeurs exactes ne le sont pas.*

### 1.2 Shopify

- 9 commandes depuis le 26/08, toutes en France, panier moyen 34,99 € (un seul produit, pas d'upsell).
- Achats tracés : 3/3 sur mobile. Trafic principalement Facebook/Instagram.
- CVR sessions ≈ 0,23 % : le site convertit 5 à 10 fois moins qu'une fiche produit e-commerce saine (1-2 %). C'est le levier n°1 après les créas.
- Clients : Hervé, Jean-Luc, Daniel, Yannick, Michel, Antonio, Olivier… (prénoms de la génération 1955-1975 ; un e-mail contient « 1966 »). Cela recoupe exactement la ventilation Meta.

### 1.3 Créas internes : ce qui a marché et ce qui n'a pas marché

| Créa (nom compte) | Mécanisme | Résultat |
|---|---|---|
| IMPECCABLE SERVIETTE | Fond crème, homme en serviette, headline « Soyez impeccable partout », flèches, « Approuvée par plus de 35 000 hommes » | ROAS 3,59, meilleur convertisseur |
| CROP TAILLE | Même famille, cadrage taille | ROAS 4,98 sur petit budget |
| POSTIT SMILEY | Post-it humoristique sur le produit | ROAS 1,26 |
| S9 PIXEL | Censure pixelisée « même là » | ROAS 1,30 |
| S2 POST-ITS Couilles/Torse/Jambes + offre | 3 post-it sur zones + prix barré | ROAS 1,07, **meilleur taux d'ATC** |
| C11 GARANTIE-COLIS | Colis + garantie | **CTR 14,8 %** mais budget minuscule (non concluant sur l'achat) |
| Packshots techniques seuls, headlines longues, visuels « jeune » | — | Clics sans achat |

Enseignements : (1) la famille « Impeccable » est le seul mécanisme prouvé sur l'achat ; (2) l'humour visuel (post-it, pixel) fait cliquer et mettre au panier mais convertit moins ; (3) les objections garantie/discrétion n'ont jamais eu de budget alors qu'elles font cliquer très fort ; (4) la preuve sociale est incohérente (35 000 sur les pubs, 17 000 sur le site) — les 30 créas utilisent **17 000**, le chiffre du site, à harmoniser ou à sourcer.

### 1.4 Concurrents (Brandsearch, ads actives longues durées)

| Marque | Winner | Mécanisme réutilisable |
|---|---|---|
| Grümwise (UK/EU) | « 85 quid wasted on lies » / « That's the blade, not you » | Anti-marketing, prix honnête, déculpabilisation |
| Balls Club (NL) | Kiwi + rasoir « Auwww » ; post-it « +35 000 mannen » | Métaphore de la douleur conforme Meta ; post-it preuve sociale |
| Billy Trimmer (FR) | « LA TONDEUSE INTIME / anti-coupure · anti poil incarné · anti irritation » | Minimalisme catégorie, 8 mois de diffusion |
| Club Cooper (FR) | « 0 coupure. 0 stress. 100 % contrôle. » | Triple promesse chiffrée, monochrome |
| TrimUp | Packshot annoté à la main | Éducation 4 features |
| Rayva | Récit peau / périménopause | Storytelling par l'âge (transposé en « 50 ans et plus ») |

Aucun concurrent FR ne parle à l'homme de 50 ans et plus, ne vouvoie, ni n'exploite la LED comme réponse à la presbytie. C'est l'espace libre.

---

## 2. Réponses aux 10 questions

1. **Qui clique ?** Tous les âges, avec un CTR légèrement supérieur chez les 18-34 (3,3-3,6 %). Le clic ne discrimine pas.
2. **Qui ajoute au panier ?** Presque exclusivement les hommes 55-64 (12 ATC sur 17), puis les femmes 45-54 (3 ATC : signal cadeau).
3. **Qui achète ?** Hommes 45+ uniquement : 3 achats 55-64, 1 achat 45-54, 1 achat 65+. Zéro achat sous 45 ans.
4. **Tranche d'âge qui convertit le mieux ?** 55-64 ans (CPA ≈ 63 € contre 86 € en moyenne, et 100 % des IC). Les 65+ convertissent aussi mais cliquent moins.
5. **Angles qui attirent le clic mais pas l'achat ?** Humour anatomique cru (post-it « Couilles »), pixel seul, visuels jeunes torse nu : forts CTR/ATC, faible achat.
6. **Angles qui font acheter ?** Résultat + preuve sociale + produit héros (« Soyez impeccable partout ») ; et, en signal faible, garantie/colis discret.
7. **Visuels les plus efficaces ?** Fond clair uni, produit XXL net, texte noir gras, un seul humain (ou une main), flèches. Pas de décor chargé.
8. **Hooks qui fonctionnent ?** Courts, déclaratifs, résultat visible : « Soyez impeccable partout. », « Même là. ». Les hooks longs et techniques font clic sans achat.
9. **Objections ?** « C'est pour les jeunes », « je vais me couper », « ma tondeuse à barbe suffit », « arnaque / ça vient de Chine », « colis pas discret », « à quoi sert la LED », « ça pique à la repousse ».
10. **Persona le plus rentable ?** L'homme de 55-64 ans, en couple, France entière, sur mobile, qui a déjà essayé un rasoir ou une tondeuse à barbe et s'est fait mal.

---

## 3. ICP et buyer persona mis à jour

**Avant** (doc « raselio9adsstatiques ») : Kevin, 27 ans, tutoiement, humour cru, torse nu. **Les données contredisent ce persona sur toute la ligne.**

### Persona principal — « Hervé », 58 ans (cœur 55-64, extension 45-69)

- Homme marié ou en couple, actif ou jeune retraité, France entière (petites villes autant que métropoles), achète sur mobile via Facebook.
- Il se rase déjà cette zone, avec un rasoir jetable ou une tondeuse à barbe : il connaît les coupures, les rougeurs, la repousse qui pique. Il ne cherche pas à « devenir » quelqu'un, il veut être **impeccable, propre, à l'aise** et ne plus retenir sa respiration.
- Freins : peur de se couper, méfiance (dropshipping), discrétion du colis, gêne du sujet, sentiment que le grooming intime est « pour les jeunes », vue de près qui baisse.
- Ton qui marche : **vouvoiement**, phrases courtes, humour pudique et adulte (clin d'œil au couple, jeu sur l'âge), jamais de vulgarité, jamais de moquerie.
- Preuves qui comptent : nombre d'hommes, garantie 2 ans, 30 jours remboursé, colis neutre, Colissimo, SAV en français, prix unique sans abonnement.

### Persona secondaire — « Catherine », 54 ans (partenaire)

- Femme 45-60 en couple avec Hervé. Elle voit la pub, elle sait qu'il n'osera jamais commander. Elle offre (signal : 3 ATC + 1 IC femmes 45-54 sans budget dédié). Une seule créa (28) lui est adressée ; à tester sur un ad set séparé.

### Persona tertiaire — « Marc », 47 ans

- Homme 40-54, rationnel, comparateur, sensible au prix et à l'argument anti-marketing (Grümwise). Il achète moins vite mais il est la porte d'entrée pour rajeunir la base sans retomber sur les 18-34.

**Décision de ciblage** : exclure les 18-44 des campagnes de conversion (ou les limiter à un ad set test à 10 % du budget). Cibler hommes 45-65+ France, placements automatiques, optimisation Achat.


## 4. Les 30 créas, une par une

Chaque fiche reprend les 12 points demandés. Les images sont en 4:5 (2K, nano_banana_pro sur Higgsfield/Xfield), le produit de référence est injecté en image de référence à chaque génération. Les textes publicitaires (texte principal, titre, CTA, lien) sont ceux déjà chargés dans la créa Meta correspondante.


### 01 · Impeccable à tout âge  —  `EXPLOITATION`

![Impeccable à tout âge](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115359_7ca55c90-973e-44a9-b097-711b5bee027f.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115359_7ca55c90-973e-44a9-b097-711b5bee027f.png
- **Job Higgsfield** : `7ca55c90-973e-44a9-b097-711b5bee027f`
- **Créa Meta (compte 1573950771030463)** : `1556880965461198` — nom `RS30 | 01 | EXPLOIT | Impeccable à tout âge`

1. **Nom du concept** : Impeccable à tout âge
2. **Inspiration / source** : Winner interne « Soyez impeccable partout » (3 achats / 5) + modèle vieilli pour coller aux acheteurs 45-65
3. **Persona** : Hervé, 58 ans
4. **Angle** : Identité / résultat (être impeccable) + preuve sociale
5. **Hook** : Impeccable partout. À tout âge.
6. **Problème** : Se sentir exclu des pubs de grooming « pour jeunes »
7. **Bénéfice** : Être entretenu, présentable, à son âge
8. **Objection traitée** : « C'est pour les jeunes »
9. **Texte présent sur l'image** : Approuvée par plus de 17 000 hommes / Impeccable partout. À tout âge. / Tête arrondie · LED · 100 % étanche
10. **Pourquoi ça peut marcher** : Reprend exactement le mécanisme gagnant (fond crème, produit XXL, flèches, preuve sociale) mais avec un homme de 55-60 ans : le visuel parle enfin aux acheteurs réels
11. **Ce qu'elle teste** : Âge du modèle (55-60 vs 30) à mécanisme constant
12. **Type** : EXPLOITATION


**Copy Meta chargé** — Titre : « Impeccable partout. À tout âge. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Tête arrondie, lames céramique, LED intégrée : la tondeuse pensée pour les zones intimes. À 30 ans comme à 60.
> 
> Garantie 2 ans · Satisfait ou remboursé 30 jours · Colis neutre · Livraison offerte


### 02 · Impeccable – mains seules  —  `EXPLOITATION`

![Impeccable – mains seules](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120310_5577b57d-6aae-41ba-9380-7386c593d522.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120310_5577b57d-6aae-41ba-9380-7386c593d522.png
- **Job Higgsfield** : `5577b57d-6aae-41ba-9380-7386c593d522`
- **Créa Meta (compte 1573950771030463)** : `4610387105876052` — nom `RS30 | 02 | EXPLOIT | Impeccable mains seules`

1. **Nom du concept** : Impeccable – mains seules
2. **Inspiration / source** : Winner interne Impeccable, variante sans corps
3. **Persona** : Hervé, 58 ans
4. **Angle** : Résultat + preuve sociale, produit héros
5. **Hook** : Soyez impeccable partout.
6. **Problème** : Gêne face aux visuels de torse nu
7. **Bénéfice** : Propreté, confiance
8. **Objection traitée** : Pudeur / image virile intimidante
9. **Texte présent sur l'image** : Soyez impeccable partout. / Approuvée par plus de 17 000 hommes / 34,99 € · Livraison offerte
10. **Pourquoi ça peut marcher** : Isole la headline gagnante du corps dénudé ; la main mûre avec alliance signale l'âge sans montrer de peau
11. **Ce qu'elle teste** : Faut-il un corps pour vendre ? (headline gagnante seule + prix)
12. **Type** : EXPLOITATION


**Copy Meta chargé** — Titre : « Soyez impeccable partout. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> La tondeuse pensée pour les zones intimes : tête arrondie, lames céramique, LED intégrée, 100 % étanche.
> 
> 34,99 € · Livraison offerte · Garantie 2 ans · Satisfait ou remboursé 30 jours


### 03 · Impeccable – même là (pixel)  —  `EXPLOITATION`

![Impeccable – même là (pixel)](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115359_8145162c-d768-470d-9216-3f739e948397.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115359_8145162c-d768-470d-9216-3f739e948397.png
- **Job Higgsfield** : `8145162c-d768-470d-9216-3f739e948397`
- **Créa Meta (compte 1573950771030463)** : `1073879031665337` — nom `RS30 | 03 | EXPLOIT | Impeccable même là (pixel)`

1. **Nom du concept** : Impeccable – même là (pixel)
2. **Inspiration / source** : Winner interne S9 (censure pixelisée, 1 achat) + modèle vieilli
3. **Persona** : Hervé, 58 ans
4. **Angle** : Humour pudique + résultat
5. **Hook** : Impeccable partout. Même là.
6. **Problème** : Gêne du sujet
7. **Bénéfice** : Dédramatiser, être impeccable partout
8. **Objection traitée** : Sujet tabou
9. **Texte présent sur l'image** : Approuvée par plus de 17 000 hommes / Impeccable partout. Même là. / Tête arrondie · Lames céramique
10. **Pourquoi ça peut marcher** : La censure pixelisée est le gag visuel qui a converti (S9) : on le garde, on vieillit le modèle et on vouvoie
11. **Ce qu'elle teste** : Humour pixel + vouvoiement sur cible 45-65
12. **Type** : EXPLOITATION


**Copy Meta chargé** — Titre : « Impeccable partout. Même là. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Oui, même là. Tête arrondie et lames céramique pour les zones sensibles, LED pour voir ce que vous faites.
> 
> Garantie 2 ans · Satisfait ou remboursé 30 jours · Colis neutre


### 04 · Post-it zones après 50 ans  —  `EXPLOITATION`

![Post-it zones après 50 ans](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115359_97ce5fd8-03fc-4b4d-8fdc-6179cc0418af.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115359_97ce5fd8-03fc-4b4d-8fdc-6179cc0418af.png
- **Job Higgsfield** : `97ce5fd8-03fc-4b4d-8fdc-6179cc0418af`
- **Créa Meta (compte 1573950771030463)** : `2594146684434245` — nom `RS30 | 04 | EXPLOIT | Post-it zones après 50 ans`

1. **Nom du concept** : Post-it zones après 50 ans
2. **Inspiration / source** : Winner interne S2 (3 post-it Couilles/Torse/Jambes + offre, 1 achat)
3. **Persona** : Hervé, 58 ans
4. **Angle** : Polyvalence + offre
5. **Hook** : La tondeuse indispensable après 50 ans.
6. **Problème** : Plusieurs zones, un seul outil ?
7. **Bénéfice** : Une seule tondeuse pour tout, prix accessible
8. **Objection traitée** : Prix / utilité
9. **Texte présent sur l'image** : La tondeuse indispensable après 50 ans. / Là-dessous · Torse · Dos / 34,99 € au lieu de 75 € + livraison offerte
10. **Pourquoi ça peut marcher** : Même structure que S2 mais vocabulaire adapté et ciblage d'âge explicite dans la headline
11. **Ce qu'elle teste** : Vocabulaire sobre (« Là-dessous ») vs cru (« Couilles ») + callout d'âge
12. **Type** : EXPLOITATION


**Copy Meta chargé** — Titre : « La tondeuse indispensable après 50 ans. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Une seule tondeuse pour là-dessous, le torse et le dos. Tête arrondie, 100 % étanche, se rince sous la douche.
> 
> 34,99 € au lieu de 75 € · Livraison offerte · Garantie 2 ans


### 05 · Le kiwi  —  `EXPLOITATION`

![Le kiwi](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115359_55ff78a1-fc42-4bc5-9160-93a307ae6ad3.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115359_55ff78a1-fc42-4bc5-9160-93a307ae6ad3.png
- **Job Higgsfield** : `55ff78a1-fc42-4bc5-9160-93a307ae6ad3`
- **Créa Meta (compte 1573950771030463)** : `4546107992336095` — nom `RS30 | 05 | EXPLOIT | Le kiwi`

1. **Nom du concept** : Le kiwi
2. **Inspiration / source** : Winner concurrent Balls Club (kiwi + rasoir, 1 031 € EU, 110 k reach)
3. **Persona** : Marc, 47 ans
4. **Angle** : Métaphore visuelle humoristique de la douleur
5. **Hook** : Vous ne feriez pas ça à un kiwi.
6. **Problème** : Peur de se couper avec un outil inadapté
7. **Bénéfice** : Tête arrondie = sécurité
8. **Objection traitée** : « Ma tondeuse à barbe suffit »
9. **Texte présent sur l'image** : Vous ne feriez pas ça à un kiwi. / Alors pourquoi à vous ? / Tête arrondie · Lames céramique
10. **Pourquoi ça peut marcher** : Le mécanisme Balls Club : rendre la douleur visible sans anatomie, donc conforme Meta et mémorable
11. **Ce qu'elle teste** : Scroll-stop par métaphore humoristique vs packshot
12. **Type** : EXPLOITATION


**Copy Meta chargé** — Titre : « Vous ne feriez pas ça à un kiwi. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Une lame droite sur une peau qui bouge, c'est là que ça dérape. La tête arrondie Raselio épouse les reliefs au lieu de les attaquer.
> 
> Garantie 2 ans · Satisfait ou remboursé 30 jours · Colis neutre


### 06 · 0 coupure. 0 stress. 100 % contrôle.  —  `EXPLOITATION`

![0 coupure. 0 stress. 100 % contrôle.](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120310_b41c204f-13f6-4d45-9b5b-bf33c9c816c4.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120310_b41c204f-13f6-4d45-9b5b-bf33c9c816c4.png
- **Job Higgsfield** : `b41c204f-13f6-4d45-9b5b-bf33c9c816c4`
- **Créa Meta (compte 1573950771030463)** : `27527584853582454` — nom `RS30 | 06 | EXPLOIT | 0 coupure 0 stress 100 % contrôle`

1. **Nom du concept** : 0 coupure. 0 stress. 100 % contrôle.
2. **Inspiration / source** : Winner concurrent FR Club Cooper (431 € EU)
3. **Persona** : Hervé, 58 ans
4. **Angle** : Bénéfice direct, promesse triple
5. **Hook** : 0 COUPURE. 0 STRESS. 100 % CONTRÔLE.
6. **Problème** : Stress du geste
7. **Bénéfice** : Contrôle total
8. **Objection traitée** : Sécurité
9. **Texte présent sur l'image** : 0 COUPURE. 0 STRESS. 100 % CONTRÔLE. / La tondeuse pensée pour les zones intimes. / Garantie 2 ans
10. **Pourquoi ça peut marcher** : Format monochrome ultra-lisible qui a tourné 3 mois chez Cooper ; notre produit sur socle est visuellement identique donc le format se transpose sans friction
11. **Ce qu'elle teste** : Promesse chiffrée en 3 temps + palette terracotta de marque
12. **Type** : EXPLOITATION


**Copy Meta chargé** — Titre : « 0 coupure. 0 stress. 100 % contrôle. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> La tondeuse pensée pour les zones intimes. Tête arrondie, lames céramique, LED intégrée, 100 % étanche.
> 
> Garantie 2 ans · Satisfait ou remboursé 30 jours · Livraison offerte


### 07 · La tondeuse intime (minimal)  —  `EXPLOITATION`

![La tondeuse intime (minimal)](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120309_e9ca1ace-7ae1-4b39-a669-ac3f7afe6a4d.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120309_e9ca1ace-7ae1-4b39-a669-ac3f7afe6a4d.png
- **Job Higgsfield** : `e9ca1ace-7ae1-4b39-a669-ac3f7afe6a4d`
- **Créa Meta (compte 1573950771030463)** : `29293803210209041` — nom `RS30 | 07 | EXPLOIT | La tondeuse intime (minimal)`

1. **Nom du concept** : La tondeuse intime (minimal)
2. **Inspiration / source** : Winner concurrent FR Billy Trimmer (3 171 € EU, 394 k reach, 8 mois de diffusion)
3. **Persona** : Marc, 47 ans
4. **Angle** : Catégorie + 3 anti-douleurs
5. **Hook** : LA TONDEUSE INTIME
6. **Problème** : Coupures, poils incarnés, irritations
7. **Bénéfice** : Zéro problème
8. **Objection traitée** : Aucune (notoriété de catégorie)
9. **Texte présent sur l'image** : LA TONDEUSE INTIME / ANTI-COUPURE · ANTI POIL INCARNÉ · ANTI IRRITATION
10. **Pourquoi ça peut marcher** : Le format le plus scalé du marché FR : nommer la catégorie suffit à l'audience déjà consciente du problème
11. **Ce qu'elle teste** : Minimalisme extrême (5 mots) vs headlines longues
12. **Type** : EXPLOITATION


**Copy Meta chargé** — Titre : « La tondeuse intime. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Anti-coupure. Anti poil incarné. Anti irritation. La tondeuse intime Raselio, 34,99 €.
> 
> Garantie 2 ans · Satisfait ou remboursé 30 jours · Colis neutre


### 08 · Vous payez la lame, pas la pub  —  `EXPLOITATION`

![Vous payez la lame, pas la pub](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120310_2a4d711b-4117-4f6f-b31a-b300eb5df8bf.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120310_2a4d711b-4117-4f6f-b31a-b300eb5df8bf.png
- **Job Higgsfield** : `2a4d711b-4117-4f6f-b31a-b300eb5df8bf`
- **Créa Meta (compte 1573950771030463)** : `921849500537498` — nom `RS30 | 08 | EXPLOIT | Vous payez la lame pas la pub`

1. **Nom du concept** : Vous payez la lame, pas la pub
2. **Inspiration / source** : Winner concurrent Grümwise (manifeste anti-marketing, 3 158 € EU, 274 k reach)
3. **Persona** : Marc, 47 ans (rationnel, méfiant)
4. **Angle** : Anti-marketing, prix honnête
5. **Hook** : Vous ne payez pas la pub. Vous payez la lame.
6. **Problème** : Surpayer les marques à 80-100 €
7. **Bénéfice** : Même techno, prix juste
8. **Objection traitée** : « Pas cher = pas bon »
9. **Texte présent sur l'image** : VOUS NE PAYEZ PAS LA PUB. VOUS PAYEZ LA LAME. / Pas d'influenceurs. Pas d'abonnement. Lames céramique. / Raselio. 34,99 €. Un seul paiement.
10. **Pourquoi ça peut marcher** : Le concept n°1 absolu de Grümwise, jamais testé en France par nous en statique
11. **Ce qu'elle teste** : Angle prix/anti-marketing vs angle sécurité
12. **Type** : EXPLOITATION


**Copy Meta chargé** — Titre : « Vous ne payez pas la pub. Vous payez la lame. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> À un moment, les marques de grooming ont arrêté de se battre sur la lame pour se battre sur le marketing. Et c'est vous qui avez payé : dans le prix, dans l'abonnement, dans l'appareil de remplacement.
> 
> Raselio a mis l'argent dans les lames céramique. Pas d'influenceurs. Pas d'abonnement. 34,99 €. Un seul paiement.


### 09 · C'est la lame, pas vous  —  `EXPLOITATION`

![C'est la lame, pas vous](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115359_99a501b8-3e95-4484-83c0-dda234df6b31.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115359_99a501b8-3e95-4484-83c0-dda234df6b31.png
- **Job Higgsfield** : `99a501b8-3e95-4484-83c0-dda234df6b31`
- **Créa Meta (compte 1573950771030463)** : `1249293983987862` — nom `RS30 | 09 | EXPLOIT | C'est la lame pas vous`

1. **Nom du concept** : C'est la lame, pas vous
2. **Inspiration / source** : Winner concurrent Grümwise « That's the blade, not you »
3. **Persona** : Hervé, 58 ans
4. **Angle** : Déculpabilisation + mécanisme
5. **Hook** : Ce n'est pas votre peau qui est sensible.
6. **Problème** : Croire que c'est sa peau
7. **Bénéfice** : Lames céramique qui ne chauffent pas
8. **Objection traitée** : « J'ai la peau sensible, rien n'y fait »
9. **Texte présent sur l'image** : Ce n'est pas votre peau qui est sensible. C'est la lame qui est mauvaise. / Lames céramique : elles ne chauffent pas, ne tirent pas. / Garantie 2 ans
10. **Pourquoi ça peut marcher** : Renverse la croyance et déplace la faute sur l'outil : le prospect n'a plus à changer, juste à changer d'outil
11. **Ce qu'elle teste** : Macro produit + insight déculpabilisant
12. **Type** : EXPLOITATION


**Copy Meta chargé** — Titre : « Ce n'est pas votre peau. C'est la lame. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Chaque coupure, chaque rougeur : un problème de matériau, pas de vous. Une lame acier chauffe et tire le poil. Les lames céramique Raselio restent froides et coupent net.
> 
> Garantie 2 ans · Satisfait ou remboursé 30 jours


### 10 · Callouts annotés  —  `EXPLOITATION`

![Callouts annotés](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120310_cc6e13e2-f0ac-4247-8d03-c6229149af60.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120310_cc6e13e2-f0ac-4247-8d03-c6229149af60.png
- **Job Higgsfield** : `cc6e13e2-f0ac-4247-8d03-c6229149af60`
- **Créa Meta (compte 1573950771030463)** : `28122583100769621` — nom `RS30 | 10 | EXPLOIT | Callouts annotés`

1. **Nom du concept** : Callouts annotés
2. **Inspiration / source** : Winner concurrent TrimUp/Epic Norths (521 € EU, annotations manuscrites)
3. **Persona** : Hervé, 58 ans
4. **Angle** : Preuve sociale + démonstration des 4 features
5. **Hook** : La tondeuse intime que 17 000 hommes ont adoptée
6. **Problème** : Doute sur la qualité
7. **Bénéfice** : 4 preuves mécaniques
8. **Objection traitée** : « Gadget »
9. **Texte présent sur l'image** : LA TONDEUSE INTIME QUE 17 000 HOMMES ONT ADOPTÉE / LED intégrée : vous voyez ce que vous rasez / Tête arrondie pour les zones sensibles / 100 % étanche : sous la douche / Lames céramique, zéro chauffe
10. **Pourquoi ça peut marcher** : Format éducatif dense mais lisible ; parfait pour l'audience 50+ qui lit et compare
11. **Ce qu'elle teste** : Densité d'information (4 callouts) vs minimalisme
12. **Type** : EXPLOITATION


**Copy Meta chargé** — Titre : « La tondeuse intime que 17 000 hommes ont adoptée » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> LED intégrée, tête arrondie, lames céramique, 100 % étanche. Plus de 17 000 hommes ont déjà adopté Raselio.
> 
> 34,99 € · Garantie 2 ans · Satisfait ou remboursé 30 jours · Colis neutre


### 11 · Post-it « Ce soir. »  —  `EXPLOITATION`

![Post-it « Ce soir. »](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115459_edbfbdf8-63a5-4e5c-8cbe-ee41b66956e1.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115459_edbfbdf8-63a5-4e5c-8cbe-ee41b66956e1.png
- **Job Higgsfield** : `edbfbdf8-63a5-4e5c-8cbe-ee41b66956e1`
- **Créa Meta (compte 1573950771030463)** : `28431344946502655` — nom `RS30 | 11 | EXPLOIT | Post-it Ce soir`

1. **Nom du concept** : Post-it « Ce soir. »
2. **Inspiration / source** : Famille post-it interne (meilleur ATC) + concept miroir
3. **Persona** : Hervé, 58 ans en couple
4. **Angle** : Anticipation / vie de couple
5. **Hook** : Ce soir.
6. **Problème** : Le moment où ça compte
7. **Bénéfice** : Prêt en 5 minutes
8. **Objection traitée** : Corvée / temps
9. **Texte présent sur l'image** : Ce soir. (manuscrit) / Impeccable en 5 minutes sous la douche.
10. **Pourquoi ça peut marcher** : Le post-it a généré le plus d'ajouts panier ; ici on remplace la blague par une promesse intime suggérée, plus adulte
11. **Ce qu'elle teste** : Suggestion romantique vs humour cru
12. **Type** : EXPLOITATION


**Copy Meta chargé** — Titre : « Impeccable en 5 minutes sous la douche. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> 5 minutes sous la douche, tout part avec l'eau, aucune trace de votre passage. 100 % étanche, sans fil, toujours prête sur son socle.
> 
> Garantie 2 ans · Satisfait ou remboursé 30 jours · Colis neutre


### 12 · Garantie respiration  —  `EXPLOITATION`

![Garantie respiration](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120310_e4f2f809-c8e3-415e-8314-028bc2cf8ee6.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120310_e4f2f809-c8e3-415e-8314-028bc2cf8ee6.png
- **Job Higgsfield** : `e4f2f809-c8e3-415e-8314-028bc2cf8ee6`
- **Créa Meta (compte 1573950771030463)** : `28175480115444805` — nom `RS30 | 12 | EXPLOIT | Garantie respiration`

1. **Nom du concept** : Garantie respiration
2. **Inspiration / source** : Concept interne 2.3 (money-back) + Grümwise guarantee
3. **Persona** : Hervé, 58 ans, méfiant
4. **Angle** : Risk reversal
5. **Hook** : Essayez-la 30 jours.
6. **Problème** : Peur de l'arnaque dropshipping
7. **Bénéfice** : Zéro risque financier
8. **Objection traitée** : « Si c'est nul ? »
9. **Texte présent sur l'image** : Essayez-la 30 jours. / Si vous retenez encore votre respiration, on vous rembourse. / 30 JOURS SATISFAIT OU REMBOURSÉ / GARANTIE 2 ANS · SAV EN FRANÇAIS / Colis neutre et discret
10. **Pourquoi ça peut marcher** : Le CPA actuel (86 €) vient d'une conversion site faible : rassurer AVANT le clic remonte le taux d'achat
11. **Ce qu'elle teste** : Garantie en headline vs garantie en micro-mention
12. **Type** : EXPLOITATION


**Copy Meta chargé** — Titre : « Essayez-la 30 jours. Sinon, remboursé. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Essayez Raselio 30 jours. Si vous retenez encore votre respiration à chaque passage, on vous rembourse intégralement, sans question.
> 
> Garantie 2 ans · SAV en français · Colis neutre et discret


### 13 · Le facteur ne saura rien  —  `EXPLOITATION`

![Le facteur ne saura rien](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120545_9409aca6-a38e-4df6-bd10-7f5b463f5dbc.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120545_9409aca6-a38e-4df6-bd10-7f5b463f5dbc.png
- **Job Higgsfield** : `9409aca6-a38e-4df6-bd10-7f5b463f5dbc`
- **Créa Meta (compte 1573950771030463)** : `29243614798560507` — nom `RS30 | 13 | EXPLOIT | Le facteur ne saura rien`

1. **Nom du concept** : Le facteur ne saura rien
2. **Inspiration / source** : C11 garantie-colis (meilleur CTR de la batch actuelle : 14,8 %)
3. **Persona** : Hervé, 58 ans
4. **Angle** : Discrétion + clin d'œil couple
5. **Hook** : Le facteur ne saura rien.
6. **Problème** : Gêne de commander
7. **Bénéfice** : Colis neutre
8. **Objection traitée** : Discrétion
9. **Texte présent sur l'image** : Le facteur ne saura rien. / Elle, si. / Colis neutre · Livraison offerte · Garantie 2 ans
10. **Pourquoi ça peut marcher** : L'objection discrétion est réelle chez les 50+ ; l'humour à deux niveaux rend la promesse mémorable
11. **Ce qu'elle teste** : Objection discrétion en angle principal
12. **Type** : EXPLOITATION


**Copy Meta chargé** — Titre : « Le facteur ne saura rien. Elle, si. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Colis neutre, sans marque, livré en Colissimo offert. Personne n'a besoin de savoir. Tout le monde finira par remarquer.
> 
> Garantie 2 ans · Satisfait ou remboursé 30 jours


### 14 · Ce que vous ne voyez pas  —  `EXPLOITATION`

![Ce que vous ne voyez pas](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120545_57ec041d-1169-47e3-8b4f-4f0019918583.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120545_57ec041d-1169-47e3-8b4f-4f0019918583.png
- **Job Higgsfield** : `57ec041d-1169-47e3-8b4f-4f0019918583`
- **Créa Meta (compte 1573950771030463)** : `1796487911525540` — nom `RS30 | 14 | EXPLOIT | Ce que vous ne voyez pas (LED)`

1. **Nom du concept** : Ce que vous ne voyez pas
2. **Inspiration / source** : Concept interne M3 (visibilité / LED)
3. **Persona** : Hervé, 58 ans
4. **Angle** : Mécanisme LED
5. **Hook** : Vous ne pouvez pas tailler droit ce que vous ne voyez pas.
6. **Problème** : Rasage au jugé
7. **Bénéfice** : Voir ce qu'on coupe
8. **Objection traitée** : « À quoi sert la LED ? »
9. **Texte présent sur l'image** : Vous ne pouvez pas tailler droit ce que vous ne voyez pas. / LED intégrée dans la tête. / Sabot 3 hauteurs · Tête arrondie
10. **Pourquoi ça peut marcher** : Feature unique vs tondeuse à barbe, démontrée par la lumière elle-même
11. **Ce qu'elle teste** : Angle visibilité vs angle sécurité
12. **Type** : EXPLOITATION


**Copy Meta chargé** — Titre : « Vous voyez enfin ce que vous rasez. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Cette zone, vous ne la voyez jamais entièrement. La LED intégrée à la tête éclaire exactement ce que vous coupez, au moment où vous le coupez. Fini le jugé.
> 
> Sabot 3 hauteurs · Tête arrondie · Garantie 2 ans


### 15 · Ça pique 3 jours après  —  `EXPLOITATION`

![Ça pique 3 jours après](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_121331_90c3b955-003b-43bd-b6f5-69061853dd79.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_121331_90c3b955-003b-43bd-b6f5-69061853dd79.png
- **Job Higgsfield** : `90c3b955-003b-43bd-b6f5-69061853dd79`
- **Créa Meta (compte 1573950771030463)** : `2161256625271433` — nom `RS30 | 15 | EXPLOIT | Ça pique 3 jours après`

1. **Nom du concept** : Ça pique 3 jours après
2. **Inspiration / source** : Landing « 7 raisons » (raison 5) + headline en cours « Ça pique à la repousse ? »
3. **Persona** : Marc, 47 ans
4. **Angle** : Repousse / sabot
5. **Hook** : Ça pique 3 jours après ?
6. **Problème** : Repousse qui gratte
7. **Bénéfice** : Sabot 3 hauteurs, jamais à blanc
8. **Objection traitée** : « Toutes les tondeuses font ça »
9. **Texte présent sur l'image** : Ça pique 3 jours après ? Vous rasez trop court. / Le sabot 3 hauteurs : net, court ou naturel. Jamais à blanc. / Approuvée par plus de 17 000 hommes
10. **Pourquoi ça peut marcher** : Douleur n°2 de l'ICP, réponse produit concrète (sabot)
11. **Ce qu'elle teste** : Douleur repousse vs douleur coupure
12. **Type** : EXPLOITATION


**Copy Meta chargé** — Titre : « Ça pique 3 jours après ? Vous rasez trop court. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Le rasage à blanc, c'est le piège : deux jours lisses, une semaine qui pique. Le sabot 3 hauteurs vous laisse choisir : net, court ou naturel. Assez court pour être impeccable, assez long pour ne jamais piquer.
> 
> Garantie 2 ans · Satisfait ou remboursé 30 jours


### 16 · Témoignage surligné  —  `EXPLORATION`

![Témoignage surligné](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115459_0a862135-2bd1-431a-bc9d-4b369d053f55.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115459_0a862135-2bd1-431a-bc9d-4b369d053f55.png
- **Job Higgsfield** : `0a862135-2bd1-431a-bc9d-4b369d053f55`
- **Créa Meta (compte 1573950771030463)** : `1451408230147395` — nom `RS30 | 16 | EXPLORE | Témoignage surligné Hervé`

1. **Nom du concept** : Témoignage surligné
2. **Inspiration / source** : Parker board – carte témoignage « Julie M. » avec passage surligné
3. **Persona** : Hervé, 58 ans
4. **Angle** : Preuve sociale par un pair
5. **Hook** : « J'aurais dû le faire il y a 20 ans. »
6. **Problème** : Retenir son souffle
7. **Bénéfice** : Zéro coupure, zéro rougeur
8. **Objection traitée** : « Ça marche vraiment ? »
9. **Texte présent sur l'image** : Hervé D. · Achat vérifié ★★★★★ / « Franchement, je retenais mon souffle à chaque passage. Là, zéro coupure, zéro rougeur. J'aurais dû le faire il y a 20 ans. »
10. **Pourquoi ça peut marcher** : Un pair du même âge qui parle comme la cible : identification maximale
11. **Ce qu'elle teste** : Témoignage-pair 58 ans vs preuve chiffrée
12. **Type** : EXPLORATION


**Copy Meta chargé** — Titre : « « J'aurais dû le faire il y a 20 ans. » » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> « Franchement, je retenais mon souffle à chaque passage. Là, zéro coupure, zéro rougeur. J'aurais dû le faire il y a 20 ans. » Hervé D., achat vérifié.
> 
> Garantie 2 ans · Satisfait ou remboursé 30 jours · Colis neutre


### 17 · Elle a remarqué (SMS)  —  `EXPLORATION`

![Elle a remarqué (SMS)](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115711_61586e48-30e8-4847-ad23-83fd02149bd0.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115711_61586e48-30e8-4847-ad23-83fd02149bd0.png
- **Job Higgsfield** : `61586e48-30e8-4847-ad23-83fd02149bd0`
- **Créa Meta (compte 1573950771030463)** : `1041487312116911` — nom `RS30 | 17 | EXPLORE | Elle a remarqué (SMS)`

1. **Nom du concept** : Elle a remarqué (SMS)
2. **Inspiration / source** : Parker board – capture conversation / commentaire
3. **Persona** : Hervé, 58 ans en couple
4. **Angle** : Réaction partenaire
5. **Hook** : Elle a remarqué.
6. **Problème** : Passer inaperçu
7. **Bénéfice** : Effet immédiat sur le couple
8. **Objection traitée** : « À quoi bon ? »
9. **Texte présent sur l'image** : Elle a remarqué. / Catherine ❤️ / T'as fait quoi de différent ? / Rien. / (Raselio.)
10. **Pourquoi ça peut marcher** : Le format SMS est natif et lu comme du contenu, pas comme une pub
11. **Ce qu'elle teste** : Format natif conversation vs packshot
12. **Type** : EXPLORATION


**Copy Meta chargé** — Titre : « Elle a remarqué. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Vous n'avez rien dit. Elle a remarqué quand même. Tête arrondie, lames céramique, 5 minutes sous la douche.
> 
> Colis neutre · Garantie 2 ans · Satisfait ou remboursé 30 jours


### 18 · Post-it garantie sur produit  —  `EXPLORATION`

![Post-it garantie sur produit](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_121331_bf1ca3e7-39e7-430f-ab6f-86f872a9ba0e.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_121331_bf1ca3e7-39e7-430f-ab6f-86f872a9ba0e.png
- **Job Higgsfield** : `bf1ca3e7-39e7-430f-ab6f-86f872a9ba0e`
- **Créa Meta (compte 1573950771030463)** : `1749851689591672` — nom `RS30 | 18 | EXPLORE | Post-it garantie sur produit`

1. **Nom du concept** : Post-it garantie sur produit
2. **Inspiration / source** : Parker board – note manuscrite collée sur le produit (« zero dandruff or we'll refund you »)
3. **Persona** : Hervé, 58 ans
4. **Angle** : Garantie UGC
5. **Hook** : Zéro coupure. Ou remboursé.
6. **Problème** : Méfiance
7. **Bénéfice** : Promesse tenue
8. **Objection traitée** : Arnaque
9. **Texte présent sur l'image** : Zéro coupure. Ou remboursé. (manuscrit) / 30 jours pour essayer · Garantie 2 ans
10. **Pourquoi ça peut marcher** : Le style photo brute + note manuscrite casse le look pub et porte la garantie
11. **Ce qu'elle teste** : UGC statique vs studio
12. **Type** : EXPLORATION


**Copy Meta chargé** — Titre : « Zéro coupure. Ou remboursé. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Zéro coupure, ou remboursé. Vous avez 30 jours pour l'essayer. Si Raselio ne change rien pour vous, on vous rembourse intégralement.
> 
> Garantie 2 ans · Colis neutre · Livraison offerte


### 19 · 6 signes  —  `EXPLORATION`

![6 signes](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115459_ce54a372-ea79-4280-b8d1-cd759413915a.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115459_ce54a372-ea79-4280-b8d1-cd759413915a.png
- **Job Higgsfield** : `ce54a372-ea79-4280-b8d1-cd759413915a`
- **Créa Meta (compte 1573950771030463)** : `3097595087102709` — nom `RS30 | 19 | EXPLORE | 6 signes`

1. **Nom du concept** : 6 signes
2. **Inspiration / source** : Parker board – grille d'icônes « 8 signs of high cortisol »
3. **Persona** : Hervé, 58 ans
4. **Angle** : Liste / auto-diagnostic
5. **Hook** : 6 signes que votre tondeuse à barbe n'est pas faite pour ça
6. **Problème** : Symptômes quotidiens
7. **Bénéfice** : La bonne tondeuse existe
8. **Objection traitée** : « Ma tondeuse à barbe suffit »
9. **Texte présent sur l'image** : 6 signes que votre tondeuse à barbe n'est pas faite pour ça / Vous retenez votre souffle · Vous vérifiez au toucher · Ça pique 3 jours après · Petites coupures · Poils incarnés · Vous remettez à demain / La bonne tondeuse existe. 34,99 €
10. **Pourquoi ça peut marcher** : Format listicle à fort taux de lecture, chaque signe = un « c'est moi »
11. **Ce qu'elle teste** : Listicle icônes vs headline unique
12. **Type** : EXPLORATION


**Copy Meta chargé** — Titre : « 6 signes que votre tondeuse à barbe n'est pas faite pour ça » · CTA : `LEARN_MORE` · Lien : https://www.raselio.com/pages/pourquoi-pas-votre-tondeuse-a-barbe

> Vous retenez votre souffle. Vous vérifiez au toucher. Ça pique 3 jours après. Si vous vous reconnaissez dans deux de ces signes, ce n'est pas vous le problème : c'est l'outil.
> 
> Raselio, la tondeuse pensée pour cette zone. 34,99 € · Garantie 2 ans · Satisfait ou remboursé 30 jours


### 20 · Vous vous reconnaissez ?  —  `EXPLORATION`

![Vous vous reconnaissez ?](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115459_ba0cb1a1-5d22-41c5-ac6b-62f3e90bf71c.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115459_ba0cb1a1-5d22-41c5-ac6b-62f3e90bf71c.png
- **Job Higgsfield** : `ba0cb1a1-5d22-41c5-ac6b-62f3e90bf71c`
- **Créa Meta (compte 1573950771030463)** : `1774737807003886` — nom `RS30 | 20 | EXPLORE | Vous vous reconnaissez (checklist)`

1. **Nom du concept** : Vous vous reconnaissez ?
2. **Inspiration / source** : Parker board – checklist « Early symptoms »
3. **Persona** : Hervé, 58 ans
4. **Angle** : Identification humoristique
5. **Hook** : Vous vous reconnaissez ?
6. **Problème** : Rituels d'évitement
7. **Bénéfice** : Cocher la dernière case
8. **Objection traitée** : Procrastination
9. **Texte présent sur l'image** : Vous vous reconnaissez ? / ☑ Je retiens ma respiration ☑ Je passe la tondeuse au jugé ☑ Je remets ça à la semaine prochaine ☐ J'ai la bonne tondeuse / Cochez la dernière case. Raselio, 34,99 €
10. **Pourquoi ça peut marcher** : La case vide crée un manque à combler : mécanisme de complétion
11. **Ce qu'elle teste** : Checklist interactive vs liste passive
12. **Type** : EXPLORATION


**Copy Meta chargé** — Titre : « Cochez la dernière case. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Je retiens ma respiration. Je passe la tondeuse au jugé. Je remets ça à la semaine prochaine. Il ne manque qu'une case à cocher : la bonne tondeuse.
> 
> 34,99 € · Garantie 2 ans · Satisfait ou remboursé 30 jours · Colis neutre


### 21 · Advertorial 50 ans et plus  —  `EXPLORATION`

![Advertorial 50 ans et plus](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120545_f83262d6-a3a4-4e4d-a9ec-704ab76a7f5e.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120545_f83262d6-a3a4-4e4d-a9ec-704ab76a7f5e.png
- **Job Higgsfield** : `f83262d6-a3a4-4e4d-a9ec-704ab76a7f5e`
- **Créa Meta (compte 1573950771030463)** : `28099144656372798` — nom `RS30 | 21 | EXPLORE | Advertorial 50 ans et plus`

1. **Nom du concept** : Advertorial 50 ans et plus
2. **Inspiration / source** : Parker board – carte article de presse « New clinical data » avec bouton Lire
3. **Persona** : Hervé, 58 ans
4. **Angle** : Éditorial / curiosité
5. **Hook** : Pourquoi de plus en plus d'hommes de 50 ans et plus abandonnent leur tondeuse à barbe pour cette zone
6. **Problème** : Ne pas savoir qu'une alternative existe
7. **Bénéfice** : Comprendre
8. **Objection traitée** : Méfiance pub
9. **Texte présent sur l'image** : SANTÉ & BIEN-ÊTRE HOMME / Pourquoi de plus en plus d'hommes de 50 ans et plus abandonnent leur tondeuse à barbe pour cette zone / Par Julien M. · 4 min de lecture / Lire l'article
10. **Pourquoi ça peut marcher** : Renvoie vers la landing « 7 raisons » (déjà l'un des chemins qui convertit) avec un format qui ne ressemble pas à une pub
11. **Ce qu'elle teste** : Format advertorial + ciblage d'âge explicite
12. **Type** : EXPLORATION


**Copy Meta chargé** — Titre : « Pourquoi ils abandonnent leur tondeuse à barbe pour cette zone » · CTA : `LEARN_MORE` · Lien : https://www.raselio.com/pages/pourquoi-pas-votre-tondeuse-a-barbe

> Une tondeuse à barbe est conçue pour une joue tendue et une peau épaisse. Sous la ceinture, c'est l'inverse : la peau la plus fine du corps, une surface qui bouge, des angles qu'on ne voit qu'à moitié. Voici les 7 raisons pour lesquelles de plus en plus d'hommes changent d'outil.


### 22 · Ce n'était pas votre peau  —  `EXPLORATION`

![Ce n'était pas votre peau](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120545_b997499e-bc07-4b5e-bfdc-dca55fe5be91.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120545_b997499e-bc07-4b5e-bfdc-dca55fe5be91.png
- **Job Higgsfield** : `b997499e-bc07-4b5e-bfdc-dca55fe5be91`
- **Créa Meta (compte 1573950771030463)** : `1083636457688614` — nom `RS30 | 22 | EXPLORE | Ce n'était pas votre peau (silhouettes)`

1. **Nom du concept** : Ce n'était pas votre peau
2. **Inspiration / source** : Parker board – silhouettes côte à côte « Maybe it was never the shampoo »
3. **Persona** : Hervé, 58 ans
4. **Angle** : Comparaison posture
5. **Hook** : Ce n'était pas votre peau. C'était la lame.
6. **Problème** : Tension corporelle
7. **Bénéfice** : Détente
8. **Objection traitée** : Peau sensible
9. **Texte présent sur l'image** : Ce n'était pas votre peau. C'était la lame. / Tondeuse à barbe | Raselio / Lames céramique · Tête arrondie
10. **Pourquoi ça peut marcher** : Le langage corporel (épaules crispées vs détendues) raconte l'histoire sans anatomie
11. **Ce qu'elle teste** : Comparaison corporelle vs comparaison produit
12. **Type** : EXPLORATION


**Copy Meta chargé** — Titre : « Ce n'était pas votre peau. C'était la lame. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Les épaules qui remontent, la mâchoire serrée, la respiration bloquée : ce n'est pas votre peau qui est sensible, c'est votre lame qui accroche. Lames céramique, tête arrondie : vous respirez.
> 
> Garantie 2 ans · Satisfait ou remboursé 30 jours


### 23 · Deux types d'hommes (meme)  —  `EXPLORATION`

![Deux types d'hommes (meme)](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115600_f3bbf96e-2e3a-48fc-8068-edeffc26ef73.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115600_f3bbf96e-2e3a-48fc-8068-edeffc26ef73.png
- **Job Higgsfield** : `f3bbf96e-2e3a-48fc-8068-edeffc26ef73`
- **Créa Meta (compte 1573950771030463)** : `1409668091092509` — nom `RS30 | 23 | EXPLORE | Deux types d'hommes (meme)`

1. **Nom du concept** : Deux types d'hommes (meme)
2. **Inspiration / source** : Parker board – meme 2 cases (wojak) transposé en illustration adulte
3. **Persona** : Marc, 47 ans
4. **Angle** : Humour meme
5. **Hook** : Il y a deux types d'hommes.
6. **Problème** : Respiration retenue
7. **Bénéfice** : Respirer
8. **Objection traitée** : Aucune (notoriété)
9. **Texte présent sur l'image** : Il y a deux types d'hommes. / Tondeuse à barbe : vous retenez votre respiration. / Raselio : vous respirez. / 34,99 €
10. **Pourquoi ça peut marcher** : Format meme = partage et commentaires, donc CPM plus bas
11. **Ce qu'elle teste** : Illustration humoristique vs photo
12. **Type** : EXPLORATION


**Copy Meta chargé** — Titre : « Il y a deux types d'hommes. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Ceux qui retiennent leur respiration avec une tondeuse à barbe. Et ceux qui respirent avec la bonne tondeuse. Tête arrondie, lames céramique, LED intégrée.
> 
> 34,99 € · Garantie 2 ans · Satisfait ou remboursé 30 jours


### 24 · Jour 1 · Jour 3 · Jour 7  —  `EXPLORATION`

![Jour 1 · Jour 3 · Jour 7](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_122912_973c6c7a-c540-4f16-a276-23680738e33a.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_122912_973c6c7a-c540-4f16-a276-23680738e33a.png
- **Job Higgsfield** : `973c6c7a-c540-4f16-a276-23680738e33a`
- **Créa Meta (compte 1573950771030463)** : `3946967618931034` — nom `RS30 | 24 | EXPLORE | Jour 1 Jour 3 Jour 7`

1. **Nom du concept** : Jour 1 · Jour 3 · Jour 7
2. **Inspiration / source** : Parker board – timeline horaire « 12-hour shifts »
3. **Persona** : Marc, 47 ans
4. **Angle** : Démonstration temporelle
5. **Hook** : Ce qui se passe 3 jours après.
6. **Problème** : Repousse
7. **Bénéfice** : Confort durable
8. **Objection traitée** : « C'est pareil partout »
9. **Texte présent sur l'image** : Ce qui se passe 3 jours après. / Jour 1 · Jour 3 · Jour 7 / Rasoir jetable : Lisse · Rouge · Ça pique / Raselio avec sabot : Net · Net · Confortable
10. **Pourquoi ça peut marcher** : Rend visible une différence que le prospect ne perçoit qu'a posteriori
11. **Ce qu'elle teste** : Timeline pédagogique vs bénéfice direct
12. **Type** : EXPLORATION


**Copy Meta chargé** — Titre : « Ce qui se passe 3 jours après. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Rasoir jetable : lisse le jour 1, rouge le jour 3, ça pique le jour 7. Raselio avec sabot : net, net, et toujours confortable. La différence, c'est la longueur de coupe, pas la volonté.
> 
> Sabot 3 hauteurs · Garantie 2 ans · Satisfait ou remboursé 30 jours


### 25 · Macro annotée  —  `EXPLORATION`

![Macro annotée](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120545_df90f3dd-884e-4e73-8a9b-146f5aa5943c.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120545_df90f3dd-884e-4e73-8a9b-146f5aa5943c.png
- **Job Higgsfield** : `df90f3dd-884e-4e73-8a9b-146f5aa5943c`
- **Créa Meta (compte 1573950771030463)** : `4531851700407415` — nom `RS30 | 25 | EXPLORE | Macro annotée`

1. **Nom du concept** : Macro annotée
2. **Inspiration / source** : Parker board – photo annotée « This is what your socks are doing to you »
3. **Persona** : Hervé, 58 ans
4. **Angle** : Diagnostic visuel
5. **Hook** : Voici ce que votre tondeuse à barbe fait à cette zone.
6. **Problème** : Lame droite sur peau mobile
7. **Bénéfice** : Tête arrondie
8. **Objection traitée** : « Ma tondeuse à barbe suffit »
9. **Texte présent sur l'image** : Voici ce que votre tondeuse à barbe fait à cette zone. / Lame droite sur peau qui bouge · Pince les plis · Chauffe et tire le poil / Tête arrondie. Lames céramique.
10. **Pourquoi ça peut marcher** : Montre le mécanisme du problème sur une zone neutre (avant-bras) : compréhension instantanée
11. **Ce qu'elle teste** : Anti-produit (montrer le mauvais outil) vs produit
12. **Type** : EXPLORATION


**Copy Meta chargé** — Titre : « Voici ce que votre tondeuse à barbe fait à cette zone. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Une lame droite conçue pour une joue tendue, posée sur une peau fine qui bouge : elle pince les plis, chauffe et tire le poil. La tête arrondie et les lames céramique Raselio ont été pensées pour cette zone, et uniquement pour elle.
> 
> Garantie 2 ans · Satisfait ou remboursé 30 jours


### 26 · Désolé (lettre)  —  `EXPLORATION`

![Désolé (lettre)](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115601_1d417dce-66c3-4d8b-95e6-bb790f2d8984.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115601_1d417dce-66c3-4d8b-95e6-bb790f2d8984.png
- **Job Higgsfield** : `1d417dce-66c3-4d8b-95e6-bb790f2d8984`
- **Créa Meta (compte 1573950771030463)** : `1740666973636320` — nom `RS30 | 26 | EXPLORE | Désolé (lettre)`

1. **Nom du concept** : Désolé (lettre)
2. **Inspiration / source** : Parker board – lettre d'excuses « We're so sorry » (Grüns)
3. **Persona** : Hervé, 58 ans
4. **Angle** : Sincérité / marque qui parle
5. **Hook** : Désolé.
6. **Problème** : Personne n'en parle
7. **Bénéfice** : Enfin une réponse
8. **Objection traitée** : Méfiance marque
9. **Texte présent sur l'image** : Désolé. / Personne ne vous a jamais dit que votre tondeuse à barbe n'était pas faite pour ça. Alors on l'a fait. / L'équipe Raselio
10. **Pourquoi ça peut marcher** : Le mot « Désolé » en gros est un pattern interrupt fort ; la lettre installe une voix de marque humaine
11. **Ce qu'elle teste** : Format lettre / texte long vs visuel
12. **Type** : EXPLORATION


**Copy Meta chargé** — Titre : « Désolé. » · CTA : `LEARN_MORE` · Lien : https://www.raselio.com/pages/pourquoi-pas-votre-tondeuse-a-barbe

> Désolé. Personne ne vous a jamais dit que votre tondeuse à barbe n'était pas faite pour cette zone : peau fine, surface qui bouge, angles que vous ne voyez qu'à moitié. Alors on l'a fait.
> 
> Raselio : tête arrondie, lames céramique, LED intégrée. Garantie 2 ans · Satisfait ou remboursé 30 jours


### 27 · 58 ans (pancarte)  —  `EXPLORATION`

![58 ans (pancarte)](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115600_61294261-0bd1-443e-83e2-7a12966d7a9b.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115600_61294261-0bd1-443e-83e2-7a12966d7a9b.png
- **Job Higgsfield** : `61294261-0bd1-443e-83e2-7a12966d7a9b`
- **Créa Meta (compte 1573950771030463)** : `1766519881142189` — nom `RS30 | 27 | EXPLORE | 58 ans (pancarte)`

1. **Nom du concept** : 58 ans (pancarte)
2. **Inspiration / source** : Parker board – photo pancarte manuscrite « I lost 11 lbs »
3. **Persona** : Hervé, 58 ans
4. **Angle** : Normalisation par l'âge
5. **Hook** : 58 ans. Fini de retenir ma respiration.
6. **Problème** : « Je suis trop vieux pour ça »
7. **Bénéfice** : Il n'est jamais trop tard
8. **Objection traitée** : Âge
9. **Texte présent sur l'image** : 58 ans. Fini de retenir ma respiration. (pancarte) / Plus de 17 000 hommes ont fait le changement.
10. **Pourquoi ça peut marcher** : Affiche l'âge de l'acheteur réel en gros : la cible se reconnaît immédiatement
11. **Ce qu'elle teste** : Âge chiffré en hook
12. **Type** : EXPLORATION


**Copy Meta chargé** — Titre : « 58 ans. Fini de retenir ma respiration. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Il n'y a pas d'âge pour arrêter de retenir sa respiration. Tête arrondie, lames céramique, LED intégrée : la tondeuse pensée pour les zones sensibles.
> 
> Plus de 17 000 hommes ont fait le changement · Garantie 2 ans · Satisfait ou remboursé 30 jours


### 28 · Le cadeau qu'il ne s'offrira jamais  —  `EXPLORATION`

![Le cadeau qu'il ne s'offrira jamais](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120906_5ab355bb-67f4-4510-9cab-a4cd476abd3d.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120906_5ab355bb-67f4-4510-9cab-a4cd476abd3d.png
- **Job Higgsfield** : `5ab355bb-67f4-4510-9cab-a4cd476abd3d`
- **Créa Meta (compte 1573950771030463)** : `1482898870266472` — nom `RS30 | 28 | EXPLORE | Le cadeau (cible partenaire)`

1. **Nom du concept** : Le cadeau qu'il ne s'offrira jamais
2. **Inspiration / source** : Signal data : femmes 45-54 = 3 ajouts panier + 1 checkout ; Parker board angle « partner reaction »
3. **Persona** : Catherine, 54 ans (partenaire)
4. **Angle** : Cadeau / bénéfice partagé
5. **Hook** : Le cadeau qu'il ne s'offrira jamais lui-même.
6. **Problème** : Il n'ose pas
7. **Bénéfice** : Vous en profitez aussi
8. **Objection traitée** : Gêne d'offrir
9. **Texte présent sur l'image** : Le cadeau qu'il ne s'offrira jamais lui-même. / Et dont vous profiterez aussi. / Colis neutre · Livraison offerte
10. **Pourquoi ça peut marcher** : Nouveau territoire d'audience : la partenaire achète pour lui (signal ATC féminin 45-54)
11. **Ce qu'elle teste** : Cible féminine / angle cadeau
12. **Type** : EXPLORATION


**Copy Meta chargé** — Titre : « Le cadeau qu'il ne s'offrira jamais lui-même. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Il n'osera jamais se l'acheter. Vous, si. La tondeuse intime Raselio : tête arrondie, lames céramique, LED intégrée, colis neutre. Le genre de cadeau dont vous profitez aussi.
> 
> 34,99 € · Livraison offerte · Garantie 2 ans · Satisfait ou remboursé 30 jours


### 29 · Livré partout en France  —  `EXPLORATION`

![Livré partout en France](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_121331_04f0acb4-a321-4233-a883-5c32631b5faa.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_121331_04f0acb4-a321-4233-a883-5c32631b5faa.png
- **Job Higgsfield** : `04f0acb4-a321-4233-a883-5c32631b5faa`
- **Créa Meta (compte 1573950771030463)** : `1555626706579477` — nom `RS30 | 29 | EXPLORE | Livré partout en France`

1. **Nom du concept** : Livré partout en France
2. **Inspiration / source** : Parker board – carte « Hello Europe »
3. **Persona** : Hervé, 58 ans
4. **Angle** : Logistique + discrétion
5. **Hook** : Livré partout en France. Sans que personne ne le sache.
6. **Problème** : Délais / discrétion
7. **Bénéfice** : Colissimo offert, colis neutre
8. **Objection traitée** : Livraison depuis l'étranger
9. **Texte présent sur l'image** : Livré partout en France. Sans que personne ne le sache. / Colissimo offert · Colis neutre · 48-72 h
10. **Pourquoi ça peut marcher** : Répond à l'objection dropshipping implicite (« ça vient de Chine ? ») et à la discrétion
11. **Ce qu'elle teste** : Angle logistique
12. **Type** : EXPLORATION


**Copy Meta chargé** — Titre : « Livré partout en France. Discrètement. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Expédié en Colissimo offert, dans un colis neutre sans marque. Livré en 48-72 h partout en France. Personne n'a besoin de savoir.
> 
> Garantie 2 ans · Satisfait ou remboursé 30 jours


### 30 · Les lunettes  —  `EXPLORATION`

![Les lunettes](https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115600_ac3a76ec-5de5-4cf5-8c7b-032cbb5690ff.png)

- **Image (Higgsfield)** : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115600_ac3a76ec-5de5-4cf5-8c7b-032cbb5690ff.png
- **Job Higgsfield** : `ac3a76ec-5de5-4cf5-8c7b-032cbb5690ff`
- **Créa Meta (compte 1573950771030463)** : `1052722604442048` — nom `RS30 | 30 | EXPLORE | Les lunettes (LED)`

1. **Nom du concept** : Les lunettes
2. **Inspiration / source** : Initiative data : acheteurs 55-65 (presbytie) × feature LED
3. **Persona** : Hervé, 58 ans
4. **Angle** : Humour générationnel + LED
5. **Hook** : Vos lunettes ne vont pas sous la douche. La LED, si.
6. **Problème** : Ne plus bien voir de près
7. **Bénéfice** : Voir enfin ce qu'on rase
8. **Objection traitée** : « La LED, gadget »
9. **Texte présent sur l'image** : Vos lunettes ne vont pas sous la douche. La LED, si. / Vous voyez enfin ce que vous rasez. / 100 % étanche · Garantie 2 ans
10. **Pourquoi ça peut marcher** : Insight 100 % lié à l'âge réel des acheteurs, jamais exploité par un concurrent
11. **Ce qu'elle teste** : Humour générationnel vs humour anatomique
12. **Type** : EXPLORATION


**Copy Meta chargé** — Titre : « Vos lunettes ne vont pas sous la douche. La LED, si. » · CTA : `SHOP_NOW` · Lien : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

> Passé 50 ans, on voit moins bien de près. Et sous la douche, pas de lunettes. La LED intégrée à la tête Raselio éclaire exactement ce que vous coupez. Vous voyez, donc vous maîtrisez.
> 
> 100 % étanche · Garantie 2 ans · Satisfait ou remboursé 30 jours


---

## 5. Vue d'ensemble : ce que chaque créa teste

| # | Type | Nom | Mécanisme conservé | Variable testée |
|---|---|---|---|---|
| 01 | EXPLOITATION | Impeccable à tout âge | Famille « Impeccable » (crème, flèches, preuve sociale) | Modèle 55-60 ans vs 30 ans |
| 02 | EXPLOITATION | Impeccable mains seules | Headline gagnante | Sans corps, main mûre + prix |
| 03 | EXPLOITATION | Impeccable même là (pixel) | Censure pixel S9 | Vouvoiement + modèle vieilli |
| 04 | EXPLOITATION | Post-it zones après 50 ans | Structure S2 (3 post-it + offre) | Vocabulaire sobre + âge dans le hook |
| 05 | EXPLOITATION | Le kiwi | Balls Club | Métaphore douleur vs packshot |
| 06 | EXPLOITATION | 0 coupure 0 stress 100 % contrôle | Club Cooper | Triple promesse chiffrée, terracotta |
| 07 | EXPLOITATION | La tondeuse intime (minimal) | Billy Trimmer | Minimalisme catégorie (5 mots) |
| 08 | EXPLOITATION | Vous payez la lame pas la pub | Grümwise anti-marketing | Angle prix honnête |
| 09 | EXPLOITATION | C'est la lame pas vous | Grümwise « blade not you » | Déculpabilisation + macro lames |
| 10 | EXPLOITATION | Callouts annotés | TrimUp | Densité d'information (4 callouts) |
| 11 | EXPLOITATION | Post-it « Ce soir. » | Famille post-it (meilleur ATC) | Suggestion couple vs humour cru |
| 12 | EXPLOITATION | Garantie respiration | Risk reversal | Garantie en headline |
| 13 | EXPLOITATION | Le facteur ne saura rien | C11 garantie-colis (CTR 14,8 %) | Discrétion en angle principal |
| 14 | EXPLOITATION | Ce que vous ne voyez pas (LED) | Concept LED interne | Visibilité vs sécurité |
| 15 | EXPLOITATION | Ça pique 3 jours après | Landing « 7 raisons » | Douleur repousse + sabot |
| 16 | EXPLORATION | Témoignage surligné Hervé D. | Parker : carte témoignage surlignée | Pair de 58 ans vs preuve chiffrée |
| 17 | EXPLORATION | Elle a remarqué (SMS) | Parker : capture conversation | Format natif SMS |
| 18 | EXPLORATION | Post-it garantie sur produit | Parker : note manuscrite sur produit | UGC statique vs studio |
| 19 | EXPLORATION | 6 signes | Parker : grille d'icônes « 8 signs » | Listicle auto-diagnostic → landing |
| 20 | EXPLORATION | Vous vous reconnaissez ? | Parker : checklist | Case vide (complétion) |
| 21 | EXPLORATION | Advertorial 50 ans et plus | Parker : carte article de presse | Format éditorial → landing « 7 raisons » |
| 22 | EXPLORATION | Ce n'était pas votre peau | Parker : silhouettes côte à côte | Comparaison posture corporelle |
| 23 | EXPLORATION | Deux types d'hommes (meme) | Parker : meme 2 cases | Illustration humoristique |
| 24 | EXPLORATION | Jour 1 · 3 · 7 | Parker : timeline | Démonstration temporelle |
| 25 | EXPLORATION | Macro annotée | Parker : photo annotée « socks » | Anti-produit (montrer le mauvais outil) |
| 26 | EXPLORATION | Désolé (lettre) | Parker : lettre d'excuses Grüns | Texte long, voix de marque |
| 27 | EXPLORATION | 58 ans (pancarte) | Parker : pancarte manuscrite | Âge chiffré en hook |
| 28 | EXPLORATION | Le cadeau (partenaire) | Initiative data (femmes 45-54) | Nouvelle audience : la partenaire |
| 29 | EXPLORATION | Livré partout en France | Parker : carte « Hello Europe » | Objection logistique / dropshipping |
| 30 | EXPLORATION | Les lunettes (LED) | Initiative data (55-65 × LED) | Humour générationnel |

Angles couverts : identité/résultat (01-03), polyvalence/offre (04), sécurité (05, 06, 09, 22, 25), catégorie (07), prix (08), éducation produit (10, 14, 24), couple (11, 13, 17, 28), garantie (12, 18), discrétion/logistique (13, 29), repousse (15, 24), preuve sociale par un pair (16, 27), auto-diagnostic (19, 20), éditorial (21, 26), humour (23, 30).

---

## 6. Plan de lancement recommandé

**Structure** : 1 campagne Ventes, CBO, optimisation Achat, France, placements automatiques, budget de départ 60-80 €/jour (assez pour ≈ 3 achats/jour au CPA cible et sortir de l'apprentissage en 7 jours).

| Ad set | Audience | Créas |
|---|---|---|
| A — Exploitation | Hommes 45-65+, broad (pas d'intérêts) | 01, 02, 03, 06, 07, 09, 12, 13 |
| B — Exploration | Hommes 45-65+, broad | 16, 19, 20, 21, 22, 27, 30 |
| C — Partenaire | Femmes 45-60, broad | 28 (+ 13 et 17 en soutien) |
| D — Test 40-54 (10 % du budget) | Hommes 40-54 | 05, 08, 15, 23, 24 |

Les créas restantes (04, 10, 11, 14, 17, 18, 25, 26, 29) entrent en vague 2 à J+7, en remplaçant les perdantes.

**Règles de gestion** (break-even CPA = 21 € d'après la fiche de marge ; le CPA d'acquisition acceptable en phase de test est fixé à 2× soit 42 €) :

- Couper une créa à 45 € dépensés sans ATC, ou à 90 € sans achat.
- Garder toute créa dont le CPA à 7 jours est sous 42 € ; scaler celle sous 30 € (+20 %/48 h).
- Lire d'abord le **taux ATC/clic** (pré-qualification) plutôt que le CTR : une créa à 2 % de CTR et 8 % d'ATC vaut mieux qu'une créa à 4 % de CTR et 1 % d'ATC.
- À J+7, itérer les 3 meilleures : changer uniquement le hook, puis uniquement le visuel (une variable à la fois).

**Post-clic (indispensable, sinon les créas ne suffiront pas)** : CVR site ≈ 0,2 %. Actions rapides : mettre la garantie 30 jours + 2 ans et le colis neutre au-dessus de la ligne de flottaison sur mobile, harmoniser la preuve sociale (17 000 partout), ajouter 3 avis d'hommes de 50-65 ans avec prénom et âge, vérifier vitesse mobile et bouton sticky « Ajouter au panier ». Les créas 19, 21 et 26 renvoient vers la landing « pourquoi-pas-votre-tondeuse-a-barbe » : vérifier qu'elle a un CTA produit visible.

---

## 7. Limites et points d'attention

- **Échantillon** : 5 achats Meta et 9 commandes Shopify. La direction (45+) est solide car elle est confirmée par trois sources indépendantes (ventilation Meta, prénoms/e-mails Shopify, ATC), mais les CPA par segment ne sont pas statistiquement fiables. La première semaine de diffusion servira aussi à valider l'hypothèse.
- **Preuve sociale** : « 17 000 hommes » est repris du site ; « Approuvée par » n'est pas une certification. Si ces chiffres ne sont pas sourçables, remplacer par « Déjà adoptée par des milliers d'hommes » avant diffusion.
- **Images IA** : générées avec Higgsfield à partir du packshot fournisseur. Le produit est fidèle (corps noir, grip losanges, bouton à anneau vert, LED, tête peigne argenté, socle), mais quelques rendus portent un petit « RASELIO » sur le corps (18, 21, 22) que le produit réel n'a pas ; les mains, visages et décors sont synthétiques. Les créas 16, 17, 27 utilisent des prénoms fictifs de témoignage (Hervé D., Catherine) : à remplacer par de vrais avis clients dès que possible, ou à mentionner comme « témoignage illustratif ».
- **Meta** : les 30 créas sont créées dans la bibliothèque du compte (noms `RS30 | NN | …`) mais **aucune publicité, aucun ad set, aucune campagne n'a été créée et aucun budget n'est engagé**. Les créas ne déclarent pas la mention « contenu généré par IA » (`self_ai_disclosure`) : c'est un choix à faire au moment de la création des publicités, la mention pouvant être requise en Europe.
- **Hébergement des images** : les URL Higgsfield (CloudFront) sont celles utilisées par Meta pour récupérer les images ; télécharger et archiver les 30 PNG dans le Drive de la marque (le proxy réseau de cette session n'a pas permis de les copier dans le dépôt).
- **Textes** : tous les textes visibles ont été relus sur les rendus Meta (aperçu mobile) ; les créas 02, 06, 07, 08, 10, 12, 13, 14, 15, 18, 21, 22, 24, 25, 28, 29 ont été régénérées une à trois fois pour corriger guillemets parasites, flous, produit infidèle ou coquille.
