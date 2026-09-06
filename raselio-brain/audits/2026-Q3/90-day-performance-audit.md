---
brand: raselio
doc: 90-day-performance-audit
quarter: 2026-Q3
generated_on: 2026-09-06
refresh_by: 2026-12-05
date_range: 2026-06-08 to 2026-09-06
effective_window: 2026-08-10 to 2026-09-06, soit 28 jours de diffusion sur les 90 jours de la fenêtre, dont 8 jours à zéro euro du 17 au 24 août
parker_brand_id: a81e7c77-ca41-4cbd-acf8-ec27ea58eb37
attribution_source: Meta en plateforme uniquement — check_northbeam_connection renvoie connected false le 2026-09-06, aucun outil d'attribution tiers n'est branché
data_sources_read: [Parker MCP search_facebook_ads_sql (173 annonces, métriques à vie, entonnoir clics sur lien, vues de page, ajouts au panier, paiements initiés, achats, ventilations âge, genre, appareil, plateforme), Parker MCP check_northbeam_connection, Parker MCP get_brand_persona, Parker MCP search_facebook_ad_comments_sql, Parker MCP search_chat_history listThreads, source-pulls/meta-account-campaigns-adsets.md, source-pulls/meta-ads-all.md, source-pulls/meta-account-breakdowns.md, source-pulls/meta-performance-trend.md, source-pulls/shopify-analytics.md, source-pulls/shopify-orders-and-customers.md, sub-context-docs/operations-and-team.md, sub-context-docs/marketing-calendar-and-campaigns.md, running-notes/brand-rules.md, running-notes/success-definition.md]
prior_quarter_baseline: none
methods_loaded: [ad-account-analysis.md, ad-metrics-glossary.md, killer-performance-ads.md, andromeda-v2.md, creative-strategy-by-brand-size.md]
data_limitations: [Aucun audit du trimestre précédent, donc aucune trajectoire trimestrielle. C'est le point zéro : 46 jours d'existence, 28 jours de diffusion, 12 jours de ventes. Deux copies du compte coexistent et ne se recoupent pas exactement. Le pull direct de l'API Meta du 2026-09-06 08:00 UTC renvoie 183 annonces et 850,79 € de dépense compte, dont 163 annonces et 684,82 € pour Raselio. Parker MCP renvoie 173 annonces et 771,64 € à vie sur le même compte. L'écart, 10 annonces et 79,15 €, n'est pas expliqué par les sources et vient probablement d'une synchronisation partielle des créas les plus récentes. Les deux jeux sont portés côte à côte et jamais additionnés ; chaque chiffre nomme sa source. Les ventilations des deux sources incluent la marque soeur Trael, environ 116,37 € sur 850,79 € côté Meta, donc aucun pourcentage démographique ou d'emplacement de ce document n'est propre à Raselio seule ; ni l'API Meta au niveau ad_account ni Parker n'acceptent de filtre de campagne sur une ventilation. Les deux sources divergent sensiblement sur la plateforme : Meta attribue 46,85 € à Audience Network, Parker 8,32 €. Divergence non réconciliée, les deux valeurs sont données. ads_insights_anomaly_signal et ads_get_opportunity_score n'ont pas été tirés. L'économie unitaire reste stated et incomplète : coût produit 11,41 € par unité sur une feuille de l'équipe et 12,71 € sur une autre, aucun coût de port réel, aucun frais de paiement, aucun coût de structure. Taux d'accroche et taux de rétention n'existent pas : Parker classe les 173 annonces en type static, aucune vidéo.]
---

# 90-day performance and delivery audit — Raselio — 2026-Q3

## Executive summary

Le compte publicitaire de Raselio a 28 jours de vie réelle et il a déjà pris une décision que personne ne lui a demandé de prendre : il a choisi l'homme de plus de 45 ans. Les deux sources le disent avec des chiffres légèrement différents et la même force. Côté API Meta, 697,52 € des 850,79 € de dépense compte vont aux tranches 45-54, 55-64 et 65+, soit 82,0 %. Côté Parker, la même somme représente 83,0 % des 771,64 € qu'il voit. Et les six achats attribués du compte viennent tous d'hommes de 45 ans et plus. Aucun ciblage ne le demandait : verified, tous les ad sets Raselio de la campagne active sont réglés en 18-65, genres « tous », avec l'audience Advantage+ qui relâche encore l'âge et le genre, et les noms des ad sets disent « HOMMES 18-55 ». L'enchère a trouvé un acheteur que le paramétrage ne visait pas.

Le deuxième fait est neuf dans ce passage et il change le diagnostic du compte. Parker expose l'entonnoir complet, que l'API brute ne donnait pas : **775 clics sur lien, 597 vues de page de destination, 32 ajouts au panier, 12 paiements initiés, 6 achats.** Autrement dit, 77,0 % des clics arrivent bien sur une page, puis **5,4 % seulement de ces pages vues produisent un ajout au panier**, puis 37,5 % des paniers vont jusqu'à un paiement initié, et 50 % de ces paiements aboutissent. La fuite est nette, unique et située : elle est entre la page vue et le panier. Tout le reste de l'entonnoir se comporte normalement.

Ce que ça coûte se dit en une ligne, et c'est le chiffre le plus dur du document. **Le coût par ajout au panier du compte est de 24,11 €.** La marge unitaire, calculée sur le coût produit de 11,41 € stated par l'équipe, est d'environ 23,58 € avant frais de port et de paiement. Aujourd'hui, faire mettre le produit dans un panier coûte plus cher que ce que rapporte une vente. Le coût par paiement initié est de 64,30 €, et le coût par achat de 114,14 € sur la dépense Raselio, ou 128,61 € sur le périmètre Parker.

Le mouvement d'emplacement le plus net de la période n'a rien d'un choix créatif, c'est une bascule de régime. Verified sur la série quotidienne : jusqu'au 16 août le compte achète des impressions à 0,22 à 0,63 € de CPM avec des CTR sous 0,7 %, la signature d'un déversement dans Audience Network ; après huit jours d'extinction totale du 17 au 24 août, il redémarre le 25 août à 13 à 23 € de CPM avec des CTR de 1,65 à 3,73 %, et les six achats arrivent tous dans cette seconde fenêtre, entre le 26 août et le 4 septembre. Le fil Facebook porte 481,54 € et 4 des 6 achats côté Meta ; Parker donne la même direction avec 545,44 € sur Facebook et 217,82 € sur Instagram.

Deux métriques de base sortent de la zone saine et une question de mesure est désormais réglée. La fréquence de la campagne active est de 2,34, soit 32 430 impressions pour 13 869 personnes touchées, contre un repère de méthode de 1,2 ou moins en prospection. Et le compte n'a jamais approché la sortie d'apprentissage : le repère est de 50 conversions par semaine et par ad set, le compte a 6 achats sur toute sa vie répartis sur 13 ad sets Raselio. Enfin, la question d'attribution est tranchée : `check_northbeam_connection` renvoie connected false le 6 septembre, donc **la lecture en plateforme Meta est bien la seule source d'attribution de cette marque**, ce qui était une supposition et devient un fait vérifié.

## Totals

Fenêtre : toute la vie du compte, du 2026-08-10 au 2026-09-06. Trois périmètres coexistent et il faut les garder séparés : la marque soeur Trael partage le compte publicitaire, et les deux outils qui lisent ce compte ne voient pas exactement le même nombre d'annonces.

**Périmètre Raselio, 4 campagnes, source API Meta, verified.**

- Dépense : **684,82 €** en somme des 4 lignes de campagnes, ou 677,81 € en somme des 163 lignes d'annonces. Écart de 7,01 € non expliqué par les sources.
- Annonces : **163**, en **13 ad sets** et **4 campagnes**, dont une seule ACTIVE.
- Impressions : **44 672**. Clics sur lien : **1 100**.
- Achats attribués, `offsite_conversion.fb_pixel_purchase`, fenêtre par défaut : **6**.
- Coût par achat : **114,14 €** sur la dépense Raselio totale, **94,16 €** sur la campagne active seule.
- ROAS Meta : **0,307** sur l'ensemble Raselio, **0,372** sur la campagne active.
- Budget quotidien engagé : **50 €/jour** sur la seule campagne active.

**Périmètre compte entier vu par Parker, 173 annonces, verified.**

- Dépense à vie : **771,64 €**. Impressions : **47 484**.
- Clics : **1 234**. Clics sur lien : **775**. Vues de page de destination : **597**.
- Ajouts au panier : **32**. Paiements initiés : **12**. Achats : **6**. Valeur d'achat : **209,94 €**.
- CTR 2,60 %. CPM 16,25 €. CPA 128,61 €. ROAS 0,27. Panier moyen 34,99 €.
- Coût par ajout au panier : **24,11 €**. Coût par paiement initié : **64,30 €**.

**Périmètre compte entier vu par l'API Meta, verified.** Dépense 850,79 €, dont environ 116,37 € de Trael. Impressions 171 575. Achats 6, tous sur Raselio.

**Côté boutique, Shopify, verified.**

- Commandes : **11**, toutes payées, toutes facturées en France, toutes à un seul article.
- Chiffre d'affaires brut : **377,32 €**. Panier moyen 34,99 €, sauf la première commande à 39,90 €.
- Sessions : **2 431** sur 60 jours, dont 1 300 en direct, 923 depuis Facebook, 181 depuis Instagram, 24 depuis Google.
- Commandes par référent : 8 Facebook, 2 Instagram, 1 sans référent.
- Nouveaux clients : **11**. Clients récurrents : **0**.
- Rendement média global, chiffre d'affaires Shopify divisé par la dépense Raselio : **0,55**.

**Taux d'accroche et taux de rétention : sans objet.** Parker classe les 173 annonces en type static. Ces deux métriques sont des métriques vidéo et n'existent nulle part dans ce compte.

## Age group breakdown by spend

Les deux sources donnent la même forme avec des valeurs proches. Côté Parker, sur 771,64 € : 18-24 reçoit 17,82 € soit 2,3 %, 25-34 reçoit 47,95 € soit 6,2 %, 35-44 reçoit 70,20 € soit 9,1 %, 45-54 reçoit 138,03 € soit 17,9 %, 55-64 reçoit 257,18 € soit **33,3 %**, et 65 et plus reçoit 240,46 € soit **31,2 %**. Côté API Meta, sur 850,79 €, les mêmes tranches donnent 2,4 %, 6,2 %, 9,4 %, 18,4 %, 32,1 % et 31,5 %. Les six achats se répartissent en quatre chez les hommes de 55-64, un chez les 45-54 et un chez les 65 et plus. Zéro achat sous 45 ans, sur environ 153 € dépensés.

Ce qui rend cette concentration remarquable, c'est que personne ne l'a demandée. Verified sur les réglages : tous les ad sets Raselio de la campagne active sont en âge 18-65, genres « tous », pays France, avec `advantage_audience 1`. Le seul ad set qui verrouille son ciblage est le plus ancien, celui du 14 août, en hommes 18-55. Le déplacement du budget vers les plus de 55 ans est donc une décision de l'enchère. Lue à travers la méthode de lecture de compte, c'est le comportement normal du système, qui déplace le budget là où il prédit le coût par résultat le plus bas, et il l'a fait ici avec une conviction inhabituelle pour un compte aussi jeune.

L'équipe a lu la même chose et en a tiré la bonne conclusion avec un chiffre différent. Le brief du 3 septembre écrit, stated : « Les 18-44 consomment ≈ 32 % du budget pour zéro intention d'achat. » Les deux ventilations disponibles donnent plutôt 17,6 % côté Parker et 18,0 % côté Meta pour les moins de 45 ans. L'équipe lit la campagne principale, je lis le compte entier avec Trael et la première semaine en Audience Network dedans. Les deux chiffres disent la même chose dans deux tailles : entre un euro sur six et un euro sur trois paie des gens qui n'achètent jamais. Sur 50 € par jour, c'est entre 8 € et 16 € par jour récupérables.

Un désaccord plus intéressant subsiste et il est maintenant mieux cadré. Le brief du 3 septembre affirme, stated, que « plus l'homme est jeune, plus il clique », avec des CTR de 3,3 à 3,6 % chez les 18-34. La ventilation au niveau compte dit l'inverse : chez les hommes, le CTR est de 1,60 % en 18-24, 0,98 % en 25-34, 1,04 % en 35-44, 1,03 % en 45-54, 1,98 % en 55-64 et 2,23 % en 65 et plus. Une partie de l'écart est désormais expliquée : Parker montre que le compte enregistre **1 234 clics totaux pour 775 clics sur lien**, donc les deux tables ne comptaient pas la même chose, et un CTR calculé sur les clics totaux d'une ventilation n'est pas comparable à un CTR sur clics de lien. La conséquence pratique tient : la justification « les jeunes cliquent mais n'achètent pas » ne se vérifie pas au niveau compte, et la vraie raison d'exclure les moins de 45 ans est plus simple, ils n'achètent pas du tout.

Une note de calendrier pour finir, parce que chaque mouvement a soit un événement derrière lui, soit une dérive. Ici il n'y a pas d'événement : aucun lancement, aucune promotion, aucun changement de ciblage n'est venu pousser le budget vers les 55-64. Le seul événement daté qui puisse l'expliquer est la mise en pause de la campagne de test du 14 août, la seule qui verrouillait 18-55, et le démarrage de la campagne V2 le 25 août avec Advantage+ activé. Inferred, confidence mixed : c'est en ouvrant l'âge que le compte a trouvé son acheteur.

## Gender breakdown by spend

Côté Parker, sur 771,64 € : les hommes reçoivent 670,86 €, soit **86,9 %**, les femmes 91,80 €, soit **11,9 %**, et le genre non déterminé 8,98 €, soit 1,2 %. Côté API Meta, sur 850,79 €, la répartition est de 82,6 %, 16,2 % et 1,2 %. Les six achats sont tous chez des hommes. Zéro achat chez les femmes.

La répartition est intentionnelle dans un seul ad set et subie partout ailleurs. Verified : l'ad set du 14 août est le seul réglé en « hommes uniquement » ; les douze autres ad sets Raselio sont en genres « tous » avec Advantage+ activé. Meta a donc le droit de livrer aux femmes et il le fait, à hauteur d'un euro sur huit ou sur six selon la source. Le détail par tranche est parlant côté Meta : la ligne la plus lourde côté femmes est celle des 65 ans et plus, 57,95 € pour 39 075 impressions, soit un CPM de 1,48 € et un CTR de 0,60 %. C'est la plus grosse ligne d'impressions du compte, et son CPM dit d'où elle vient : de l'inventaire bon marché, pas du fil.

Il faut résister ici à la lecture réflexe. La méthode prévient que l'enchère rééquilibre parfois parce que la créative marche mieux sur un public que celui que la marque visait, et que c'est une trouvaille, pas un problème. Le test est simple : est-ce que ce public achète ? Ici, non. Ce n'est donc ni une trouvaille ni un accident créatif, c'est de l'inventaire résiduel.

Sauf sur un point, et c'est la seule contradiction utile de cette section. L'équipe a compté sur son propre tableau de bord, stated, trois ajouts au panier et un paiement initié par des femmes de 45 à 54 ans, sur dix-sept ajouts au panier au total, sans un euro de budget dédié. Parker compte aujourd'hui 32 ajouts au panier au niveau compte, ce qui ne recoupe pas le décompte de l'équipe et n'est réconcilié nulle part. Deux choses restent vraies dans les deux comptages : le signal féminin existe, et il est minuscule. Le document de contexte de marque de Parker va plus loin et lui consacre un ICP entier, « Sandrine, 44 ans, la donneuse de cadeau pratique », qui découvre par une publicité Instagram pendant sa pause déjeuner. La marque a déjà écrit une créative pour cette personne, `Le cadeau qu'il ne s'offrira jamais`, et verified, elle n'a jamais été mise en ligne comme annonce. C'est le seul endroit du compte où de l'argent est allé vers un public sans qu'aucune créative ne lui soit adressée.

## Placement breakdown

Les deux sources divergent ici plus qu'ailleurs, et il faut porter les deux. Côté API Meta, sur 850,79 € : le fil Facebook reçoit 481,54 € soit 56,6 % pour un CTR de 3,46 % et **4 des 6 achats** ; le fil Instagram 146,38 € soit 17,2 % et **1 achat** ; Facebook Reels 68,73 € soit 8,1 % ; Instagram Reels 49,86 € soit 5,9 % ; Audience Network classique 42,42 € soit 5,0 % pour **113 415 impressions** à 0,37 € de CPM et zéro achat ; les Stories Instagram 30,85 € soit 3,6 % et **1 achat** ; les Stories Facebook 10,42 € à 39,16 € de CPM, le plus cher du compte ; le reste tient dans 15,60 €. En regroupant : les fils 73,8 %, les Reels 13,9 %, Audience Network 5,5 %, les Stories 4,9 %.

Côté Parker, sur 771,64 €, la répartition par plateforme est plus grossière mais elle raconte une histoire différente sur un point : Facebook 545,44 € soit **70,7 %**, Instagram 217,82 € soit **28,2 %**, Audience Network **8,32 € soit 1,1 %**, Messenger 0 €. L'écart sur Audience Network, 46,85 € côté Meta contre 8,32 € côté Parker, n'est réconcilié par aucune source. Les deux lectures s'accordent sur l'essentiel, Facebook domine et Instagram est le second canal réel, et elles divergent sur l'ampleur du gaspillage en inventaire résiduel. La lecture prudente : Audience Network a coûté entre 8 € et 47 € pour zéro achat, et dans les deux cas il a absorbé une part d'impressions sans commune mesure avec sa part de dépense.

Le premier point d'analyse est un décalage de format criant, et il va dans le sens inverse de celui qu'on voit d'habitude. La plupart des comptes ont un problème de créative verticale livrée en fil ; Raselio a le problème miroir. Toutes ses créatives sont des images fixes en 4:5, un format taillé pour le fil, verified sur les règles de production de l'équipe et confirmé par Parker qui classe tout en static. Et environ 19,8 % de la dépense, soit 168,44 € côté Meta, part dans des emplacements verticaux ou plein écran, Reels et Stories, où une image 4:5 est recadrée, entourée de bandes, et se bat contre de la vidéo en mouvement. Le compte paie donc un cinquième de son budget pour montrer un format d'affiche dans un environnement de film. Que le fil porte 5 des 6 achats n'est pas une surprise : c'est le seul endroit où la créative est chez elle.

Un chiffre neuf éclaire ce point autrement. Parker donne la ventilation par appareil, que le pull Meta n'avait pas tirée : **mobile 721,09 € soit 93,4 %, ordinateur de bureau 50,55 € soit 6,6 %.** Le compte est donc massivement mobile, ce qui est cohérent avec les commandes réelles, et il faut le mettre en face d'un fait Shopify qui reste troublant : 989 des 2 404 sessions ventilées par appareil et pays viennent d'un ordinateur de bureau aux États-Unis, alors que les 11 commandes sont toutes facturées en France. Le trafic payé est mobile et français ; une partie du trafic compté au dénominateur du taux de conversion ne l'est pas. Le taux de conversion réel du trafic payant est donc meilleur que le taux global, sans que personne ne sache de combien.

Le troisième point est la trajectoire, nette même sur 28 jours. Il n'y a pas eu de glissement progressif entre emplacements, il y a eu deux régimes séparés par un trou. Régime un, du 10 au 16 août : CPM sous 0,63 €, CTR sous 0,62 %, aucun achat. Trou du 17 au 24 août : zéro euro, aucune explication dans les sources. Régime deux, depuis le 25 août : CPM de 13,52 à 23,18 €, CTR de 1,65 à 3,73 %, et les six achats arrivent tous là, aux dates du 26, 27 et 30 août puis du 1er, 3 et 4 septembre. La marque n'a que douze jours de diffusion comparable derrière elle, et sa fenêtre d'apprentissage a été coupée en deux au milieu.

## Baseline account metrics, last 90 days

Voici l'état de santé de base, chaque chiffre lu contre son repère de méthode. Aucun mouvement contre un trimestre précédent n'est disponible : c'est le point zéro.

**Le CTR est le seul indicateur franchement sain.** La campagne active affiche 2,73 % de CTR sur lien, l'ensemble Raselio 2,46 %, le compte vu par Parker 2,60 %, contre un repère d'environ 1 % et plus. Le compte n'a pas de problème d'attention. Le CPC suit, autour de 0,62 €. Cette santé est réelle et c'est aussi le piège du compte : c'est le seul chiffre qui va bien, et c'est celui que la production créative optimise depuis neuf lots.

**Le CPM se lit à deux étages et il faut toujours dire lequel.** Au niveau du compte entier vu par Meta, il est de 4,96 €, ce qui paraît excellent et ne veut rien dire, parce qu'il est écrasé par les impressions d'Audience Network. Hors Audience Network, il est de 14,44 €. Parker, qui voit très peu d'Audience Network, donne 16,25 €. Au niveau des campagnes Raselio, il est de 15,33 €, et de 17,42 € sur la campagne active. C'est un CPM de fil Facebook français normal, et sa hausse depuis le 25 août, de 13,52 € le premier jour à 23,18 € le 29 août puis autour de 15 à 21 €, est le mouvement à surveiller. La méthode dit de signaler quand le CPM monte, parce que ça veut dire qu'il devient plus cher d'atteindre des comptes nouveaux.

**La fréquence est déjà hors de la zone saine.** La campagne active a servi 32 430 impressions à 13 869 personnes, soit 2,34, contre un repère de 1,2 ou moins en prospection. Pour un compte de quatre semaines sur la France entière, c'est haut. Deux raisons se cumulent : 50 € par jour répartis entre onze ad sets dans un budget de campagne unique, ce qui laisse quelques euros par lot et ne permet à aucun de sortir de son petit bassin ; et aucune exclusion d'acheteurs n'apparaît dans le paramétrage tiré. À 11 clients, l'exclusion ne changerait presque rien aujourd'hui, mais le dispositif est à mettre en place avant qu'il ne compte.

**L'entonnoir complet est la nouveauté de ce passage, et c'est là que le compte se joue.** Verified sur Parker, au niveau compte : 775 clics sur lien, 597 vues de page de destination, 32 ajouts au panier, 12 paiements initiés, 6 achats. Étape par étape, cela donne 77,0 % du clic à la page, puis **5,4 % de la page au panier**, puis 37,5 % du panier au paiement, puis 50,0 % du paiement à l'achat. Trois de ces quatre étapes sont normales ou bonnes. Une seule est catastrophique, et c'est la deuxième. Le clic arrive, la page charge, et presque personne n'ajoute au panier. Ce n'est plus une hypothèse sur la publicité, c'est une mesure sur la page.

**Le coût par étape rend le problème concret.** 771,64 € pour 32 ajouts au panier donne **24,11 € par ajout au panier**, contre une marge unitaire d'environ 23,58 € stated. Aujourd'hui, faire mettre le produit dans un panier coûte plus cher que ce que rapporte une vente entière. Le coût par paiement initié est de 64,30 €. Le coût par achat est de 114,14 € sur la dépense Raselio, 128,61 € sur le périmètre Parker, et 94,16 € sur la seule campagne active. Le seuil de rentabilité calculé par l'équipe est d'environ 21 €, stated, et son plafond de test de 42 €. Le compte est entre deux et six fois trop cher selon la référence retenue. Vu autrement, 684,82 € pour 11 commandes réelles donne 62,26 € par commande, ce qui est meilleur et reste au-dessus du plafond.

**Le ROAS et le rendement média global divergent, et l'écart est maintenant expliqué.** Le ROAS Meta est de 0,372 sur la campagne active, 0,307 sur l'ensemble Raselio, 0,27 sur le périmètre Parker. Le rendement média global, chiffre d'affaires Shopify divisé par dépense Raselio, est de 0,55. L'écart vient des cinq commandes que Meta ne voit pas. Et la question de savoir s'il existe une troisième lecture est tranchée : `check_northbeam_connection` renvoie connected false, donc il n'y a pas d'attribution tierce à consulter, et la lecture en plateforme est la seule dont dispose la marque. Il faut être précis sur ce que 1,0 signifie : à 34,99 € de prix pour 11,41 € de coût produit, un ROAS de 1,0 est déjà une perte franche, et il faut environ 1,48 pour couvrir le seul coût du produit, bien plus pour couvrir le port offert et les frais. La contribution de la période, inferred sur le coût produit stated : 377,32 € de chiffre d'affaires brut moins 125,51 € de coût produit donne 251,81 € de marge brute, moins 684,82 € de dépense publicitaire donne **−433,01 €**, avant frais réels.

**La phase d'apprentissage n'a jamais commencé.** Le repère est de 50 événements de conversion par semaine et par ad set. Le compte a 6 achats sur toute sa vie, répartis sur 13 ad sets Raselio. Aucun ad set n'a approché la sortie d'apprentissage. La théorie de diversité créative de Meta ajoute une couche : avec 173 créas visuellement très proches, dont au moins deux qui partagent exactement le même fichier image, verified sur les identifiants de créative Parker, le système regroupe probablement ces annonces sous un nombre d'entités bien inférieur, ce qui concentre l'apprentissage au lieu de l'élargir. Ce qu'il faut surveiller au prochain passage, dans l'ordre : le taux de passage de la vue de page à l'ajout au panier, aujourd'hui à 5,4 % ; le coût par ajout au panier contre la marge de 23,58 € ; la fréquence contre 1,2 ; et le coût par achat contre le plafond de 42 €.

**Docs de méthode chargés et signés.** This is everything I know about Andromeda v2. This is everything I know about tailoring creative strategy to brand size.

## Open loops

**Boucle 1 — L'enchère a choisi un acheteur que personne ne visait.**

Observation. Tous les ad sets Raselio de la campagne active sont réglés en 18-65, genres « tous », avec l'audience Advantage+ qui relâche encore l'âge et le genre, et leurs noms disent « HOMMES 18-55 ». Pourtant plus de 82 % de la dépense du compte est allée aux 45 ans et plus dans les deux sources, et les six achats attribués viennent tous d'hommes de cette zone.

Le pull : **Surprise.** Elle a tiré parce que le compte a produit un résultat démographique très net alors que rien dans son paramétrage ne l'orientait, et en 28 jours.

La question : qu'est-ce que Meta reconnaît dans ces images qui l'amène chez des hommes de plus de cinquante-cinq ans ?

Justification. Si la réponse tient à la créative, la marque possède déjà son levier et doit le pousser. Si elle tient à la catégorie ou au bassin d'inventaire disponible en France, changer la créative ne changera rien et il faut chercher ailleurs. Les deux réponses envoient le budget dans des directions opposées.

Territoire : Personas.

**Boucle 2 — Le 65 ans et plus reçoit un tiers du budget et achète le moins bien.**

Observation. La tranche des 65 ans et plus a reçu 240,46 € côté Parker, soit 31,2 % de la dépense, avec le meilleur CTR masculin du compte, 2,23 %, et le CPM le plus bas des tranches acheteuses, 8,00 €. Elle porte un seul achat, pour un ROAS de 0,171, le plus faible des trois tranches qui ont acheté. Juste à côté, les 55-64 portent quatre achats avec un ROAS de 0,594. Le plan de l'équipe recommande de cibler « hommes 45-65+ », stated, sans distinguer les deux.

Le pull : **Tension.** Elle a tiré parce que deux tranches voisines, servies par les mêmes créatives la même semaine, se comportent très différemment à l'achat alors que le clic ne les distingue pas.

La question : qu'est-ce qui change dans la façon d'acheter ce produit entre un homme de cinquante-huit ans et un homme de soixante-dix ?

Justification. Si la différence est un frein de paiement ou de confiance en ligne, elle se traite sur le site. Si elle est un frein d'usage ou de pertinence, elle change le message. Un tiers de la dépense dépend de cette réponse.

Territoire : Personas.

**Boucle 3 — Cinq commandes sur onze ne sont vues par personne.**

Observation. Meta attribue 6 achats en fenêtre par défaut. Shopify compte 11 commandes sur la même période, dont 8 marquées Facebook et 2 Instagram par son propre référent de commande, et une sans référent. Cinq commandes réelles n'apparaissent dans aucun rapport publicitaire, et la vérification est faite : aucun outil d'attribution tiers n'est branché, aucun e-mail, aucun SMS, aucun compte organique identifié.

Le pull : **Tension.** Elle a tiré parce que deux sources qui devraient à peu près se recouper divergent de près d'un tiers, et que la source la plus optimiste est celle qui n'est pas payée pour l'être.

La question : par quel chemin les cinq commandes que Meta ne voit pas sont-elles arrivées jusqu'au paiement ?

Justification. Si ces cinq commandes viennent d'un clic publicitaire mal attribué, le vrai coût par achat de la marque est proche de 62 € et non de 114 €, ce qui change complètement le jugement porté sur le compte. Si elles viennent d'ailleurs, bouche à oreille, recherche directe, retour spontané, alors la marque a une source de demande qu'elle ne connaît pas et n'alimente pas.

Territoire : Produit.

**Boucle 4 — Presque personne n'ajoute au panier après avoir vu la page.**

Observation. Sur 597 vues de page de destination, 32 ajouts au panier, soit 5,4 %. Les trois autres étapes de l'entonnoir se comportent normalement : 77,0 % des clics arrivent sur une page, 37,5 % des paniers vont au paiement, 50,0 % des paiements aboutissent. Et les annonces n'envoient pas toutes au même endroit : la fiche produit, la listicle `/pages/7-raisons` et l'advertorial `/pages/pourquoi-pas-votre-tondeuse-a-barbe` sont toutes trois utilisées comme destination, verified sur les URL des annonces.

Le pull : **Surprise.** Elle a tiré parce que l'entonnoir est sain partout sauf à une seule étape, ce qui est inhabituel et donc informatif : le problème est localisé, pas diffus.

La question : que se passe-t-il sur la page entre le moment où elle s'affiche et le moment où le visiteur repart ?

Justification. Un euro sur trois du budget se perd à cette seule étape, et le coût par ajout au panier, 24,11 €, dépasse déjà la marge d'une vente. Aucune amélioration de créative ne rattrape ça. Savoir laquelle des trois destinations perd le plus de monde changerait l'ordre des priorités du trimestre entier.

Territoire : Produit.

## Appendix - Parker media links

Parker est connecté pour cette marque, brand_id `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, organisation « Dylan's Org ». `search_chat_history` en mode listThreads a renvoyé 0 fil sur ce brand_id le 2026-09-06. `check_northbeam_connection` a renvoyé connected false le même jour.

| ID | Source | Lien Parker ou chemin d'origine | Où c'est discuté |
|---|---|---|---|
| M001 | Compte Meta vu par Parker, 173 annonces, entonnoir et ventilations | https://app.heyparker.ai/dashboard/facebook-ads/performance?brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | Totaux, sections 3 à 6 |
| M002 | `RASELIO \| IMPECCABLE \| CROP TAILLE`, 2 achats, 8 ajouts au panier | https://app.heyparker.ai/dashboard/facebook-ads/performance?adId=52505820203791&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | Section 6, entonnoir |
| M003 | `RASELIO \| POSTIT \| GAGNANTE`, 4 ajouts au panier, 0 achat | https://app.heyparker.ai/dashboard/facebook-ads/performance?adId=52505593472791&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | Section 6, entonnoir |
| M004 | `RS · C11 garantie-colis`, CTR 14,06 % | https://app.heyparker.ai/dashboard/facebook-ads/performance?adId=52506457654991&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 | Section 6 |
| M005 | Compte Meta, campagnes, ad sets, réglages de ciblage et d'emplacements | `source-pulls/meta-account-campaigns-adsets.md` | Totaux, sections 3, 4, 5 |
| M006 | Compte Meta, ventilations âge x genre et plateforme x emplacement, série quotidienne | `source-pulls/meta-account-breakdowns.md` | Sections 3, 4, 5 |
| M007 | Compte Meta, 183 annonces niveau ad | `source-pulls/meta-ads-all.md` | Totaux, section 6 |
| M008 | Compte Meta, tendances de performance niveau annonce | `source-pulls/meta-performance-trend.md` | Section 6 |
| M009 | Shopify analytics, 8 requêtes ShopifyQL sur 60 et 90 jours | `source-pulls/shopify-analytics.md` | Totaux, sections 5, 6 |
| M010 | Shopify, 11 commandes et 14 fiches clients | `source-pulls/shopify-orders-and-customers.md` | Totaux, section 6, boucle 3 |
| M011 | Économie unitaire, setup d'achat média, budget et propriété | `sub-context-docs/operations-and-team.md` | Section 6 |
| M012 | Calendrier des campagnes et des événements du trimestre | `sub-context-docs/marketing-calendar-and-campaigns.md` | Sections 3, 5 |
| M013 | Brief interne « 30 créas Meta » du 3 septembre 2026 | `source-pulls/drive-30-statiques-meta-plan-2026-09-03.md` | Sections 3, 4, 6 |
| M014 | Règles de marque et définition du succès reconstruites au build | `running-notes/brand-rules.md`, `running-notes/success-definition.md` | Section 6 |
