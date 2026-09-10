---
brand: raselio
doc: customer-journey-and-persona-discovery
generated_on: 2026-09-06
refresh_by: 2026-12-06
quarter: Q3 2026 (la boutique a 46 jours de vie commerciale au moment de l'écriture, première commande le 2026-08-26)
sources: [source-pulls/shopify-orders-and-customers.md (11 commandes, 14 fiches clients, tout l'historique de la boutique), source-pulls/shopify-analytics.md (8 requêtes ShopifyQL, série de 61 jours du 2026-07-08 au 2026-09-06 et regroupements sur 90 jours, 2 431 sessions), source-pulls/meta-account-breakdowns.md (ventilation âge × genre sur 18 lignes et 850,79 € de dépense compte, ventilation plateforme × emplacement sur 21 lignes, série quotidienne), source-pulls/meta-account-campaigns-adsets.md (5 campagnes, 14 ad sets), source-pulls/meta-ads-all.md (183 annonces, dépense décroissante), source-pulls/meta-performance-trend.md (12 annonces), source-pulls/shopify-store-and-product.md (fiche produit, page Notre Histoire, landing « 7 raisons », advertorial « pourquoi-pas-votre-tondeuse-a-barbe », FAQ, 6 politiques), source-pulls/drive-9-ads-statiques-prompts-2026-08-23.md (persona « Kevin, 27 ans », 9 concepts), source-pulls/drive-30-statiques-meta-plan-2026-09-03.md (brief 30 créas, ICP réécrit, personas « Hervé »/« Catherine »/« Marc », lecture par segment de l'équipe), source-pulls/drive-30-statiques-generees-2026-09-04.md, source-pulls/gmail-brand-signals.md (un seul message client entrant sur toute la boîte, quatre recherches voix-client vides), sub-context-docs/website-and-product-audit.md, sub-context-docs/brand-identity-analysis.md, running-notes/brand-rules.md, running-notes/missing-context.md]
data_limitations: [Aucun avis client n'existe nulle part. La boutique n'a pas d'application d'avis, aucun avis Shopify, aucun avis marketplace, aucun avis tiers trouvé. Le corpus voix-client de cette marque est donc vide, ce qui prive ce document de sa source de premier rang et rend chaque lecture de « ce que les clients aiment » structurellement impossible à ce jour. Aucun brand_id Parker (get_available_brands renvoie organizations vides le 2026-09-06) : pas de lecture des commentaires publicitaires Meta, pas de sondage post-achat, pas de corpus Reddit natif, pas d'accès à l'organique. Les commentaires sous les 183 annonces n'ont donc jamais été lus, alors que c'est le seul endroit où des acheteurs ou des prospects de cette marque ont pu écrire quelque chose. Aucun sondage post-achat en place, donc aucune source de premier rang reliant un acheteur réel à sa raison d'achat. La ventilation Meta par âge et genre est au niveau COMPTE et inclut la marque soeur Trael (≈ 116 € sur 850,79 €, soit 15 %) : aucune ventilation Raselio seule n'a pu être tirée, l'API n'accepte pas de filtre de campagne au niveau ad_account. Les 6 achats attribués appartiennent tous à des campagnes Raselio (Trael affiche « Not available » sur toutes ses lignes d'achat), mais les dépenses et CTR par tranche d'âge sont mélangés. « Not available » est la valeur littérale renvoyée par l'API quand aucun achat n'est attribué, ce n'est pas un zéro vérifié. Les analytics Shopify ne relient pas une commande à sa page d'entrée ni à son appareil : les lectures par page et par appareil sont des sessions, pas des acheteurs. Le compteur de sessions ayant terminé le paiement montre 3 sessions sur 61 jours alors que 11 commandes existent sur la même fenêtre, écart non résolu. raselio.com est bloqué par le proxy de la session : la page d'accueil, le panier et le checkout n'ont pas été vus. Aucune conversation Parker antérieure (search_chat_history a renvoyé 0 fil). Lecture créative indisponible pour la majorité des annonces : seuls les 30 concepts du 3 septembre, les 9 du 23 août et les fiches du 4 septembre portent le texte à l'image et le mécanisme ; pour les lots S1 à S10, POSTIT, EMOTION, RENTRÉE, W/N et R02 à R30, seuls les noms existent.]
methods_loaded: [creative-strategy-context/persona-research-and-creative-strategy-process.md, creative-strategy-context/customer-review-mining-method.md, creative-strategy-context/emotional-delivery-and-timing.md, creative-strategy-context/advertising-to-older-audiences.md, creative-strategy-context/ad-account-analysis.md, creative-strategy-context/creative-strategy-fundamentals.md]
---

# Customer journey and persona discovery — Raselio

## How buying actually happens here

**La piste de recherche, avant la lecture.** J'ai travaillé les surfaces dans l'ordre que la méthode demande, et la première chose à dire est que la surface de premier rang n'existe pas. Il n'y a aucun avis client Raselio, nulle part. Pas d'application d'avis sur la boutique, aucun avis marketplace, aucun avis tiers, et quatre recherches Gmail dédiées à la voix client ne remontent rien. La méthode de lecture des avis classe les sources par force de preuve, du sondage post-achat aux avis propriétaires, puis aux données de commande, puis aux communautés. Ici les deux premiers rangs sont vides et le troisième tient en onze lignes. Ce document est donc reconstruit depuis le bas de l'échelle de preuve, pas depuis le haut, et chaque lecture porte cette marque.

Ce que j'ai réellement lu. Les onze commandes de la boutique et les quatorze fiches clients, c'est-à-dire tout l'historique commercial, du 2026-08-26 au 2026-09-04. La série Shopify de 61 jours du 2026-07-08 au 2026-09-06, soit 2 431 sessions, avec l'entonnoir jour par jour, les référents, les appareils, les pays et les pages d'entrée sur 90 jours. La ventilation Meta par âge et genre sur 18 lignes et 850,79 € de dépense compte, la ventilation par plateforme et emplacement sur 21 lignes, la série quotidienne du compte, les 5 campagnes, les 14 ad sets et les 183 annonces. Les deux landings et l'advertorial de la boutique, mot pour mot. Le brief d'équipe du 23 août qui écrit le persona « Kevin, 27 ans », et celui du 3 septembre qui le contredit. La boîte Gmail de la marque, où un seul message client entrant existe sur toute la période.

Ce qui manque et qui change la lecture. Il n'y a pas un mot d'acheteur Raselio dans aucune source. Pas un avis, pas un commentaire publicitaire lisible, pas une réponse de sondage. Les 183 annonces ont forcément reçu des commentaires, et personne n'a pu les lire faute de brand_id Parker. Donc tout ce que ce document dit de la tête d'un acheteur est soit une lecture de comportement, soit un mot de la marque, jamais un mot du client.

**Les méthodes chargées avant l'analyse.** `persona-research-and-creative-strategy-process.md` pour la séparation entre l'audience servie et l'acheteur réel, pour l'échelle de confiance selon la donnée disponible et pour la discipline qui interdit de promouvoir un signal en persona. `customer-review-mining-method.md` pour les dénominateurs, l'écho de marque et la règle qui veut qu'un corpus vide soit nommé comme vide plutôt que comblé. `emotional-delivery-and-timing.md` pour l'état émotionnel d'arrivée et pour la phase TEEP, Trigger, Exploration, Evaluation, Purchase. `advertising-to-older-audiences.md` parce que les six achats attribués sont tous sur des hommes de 45 ans et plus et que ce doc est le prior de la catégorie ; il se termine par sa ligne de signature, « This is everything I know about advertising to older audiences. » `ad-account-analysis.md` pour l'effet de répartition et pour la lecture de l'attribution Meta. `creative-strategy-fundamentals.md` pour la posture des boucles ouvertes. Les cinq autres docs ne portent pas de ligne de signature.

**La lecture, maintenant.** L'achat d'une tondeuse intime Raselio coûte 34,99 €, et ce prix ment sur la difficulté de la décision. Sur le papier c'est un achat d'impulsion : produit unique, prix bas pour la catégorie, aucune option, aucune configuration, livraison offerte, un seul article par commande sur les 11 commandes, verified. Dans les faits, la marque paie environ 94 € pour obtenir un achat à 35 €, verified sur la campagne principale, et son entonnoir de site perd 98,3 % des sessions avant le panier. Un vrai achat d'impulsion ne se comporte pas comme ça.

Mon interprétation, inferred, confiance mixte : ce qui coûte cher ici n'est pas l'argent, c'est la permission. L'homme doit s'autoriser trois choses avant de payer. Reconnaître qu'il se rase là, ce que la marque écrit elle-même comme un sujet dont « personne n'en parle ». Croire qu'un objet à 34,99 € acheté à une marque qu'il n'a jamais vue ne va pas le blesser sur « la peau la plus fine du corps ». Et accepter que le colis arrive chez lui. Le prix est petit, l'autorisation ne l'est pas. C'est pour ça que le clic est facile et l'achat rare.

Et la donnée qui commande tout le reste, verified sur la ventilation compte du 2026-09-06 : les 6 achats attribués du compte sont tous sur des hommes de 45 ans et plus. Quatre sur 55-64, un sur 45-54, un sur 65+. Zéro sur les 18-44, hommes ou femmes, alors que ces lignes ont consommé 273,70 € des 850,79 € de dépense compte, soit 32,2 %. Pendant ce temps le document de travail que l'équipe a écrit le 23 août pose en tête de page, verbatim, stated : « **ICP :** Homme FR, 18-34 ans (persona « Kevin, 27 ans ») ». C'est la collision centrale de ce document et elle est traitée en entier plus bas.

## Shape of the journey

**L'appel principal : un achat à petit prix qui demande une décision de taille moyenne, avec une part de risque perçu bien plus lourde que le montant.** Inferred, confiance mixte.

Voici la preuve, dans l'ordre où je l'ai lue.

Ce qui pousse vers l'impulsion. Le produit coûte 34,99 €, verified sur la fiche Shopify. Une seule variante, un seul article sur les 11 commandes, aucune remise appliquée sur les 60 jours de série, verified. La livraison est offerte. Aucun choix à faire au moment d'acheter. Le renversement de risque est écrit partout : « Satisfait ou remboursé 30 jours » figure dans 25 des 30 textes principaux du lot du 3 septembre et « Garantie 2 ans » dans 26 sur 30, stated d'après le manifeste de l'équipe.

Ce qui pousse vers la délibération, et qui pèse plus lourd. Sur 61 jours, 2 431 sessions produisent 42 sessions avec ajout au panier, soit 1,7 %, 19 sessions arrivant au paiement, soit 0,8 %, et 3 sessions comptabilisées comme paiement terminé, verified sur la série ShopifyQL. Onze commandes existent pourtant sur la même fenêtre, ce qui veut dire que le compteur de sessions ne voit pas huit achats sur onze ; l'écart n'est pas résolu et il est nommé en limitations. Peu importe lequel des deux chiffres on retient : entre 1 116 et 4 154 sessions par commande, l'achat n'arrive pas d'un coup. Le coût par achat Meta sur la campagne principale est de 94,16 € pour un produit à 34,99 €, verified. Et sur 11 clients, 0 rachat, verified, sur une fenêtre de neuf jours qui ne permet de conclure à rien.

Ce que la marque elle-même dit du blocage, stated, brief du 3 septembre, verbatim : « **Le vrai problème est post-clic** : CTR 3 % mais CVR site ≈ 0,2 % et CPA 86 € pour un break-even à 21 €. » Le même document ajoute : « CVR sessions ≈ 0,23 % : le site convertit 5 à 10 fois moins qu'une fiche produit e-commerce saine (1-2 %). » L'équipe et les données disent la même chose : le clic est bon marché, le oui ne l'est pas.

**La phase de décision, lue avec TEEP.** La méthode de délivrance émotionnelle sépare quatre travaux internes : Trigger, quand le besoin devient conscient ; Exploration, quand l'acheteur compare et se fait une carte de ce qui existe ; Evaluation, quand il gère le risque et résout la seule objection qui reste ; Purchase, quand la décision est prise et où la créa doit retirer, pas ajouter.

Le compte Raselio écrit presque tout en Trigger et en Purchase. Trigger : « Vous connaissez ce moment. La tondeuse approche, vous retenez votre souffle », advertorial, verified. Purchase : le prix barré, « 34,99 € au lieu de 75 € », le « PROFITER DE L'OFFRE », les cinq boutons d'action de l'advertorial. Ce qui manque est la phase Evaluation, celle où l'homme de 58 ans se demande si un objet acheté à une marque inconnue va lui entailler la peau et si le facteur va voir ce qu'il y a dans le carton. La preuve que ce manque coûte cher est dans les propres chiffres de l'équipe, stated : la créa « C11 GARANTIE-COLIS », colis plus garantie, a fait « **CTR 14,8 %** mais budget minuscule (non concluant sur l'achat) », et l'équipe écrit elle-même que « les objections garantie/discrétion n'ont jamais eu de budget alors qu'elles font cliquer très fort ». Un actif de phase Evaluation, avec le meilleur taux de clic de tout le compte, n'a jamais reçu d'argent. Inferred, confiance mixte : c'est le trou le plus net du parcours.

**L'état émotionnel d'arrivée.** La méthode dit qu'un état de forte intensité rétrécit l'attention et pousse à l'action immédiate, tandis qu'un état de faible intensité ouvre le traitement réflexif, celui qui fait qu'on s'identifie à ce qu'on voit. Le compte reproduit exactement ce partage, verified sur les six achats et les lectures de l'équipe. Les créas à forte intensité, l'humour anatomique cru du post-it « Couilles », la censure pixel, font cliquer et mettre au panier ; l'équipe l'écrit, stated : « (2) l'humour visuel (post-it, pixel) fait cliquer et mettre au panier mais convertit moins ». Les créas de faible intensité et de valence positive, la famille « Impeccable », fond crème, homme habillé ou main seule, headline calme, produisent 3 des 6 achats attribués, verified sur les annonces IMPECCABLE CROP TAILLE deux achats, IMPECCABLE POSTIT SMILEY un achat, IMPECCABLE SERVIETTE un achat, soit 4 sur 6 en comptant la variante post-it de la même famille. C'est la zone que la méthode dit la plus sous-investie chez les marques DTC, et c'est celle qui vend ici.

**Est-ce que le parcours diffère par état d'acheteur ?** Les sources ne montrent qu'un seul état d'acheteur avec assez de matière pour être décrit : l'homme de 45 ans et plus qui se rase déjà cette zone avec un outil qui n'est pas fait pour. Les autres états sont invisibles, pas absents. Data-limited.

## Where buyers come from

**Ce qu'ils remplacent, dans les mots de la marque et non dans ceux du client.** Aucun acheteur Raselio n'a jamais décrit son ancienne méthode dans une source lisible. Ce qui suit est donc stated par la marque, jamais confirmé par un acheteur.

La marque construit tout son argument sur une seule substitution : la tondeuse à barbe utilisée sous la ceinture. Advertorial, titre 1, verified : « Vos couilles sont une zone sensible. Votre tondeuse à barbe l'ignore. » Puis, dans le corps : « Cette lame a été conçue pour votre mâchoire : une surface plane, une peau épaisse, une zone que vous voyez parfaitement dans le miroir. Sous la ceinture, c'est l'inverse. » La FAQ de la landing pose la question comme première entrée, verified : « Ma tondeuse à barbe ne suffit-elle pas ? » Et le brief du 23 août la range en tête, stated : « **Objection n°1 :** « ma tondeuse à barbe suffit » ».

La deuxième substitution, plus discrète, est le rasoir. Advertorial, titre 5, verified : « Le rasage à blanc, c'est le piège. Deux jours de peau lisse, puis une semaine de repousse dure qui gratte, qui pique ». Et la FAQ, verified : « La majorité de nos clients constatent nettement moins de rougeurs et de démangeaisons qu'avec un rasoir. » Cette dernière phrase mérite d'être signalée : elle affirme une comparaison chiffrée sur « la majorité de nos clients » alors qu'il existe onze clients et aucun avis, verified. C'est une phrase qui ne peut pas être défendue en l'état.

La troisième possibilité, celle du non-remplacement, n'est jamais nommée par la marque. Un homme qui ne se rasait pas du tout et qui commence n'apparaît dans aucun texte de la marque ni dans aucune donnée. Blanc nommé.

Ce que la lecture du persona de l'équipe en dit, stated, brief du 3 septembre, verbatim : « Il se rase déjà cette zone, avec un rasoir jetable ou une tondeuse à barbe : il connaît les coupures, les rougeurs, la repousse qui pique. » L'équipe pose donc que l'acheteur vient d'un geste déjà installé, jamais d'un besoin nouveau. C'est cohérent avec le prior de la méthode sur les audiences plus âgées, qui convertissent depuis un état conscient du problème plutôt que depuis la découverte. Inferred, confiance mixte, faute d'un seul acheteur qui l'ait dit lui-même.

## Discovery and word-of-mouth dynamics

**La découverte est achetée, presque en totalité.** Verified.

Commandes par référent sur 90 jours, dénominateur 11 commandes : facebook 8, instagram 2, référent vide 1. Sessions par référent sur la même fenêtre, dénominateur 2 431 sessions : direct 1 300, facebook 923, instagram 181, google 24, baidu 1, bing 1, un référent « collider » 1. Aucune session ne vient d'un lien d'affiliation, d'un média, d'un forum ou d'un e-mail, verified.

Le « direct » à 1 300 sessions sur 2 431 ne veut pas dire bouche-à-oreille. La ventilation par appareil et pays le montre : sur les 2 404 sessions réparties, 989 sont des sessions desktop depuis les États-Unis et 265 des sessions mobiles depuis les États-Unis, contre 791 mobiles depuis la France et 119 desktop depuis la France, verified. Or les 11 commandes sont facturées en France à 100 %, verified. Mon inférence, marquée comme telle et confiance mixte : une part importante du trafic américain sur ordinateur n'est pas humaine ou n'est pas un acheteur, et elle gonfle le dénominateur du taux de conversion. Le doc d'audit du site est arrivé à la même lecture indépendamment.

**Le bouche-à-oreille n'existe pas encore, et c'est structurel.** Zéro client récurrent sur 11, verified. Aucune source ne montre un client parlant de la marque, verified sur quatre recherches Gmail et sur l'absence totale d'avis. Et le produit lui-même travaille contre le partage : la marque vend la discrétion comme un bénéfice, advertorial, verified : « Le colis arrive dans un emballage neutre et discret : personne n'a besoin de savoir, tout le monde finira par remarquer. » Un produit dont la promesse est que personne ne sache ne se recommande pas facilement à voix haute. Inferred, confiance mixte.

Le seul vecteur de recommandation que les données laissent entrevoir n'est pas un acheteur qui parle, c'est un second acheteur pour le même homme. L'équipe l'a repéré, stated : « Les femmes 45-54 montrent un signal faible mais réel d'achat-cadeau (3 ATC, 1 paiement initié) », et a écrit une créa pour ça, la 28, avec un ad set femmes 45-60 séparé. Le dénominateur est de 3 ajouts au panier et 1 paiement initié, zéro achat, sur 28,45 € de dépense pour la ligne femmes 45-54, verified sur la ventilation compte. C'est un signal fin, à confirmer, pas un canal.

**Le lien avec l'écart d'attribution.** Il n'y a pas de vente physique, pas de retail, pas de marketplace, pas de Google Ads. Les 24 sessions Google sur 90 jours sont du bruit. Le compte Meta et la boutique sont les deux seules fenêtres, sans outil tiers, verified. Donc l'écart d'attribution habituel n'existe pas ici : il n'y a rien à côté du canal payant qui pourrait absorber des ventes non vues. Ce qui rend la lecture plus simple et le diagnostic plus dur : si le payant ne vend pas, rien ne vend.

## Trigger events

Ces déclencheurs sont des moments, pas des identités. La méthode persona est explicite là-dessus, et il faut le tenir : le même homme peut vivre plusieurs de ces moments à des années d'écart, et le moment ne dit rien de qui il est.

Attention à la source. Aucun de ces déclencheurs ne vient de la bouche d'un acheteur Raselio. Ils sont écrits par la marque dans son advertorial et sa landing, et ils sont donc **stated**, confiance thin. Ils sont listés ici parce que ce sont les seuls déclencheurs nommés qui existent pour cette marque, et parce que la moitié d'entre eux sont testables plus tard contre de vrais commentaires.

1. **La séance qui fait peur, au moment de la faire.** Advertorial, verified : « Personne n'en parle, mais tout le monde la connaît : cette micro-hésitation avant de poser la lame. Ce réflexe de contracter tout le corps. Cette séance qui ressemble plus à du déminage qu'à de l'entretien. » C'est le déclencheur le plus travaillé du site.
2. **Les boutons trois jours après, au mauvais moment.** Advertorial, verified : « Vous faites l'effort de vous entretenir. Et 72 heures plus tard, la zone est couverte de petits boutons rouges et de poils incarnés. Précisément la semaine où vous auriez préféré être présentable. »
3. **La repousse qui pique, remarquée par quelqu'un d'autre.** Advertorial, verified : « Deux jours de peau lisse, puis une semaine de repousse dure qui gratte, qui pique, et qui se remarque. Y compris dans les moments où vous auriez préféré qu'on remarque autre chose. » La légende des deux images de cette section, verified sur les attributs alt : « Lui au bout du lit, elle sous la couette », puis « Le couple réconcilié, câlin sur le lit ».
4. **Le soir où ça compte.** Encart offre de l'advertorial, verified : « *La confiance, ça se prépare avant le moment où on en a besoin.* » Une créa du compte s'appelle simplement « Ce soir. », stated.
5. **Le report indéfini pour raison de logistique.** Advertorial, titre 6, verified : « Ce n'est pas la flemme. C'est la logistique : s'installer dans la salle de bain, trouver le bon moment, et finir par retrouver des poils sur le lavabo. Que quelqu'un d'autre risque de voir avant vous. »
6. **La vue qui baisse.** Créa 30 du 3 septembre, stated : « Passé 50 ans, on voit moins bien de près. » C'est le seul déclencheur du lot qui soit lié à l'âge et non au geste, et c'est aussi celui que la marque a inventé en dernier, après avoir lu l'âge de ses acheteurs.

**Ce que le comportement ajoute, et qui n'est pas dans les mots de la marque.** Sur les 11 commandes, verified, quatre tombent entre 07:23 et 09:20 heure locale et trois entre 21:33 et 22:48. Le reste est en journée. Le dénominateur est de onze, donc ce n'est pas un motif, c'est une piste : les heures d'achat s'accrochent au matin et à la fin de soirée, les deux moments où un homme est dans sa salle de bain. Thin, à revérifier quand la base atteindra quelques dizaines de commandes.

Deuxième lecture de comportement, verified : la première commande de la boutique tombe le 2026-08-26, soit le lendemain du jour où le compte publicitaire passe du régime Audience Network au régime fil Facebook. Du 10 au 16 août, le compte achète 130 829 impressions pour 105,69 € à 0,22-0,63 € de CPM et produit zéro achat. Après huit jours d'extinction totale du 17 au 24 août, il redémarre le 25 août à 13-23 € de CPM et sort son premier achat le 26. Ce n'est pas un déclencheur d'acheteur, c'est un déclencheur de canal, et il dit que le parcours de cette marque commence dans un fil Facebook et nulle part ailleurs.

## What has to happen before purchase

Trois mouvements, dans l'ordre où les sources les rendent visibles. Les deux premiers sont adressés par la créa actuelle, le troisième ne l'est presque pas.

**Mouvement 1 : reconnaître que l'outil qu'il possède n'est pas le bon.** C'est le mouvement que la marque travaille le mieux. Toute la structure de l'advertorial est bâtie là-dessus, et la landing y consacre sa raison 2, verified : « Pensée pour cette zone, pas pour *votre barbe* ». La FAQ ouvre sur cette question. Le brief du 23 août la nomme objection n°1. Adressé, verified.

**Mouvement 2 : croire que le geste peut cesser d'être un risque.** L'advertorial le formule en promesse de sensation, verified : « **Résultat : vous respirez normalement. La routine redevient une routine, pas une épreuve.** » La preuve avancée est mécanique : tête arrondie, lames céramique, LED, sabot 3 hauteurs. Adressé, verified. La limite est que les spécifications qui portent ces preuves sont marquées « à confirmer » en interne par l'équipe elle-même sur l'autonomie, les RPM et la durée de garantie, stated ; l'audit produit a déjà nommé ce trou.

**Mouvement 3 : accepter d'acheter à une marque qu'il ne connaît pas, et recevoir le colis.** C'est le mouvement le moins servi et probablement le plus cher. Le brief du 3 septembre liste les freins de l'acheteur réel, stated, verbatim : « Freins : peur de se couper, méfiance (dropshipping), discrétion du colis, gêne du sujet, sentiment que le grooming intime est « pour les jeunes », vue de près qui baisse. » Trois de ces six freins portent sur la confiance et la discrétion, pas sur le produit. Et le compte n'a jamais mis d'argent derrière, l'équipe l'écrit elle-même, stated : « les objections garantie/discrétion n'ont jamais eu de budget alors qu'elles font cliquer très fort ».

La méthode sur les audiences plus âgées dit exactement pourquoi ce troisième mouvement pèse autant ici. L'autorité est le raccourci de confiance pour ce public, la preuve doit venir de sources qu'ils reconnaissent déjà, et le témoignage doit avoir leur âge pour transférer. Raselio n'a aucune autorité à montrer : pas d'avis, pas de presse, pas d'expert, pas de témoignage. Ce qu'elle met à la place est un chiffre, « +17 000 hommes » et « 4,7/5 (1 734 avis) », qui n'a aucune source, verified sur une boutique à 11 commandes sans application d'avis. Inferred, confiance mixte : la marque essaie de sauter le mouvement 3 avec un chiffre qu'elle ne peut pas soutenir, au lieu de le franchir avec de la preuve qu'elle pourrait construire.

**Ce que la créa actuelle ne fait pas encore.** Aucune vidéo, aucune démonstration en mouvement, aucune voix. Les 183 annonces sont des statiques, verified sur l'inventaire du compte et les documents de production. La méthode sur les audiences plus âgées classe le témoignage long avec validation d'expert et la démonstration façon téléachat en tête des formats qui portent, et note que ce public suit une histoire plus longue que ce qu'un média-acheteur attend. Raselio n'a jamais essayé un seul format long. Ce n'est pas un reproche, c'est une absence chiffrée : zéro sur 183.

## Biggest myths

Il faut être honnête sur ce point : cette marque n'a pas de mythes documentés, parce qu'elle n'a pas de corpus où des gens croiraient quelque chose de faux à voix haute. Ce qui existe sont des croyances que l'équipe attribue à sa cible, jamais mesurées. Je les donne pour ce qu'elles sont, stated et thin, et je nomme ensuite le vrai blocage.

Les trois croyances nommées par la marque, brief du 3 septembre, stated, verbatim dans la liste des objections : « « C'est pour les jeunes », « je vais me couper », « ma tondeuse à barbe suffit », « arnaque / ça vient de Chine », « colis pas discret », « à quoi sert la LED », « ça pique à la repousse » ».

Trois d'entre elles sont des croyances fausses au sens de la méthode, c'est-à-dire des choses tenues pour vraies avec assurance et qui ne le sont pas : « ma tondeuse à barbe suffit », « c'est pour les jeunes », et « à quoi sert la LED ». Les autres ne sont pas des mythes, ce sont des objections légitimes. « Arnaque, ça vient de Chine » est une évaluation raisonnable d'une marque de six semaines qui vend un produit générique sans photo réelle, et l'audit produit a montré que le produit n'a jamais été photographié : les onze images de la fiche sont générées, verified sur les noms de fichiers. Un acheteur qui doute a raison de douter.

**Le vrai blocage n'est pas un mythe, c'est la permission et la confiance.** Inferred, confiance mixte. La méthode rappelle qu'une croyance fausse à renverser et un frein de valeur à recadrer demandent deux gestes créatifs différents, et que confondre les deux coûte des mois. Ici, l'argument « ta tondeuse à barbe n'est pas faite pour ça » est déjà servi par presque toute la créa, et il n'a pas suffi : 6 achats pour 684,82 € de dépense Raselio, verified. Ce qui n'a pas été servi est la permission d'acheter à un inconnu un objet qui va toucher une zone fragile, et de le recevoir sans que personne ne le voie.

## Recurring pre-purchase questions

**Ce que la marque a entendu assez souvent pour y répondre.** La FAQ de la landing porte sept questions, verified, et c'est le meilleur indicateur disponible de ce qui bloque, puisque c'est ce que la marque a jugé utile d'écrire. Dans l'ordre de la page : « Ma tondeuse à barbe ne suffit-elle pas ? », « Est-elle adaptée aux testicules et aux zones sensibles ? », « Peut-on l'utiliser sous la douche ? », « Comment éviter les irritations et la repousse qui pique ? », « Quelle hauteur de coupe choisir ? », « Est-elle sans fil ? », « Comment l'entretenir ? ».

**Ce que la FAQ ne traite pas, et qui est nommé ailleurs comme un frein.** Aucune des sept questions ne porte sur la livraison, sur la discrétion du colis, sur le retour, sur le remboursement, sur la garantie ni sur la provenance du produit. Or ce sont précisément les objections que l'équipe liste et que sa propre créa « C11 GARANTIE-COLIS » fait cliquer à 14,8 %, stated. Gap nommé : la FAQ répond au produit, les freins portent sur la confiance.

**La seule question qu'un vrai client a posée à cette marque.** Une, sur toute la boîte Gmail, verified, formulaire de contact du 2026-08-26 à 11:20 UTC : « Hello, can i know when you will ship if a customer should order today? » La réponse de Dylan, deux minutes plus tard : « Hello sure ». Le dénominateur est de un message client sur 46 jours de vie commerciale. Ce n'est pas un motif. C'est une coïncidence intéressante qu'il porte précisément sur la livraison, le sujet que la FAQ ne traite pas.

**Est-ce que l'achat est rapide et pauvre en questions ?** Non, et c'est ce que la marche du site montre : 2 431 sessions pour 42 ajouts au panier sur 61 jours. Ce qui remplace la phase de questions n'est pas la vitesse, c'est le départ. Les gens ne posent pas de question, ils s'en vont. Inferred, confiance mixte.

## What people love

**Cette section ne peut pas être écrite honnêtement aujourd'hui, et l'absence est elle-même le résultat.**

Il n'existe aucun avis Raselio, aucun message de client satisfait, aucun commentaire lisible, aucune réponse de sondage. Onze hommes ont acheté, aucun n'a laissé un mot accessible. Sur les onze commandes, huit sont marquées FULFILLED et trois UNFULFILLED au 6 septembre, verified, et aucun retour n'a été demandé dans les sources, verified sur Gmail. Zéro retour n'est pas la même chose que onze clients contents : c'est simplement trop tôt, la commande la plus ancienne a onze jours.

Ce que la méthode de lecture des avis en dit importe ici : un corpus vide n'écarte aucun problème, il rend seulement tout invisible. Donc ni le plaisir ni le défaut du produit ne sont connus.

**Ce qui existe à la place, et qu'il ne faut surtout pas confondre avec de l'amour client.** La marque écrit à la place de ses clients. Advertorial, verified : « **Plus de 17 000 personnes ont déjà fait le changement. La seule chose qu'elles regrettent, c'est de ne pas l'avoir fait plus tôt.** » C'est exactement la forme du « j'aurais dû acheter plus tôt » que ce document est censé chercher dans les avis, et ici elle est écrite par la marque sur une base de onze commandes. Elle ne peut pas être utilisée comme preuve. Elle est traitée en entier dans la section suivante.

**Le blanc nommé.** Ce que les acheteurs Raselio aiment, ce qui les a surpris, ce qu'ils regrettent et ce qu'ils diraient à un ami reste inconnu. La façon la moins chère de le combler est un e-mail de suivi à onze personnes, ou un sondage post-achat d'une question. Routé à la marque.

## Brand-self-echo watch

Ici l'écho n'est pas un risque, c'est la situation entière, et il faut la nommer sans détour.

**Il n'y a pas de voix client à faire résonner. Il n'y a que la voix de la marque, et la marque l'a habillée en voix client.** Verified sur trois surfaces.

Sur la landing « 7 raisons », dans le hero, verified : « 4,7/5 » et « (1 734 avis) », avec l'attribut d'accessibilité « Note moyenne 4,7 sur 5, 1 734 avis », et le titre « 7 raisons pour lesquelles +17 000 hommes ont adopté *Raselio* ». Plus bas dans la même page, sur le bloc produit : « Noté 4,7/5 sur 1 734 avis ». Dans la barre de confiance : « +17 000 clients satisfaits ». Sur l'advertorial : « Plus de 17 000 personnes ont déjà fait le changement. » Dans la FAQ de la landing : « La majorité de nos clients constatent nettement moins de rougeurs et de démangeaisons qu'avec un rasoir. »

Face à ça, la donnée, verified : 11 commandes depuis l'ouverture, 14 fiches clients, aucune application d'avis sur la boutique, aucun métafield d'avis, aucun avis nulle part. Les 1 734 avis n'existent pas. Les 17 000 hommes n'existent pas. Et la marque soeur Trael porte le même « 1 734 avis » sur ses propres textes, stated, ce qui indique un gabarit recopié plutôt qu'un chiffre inventé pour Raselio.

Le brief du 3 septembre le repère et l'écrit, stated, verbatim : « (4) la preuve sociale est incohérente (35 000 sur les pubs, 17 000 sur le site) — les 30 créas utilisent **17 000**, le chiffre du site, à harmoniser ou à sourcer. » L'équipe a vu le problème de cohérence entre deux chiffres. Elle n'a pas encore vu, ou pas encore écrit, que les deux sont sans source.

**Ma lecture, entre les deux que la méthode propose.** La méthode demande de trancher : soit la marque a construit un discours si fort que les clients l'ont adopté, soit elle s'entend elle-même en écho. Ici ce n'est ni l'un ni l'autre, c'est un troisième cas plus simple et plus grave. Il n'y a aucun client dans la boucle. La preuve sociale n'a pas été empruntée aux clients puis renvoyée, elle a été fabriquée avant qu'un seul client existe. Toute lecture future d'un « avis client » Raselio devra d'abord vérifier que l'avis n'a pas été écrit par la marque ou hérité d'un gabarit.

**Deuxième écho, plus discret, à surveiller.** Le persona principal du brief du 3 septembre s'appelle « Hervé », 58 ans. Un des onze acheteurs de la boutique s'appelle Hervé F., commande #1007 du 2026-09-01, verified. Le brief est daté du 3 septembre, donc postérieur. Je ne peux pas prouver que le nom du persona vient de ce client, et je ne l'affirme pas. Mais l'équipe écrit aussi, stated : « Clients : Hervé, Jean-Luc, Daniel, Yannick, Michel, Antonio, Olivier… (prénoms de la génération 1955-1975 ; un e-mail contient « 1966 »). » Elle lit donc l'âge de ses acheteurs dans leurs prénoms. C'est un signal réel et c'est une inférence, pas une donnée d'âge. Le risque d'écho est que ce persona nommé d'après un vrai client soit ensuite traité comme validé par ce même client. À surveiller dans le travail persona.

## Persona signals to validate later

Ce sont des signaux, pas des personas. Ils vont au travail persona dans `personas-profile.md` et ses sources, pour être confirmés ou rejetés contre un ensemble de sources plus large. Aucun n'est construit ici, aucun ne reçoit d'âge, d'histoire ni de nom de ma part.

**Signal 1 — Les six achats attribués sont tous sur des hommes de 45 ans et plus.** Verified, ventilation compte Meta du 2026-09-06 sur 18 lignes et 850,79 € de dépense : 4 achats sur la ligne hommes 55-64, 1 sur hommes 45-54, 1 sur hommes 65+, « Not available » partout ailleurs. Attention au dénominateur : six achats, c'est minuscule. Six achats sur un compte de 46 jours ne prouvent pas qu'un homme de 30 ans n'achètera jamais ; ils prouvent qu'aucun ne l'a fait pendant que 135,80 € étaient dépensés sur les lignes hommes 18-44, soit 16,0 % de la dépense compte. Attention aussi au mélange : ces lignes sont au niveau compte et incluent ≈ 116 € de la marque soeur Trael. Confiance mixte, direction nette, valeurs à ne pas citer au centime.

**Signal 2 — La marque a écrit son ICP à 18-34 ans, et son compte achète chez les 45+.** C'est la collision centrale de ce document. Les deux dénominateurs, côte à côte.
Côté équipe : le doc du 23 août pose en tête, stated, verbatim : « **ICP :** Homme FR, 18-34 ans (persona « Kevin, 27 ans ») ». Neuf concepts créatifs ont été écrits sur cette base, tutoiement, humour cru, torse nu, et l'équipe s'en explique elle-même le 3 septembre, stated : « **Avant** (doc « raselio9adsstatiques ») : Kevin, 27 ans, tutoiement, humour cru, torse nu. **Les données contredisent ce persona sur toute la ligne.** »
Côté compte : 6 achats attribués sur 6 chez des hommes de 45 ans et plus, verified.
Ce que je ne tranche pas. Six achats ne suffisent pas à condamner une tranche d'âge, et la méthode persona est claire là-dessus : sans donnée d'achat solide, un âge est inféré, jamais vérifié. Ce que je peux dire est plus modeste et plus utile : la marque a payé pour toucher des hommes de 18 à 44 ans, elle les a touchés, ils ont cliqué, et aucun n'a acheté sur cette fenêtre. Sur les lignes hommes 18-24, 25-34 et 35-44, le compte a dépensé 135,80 € pour 19 997 impressions, 220 clics et zéro achat attribué, verified.
Ce que la donnée ne dit pas non plus. Elle ne dit pas si les 45+ achètent parce qu'ils sont la bonne cible ou parce que la créa d'août leur ressemblait davantage, ni ce qui se passerait avec une créa écrite pour un homme de 30 ans. La méthode appelle ça l'écart entre l'audience servie et l'acheteur réel, et elle demande de garder les deux lectures séparées. Ici la marque a commencé à les séparer sur le papier et pas encore dans le compte.

**Signal 3 — Les libellés des ad sets disent encore 18-55 et 18-65.** Verified au 2026-09-06 : les ad sets actifs s'appellent « RASELIO | FR | HOMMES 18-55 | LARGE | STATIQUE | V2 » et « RASELIO | FR | HOMMES 18-65 | LARGE | STATIQUE POSTIT », et le paramétrage réel de 13 des 14 ad sets est 18-65, tous genres, avec Advantage+ activé, ce qui autorise Meta à sortir du ciblage saisi. Un seul ad set, « RAZELIO | TEST CREATIVES », est verrouillé sur hommes 18-55 sans Advantage+. Or le brief du 3 septembre écrit, stated : « exclure les 18-44 des campagnes de conversion » et « Cibler hommes 45-65+ France ». Trois jours plus tard, rien n'a bougé dans le compte. C'est un écart entre la décision et l'exécution, pas un signal d'acheteur, et il est déjà nommé dans les blancs de `operations-and-team.md`.

**Signal 4 — Les prénoms et les domaines mail des onze acheteurs penchent vers une génération.** Inferred, confiance thin, et à traiter avec prudence parce que c'est une inférence sur un nom, jamais une donnée d'âge. Les onze acheteurs, verified sur la liste des commandes : Philippe M., Denis C., Jamin M., Michel M., Hervé F., Jean Luc V., De Oliveira A., W B., Olivier D., Yannick V., Daniel G. Les domaines mail : gmail.com 4, live.fr 2, bbox.fr 1, orange.fr 1, yahoo.com 1, hotmail.com 1, dstp-france.com 1. Quatre acheteurs sur onze utilisent une adresse de fournisseur d'accès français ou une messagerie historique. L'équipe fait la même lecture, stated : « prénoms de la génération 1955-1975 ; un e-mail contient « 1966 » ». Ce signal va au travail persona comme piste, pas comme fait.

**Signal 5 — Un signal faible d'achat par la partenaire.** Verified sur la ventilation compte : la ligne femmes 45-54 a reçu 28,45 € pour 15 547 impressions, 63 clics, 0,41 % de CTR et zéro achat attribué. L'équipe y voit un signal, stated : « 3 ATC, 1 paiement initié », mesuré sur sa propre lecture de la campagne principale. Zéro achat. C'est trois ajouts au panier, c'est-à-dire presque rien, et la méthode persona range de toute façon le cadeau parmi les comportements qui traversent les personas, jamais parmi les personas. À tester sur un ad set séparé, comme l'équipe le propose, mais sans lui donner le statut de persona.

**Signal 6 — Le couple est présent dans presque toute la mise en scène de la marque.** Verified sur les attributs alt des images de l'advertorial, « Lui au bout du lit, elle sous la couette » puis « Le couple réconcilié, câlin sur le lit », et sur les titres de créas, « Elle a remarqué. », « Le facteur ne saura rien. Elle, si. », « Ce soir. », stated. La marque suppose donc un homme en couple hétérosexuel. Aucune donnée ne le confirme et aucune ne l'infirme. Blanc nommé, à valider dans le travail persona.

## Open loops

**Boucle 1.** Observation : le compte a dépensé 135,80 € sur les lignes hommes 18-44 pour 19 997 impressions, 220 clics et zéro achat attribué, pendant que 566,98 € sur les lignes hommes 45 ans et plus produisaient les six achats du compte ; toute cette créa a été écrite pour un persona de 27 ans, puis réécrite sur papier pour un persona de 58 ans sans que le ciblage du compte change. Pull : Tension, elle a tiré en lisant côte à côte le « ICP : Homme FR, 18-34 ans » du 23 août et la ventilation d'achats du 6 septembre. Question : qu'est-ce qui a empêché les hommes de 18 à 44 ans d'acheter alors qu'ils ont cliqué ? Justification : si c'est la créa qui ne leur parlait pas, la marque perd la moitié de son marché en excluant cette tranche ; si c'est la tranche elle-même qui n'achète pas ce produit, chaque euro dépensé dessus est perdu et le budget doit basculer. Territoire : Personas.

**Boucle 2.** Observation : la créa « C11 GARANTIE-COLIS », qui traite la garantie et la discrétion du colis, affiche le meilleur taux de clic de tout le compte à 14,8 % d'après l'équipe, et n'a jamais reçu de budget ; les freins que l'équipe attribue elle-même à son acheteur sont pour moitié des freins de confiance et de discrétion. Pull : Gap, elle a tiré en voyant un actif à très fort clic laissé sans argent alors que le reste du compte pousse le produit. Question : quelle part des acheteurs Raselio décide au moment où la question du colis et du remboursement est réglée, plutôt qu'au moment où le produit est expliqué ? Justification : la réponse dit si la marque doit continuer d'expliquer sa tondeuse ou commencer à vendre la sécurité de l'achat, et elle change la moitié des créas du prochain lot. Territoire : Messaging.

**Boucle 3.** Observation : la marque affiche « 4,7/5 sur 1 734 avis » et « +17 000 hommes » sur ses deux landings alors qu'elle a onze commandes et aucun avis, et son acheteur observé est un homme de plus de 45 ans, un public pour qui la preuve doit venir d'une source qu'il reconnaît. Pull : Surprise, elle a tiré en comparant le compteur d'avis de la landing au nombre de commandes de la boutique. Question : quelle forme de preuve un homme de plus de 50 ans croit-il réellement pour un achat comme celui-là ? Justification : la marque n'a aucune preuve authentique à montrer aujourd'hui, donc savoir laquelle construire en premier, avis, démonstration, expert ou témoignage du même âge, décide de ce qu'il faut aller chercher avant le prochain lot créatif. Territoire : Messaging.

**Boucle 4.** Observation : 183 annonces, toutes statiques, zéro vidéo, zéro voix, alors que le public qui achète est celui qui suit le mieux une histoire longue et un format qui ressemble à ce qu'il a l'habitude de regarder. Pull : Gap, elle a tiré en cherchant un script parlé dans le compte et en n'en trouvant aucun sur 183 lignes. Question : qui, sur un écran, ferait croire à un homme de 58 ans que cet objet est sûr ? Justification : la marque n'a jamais mis un visage ni une voix sur ce produit, et savoir qui devrait porter le message décide de tout un budget de production que la marque n'a pas encore engagé. Territoire : Creators and talent.

## Appendix - customer language repository

**Avertissement de source, à lire avant tout usage.** Ce dépôt ne contient aucune parole d'acheteur Raselio, parce qu'il n'en existe aucune dans les sources accessibles. Ce qui suit est réparti en deux blocs strictement séparés. Le bloc A contient les seules paroles réellement écrites par une personne extérieure à la marque. Le bloc B contient la langue de la marque et de l'équipe, conservée parce qu'elle est le seul matériau de langage disponible et qu'elle sera comparée plus tard à la vraie voix des clients. Aucune ligne du bloc B ne doit jamais être citée comme parole de client.

### Bloc A — parole extérieure à la marque

**Question avant achat, une seule sur toute la boîte.**
- Source : formulaire de contact Shopify, relayé par mailer@shopify.com. Date : 2026-08-26, 11:20 UTC. Surface : boîte Gmail de la marque, fil 1a03dccaf7935d33. Produit : boutique Raselio. Verbatim : « Hello, can i know when you will ship if a customer should order today? » Caveat de collecte : expéditeur nommé « Sodiq », code pays FR, message en anglais ; c'est le seul message entrant non commercial de toute la boîte sur 46 jours. Réponse de la marque le même jour : « Hello sure ».

C'est tout. Le bloc A contient une phrase.

### Bloc B — langue de la marque et de l'équipe, jamais parole client

**Sur le geste et la peur, advertorial « pourquoi-pas-votre-tondeuse-a-barbe », signé « Par Julien M. », mis à jour le 31 août 2026, lu sur l'export Shopify du 2026-09-06.**
- « À lire avant de repasser votre tondeuse à barbe sous la ceinture. Surtout si vous connaissez la sensation de la repousse qui pique... et le moment gênant qui va avec. »
- « Vous connaissez ce moment. La tondeuse approche, vous retenez votre souffle, et chaque passage se fait les dents serrées. »
- « Personne n'en parle, mais tout le monde la connaît : cette micro-hésitation avant de poser la lame. Ce réflexe de contracter tout le corps. Cette séance qui ressemble plus à du déminage qu'à de l'entretien. »
- « Utiliser le même outil pour les deux, c'est découper au cutter ce qui demande un scalpel. »
- « Le pire ? Vous le savez déjà. Vous le sentez à chaque passage. Mais jusqu'ici, vous n'aviez pas d'alternative. »

**Sur la repousse et les irritations, même source.**
- « Vous faites l'effort de vous entretenir. Et 72 heures plus tard, la zone est couverte de petits boutons rouges et de poils incarnés. Précisément la semaine où vous auriez préféré être présentable. »
- « Le rasage à blanc, c'est le piège. Deux jours de peau lisse, puis une semaine de repousse dure qui gratte, qui pique, et qui se remarque. Y compris dans les moments où vous auriez préféré qu'on remarque autre chose. »
- « C'est exactement la différence entre « je me suis rasé » et « je suis entretenu ». La seconde version est celle qui fait bonne impression de près. »

**Sur le fait de ne pas voir, même source.**
- « Soyons honnêtes : cette zone, vous ne la voyez jamais entièrement. Vous devinez, vous passez la tondeuse au jugé, et vous vérifiez du bout des doigts en espérant que c'est régulier. »
- « Deviner, au-dessus d'une lame, sur la peau la plus fine du corps. Écrit noir sur blanc, ça paraît absurde. Ça l'est. »

**Sur le report et la discrétion, même source.**
- « Ce n'est pas la flemme. C'est la logistique : s'installer dans la salle de bain, trouver le bon moment, et finir par retrouver des poils sur le lavabo. Que quelqu'un d'autre risque de voir avant vous. »
- « Le colis arrive dans un emballage neutre et discret : personne n'a besoin de savoir, tout le monde finira par remarquer. »
- « *La confiance, ça se prépare avant le moment où on en a besoin.* »

**Preuve sociale sans source, à ne jamais réutiliser telle quelle.**
- Advertorial, même date : « **Plus de 17 000 personnes ont déjà fait le changement. La seule chose qu'elles regrettent, c'est de ne pas l'avoir fait plus tôt.** »
- Landing « 7-raisons », hero, lue le 2026-09-06 : « 4,7/5 », « (1 734 avis) », « 7 raisons pour lesquelles +17 000 hommes ont adopté *Raselio* », « +17 000 clients satisfaits ».
- Landing « 7-raisons », bloc produit : « Noté 4,7/5 sur 1 734 avis ».
- Landing « 7-raisons », FAQ : « La majorité de nos clients constatent nettement moins de rougeurs et de démangeaisons qu'avec un rasoir. »

**Page « Notre Histoire », export Shopify du 2026-09-06.**
- « RASELIO est née d'un constat simple : raser ses parties intimes et ses zones sensibles reste, pour beaucoup d'hommes, un moment inconfortable et un peu risqué. »
- « Chaque commande est un achat unique, sans abonnement caché ni engagement. »

**Persona écrit par l'équipe le 23 août 2026, doc « raselio9adsstatiques », stated.**
- « **ICP :** Homme FR, 18-34 ans (persona « Kevin, 27 ans ») **Douleur n°1 :** peur de se couper le scrotum · **Douleur n°2 :** repousse qui pique / poils incarnés **Objection n°1 :** « ma tondeuse à barbe suffit » »

**Persona réécrit par l'équipe le 3 septembre 2026, brief « 30 créas Meta », stated.**
- « **L'acheteur réel n'est pas « Kevin, 27 ans ».** Sur l'intégralité de l'historique Meta, 5 achats attribués sur 5 viennent d'hommes de 45 ans et plus, avec un cœur de cible 55-64 ans. »
- « **Avant** (doc « raselio9adsstatiques ») : Kevin, 27 ans, tutoiement, humour cru, torse nu. **Les données contredisent ce persona sur toute la ligne.** »
- « Il se rase déjà cette zone, avec un rasoir jetable ou une tondeuse à barbe : il connaît les coupures, les rougeurs, la repousse qui pique. Il ne cherche pas à « devenir » quelqu'un, il veut être **impeccable, propre, à l'aise** et ne plus retenir sa respiration. »
- « Freins : peur de se couper, méfiance (dropshipping), discrétion du colis, gêne du sujet, sentiment que le grooming intime est « pour les jeunes », vue de près qui baisse. »
- « Ton qui marche : **vouvoiement**, phrases courtes, humour pudique et adulte (clin d'œil au couple, jeu sur l'âge), jamais de vulgarité, jamais de moquerie. »
- « Preuves qui comptent : nombre d'hommes, garantie 2 ans, 30 jours remboursé, colis neutre, Colissimo, SAV en français, prix unique sans abonnement. »
- « Elle voit la pub, elle sait qu'il n'osera jamais commander. Elle offre »
- « Clients : Hervé, Jean-Luc, Daniel, Yannick, Michel, Antonio, Olivier… (prénoms de la génération 1955-1975 ; un e-mail contient « 1966 »). Cela recoupe exactement la ventilation Meta. »
- « Enseignements : (1) la famille « Impeccable » est le seul mécanisme prouvé sur l'achat ; (2) l'humour visuel (post-it, pixel) fait cliquer et mettre au panier mais convertit moins ; (3) les objections garantie/discrétion n'ont jamais eu de budget alors qu'elles font cliquer très fort ; (4) la preuve sociale est incohérente (35 000 sur les pubs, 17 000 sur le site) »
- « Objections ? « C'est pour les jeunes », « je vais me couper », « ma tondeuse à barbe suffit », « arnaque / ça vient de Chine », « colis pas discret », « à quoi sert la LED », « ça pique à la repousse ». »
- « Décision de ciblage : exclure les 18-44 des campagnes de conversion (ou les limiter à un ad set test à 10 % du budget). Cibler hommes 45-65+ France, placements automatiques, optimisation Achat. »

### Bloc C — citations sans source ou sans date, à résoudre avant usage

- « Approuvée par plus de 35 000 hommes ». Apparaît dans la description que l'équipe donne de la créa IMPECCABLE SERVIETTE, brief du 3 septembre, stated. Le chiffre contredit le « 17 000 » du site, l'équipe le note elle-même, et aucune source n'existe pour l'un ni pour l'autre. Ne pas réutiliser tant que l'origine n'est pas documentée.
- « ROAS 4,47 / 3,59 » et « ROAS 4,98 sur petit budget », lectures de performance par créa écrites par l'équipe les 3 et 4 septembre, stated. Elles ne correspondent pas aux ROAS retournés par l'API le 6 septembre sur les mêmes annonces, 1,27724 pour CROP TAILLE et 3,397087 pour SERVIETTE. Fenêtres et dates de lecture différentes, non résolu.

## Appendix - Parker media links

Aucun lien média Parker n'était disponible dans ce run : la marque n'existe pas dans Parker MCP au 2026-09-06 et `get_available_brands` renvoie une liste d'organisations vide. Les références ci-dessous sont les identifiants et chemins réellement disponibles, conservés à l'identique.

**Compte publicitaire Meta 1573950771030463, annonces portant un achat attribué**
- `52505820203791` — RASELIO | IMPECCABLE | CROP TAILLE — adset `52505820131591` — 2 achats
- `52505820212391` — RASELIO | IMPECCABLE | POSTIT SMILEY — adset `52505820131591` — 1 achat
- `52505820187391` — RASELIO | IMPECCABLE | SERVIETTE — adset `52505820131591` — 1 achat
- `52504788771191` — RASELIO | STATIQUE S2 | V1 — adset `52504787999391` — 1 achat
- `52504791074191` — RASELIO | STATIQUE S9 | V1 — adset `52504787999391` — 1 achat

**Campagne et ad sets cités**
- Campagne `52504787964791` — RASELIO | FR | CAMPAGNE STATIQUE | CBO 30 | V2
- Ad set `52505820131591` — RASELIO | FR | IMPECCABLE x5 | BATCH V5
- Ad set `52504787999391` — RASELIO | FR | HOMMES 18-55 | LARGE | STATIQUE | V2
- Ad set `7001068537187` — RAZELIO | TEST CREATIVES | FR + | H 18-55 | ADV+ PLACEMENTS

**Pages Shopify lues, export du 2026-09-06**
- Fiche produit `gid://shopify/Product/15882947854667`, handle `raselio-tondeuse-parties-intimes`
- Variante `gid://shopify/ProductVariant/57933901594955`
- Page `notre-histoire`
- Page `pourquoi-pas-votre-tondeuse-a-barbe`
- Page `7-raisons`
- URL citée dans les boutons d'action de l'advertorial : https://www.raselio.com/products/raselio-tondeuse-parties-intimes

**Images citées par leur texte alternatif, advertorial**
- https://cdn.shopify.com/s/files/1/1067/3265/0827/files/raselio-scene-avant-rect.png?v=1788140738 — « Lui au bout du lit, elle sous la couette »
- https://cdn.shopify.com/s/files/1/1067/3265/0827/files/raselio-scene-apres-rect.png?v=1788140739 — « Le couple réconcilié, câlin sur le lit »
- https://cdn.shopify.com/s/files/1/1067/3265/0827/files/raselio-apprehension-rect.png?v=1788140739 — « La grimace derrière le comptoir : chaque passage se fait les dents serrées »

**Documents d'équipe, Google Drive**
- « raselio9adsstatiques.md », id 1aiWsbdYNY6FMgMQx7unJlaALYMZvhj4_FW4D8aIGrJw, modifié 2026-08-23
- « RASELIO – Brief 30 créas Meta (analyse, ICP, fiches, plan) », id 1Xsu17VS85RP00yEVZZBd7jNL-BGXR_Wyn6_oFyCVB10, daté 2026-09-03

**Fil Gmail cité**
- Fil `1a03dccaf7935d33` — message client du 2026-08-26
