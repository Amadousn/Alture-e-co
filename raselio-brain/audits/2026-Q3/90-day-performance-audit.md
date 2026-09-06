---
brand: raselio
doc: 90-day-performance-audit
quarter: 2026-Q3
generated_on: 2026-09-06
refresh_by: 2026-12-05
date_range: 2026-06-08 to 2026-09-06
effective_window: 2026-08-10 to 2026-09-06, soit 28 jours de diffusion sur les 90 jours de la fenêtre, dont 8 jours à zéro euro du 17 au 24 août
data_sources_read: [live ads manager via source-pulls/meta-account-campaigns-adsets.md (5 campagnes, 16 ad sets, réglages de ciblage et d'emplacement), source-pulls/meta-ads-all.md (183 annonces niveau ad), source-pulls/meta-account-breakdowns.md (ventilations âge x genre, plateforme x emplacement, série quotidienne au niveau compte), source-pulls/meta-performance-trend.md, source-pulls/shopify-analytics.md (8 requêtes ShopifyQL, ventes et sessions sur 60 jours, référents, appareils, pays, pages d'entrée sur 90 jours), source-pulls/shopify-orders-and-customers.md (11 commandes, 14 fiches clients), sub-context-docs/operations-and-team.md (économie unitaire connue, setup d'achat média), sub-context-docs/marketing-calendar-and-campaigns.md (calendrier des événements du trimestre), running-notes/brand-rules.md, running-notes/success-definition.md]
prior_quarter_baseline: none
methods_loaded: [ad-account-analysis.md, ad-metrics-glossary.md, killer-performance-ads.md, andromeda-v2.md, creative-strategy-by-brand-size.md]
data_limitations: [Aucun audit du trimestre précédent, donc aucune trajectoire trimestrielle. C'est le point zéro. La marque a 46 jours d'existence, 28 jours de diffusion et 12 jours de ventes ; toute lecture de mouvement porte sur des jours. Les ventilations par âge, genre et emplacement sont au niveau COMPTE et incluent la marque soeur Trael, 116,37 € sur 850,79 €, soit environ 15 % ; l'API n'accepte pas de filtre de campagne au niveau ad_account, donc aucun pourcentage démographique ou d'emplacement de ce document n'est propre à Raselio seule. Les ventilations device_platform et country n'ont pas été tirées avant l'interruption de la session de pull ; à compléter au prochain refresh. ads_insights_anomaly_signal et ads_get_opportunity_score n'ont pas été tirés non plus. Taux d'accroche et taux de rétention n'existent pas : les 163 annonces Raselio sont des images fixes, ces deux métriques sont des métriques vidéo. Deux totaux de dépense Raselio coexistent, 684,82 € en somme de campagnes et 677,81 € en somme d'annonces, écart de 7,01 € non expliqué par les sources ; les deux sont portés. La colonne clics de la ventilation démographique totalise 1 795 clics quand les lignes d'annonces en totalisent 1 236 pour le compte entier : les deux colonnes ne mesurent probablement pas la même chose, clics totaux contre clics sur lien, et aucun CTR croisé entre les deux tables n'est fiable. Le fichier meta-account-campaigns-adsets.md titre « Ad sets (14) » mais son tableau contient 16 lignes, dont 3 pour Trael ; le décompte retenu ici est celui des lignes, soit 13 ad sets Raselio. L'économie unitaire est stated par la feuille de l'équipe et incomplète : coût produit 11,41 € par unité, aucun coût de port réel, aucun frais de paiement, aucun coût de structure. La marge de 23,58 € est donc une marge avant frais.]
---

# 90-day performance and delivery audit — Raselio — 2026-Q3

## Executive summary

Le compte publicitaire de Raselio a 28 jours de vie réelle et il a déjà pris une décision que personne ne lui a demandé de prendre : il a choisi l'homme de plus de 45 ans. Verified sur la ventilation au niveau compte, marque soeur Trael incluse : 697,52 € des 850,79 € dépensés sont allés aux tranches 45-54, 55-64 et 65+, soit 82,0 % du budget, et les six achats attribués du compte viennent tous d'hommes de 45 ans et plus. Aucun ciblage ne le demandait. Tous les ad sets Raselio de la campagne active sont réglés en 18-65, genres « tous », avec l'audience Advantage+ activée qui relâche encore l'âge et le genre, verified. Les noms des ad sets disent même « HOMMES 18-55 ». L'enchère a donc trouvé un acheteur que le paramétrage ne visait pas, et c'est le fait le plus important de ce document.

Le deuxième fait est un gaspillage mesurable et corrigible. Sur les 171 575 impressions du compte, 115 901 sont parties dans Audience Network, soit 67,6 %, pour 46,85 € et zéro achat attribué, verified. Ces impressions ont été achetées à 0,40 € de CPM contre 14,44 € pour le reste du compte. La première semaine de diffusion, du 10 au 16 août, a consommé 105,69 € pour 130 829 impressions avec des CTR de 0,27 à 0,62 %, la signature d'un compte qui déverse dans cet inventaire, et elle n'a produit aucune vente. Le compte apprend donc depuis un mois sur un signal qui a été pollué pendant sa première semaine.

Le troisième fait est un écart de mesure qu'il faut connaître avant de lire n'importe quel ROAS. Meta attribue 6 achats en fenêtre par défaut, 7 jours après clic et 1 jour après vue. Shopify compte 11 commandes sur la même période, dont 8 attribuées à Facebook et 2 à Instagram par son propre référent de commande, verified. Cinq commandes sur onze ne sont vues par personne dans le compte publicitaire. À ce volume ce n'est pas une preuve de sous-attribution, mais toute lecture faite dans Meta seule est basse d'environ un tiers, et le vrai chiffre d'affaires de la période est celui de Shopify : 377,32 € brut sur 11 commandes, toutes facturées en France.

Le mouvement d'emplacement le plus net de la période n'a rien d'un choix créatif, c'est une bascule de régime. Verified sur la série quotidienne : jusqu'au 16 août le compte achète des impressions à 0,22 à 0,63 € de CPM avec des CTR sous 0,7 % ; après huit jours d'extinction totale du 17 au 24 août, il redémarre le 25 août à 13 à 23 € de CPM avec des CTR de 1,65 à 3,73 %, et les six achats arrivent tous dans cette seconde fenêtre, entre le 26 août et le 4 septembre. Le fil Facebook porte aujourd'hui 481,54 € et 4 des 6 achats.

Une métrique de base sort clairement de la zone saine, et une autre n'existe pas. La fréquence de la campagne active est de 2,34, soit 32 430 impressions pour 13 869 personnes touchées, verified, contre un repère de méthode de 1,2 ou moins en prospection. Pour un compte de quatre semaines, sans aucune exclusion d'acheteurs paramétrée, c'est haut, et ça veut dire que la marque repasse déjà devant les mêmes yeux. Et la métrique qui devrait décider de tout, le coût par achat, est à 114,14 € sur la dépense Raselio totale, ou 94,16 € sur la campagne active seule, contre un seuil de rentabilité que l'équipe a calculé elle-même à environ 21 €. Le compte paie aujourd'hui son acheteur entre quatre et cinq fois trop cher.

## Totals

Fenêtre : toute la vie du compte, du 2026-08-10 au 2026-09-06 à 08:00 UTC. Deux périmètres coexistent et il faut les garder séparés, parce que la marque soeur Trael partage le même compte publicitaire et que ses lignes ne doivent jamais entrer dans un total Raselio.

**Périmètre Raselio, 4 campagnes, verified.**

- Dépense totale : **684,82 €** en somme des 4 lignes de campagnes, ou 677,81 € en somme des 163 lignes d'annonces. L'écart de 7,01 € n'est pas expliqué par les sources.
- Annonces créées : **163**, réparties en **13 ad sets** et **4 campagnes**, dont une seule ACTIVE.
- Impressions : **44 672** en somme de campagnes, 43 270 en somme d'annonces.
- Clics sur lien : **1 100** en somme de campagnes, 1 084 en somme d'annonces.
- Achats attribués par le pixel Meta, événement `offsite_conversion.fb_pixel_purchase`, fenêtre par défaut : **6**.
- Coût par achat : **114,14 €** sur la dépense Raselio totale, **94,16 €** sur la campagne active seule.
- ROAS Meta : **0,307** sur la dépense Raselio totale, **0,372** sur la campagne active seule.
- Budget quotidien engagé aujourd'hui : **50 €/jour**, sur la seule campagne active.

**Périmètre compte entier, Trael inclus, verified. C'est le seul périmètre disponible pour les ventilations.**

- Dépense : **850,79 €**, dont environ 116,37 € de Trael, soit 13,7 %.
- Impressions : **171 575**.
- Achats attribués : **6**, tous sur Raselio.

**Côté boutique, Shopify, verified.**

- Commandes : **11**, toutes payées, toutes facturées en France, toutes à un seul article.
- Chiffre d'affaires brut : **377,32 €**. Panier moyen 34,99 €, sauf la première commande à 39,90 €.
- Sessions : **2 431** sur 60 jours, dont 1 300 en direct, 923 depuis Facebook, 181 depuis Instagram, 24 depuis Google.
- Commandes par référent : 8 Facebook, 2 Instagram, 1 sans référent.
- Nouveaux clients : **11**. Clients récurrents : **0**.
- Rendement média global, chiffre d'affaires Shopify divisé par la dépense Raselio : **0,55**.

**Taux d'accroche et taux de rétention : sans objet.** Les 163 annonces Raselio sont des images fixes. Ces deux métriques sont des métriques vidéo et n'existent nulle part dans ce compte.

## Age group breakdown by spend

La ventilation par âge est au niveau compte et inclut donc Trael. Sur 850,79 € et 171 575 impressions, la répartition est la suivante, verified : les 18-24 reçoivent 20,35 €, soit 2,4 % ; les 25-34 reçoivent 53,12 €, soit 6,2 % ; les 35-44 reçoivent 79,80 €, soit 9,4 % ; les 45-54 reçoivent 156,72 €, soit 18,4 % ; les 55-64 reçoivent 272,99 €, soit 32,1 % ; les 65 ans et plus reçoivent 267,81 €, soit 31,5 %. En regroupant, les moins de 45 ans reçoivent 153,27 €, soit 18,0 %, et les 45 ans et plus reçoivent 697,52 €, soit 82,0 %. Les six achats attribués se répartissent en quatre chez les hommes de 55-64, un chez les hommes de 45-54 et un chez les hommes de 65 et plus. Zéro achat sous 45 ans, sur 153,27 € dépensés.

Ce qui rend cette concentration remarquable, c'est que personne ne l'a demandée. Verified sur les réglages : tous les ad sets Raselio de la campagne active sont en âge 18-65, genres « tous », pays France, avec `advantage_audience 1`, c'est à dire l'audience Advantage+ activée qui autorise Meta à sortir de l'âge et du genre saisis. Le seul ad set du compte qui verrouille son ciblage est le plus ancien, celui du 14 août, en hommes 18-55 uniquement. Le déplacement du budget vers les hommes de plus de 55 ans est donc une décision de l'enchère, pas une décision de l'annonceur. Lue à travers la méthode de lecture de compte, c'est le comportement normal du système : il déplace le budget vers l'endroit où il prédit le coût par résultat le plus bas, et il l'a fait ici avec une conviction inhabituelle pour un compte aussi jeune.

L'équipe a lu la même chose avant moi et en a tiré la bonne conclusion, mais avec un chiffre différent, et l'écart mérite d'être posé. Le brief du 3 septembre écrit, stated : « Les 18-44 consomment ≈ 32 % du budget pour zéro intention d'achat. » Ma lecture au niveau compte donne 18,0 % pour la même idée. Les deux ne portent pas sur le même périmètre : l'équipe lit la campagne principale, je lis le compte entier avec Trael dedans, et la première semaine de diffusion en Audience Network, qui a arrosé large, est incluse chez moi. Les deux chiffres disent la même chose dans deux tailles différentes : entre un euro sur six et un euro sur trois paie aujourd'hui des gens qui n'achètent jamais. Sur un budget de 50 € par jour, c'est entre 8 € et 16 € par jour récupérables.

Il y a un désaccord plus intéressant, et il n'a pas été relevé jusqu'ici. Le brief du 3 septembre affirme, stated, que « plus l'homme est jeune, plus il clique », avec des CTR de 3,3 à 3,6 % chez les 18-34 contre 2,2 % chez les 65 et plus. La ventilation au niveau compte dit exactement l'inverse : chez les hommes, le CTR est de 1,60 % en 18-24, 0,98 % en 25-34, 1,04 % en 35-44, 1,03 % en 45-54, 1,98 % en 55-64 et 2,23 % en 65 et plus, verified. Dans cette table, le meilleur cliqueur est le plus vieux. La différence tient probablement au périmètre et à la nature de la colonne clics, qui ne mesure pas la même chose dans les deux tables, et il faut donc la traiter comme une tension de mesure et non comme un retournement de lecture. Mais elle a une conséquence pratique immédiate : la justification « les jeunes cliquent mais n'achètent pas » ne tient pas dans le compte entier, et la vraie raison d'exclure les moins de 45 ans est plus simple et plus solide, ils n'achètent pas du tout.

Enfin, une note de calendrier, parce que chaque mouvement de dépense a soit un événement derrière lui, soit une dérive. Ici, il n'y a pas d'événement : aucun lancement, aucune promotion, aucun changement de ciblage n'est venu pousser le budget vers les 55-64. Le seul événement daté qui pourrait expliquer une bascule est la mise en pause de la campagne de test du 14 août, la seule qui verrouillait 18-55, et le démarrage de la campagne V2 le 25 août avec Advantage+ activé. Inferred, confidence mixed : c'est en ouvrant l'âge que le compte a trouvé son acheteur.

## Gender breakdown by spend

Sur les 850,79 € du compte, les hommes reçoivent 702,78 €, soit 82,6 %, les femmes 137,90 €, soit 16,2 %, et le genre non déterminé 10,11 €, soit 1,2 %, verified. Les six achats attribués sont tous chez des hommes. Zéro achat chez les femmes, sur 137,90 €.

La répartition est intentionnelle dans un seul ad set et subie partout ailleurs. Verified : l'ad set du 14 août est le seul réglé en « hommes uniquement » ; les douze autres ad sets Raselio sont en genres « tous » avec Advantage+ activé. Meta a donc le droit de livrer aux femmes et il le fait, à hauteur d'un euro sur six. Le détail par tranche est parlant : la ligne la plus lourde côté femmes est celle des 65 ans et plus, 57,95 € pour 39 075 impressions, soit un CPM de 1,48 € et un CTR de 0,60 %. C'est la plus grosse ligne d'impressions de tout le compte, et son CPM ridicule dit d'où elle vient : ce sont des impressions d'Audience Network, pas des impressions de fil. Le compte n'a donc pas vraiment payé pour parler à des femmes de 65 ans, il a payé pour de l'inventaire bon marché qui se trouve peuplé de ce profil.

Il faut résister ici à la lecture réflexe qui dirait que cette dérive est un échec de ciblage. La méthode de lecture de compte prévient contre ça : parfois l'enchère rééquilibre parce que la créative marche mieux sur un public que celui que la marque visait, et c'est une trouvaille, pas un problème. Le test est simple : est-ce que ce public achète ? Ici, non. Zéro achat sur 137,90 €. Ce n'est donc ni une trouvaille ni un accident créatif, c'est de l'inventaire résiduel.

Sauf sur un point, et il est important parce qu'il est la seule contradiction utile de cette section. L'équipe a compté sur son propre tableau de bord, stated dans le brief du 3 septembre, trois ajouts au panier et un paiement initié par des femmes de 45 à 54 ans, sur dix-sept ajouts au panier au total, sans un euro de budget dédié à cette audience. La ligne femmes 45-54 du compte porte 28,45 € et un CTR de 0,41 %. Donc, dans le même document : zéro achat attribué chez les femmes, et le signal d'intention le plus dense par euro dépensé du compte chez les femmes de 45 à 54 ans. Trois ajouts au panier ne prouvent rien. Mais la marque a déjà écrit une créative pour cette personne, `Le cadeau qu'il ne s'offrira jamais`, et verified, elle n'a jamais été mise en ligne comme annonce. C'est le seul endroit du compte où de l'argent est allé vers un public sans qu'aucune créative n'ait été écrite pour lui.

## Placement breakdown

Sur les 850,79 € du compte, la répartition par emplacement est la suivante, verified. Le fil Facebook reçoit 481,54 €, soit 56,6 %, pour 26 143 impressions, un CTR de 3,46 %, un CPM de 18,42 € et **4 des 6 achats**. Le fil Instagram reçoit 146,38 €, soit 17,2 %, pour 6 490 impressions, un CTR de 1,62 %, un CPM de 22,55 € et **1 achat**. Facebook Reels reçoit 68,73 €, soit 8,1 %, à 10,03 € de CPM, sans achat. Instagram Reels reçoit 49,86 €, soit 5,9 %, à 7,84 € de CPM, sans achat. Audience Network en version classique reçoit 42,42 €, soit 5,0 %, pour **113 415 impressions** et un CPM de 0,37 €, sans achat. Les Stories Instagram reçoivent 30,85 €, soit 3,6 %, et portent **1 achat**. Les Stories Facebook reçoivent 10,42 €, soit 1,2 %, à 39,16 € de CPM, le plus cher du compte. Le reste, colonne de droite, profile feed, instream, reels overlay, search, marketplace, explore, threads, messenger, tient dans 15,60 € au total. En regroupant : les fils portent 627,92 € soit 73,8 %, les Reels 118,59 € soit 13,9 %, Audience Network 46,85 € soit 5,5 %, les Stories 41,27 € soit 4,9 %.

Le premier point d'analyse est un décalage de format criant, et il va dans le sens inverse de celui qu'on voit d'habitude. La plupart des comptes ont un problème de créative verticale livrée en fil ; Raselio a le problème miroir. Toutes ses créatives sont des images fixes en 4:5, un format taillé pour le fil, verified sur les règles de production de l'équipe qui imposent « 4:5 » et « 2K, 1856 × 2304 » dans chaque prompt. Et 19,8 % de la dépense, soit 168,44 €, part dans des emplacements verticaux ou plein écran, Reels et Stories, où une image 4:5 est recadrée, entourée de bandes, et se bat contre de la vidéo en mouvement. Le compte paie donc un cinquième de son budget pour montrer un format d'affiche dans un environnement de film. Que le fil porte 5 des 6 achats n'est donc pas une surprise : c'est le seul endroit où la créative est chez elle.

Le deuxième point est Audience Network, et il est de loin le plus gros levier mécanique disponible sur ce compte. Cet emplacement absorbe 115 901 impressions en cumulant les deux formats, soit 67,6 % de toutes les impressions du compte, pour 46,85 €, soit 5,5 % de la dépense, et zéro achat. Lu à travers la méthode de lecture de compte, c'est le cas d'école du signal de fréquence trompeur : le CPM du compte tombe à 4,96 € quand on inclut cet inventaire et remonte à 14,44 € quand on l'exclut, ce qui donne l'illusion d'une portée bon marché. Mais le coût pour mille comptes uniques atteints raconte l'histoire vraie, et l'histoire vraie est que ces impressions n'ont produit ni panier ni achat en 28 jours. Le lien avec le calendrier est direct et daté : la première fenêtre de diffusion du compte, du 10 au 16 août, a consommé 105,69 € presque entièrement dans ce régime, à des CPM de 0,22 à 0,63 €, avant l'extinction de huit jours. C'est un tiers de la vie publicitaire de la marque passé à acheter de l'attention qui n'existait pas.

Le troisième point est la trajectoire, et elle est nette même sur 28 jours. Il n'y a pas eu de glissement progressif entre emplacements, il y a eu deux régimes séparés par un trou. Régime un, du 10 au 16 août : CPM sous 0,63 €, CTR sous 0,62 %, aucun achat, signature Audience Network. Trou du 17 au 24 août : zéro euro, aucune explication dans les sources. Régime deux, depuis le 25 août : CPM de 13,52 à 23,18 €, CTR de 1,65 à 3,73 %, signature du fil Facebook, et les six achats arrivent tous là, aux dates du 26, 27 et 30 août puis du 1er, 3 et 4 septembre. La marque n'a donc que douze jours de diffusion comparable derrière elle, et sa fenêtre d'apprentissage a été coupée en deux au milieu.

## Baseline account metrics, last 90 days

Voici l'état de santé de base, avec pour chaque chiffre le repère de méthode contre lequel il se lit. Aucun mouvement contre un trimestre précédent n'est disponible : c'est le point zéro du compte.

**Le CTR est le seul indicateur franchement sain.** La campagne active affiche 2,73 % de CTR sur lien, l'ensemble Raselio 2,46 %, verified, contre un repère de méthode d'environ 1 % et plus. Le compte n'a pas de problème d'attention. Le CPC suit, 0,62 € en moyenne Raselio et 0,64 € sur la campagne active, ce qui est correct pour la France sur une catégorie grand public. Cette santé est réelle mais elle est aussi le piège du compte : c'est le seul chiffre qui va bien, et c'est celui que la production créative optimise depuis neuf lots.

**Le CPM se lit à deux étages et il faut toujours dire lequel.** Au niveau du compte entier, il est de 4,96 €, ce qui paraît excellent et ne veut rien dire, parce qu'il est écrasé par les 115 901 impressions d'Audience Network. Hors Audience Network, il est de 14,44 €, verified par calcul sur les lignes d'emplacement. Au niveau des campagnes Raselio, il est de 15,33 €, et de 17,42 € sur la campagne active. C'est un CPM de fil Facebook français normal, et sa hausse depuis le 25 août, de 13,52 € le premier jour à 23,18 € le 29 août puis autour de 15 à 21 € depuis, est le mouvement à surveiller. La méthode dit de signaler quand le CPM monte, parce que ça veut dire qu'il devient plus cher d'atteindre des comptes nouveaux.

**La fréquence est déjà hors de la zone saine.** La campagne active a servi 32 430 impressions à 13 869 personnes, soit une fréquence de 2,34, verified, contre un repère de 1,2 ou moins en prospection. Pour un compte de quatre semaines, sur une audience France entière, c'est haut. Deux raisons se cumulent : le budget de 50 € par jour est réparti entre onze ad sets dans un budget de campagne unique, ce qui laisse quelques euros par lot et ne permet à aucun de sortir de son petit bassin ; et aucune exclusion d'acheteurs n'apparaît dans le paramétrage, verified par absence dans les réglages tirés. À 11 clients, l'exclusion ne changerait presque rien aujourd'hui, mais l'absence de dispositif est à corriger avant qu'elle ne compte.

**Le coût par achat est le chiffre qui décide, et il est très loin.** 114,14 € sur la dépense Raselio totale, 94,16 € sur la campagne active. Le seuil de rentabilité, calculé par l'équipe elle-même sur sa feuille de marge, stated, est d'environ 21 €, et le plafond qu'elle s'est fixée en phase de test est de 42 €. Le compte est donc entre deux fois et cinq fois trop cher selon la référence retenue. Vu autrement, en rapportant la dépense aux commandes réelles plutôt qu'aux achats attribués, 684,82 € pour 11 commandes donne 62,26 € par commande, ce qui est meilleur et reste au-dessus du plafond de test. La contribution de la période, inferred à partir du coût produit de 11,41 € par unité stated par l'équipe : 377,32 € de chiffre d'affaires brut moins 125,51 € de coût produit donne 251,81 € de marge brute, moins 684,82 € de dépense publicitaire donne **−433,01 €**, avant frais de port réels et frais de paiement qui ne sont documentés nulle part.

**Le ROAS et le rendement média global divergent, et c'est instructif.** Le ROAS Meta est de 0,372 sur la campagne active, 0,307 sur l'ensemble Raselio. Le rendement média global, chiffre d'affaires Shopify divisé par dépense Raselio, est de 0,55. L'écart vient des cinq commandes que Meta ne voit pas. Aucune des deux valeurs n'est proche de 1, et il faut être précis sur ce que 1 signifie ici : à 34,99 € de prix pour 11,41 € de coût produit, un ROAS de 1,0 est déjà une perte franche, parce qu'il faut environ 1,48 de ROAS pour couvrir le seul coût du produit et bien plus pour couvrir le port offert et les frais.

**Le vrai frein est en aval et il est chiffré.** Verified sur Shopify : 2 431 sessions en 60 jours pour 11 commandes, soit 0,45 % de conversion sur l'ensemble de la période, et un taux journalier qui ne dépasse 1,89 % qu'une seule fois. Sur les douze derniers jours du pull, 31 sessions ont ajouté au panier et 3 seulement ont terminé le paiement. Un site e-commerce sain sur une fiche produit unique tourne entre 1 et 2 %. L'équipe l'écrit elle-même, stated : « Le vrai problème est post-clic : CTR 3 % mais CVR site ≈ 0,2 % et CPA 86 € pour un break-even à 21 €. » Un détail de trafic mérite d'être posé à côté : sur les 2 404 sessions ventilées par appareil et pays, 989 viennent d'un ordinateur de bureau aux États-Unis alors que les 11 commandes sont toutes facturées en France, verified. Une part non négligeable des sessions comptées au dénominateur n'est donc probablement pas du public visé, ce qui veut dire que le taux de conversion réel du trafic français payant est meilleur que 0,45 % sans que personne ne sache de combien.

**La phase d'apprentissage n'a jamais commencé.** Le repère de méthode est de 50 événements de conversion par semaine et par ad set. Le compte a 6 achats sur toute sa vie, répartis sur 13 ad sets Raselio. Aucun ad set n'a jamais approché la sortie d'apprentissage, et la théorie de diversité créative de Meta ajoute une couche à ce problème : avec 163 créas visuellement très proches, le système regroupe probablement ces annonces sous un nombre d'entités bien inférieur, ce qui concentre encore l'apprentissage au lieu de l'élargir. Ce qu'il faut surveiller au prochain passage, dans l'ordre : le coût par achat contre le plafond de 42 €, la fréquence contre 1,2, la part d'Audience Network dans les impressions, et le taux de conversion du site sur le seul trafic français.

**Docs de méthode chargés et signés.** This is everything I know about Andromeda v2. This is everything I know about tailoring creative strategy to brand size.

## Open loops

**Boucle 1 — L'enchère a choisi un acheteur que personne ne visait.**

Observation. Tous les ad sets Raselio de la campagne active sont réglés en 18-65, genres « tous », avec l'audience Advantage+ qui relâche encore l'âge et le genre, et leurs noms disent « HOMMES 18-55 ». Pourtant 82,0 % de la dépense du compte est allée aux 45 ans et plus, et les six achats attribués viennent tous d'hommes de cette zone.

Le pull : **Surprise.** Elle a tiré parce que le compte a produit un résultat démographique très net alors que rien dans son paramétrage ne l'orientait, et sur seulement 28 jours.

La question : qu'est-ce que Meta reconnaît dans ces images qui l'amène chez des hommes de plus de cinquante-cinq ans ?

Justification. Si la réponse tient à la créative, montrer un homme de cet âge ou parler d'ordre personnel, alors la marque possède déjà son levier et doit le pousser. Si la réponse tient à la catégorie ou au bassin d'inventaire disponible en France, alors changer la créative ne changera rien et il faut chercher ailleurs. Les deux réponses envoient le budget dans des directions opposées.

Territoire : Personas.

**Boucle 2 — Le 65 ans et plus reçoit un quart du budget et achète le moins bien.**

Observation. La tranche des hommes de 65 ans et plus a reçu 204,34 €, soit 24,0 % de la dépense du compte, avec le meilleur CTR masculin, 2,23 %, et le CPM le plus bas des tranches acheteuses, 8,00 €. Elle porte un seul achat, pour un ROAS de 0,171, le plus faible des trois tranches qui ont acheté. Juste à côté, les 55-64 portent quatre achats avec un ROAS de 0,594. Le plan de l'équipe recommande de cibler « hommes 45-65+ », stated, sans distinguer les deux.

Le pull : **Tension.** Elle a tiré parce que deux tranches voisines, servies par les mêmes créatives la même semaine, se comportent très différemment à l'achat alors que le clic ne les distingue pas.

La question : qu'est-ce qui change dans la façon d'acheter ce produit entre un homme de cinquante-huit ans et un homme de soixante-dix ?

Justification. Si la différence est un frein de paiement ou de confiance en ligne, elle se traite sur le site et pas dans la publicité. Si elle est un frein d'usage ou de pertinence du produit, elle change le message. Sur un budget de 50 € par jour, un quart de la dépense dépend de cette réponse.

Territoire : Personas.

**Boucle 3 — Cinq commandes sur onze ne sont vues par personne.**

Observation. Meta attribue 6 achats en fenêtre par défaut. Shopify compte 11 commandes sur la même période, dont 8 marquées Facebook et 2 Instagram par son propre référent de commande, et une sans référent. Cinq commandes réelles n'apparaissent donc dans aucun rapport publicitaire, et il n'existe aucun outil d'attribution tiers, aucun e-mail, aucun SMS, aucun compte organique identifié.

Le pull : **Tension.** Elle a tiré parce que deux sources qui devraient à peu près se recouper divergent de près d'un tiers, et que la source la plus optimiste est celle qui n'est pas payée pour l'être.

La question : par quel chemin les cinq commandes que Meta ne voit pas sont-elles arrivées jusqu'au paiement ?

Justification. Si ces cinq commandes viennent d'un clic publicitaire mal attribué, le vrai coût par achat de la marque est proche de 62 € et non de 114 €, ce qui change complètement le jugement porté sur le compte. Si elles viennent d'ailleurs, bouche à oreille, recherche directe, retour spontané, alors la marque a une source de demande qu'elle ne connaît pas et n'alimente pas.

Territoire : Produit.

## Appendix - Parker media links

Aucun lien Parker n'est disponible pour cette marque : il n'existe pas de brand_id Parker pour Raselio et `search_chat_history` a renvoyé 0 fil le 2026-09-06. Les entrées ci-dessous sont les artefacts sources réellement utilisés dans cet audit, chemins préservés tels quels.

| ID | Source | Lien ou chemin d'origine | Où c'est discuté |
|---|---|---|---|
| M001 | Compte Meta, campagnes, ad sets, réglages de ciblage et d'emplacements | `source-pulls/meta-account-campaigns-adsets.md` | Totaux, âge, genre, emplacements |
| M002 | Compte Meta, ventilations âge x genre et plateforme x emplacement, série quotidienne | `source-pulls/meta-account-breakdowns.md` | Sections 3, 4, 5 |
| M003 | Compte Meta, 183 annonces niveau ad | `source-pulls/meta-ads-all.md` | Totaux, section 6 |
| M004 | Compte Meta, tendances de performance niveau annonce | `source-pulls/meta-performance-trend.md` | Section 6 |
| M005 | Shopify analytics, 8 requêtes ShopifyQL sur 60 et 90 jours | `source-pulls/shopify-analytics.md` | Totaux, sections 5, 6 |
| M006 | Shopify, 11 commandes et 14 fiches clients | `source-pulls/shopify-orders-and-customers.md` | Totaux, section 6, boucle 3 |
| M007 | Économie unitaire, setup d'achat média, budget et propriété | `sub-context-docs/operations-and-team.md` | Section 6 |
| M008 | Calendrier des campagnes et des événements du trimestre | `sub-context-docs/marketing-calendar-and-campaigns.md` | Sections 3, 5 |
| M009 | Brief interne « 30 créas Meta » du 3 septembre 2026, lectures de l'équipe | `source-pulls/drive-30-statiques-meta-plan-2026-09-03.md` | Sections 3, 4, 6 |
| M010 | Règles de marque et définition du succès reconstruites au build | `running-notes/brand-rules.md`, `running-notes/success-definition.md` | Section 6 |
