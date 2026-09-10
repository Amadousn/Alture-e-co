---
brand: raselio
doc: performance-targets-and-metrics
generated_on: 2026-09-06
refresh_by: 2026-10-06
quarter: 2026-Q3, avec 28 jours de diffusion publicitaire réelle et 12 jours de ventes à l'intérieur du trimestre
sources: [live ads manager via source-pulls/meta-account-campaigns-adsets.md (5 campagnes, 16 lignes d'ad sets dont 13 Raselio, réglages de ciblage, d'objectif et d'emplacement), source-pulls/meta-ads-all.md (183 annonces niveau ad, dont 163 Raselio), source-pulls/meta-account-breakdowns.md (ventilations âge x genre, plateforme x emplacement, série quotidienne de dépense au niveau compte), source-pulls/meta-performance-trend.md, source-pulls/shopify-analytics.md (8 requêtes ShopifyQL, série de 61 jours, référents, appareils, pays, pages d'entrée, nouveaux contre récurrents, pays de facturation), source-pulls/shopify-orders-and-customers.md (11 commandes, 14 fiches clients, tout l'historique commercial), Parker MCP search_facebook_ads_sql (périmètre Raselio seul, 151 annonces, entonnoir complet et tags IA, tiré le 2026-09-06 après 09:50 UTC), Parker MCP check_northbeam_connection, Parker MCP list_custom_metrics, Parker MCP search_customer_reviews_sql, Parker MCP search_facebook_ad_comments_sql, Parker MCP search_chat_history, Parker MCP get_brand_persona, sub-context-docs/ad-account-evaluation.md, sub-context-docs/operations-and-team.md, sub-context-docs/customer-journey-and-persona-discovery.md, sub-context-docs/website-and-product-audit.md, sub-context-docs/marketing-calendar-and-campaigns.md, audits/2026-Q3/90-day-performance-audit.md, audits/2026-Q3/90-day-creative-strategy-audit.md, audits/2026-Q3/90-day-diversity-audit.md, audits/2026-09/monthly-hook-audit.md, running-notes/brand-rules.md, running-notes/success-definition.md, source-pulls/drive-recap-mensuel-3-boutiques.md, source-pulls/drive-suivi-comptable-3-boutiques-2026-09-06.md, source-pulls/drive-30-statiques-meta-plan-2026-09-03.md]
benchmark_status: provisional-account-derived
account_purpose: Acquisition payante pure pour un lancement mono-produit en France. Le compte publicitaire est le seul moteur de demande de la marque et la survie commerciale en dépend entièrement. Inferred, jamais confirmé par la marque, qui n'a formulé aucun objectif à Parker.
history_windows_read: [28 jours de diffusion, du 2026-08-10 au 2026-09-06, dont 8 jours à zéro euro. La fenêtre 3 mois contient tout l'historique publicitaire de la marque. Les fenêtres 6 mois et 12 mois sont structurellement vides : le compte a été créé le 2026-07-26 et la boutique a passé sa première commande le 2026-08-26.]
methods_loaded: [ad-account-analysis.md, ad-metrics-glossary.md, analyzing-public-ad-accounts.md, killer-performance-ads.md, andromeda-v2.md, creative-strategy-by-brand-size.md]
data_limitations: [La marque n'a énoncé aucun objectif, aucun repère, aucun plafond et aucun budget à Parker. Tout ce document est un échafaudage lu dans le compte, marqué inferred, et il attend la parole de la marque pour être confirmé ou corrigé. | Northbeam n'est pas connecté, verified par check_northbeam_connection le 2026-09-06 : réponse success true, connected false. Aucune attribution multi-touche n'existe pour cette marque. | Aucune métrique personnalisée n'est définie dans le compte, verified par list_custom_metrics : count 0, formulas 0. Le coût par nouveau client, que la méthode place comme le KPI le plus vrai en e-commerce, n'existe donc pas et ne peut pas être calculé aujourd'hui. | Six achats attribués sur toute la vie du compte, 11 commandes Shopify, 12 jours de ventes. Aucun taux, aucun ratio et aucun repère de ce document n'a un dénominateur suffisant pour être stable. | Trois totaux de dépense Raselio coexistent : 684,82 € en somme de campagnes, 677,81 € en somme des 163 lignes d'annonces au pull Meta de 08:00 UTC, 676,91 € en somme des 151 annonces non-Trael renvoyées par Parker après 09:50 UTC. Les trois sont portés ; les taux d'entonnoir sont calculés sur la base Parker, seule base qui expose l'entonnoir complet. | Les ventilations par âge, genre et emplacement des audits trimestriels sont au niveau compte et incluent la marque soeur Trael, 116,37 € sur 850,79 €. La lecture Parker propre à Raselio les corrige sur les femmes et sur Audience Network et les deux lectures sont portées côte à côte. | L'économie unitaire est stated et incomplète. Coût produit 11,41 € par unité sur la feuille du 2026-08-28 et 12,71 € sur celle du 2026-09-06, sans note d'explication. Aucun coût de port Colissimo réel, aucun frais Shopify Payments, aucun abonnement, aucun coût d'outil. La contribution de 23,58 € est une contribution AVANT frais. | Shopify ne relie pas une commande à son appareil ni à son pays de session : les lectures par appareil et par pays portent sur des sessions, jamais sur des acheteurs. | Le compteur Shopify de sessions ayant terminé le paiement affiche 3 sur 61 jours quand 11 commandes existent sur la même fenêtre. Écart non résolu, signalé au constat concerné. | Aucun avis client, deux commentaires publicitaires sur tout le compte, zéro fil de conversation Parker antérieur : la voix du client est absente de ce document. | Les ventilations device_platform et country de l'API Meta n'ont pas été tirées avant l'interruption de la session de pull du matin ; la ventilation appareil de Parker les remplace partiellement.]
---

# Performance targets and metrics — Raselio

## Business state and what the account is for

**Raselio est un lancement mono-produit de 46 jours dont le compte publicitaire est le seul moteur de demande, et l'efficacité de ce compte décide de la survie de la marque. Inferred, confidence strong.**

Voici comment je lis ça, parce que le prompt demande de raisonner sur la façon dont l'entreprise gagne de l'argent plutôt que de la ranger sous une étiquette.

**Comment la marque gagne de l'argent.** Un seul article, la tondeuse intime Raselio, à 34,99 €, un seul article par commande sur les 11 commandes existantes, verified. Aucune remise appliquée sur 61 jours de série de ventes Shopify, la colonne des remises vaut zéro chaque jour, verified. Livraison Colissimo offerte. Aucun abonnement, aucune lame de rechange, aucun accessoire, aucun deuxième SKU en ligne. Le chiffre d'affaires de la marque est donc exactement le nombre de commandes multiplié par 34,99 €, et rien d'autre.

**Comment elle atteint ses clients.** Par un seul canal. Verified sur Shopify, sur 90 jours : 923 sessions viennent de Facebook, 181 d'Instagram, 24 de Google, 1 300 en direct, et 3 de moteurs divers. Sur 11 commandes, 8 portent le référent Facebook, 2 Instagram, 1 sans référent. Il n'y a aucun envoi d'e-mail marketing, aucun SMS, aucun compte organique identifié, aucun influenceur payé, aucun affilié, aucune vente en magasin, aucune place de marché. Verified par élimination dans `sub-context-docs/operations-and-team.md` : 100 % du budget marketing est sur Meta.

**Quelle maturité, quelle taille, quelle propriété.** Une entreprise individuelle, un seul opérateur, Dylan Ulry, qui fait tourner trois boutiques en parallèle, Raselio, Trael et Aerozya, verified sur le classeur comptable à trois onglets et sur la business manager à quatre comptes publicitaires. La marque soeur Trael a fait tourner ses campagnes dans le compte de Raselio du 27 au 30 août pour 116,37 €. Raselio n'a donc jamais eu la totalité de l'attention de son opérateur, ni la totalité de la propreté de son compte.

**Ce que le compte cherche donc à maximiser.** Pas de la notoriété, pas du test de marché, pas du soutien à une distribution existante, parce qu'il n'y a pas de distribution existante. Le compte cherche une commande rentable, et il n'en a pas encore trouvé une seule. La méthode sur la taille de marque situe ce niveau de dépense en dessous de sa première bande, celle où le travail consiste à mettre des tirs au but et à découvrir quels angles marchent, puis à améliorer les gagnantes une fois qu'un angle a fait ses preuves. Raselio est au tout début de la première moitié de cette phrase. Le tableau de bord d'efficacité s'applique donc pleinement, et il s'applique même avec une dureté particulière, parce qu'à 34,99 € l'unité une marque sans deuxième achat ne peut rien rattraper plus tard.

**Ce que la marque en dit elle-même.** Rien à Parker, verified : `search_chat_history` renvoie zéro fil le 2026-09-06. Ce qu'elle en dit dans ses propres documents, stated, est une colonne de tableur : la feuille « Récap mensuel — 3 boutiques » du 2026-08-28 suit par boutique les colonnes Commandes, CA, Coût produit, Dépense pub, Marge brute, Bénéfice net, ROAS moyen, Marge %, Statut, et la ligne d'août pour Raselio porte le statut « Perte ». Le seul objectif lisible dans une source est donc de faire passer cette cellule de « Perte » à autre chose.

## How to read this brand's numbers

C'est la section qui commande toutes les autres, et elle tient en six règles.

**1. Six achats. Aucun chiffre de ce document n'est stable.** L'événement optimisé du compte est `offsite_conversion.purchase` et il s'est produit six fois depuis le 2026-08-10, verified. Le repère de sortie de phase d'apprentissage est de 50 événements de conversion par semaine et par ad set. Le compte a 6 événements à vie répartis sur 13 ad sets. Aucun ad set n'a jamais approché la sortie d'apprentissage. Concrètement : une différence de coût par achat entre deux annonces de ce compte n'est pas une information, c'est du bruit, et il faut le redire à chaque fois qu'on est tenté de classer.

**2. Le bon dénominateur n'est pas celui que tout le monde utilise, et ça change le diagnostic.** L'équipe écrit, stated, brief du 2026-09-03, verbatim : « Le vrai problème est post-clic : CTR 3 % mais CVR site ≈ 0,2 % et CPA 86 € pour un break-even à 21 € », et ajoute « CVR sessions ≈ 0,23 % : le site convertit 5 à 10 fois moins qu'une fiche produit e-commerce saine (1-2 %). » Ce chiffre est calculé sur toutes les sessions de la boutique. Or, verified sur Shopify, 989 des 2 404 sessions ventilées par appareil et par pays viennent d'un ordinateur de bureau aux États-Unis, alors que les 11 commandes sont toutes facturées en France. Recalculé sur le seul trafic social, celui que la publicité paie : 11 commandes pour 1 104 sessions Facebook et Instagram, soit **1,00 %**. Le détail par canal, verified : 8 commandes pour 923 sessions Facebook, soit 0,87 %, et 2 commandes pour 181 sessions Instagram, soit 1,10 %.

C'est un renversement de lecture important et il faut le poser proprement. Le trafic payant français de cette marque ne convertit pas cinq à dix fois sous la normale. Il convertit dans le bas de la bande saine de 1 à 2 %. Confidence: mixed, parce que 11 commandes ne prouvent rien et parce que Shopify ne relie pas une commande à son pays de session, donc l'appariement entre les 1 104 sessions sociales et les 11 commandes est une inférence de bon sens et non un chemin tracé.

**3. Le problème n'est donc pas le taux de conversion, c'est le prix du clic rapporté à la marge.** Voici l'arithmétique complète, et c'est la phrase la plus utile du document. Verified sur la lecture Parker du périmètre Raselio : 673 clics sur lien pour 676,91 €, soit **1,01 € par clic sur lien**, et 6 achats pour ces 673 clics, soit **0,89 % de clic à l'achat**. Multipliez : 1,01 divisé par 0,0089 donne 113,5 € par achat, ce qui est exactement le coût par achat observé. Pour ramener ce coût sous le seuil de rentabilité d'environ 21 € que l'équipe a calculé elle-même, stated, il faut soit un taux de clic à l'achat de 4,8 % au prix de clic actuel, soit un clic à 0,19 € au taux actuel. Aucune de ces deux valeurs n'est absurde en soi ; les deux ensemble disent que l'écart à combler est d'un facteur cinq environ, et qu'il ne se comblera pas par un ajustement de page.

**4. Le seuil de rentabilité en ROAS n'est pas 1, il est autour de 1,48.** À 34,99 € de prix et 11,41 € de coût produit stated, la contribution est de 23,58 € avant port et avant frais de paiement. Pour que la dépense publicitaire soit couverte par la contribution, il faut donc 34,99 divisé par 23,58, soit **1,48 de ROAS**, et davantage dès qu'on ajoute le Colissimo offert et les frais Shopify Payments, qui ne sont documentés nulle part. Le ROAS Meta actuel est de 0,31 sur le périmètre Raselio de Parker, de 0,307 sur la lecture d'audit, et de 0,372 sur la campagne active. Toute lecture qui traite 1,0 comme la ligne de flottaison de cette marque se trompe d'un tiers.

**5. Meta voit environ la moitié de ce qui se passe.** Meta attribue 6 achats en fenêtre par défaut, 7 jours après clic et 1 jour après vue. Shopify compte 11 commandes sur la même période, verified. Cinq commandes sur onze n'apparaissent dans aucun rapport publicitaire. À ce volume ce n'est pas une preuve de sous-attribution, mais toute lecture faite dans Meta seule est basse d'environ un tiers, et le vrai chiffre d'affaires de la période est celui de Shopify, 377,32 € brut. C'est pour ça que ce document porte deux mesures d'efficacité partout et jamais une seule.

**6. Le coût d'acquisition ne peut pas être jugé sans valeur vie, et la valeur vie de cette marque est probablement égale à une commande.** La méthode est ferme là-dessus : un coût d'acquisition au-dessus de la première commande n'est un problème que si la valeur vie ne le rattrape pas. Ici, verified : 11 clients, 0 rachat, un taux de retour client de 0,0 sur 90 jours, un seul SKU, aucun outil d'e-mail branché pour reparler à qui que ce soit. La fenêtre est de neuf jours et ne permet de conclure à rien de définitif, mais la structure de l'offre, elle, permet de conclure : sans deuxième produit et sans moyen de recontact, la première commande est l'événement économique complet. C'est la raison pour laquelle le coût par achat est ici un juge sévère et non une approximation.

**Docs de méthode chargés et signés.** This is everything I know about Andromeda v2. This is everything I know about tailoring creative strategy to brand size.

## Performance history and metric story

**La fenêtre 12 mois et la fenêtre 6 mois sont vides.** Le compte a été créé le 2026-07-26 et a dépensé son premier euro le 2026-08-10. La fenêtre 3 mois contient donc la totalité de l'histoire publicitaire de la marque. Ce n'est pas une limitation de pull, c'est l'âge de l'entreprise, et ça veut dire que tout ce qui suit se lit en jours.

**Le récit en trois temps, verified sur la série quotidienne de dépense.**

*Temps un, du 10 au 16 août : le compte achète de l'attention qui n'existe pas.* 105,69 € consommés, 130 829 impressions, des CPM entre 0,22 € et 0,63 €, des CTR entre 0,27 % et 0,62 %, zéro commande. Ce sont les chiffres d'un inventaire à très bas prix. Aucune vente n'a lieu pendant cette semaine ; la boutique compte zéro commande jusqu'au 26 août.

*Temps deux, du 17 au 24 août : huit jours à zéro euro.* Aucune source n'explique cette extinction. Elle coupe la fenêtre d'apprentissage du compte en deux et elle représente un tiers de sa vie publicitaire. Blanc nommé, routé à la marque.

*Temps trois, depuis le 25 août : le régime actuel.* Nouvelle campagne à 50 € par jour. Les CPM remontent entre 13 € et 23 €, les CTR entre 1,65 % et 3,73 %. La première commande tombe le 2026-08-26 à 10:59 UTC, à 39,90 €. Toutes les suivantes sont à 34,99 €. Onze commandes en douze jours, réparties ainsi, verified : deux le 26 août, une le 27, une le 28, deux le 30, une le 1er septembre, une le 2, une le 3, deux le 4, zéro le 5 et le 6.

**Ce que les métriques ont fait, une par une.**

| Métrique | Ce qui s'est passé sur 28 jours | Lecture |
|---|---|---|
| Dépense quotidienne | 0 € avant le 10 août, environ 15 € par jour du 10 au 16, 0 € du 17 au 24, pic à 120,55 € le 28 août, puis 40 à 55 € par jour depuis le 1er septembre | Deux régimes séparés par un trou, pas une montée en charge |
| CPM | 0,22 à 0,63 € en semaine un, 13,52 à 23,18 € depuis le 25 août | Bascule de régime d'inventaire, pas une inflation d'enchère |
| CTR tous clics | 0,27 à 0,62 % en semaine un, 1,65 à 3,73 % depuis le 25 août | La créative n'a pas changé de qualité, l'emplacement a changé |
| CTR sur lien | 1,56 % à vie sur le périmètre Raselio, calculé sur 673 clics lien et 43 206 impressions | Au-dessus du repère d'environ 1 %, mais bien plus bas que le 2,5 % tous clics souvent cité dans ce dossier |
| Coût par achat | Inexistant avant le 26 août, 114,14 € à vie, 94,16 € sur la campagne active | Entre quatre et cinq fois au-dessus du seuil de rentabilité stated |
| ROAS Meta | 0 avant le 26 août, 0,31 à vie sur le périmètre Raselio | Il faut 1,48 pour couvrir le seul coût produit |
| Panier moyen | 39,90 € sur la première commande, 34,99 € sur les dix suivantes | Baisse de prix le premier jour de vente, jamais expliquée |
| Fréquence | 2,34 sur la campagne active, 32 430 impressions pour 13 869 personnes | Repère à 1,2 ou moins en prospection ; le compte repasse déjà devant les mêmes yeux |
| Part nouveaux clients | 11 nouveaux, 0 récurrents, taux de retour 0,0 % | Cent pour cent acquisition, par construction |

**Un point de mesure à corriger avant qu'il ne se propage.** Les audits de ce trimestre citent 2,46 % et 2,73 % comme des « CTR sur lien ». La lecture Parker sépare les deux colonnes : 1 082 clics tous types pour un CTR de 2,5 %, et 673 clics sur lien seulement. Le taux de clic sortant réel du compte est donc de **1,56 %**, verified par calcul sur les deux champs. Il reste au-dessus du repère d'environ 1 % de la méthode, donc la conclusion « le compte n'a pas de problème d'attention » tient. Mais elle tient avec un tiers de marge en moins qu'annoncé, et c'est cette valeur qu'il faut suivre.

**Ce qui explique les mouvements, séparé de ce que les chiffres prouvent.** Aucun lancement, aucune promotion, aucun changement de prix planifié, aucune contrainte de stock n'apparaît dans une source pour expliquer la bascule du 25 août. Ce qui est daté, verified : la campagne de test du 14 août, la seule qui verrouillait hommes 18-55 sans Advantage+, a été mise en pause, et la campagne V2 a démarré le 25 août avec l'audience Advantage+ activée et un budget au niveau campagne. Inferred, confidence mixed : c'est en ouvrant l'âge et en changeant de campagne que le compte a changé de régime d'inventaire et trouvé son acheteur. Un seul événement de calendrier tombe dans la fenêtre, la rentrée scolaire, et il a produit un lot de quatre créas à 28,42 € sans achat.

## Efficiency and return targets

**La marque n'a énoncé aucun objectif d'efficacité, à personne, jamais. C'est le blanc central de ce document et il est routé à la marque.**

Ce qui existe à la place, et qu'il ne faut pas confondre avec un objectif :

**Un seuil de rentabilité, stated, calculé par l'équipe elle-même.** « Break-even à 21 € », brief du 2026-09-03. Ce n'est pas un objectif, c'est le point où la marque cesse de perdre de l'argent sur une commande. Il est calculé sur une contribution avant frais de port et avant frais de paiement, donc il est optimiste d'un montant inconnu.

**Un plafond de test, stated.** 42 € de coût par achat pendant la phase de test, écrit dans le même brief. C'est le chiffre le plus proche d'un objectif que cette marque possède, et c'est un plafond de tolérance et non une cible.

**Une règle de coupe, stated.** « Couper une créa à 45 € dépensés sans ATC, ou à 90 € sans achat. » C'est une définition de perdante, pas de gagnante. Verified sur le compte : elle n'a jamais eu l'occasion de mordre, parce qu'aucune annonce n'a atteint 90 € de dépense, la plus grosse étant à 63,61 €.

**Un objectif de statut, stated.** Passer la ligne Raselio de la feuille mensuelle du statut « Perte » à un bénéfice net positif. Aucune date, aucun montant.

**Où en est le compte contre ces trois repères, verified.**

| Repère | Origine | Valeur | Où en est le compte | Écart |
|---|---|---|---|---|
| Seuil de rentabilité par commande | stated, équipe | environ 21 € | 114,14 € à vie, 94,16 € sur la campagne active | facteur 4,5 à 5,4 |
| Plafond de test par achat | stated, équipe | 42 € | 114,14 € à vie | facteur 2,7 |
| Coût par commande réelle Shopify | inferred, calcul Parker | pas de cible | 62,26 € pour 684,82 € et 11 commandes | au-dessus du plafond de test |
| ROAS de couverture du coût produit | inferred, calcul Parker | 1,48 | 0,31 à vie, 0,372 campagne active | facteur 4 à 4,8 |
| Rendement média global, ventes Shopify sur dépense Raselio | inferred, calcul Parker | pas de cible | 0,55 | il en faudrait environ 1,48 |

**Objectifs par plateforme : sans objet.** Il n'y a qu'une plateforme. La question ne se pose pas tant que Meta est le seul canal payant.

**Ce qu'il faut faire dire à la marque, et pourquoi ça bloque tout le reste.** Un seuil de rentabilité n'est pas un objectif. Une marque peut décider d'acheter au-dessus de son seuil pendant une période d'apprentissage, ou en dessous pour construire une trésorerie. Tant que Dylan n'a pas dit à quel coût par commande il est prêt à acheter un client et pendant combien de temps, Parker ne peut pas dire si une annonce à 40 € par achat est un succès ou un échec. C'est routé en boucle ouverte.

## New vs returning focus

**Cent pour cent acquisition, sans ambiguïté et sans contradiction entre le discours et l'argent.**

Verified sur Shopify, fenêtre 90 jours : 11 nouveaux clients, 0 clients récurrents, taux de retour client 0,0. Verified sur le compte publicitaire : les 13 ad sets Raselio sont tous des ad sets de prospection large en France, aucun ad set de reciblage n'existe, aucune audience personnalisée n'apparaît dans les réglages tirés, et l'outil de tendance Meta renvoie lui-même le contexte de cohorte `Audience Type: prospecting (new customers)` sur toutes les annonces analysées.

Trois conséquences, et la troisième est celle qu'on oublie.

**Première conséquence : il n'y a pas de désaccord à signaler.** Le prompt demande de noter quand le discours et la dépense divergent. Ici ils convergent parfaitement, parce qu'il n'existe aucun client à recibler à l'échelle où le reciblage a un sens. Onze personnes ne font pas une audience.

**Deuxième conséquence : le compte fabrique des créatives de bas d'entonnoir qu'il n'a nulle part où livrer.** Verified : des annonces d'offre, de garantie et de logistique existent, `RS · C11 garantie-colis`, `RS · PP06 colis-ouvert`, `R23 Impeccable pour 34,99`, `R12 Kit complet 34,99`, et elles cumulent quelques euros. Selon la doctrine du niveau de conscience, ce sont des leads d'offre destinés aux plus conscients. La marque n'a aucun public de ce type et n'a aucun ad set pour l'accueillir.

**Troisième conséquence : aucune exclusion d'acheteurs n'est paramétrée**, verified par absence dans les réglages tirés. À 11 clients, une liste d'exclusion ne changerait presque rien aujourd'hui. Mais la méthode rappelle que les exclusions sont un réglage de compte à tenir à jour, et la fréquence du compte est déjà à 2,34. Le dispositif doit exister avant qu'il ne compte.

**Ce que le coût par nouveau client dirait, et pourquoi il n'existe pas.** La méthode de lecture de compte pose que la plupart des marques e-commerce optimisent sur le coût par achat d'un nouveau client, et que la plupart des comptes ont déjà cette métrique personnalisée en place. Verified sur Parker le 2026-09-06 : Raselio n'a aucune métrique personnalisée définie, ni conversion, ni événement, ni formule. Aujourd'hui la distinction ne coûte rien puisque cent pour cent des acheteurs sont nouveaux. Le jour où un rachat apparaîtra, elle manquera.

## Spend levels and trajectory

**Échelle, verified.** 684,82 € en somme des 4 campagnes Raselio, ou 677,81 € en somme des 163 lignes d'annonces au pull Meta, ou 676,91 € en somme des 151 annonces non-Trael renvoyées par Parker. À l'échelle du compte entier, Trael inclus, 850,79 €. C'est la totalité de l'argent publicitaire jamais dépensé par cette marque.

**Budget engagé aujourd'hui.** 50 € par jour sur une seule campagne active, en budget de campagne, réparti entre onze ad sets. Les quatre campagnes en pause portaient chacune 30 € par jour. Verified.

**Trajectoire réelle, verified sur la série quotidienne.**

| Fenêtre | Dépense | Lecture |
|---|---|---|
| 2026-07-26 au 2026-08-09 | 0 € | Compte créé, aucune diffusion |
| 2026-08-10 au 2026-08-16 | 105,69 € | Premier régime, inventaire à très bas CPM, aucune vente |
| 2026-08-17 au 2026-08-24 | 0 € | Extinction totale de 8 jours, inexpliquée |
| 2026-08-25 au 2026-08-31 | environ 340 € au niveau compte, pic à 120,55 € le 28 août | Redémarrage, premières commandes |
| 2026-09-01 au 2026-09-05 | 54,49 € puis 40,73 €, 44,80 €, 52,96 €, 43,19 €, au niveau compte | Palier stable autour de 45 à 55 € par jour |

**Direction de marche : palier, pas montée en charge.** Le compte n'est ni en accélération ni en repli. Il a fait un pic de lancement à 120,55 € le 28 août puis s'est installé autour du budget quotidien engagé. Ce qui monte, en revanche, c'est le nombre d'annonces : neuf lots en douze jours, 105 annonces créées entre le 2 et le 5 septembre. **Ce n'est pas le budget qui augmente, c'est le nombre de choses entre lesquelles il est divisé.** Verified par calcul : 3,74 € de dépense moyenne par annonce sur la vie du compte, 27 annonces à zéro euro, 132 annonces sous 5 €.

**Répartition par plateforme, deux lectures qui ne s'accordent pas et que je porte toutes les deux.**

| Découpe | Source | Facebook | Instagram | Audience Network | Autres |
|---|---|---|---|---|---|
| Emplacement, niveau compte, Trael inclus, 850,79 € | `meta-account-breakdowns.md` | fil 481,54 € soit 56,6 %, Reels 68,73 €, Stories 10,42 € | fil 146,38 € soit 17,2 %, Reels 49,86 €, Stories 30,85 € | 46,85 € soit 5,5 % pour 115 901 impressions | 15,60 € |
| Plateforme de publication, Raselio seul, 676,91 € | Parker MCP, 2026-09-06 | 465,51 € soit 68,8 % | 203,35 € soit 30,0 % | 8,02 € soit 1,2 % | messenger 0 € |

L'écart sur Audience Network est de 38 € et il n'est pas explicable avec ce qui est en main. Les deux découpes ne mesurent pas la même chose et les deux périmètres diffèrent. **Conséquence pratique : l'idée qu'Audience Network est le plus gros levier mécanique disponible sur ce compte est incertaine et doit être vérifiée avant qu'on agisse dessus.** Data-limited.

**Répartition par appareil, verified sur Parker, périmètre Raselio.** Mobile 633,94 €, soit 93,7 %. Bureau 42,97 €, soit 6,3 %. Ça compte pour la lecture du site : la publicité paie presque exclusivement du mobile, et les 989 sessions de bureau venues des États-Unis dans les analytics Shopify ne viennent donc presque certainement pas de la publicité.

**Ce qu'une recommandation doit tenir en tête.** 50 € par jour, en une seule main, sans budget écrit et sans engagement signé par personne. Verified dans `sub-context-docs/operations-and-team.md` : aucune enveloppe mensuelle, annuelle ou de test n'existe dans une source, et la dépense a bougé de 17,34 € à 120,55 € puis à 40,73 € en huit jours. Une recommandation qui suppose un engagement de dépense sur trois mois n'a personne pour la signer.

## Ad platforms in use

**Une seule plateforme active, et c'est vérifié par plusieurs chemins.**

**Meta, verified.** Compte `1573950771030463`, nom « raselio », devise EUR, créé le 2026-07-26, statut ACTIVE, dans la business manager « BM 1 ». Toutes les campagnes en objectif `OUTCOME_SALES`, tous les ad sets en `OFFSITE_CONVERSIONS` optimisés sur `offsite_conversion.purchase`. Les emplacements activés couvrent facebook, instagram, audience_network, messenger et threads, avec à l'intérieur le fil, la colonne de droite, l'instream, marketplace, les stories, la recherche, le biz discovery, les Reels, l'overlay Reels, le profil, les notifications, l'explore, la recherche Instagram et le flux Threads, sur mobile et sur bureau. Les filtres de sécurité de marque sont sur FACEBOOK_RELAXED, AN_RELAXED et FEED_RELAXED.

**Google Ads : non, avec la nuance qui compte.** Verified sur Shopify, 24 sessions viennent de Google sur 90 jours et zéro commande. Vingt-quatre sessions en trois mois, c'est le volume d'une marque qui n'existe pas dans l'index, pas celui d'un annonceur. Rien dans les sources ne montre un compte Google Ads.

**TikTok, Pinterest, Snapchat, Amazon, place de marché : aucun signal.** Aucune trace dans les référents Shopify, dans les 46 fils Gmail, dans les 32 fichiers Drive, ni dans les documents de l'équipe. Marqué absent par lecture du vide, pas par confirmation de la marque.

**Ce que ça veut dire, lu à travers la méthode.** La méthode signale le cas d'une marque qui s'étale sur plusieurs plateformes avant d'avoir maîtrisé la principale. Raselio est le cas opposé et c'est la bonne posture pour sa taille : une seule plateforme, un seul pays, un seul produit. Le risque n'est pas la dispersion, c'est la dépendance. La marque a un seul canal de demande, et ce canal a déjà été restreint une fois, verified dans les signaux Gmail. Le jour où le compte tombe, la marque n'a rien.

## KPI benchmarks

**La marque n'a aucun repère établi, et à 46 jours c'est la réponse honnête plutôt qu'un manque.** Un repère se construit sur de l'historique. Raselio a 28 jours de diffusion, 6 achats attribués et 11 commandes. Son premier travail n'est pas de battre un repère, c'est d'en fabriquer un. Ce qui suit est donc un échafaudage lu dans le compte, marqué **inferred et provisoire**, à remplacer dès que la marque donne ses chiffres ou dès qu'un mois complet de diffusion stable existe.

**Repères provisoires dérivés du compte, base Raselio seule, Parker, 151 annonces et 676,91 €, à vie.**

| Métrique | Moyenne du compte | Repère de méthode | Lecture |
|---|---|---|---|
| CTR sur lien sortant | 1,56 % | environ 1 % et plus | Au-dessus de la barre. C'est le seul indicateur franchement sain du compte |
| CTR tous clics | 2,5 % | pas de repère | Ne pas confondre avec le précédent, l'écart est d'un tiers |
| Coût par clic sur lien | 1,01 € | pas de repère | Correct pour la France sur une catégorie grand public |
| CPM | 15,67 € | pas de repère | CPM de fil français normal. Le 4,96 € qui traîne dans les audits est un CPM de compte écrasé par un inventaire à bas prix |
| Coût pour 1 000 comptes atteints | 40,73 € sur la campagne active, calculé sur 564,94 € et 13 869 personnes | pas de repère | À suivre contre le CPM : le rapport entre les deux est la fréquence, et il vaut déjà 2,34 |
| Fréquence | 2,34 sur la campagne active | 1,2 ou moins en prospection | Hors zone saine pour un compte de quatre semaines |
| Clic sur lien vers vue de page d'arrivée | 75,2 %, soit 506 sur 673 | pas de repère | Sain. Un quart des clics abandonne avant le chargement, ce qui est normal |
| Vue de page vers ajout au panier | 5,9 %, soit 30 sur 506 | pas de repère | C'est le premier vrai décrochage de l'entonnoir |
| Ajout au panier vers paiement initié | 40,0 %, soit 12 sur 30 | pas de repère | Correct |
| Paiement initié vers achat | 50,0 %, soit 6 sur 12 | pas de repère | Le second décrochage, et le plus cher |
| Clic sur lien vers achat | 0,89 %, soit 6 sur 673 | pas de repère | Il faudrait environ 4,8 % pour être rentable au prix de clic actuel |
| Coût par ajout au panier | 22,56 € | pas de repère | Presque le prix de la marge unitaire pour un simple ajout au panier |
| Coût par paiement initié | 56,41 € | pas de repère | |
| Coût par achat | 112,82 € sur la base Parker, 114,14 € sur la base d'audit | seuil stated à 21 €, plafond stated à 42 € | Le chiffre qui décide, et il est loin |
| ROAS | 0,31 | 1,48 pour couvrir le seul coût produit | |
| Phase d'apprentissage | 6 événements à vie sur 13 ad sets | 50 par semaine et par ad set | Jamais commencée |

**Taux d'accroche et taux de rétention : sans objet, pas manquants.** Les 163 annonces Raselio sont des images fixes. Ces deux métriques sont des métriques vidéo et n'existeront que le jour où la marque produira une vidéo. Le repère de méthode, 30 % minimum et idéalement 45 à 50 % d'accroche, 12 à 15 % de rétention, est noté ici pour le jour où il deviendra applicable.

**Le repère qui manque le plus.** Le coût par nouveau client. La méthode en fait le vrai nord d'une marque en acquisition, et il demande une conversion personnalisée dans le compte. Verified : il n'y en a aucune. Aujourd'hui la différence est nulle puisque tous les acheteurs sont nouveaux, mais l'outil doit être en place avant qu'elle cesse de l'être.

## Purchase cycle, LTV, and metric meaning

**Ce que le produit et le modèle impliquent, lu depuis le compte et depuis la boutique.**

**Le prix ment sur la difficulté de la décision.** 34,99 €, une seule variante, un seul article par commande, livraison offerte, aucune option à choisir. Sur le papier c'est un achat d'impulsion. Dans les faits la marque paie environ 94 € pour obtenir un achat à 35 €, verified sur la campagne active. Un vrai achat d'impulsion ne se comporte pas comme ça. Inferred, confidence mixed, et c'est la lecture que porte déjà `sub-context-docs/customer-journey-and-persona-discovery.md` : ce qui coûte cher ici n'est pas l'argent, c'est la permission. L'homme doit s'autoriser à reconnaître qu'il se rase là, à croire qu'un objet à 34,99 € acheté à une marque inconnue ne va pas le blesser, et à accepter que le colis arrive chez lui.

**Le délai jusqu'à l'achat n'est pas mesurable et l'absence est instructive.** Aucune source ne relie une impression, un clic et une commande dans le temps. Ce que le compte permet de dire, verified : la fenêtre d'attribution est de 7 jours après clic et 1 jour après vue, et les 6 achats attribués tombent tous dans les douze jours qui suivent le redémarrage du 25 août. Ce que Shopify permet de dire, verified : entre 1 116 et 4 154 sessions par commande selon le compteur retenu. L'achat n'arrive pas d'un coup.

**Le niveau de recherche et de risque perçu est élevé pour le prix.** Les objections que l'équipe a elle-même listées, stated, sont toutes des objections de risque et non de prix : « c'est pour les jeunes », « je vais me couper », « ma tondeuse à barbe suffit », « arnaque, ça vient de Chine », « colis pas discret », « à quoi sert la LED », « ça pique à la repousse ». Sept objections nommées, dont cinq portent sur le risque et la discrétion. La conséquence pour la lecture des métriques est directe : le dernier clic sous-évalue systématiquement la créative qui a fait le travail de réassurance en amont, parce que c'est l'annonce d'offre qui prend le crédit.

**La valeur vie est très probablement égale à la première commande, et c'est structurel.** Verified : un seul SKU, 11 clients, 0 rachat, taux de retour client 0,0 sur 90 jours, aucun ESP branché, aucune séquence de relance, aucun programme de parrainage. La fenêtre de neuf jours ne permet pas de conclure sur le comportement de rachat lui-même, mais l'architecture de l'offre permet de conclure sur la possibilité du rachat : il n'y a rien à racheter et aucun moyen de le proposer. La méthode dit de ne jamais juger un coût d'acquisition sans valeur vie, et d'utiliser le comportement de rachat, l'abonnement, le réapprovisionnement et l'extension de gamme comme substituts quand elle manque. **Les quatre substituts sont vides ici, et leur vide est lui-même la réponse : sans deuxième produit, le coût par achat doit être jugé contre la contribution d'une seule commande.**

**Ce que ça vaut, en euros, avec ses réserves.**

| Élément | Valeur | Statut |
|---|---|---|
| Prix de vente | 34,99 €, après 39,90 € sur la toute première commande | verified sur les 11 commandes |
| Coût produit par unité | 11,41 € sur la feuille du 2026-08-28, 12,71 € sur celle du 2026-09-06 | stated, les deux feuilles se contredisent sans note |
| Contribution avant port et frais | 23,58 € au coût produit le plus bas, 22,28 € au plus haut | inferred par soustraction |
| Coût du Colissimo offert par commande | inconnu | blanc nommé |
| Frais de paiement Shopify Payments | inconnu | blanc nommé |
| Coût de structure mensuel | inconnu, aucune facture d'outil dans une source | blanc nommé |
| Valeur vie | 34,99 € de chiffre d'affaires, 23,58 € de contribution avant frais, sur la base d'un achat unique | inferred, confidence mixed |
| Seuil de rentabilité annoncé par l'équipe | environ 21 € | stated |

L'écart entre la contribution calculée, 23,58 €, et le seuil annoncé par l'équipe, 21 €, laisse environ 2,58 € pour le port et les frais. Un Colissimo France coûte plus que ça au tarif public. **Le seuil de rentabilité réel de cette marque est donc probablement plus bas que 21 €, et personne ne connaît sa vraie valeur.** C'est le blanc le plus lourd du document, parce qu'il déplace tous les objectifs vers le bas.

## Provisional winner definition

**La règle du décile supérieur ne peut pas s'appliquer à ce compte, et il faut le dire plutôt que de la simuler.**

La méthode prescrit de prendre la moyenne du compte comme base et le décile supérieur des annonces réellement diffusées comme ensemble provisoire de gagnantes, en refusant explicitement de couronner une annonce à dépense triviale. Appliquons le filtre honnêtement, verified sur les 163 annonces : 27 annonces n'ont jamais dépensé un centime, 105 sont sous 1 €, 132 sont sous 5 €. Deux annonces seulement dépassent 50 € de dépense. Le décile supérieur d'annonces « réellement exposées » est donc composé d'annonces qui, pour la plupart, ne le sont pas. **L'ensemble provisoire de gagnantes de ce compte est vide, et c'est le résultat correct, pas un échec de calcul.**

**Quelle métrique le compte cherche vraiment à maximiser.** La question n'est pas neutre. Le business est un lancement mono-produit dont la survie dépend de la publicité, l'objectif de campagne est `OUTCOME_SALES`, l'événement optimisé est l'achat, et il n'y a pas de valeur vie pour rattraper un coût trop haut. La métrique de classement est donc **le coût par achat**, et non le ROAS, parce qu'à prix unique et panier d'un seul article les deux disent la même chose et que le coût par achat se compare directement au seuil de rentabilité.

**Définition provisoire de gagnante, à remplacer par la parole de la marque.** Une annonce est provisoirement gagnante quand elle a dépensé au moins 90 €, ce qui est le seuil que l'équipe a elle-même choisi comme moment où l'on juge une créa sans achat, et qu'elle produit à ce niveau un coût par achat au plus égal à 42 €, le plafond de test stated, avec au moins trois achats. Marqué **provisoire et inferred**, fenêtre à vie du compte, ensemble comparable les 163 annonces Raselio, confidence thin.

**Combien d'annonces passent ce filtre aujourd'hui : zéro.** Verified. Aucune annonce n'a jamais atteint 90 € de dépense, la plus grosse est à 63,61 €, et aucune ne porte plus de deux achats.

**Ce que le compte a de mieux, nommé pour ce que c'est.** Trois annonces portent un coût par achat sous le plafond de 42 € : `IMPECCABLE | SERVIETTE` à 10,30 € de dépense et 1 achat, `IMPECCABLE | CROP TAILLE` à 54,56 € et 2 achats à 27,28 €, `RASELIO | STATIQUE S9 | V1` à 26,98 € et 1 achat. La méthode prévient exactement contre la lecture qui suit : une annonce à faible dépense et forte apparence de rendement ramasse souvent le fruit facile, convertit des gens qui auraient converti de toute façon, et s'éteint vite. Sur un achat unique, `SERVIETTE` et son ROAS apparent de 3,40 sont un accident statistique jusqu'à preuve du contraire. **Ce sont des directions à financer pour savoir, pas des gagnantes.**

**Au niveau de la campagne, la lecture est différente et c'est le bon niveau.** La méthode est claire sur le budget au niveau campagne : quand on utilise un budget de campagne, on juge au niveau campagne, pas au niveau de l'annonce, à cause de l'effet de répartition. Une seule campagne active porte les 6 achats, à 94,16 € par achat pour 564,94 € de dépense. **C'est le seul chiffre de ce document qui a le droit d'être appelé une performance, et il est quatre à cinq fois trop cher.**

## Channel mix and how the channels relate

**Il n'y a pas de mélange de canaux. Il y a un canal et trois surfaces qui n'ont jamais été activées.**

**Ce qui existe, verified.**

| Canal | Volume | Rôle | Mesurable ? |
|---|---|---|---|
| Meta payant, Facebook et Instagram | 684,82 € de dépense, 1 104 sessions sociales sur 90 jours, 10 commandes sur 11 avec référent social | Génère la demande ET la récolte. Il fait les deux à lui seul | Oui, en dernier clic |
| Direct | 1 300 sessions sur 2 431, soit 53,5 % | Inconnu. Mélange probable de trafic non identifié, de retours de session et de trafic automatisé | Non |
| Recherche organique | 24 sessions Google, 1 Bing, 1 Baidu, sur 90 jours, 0 commande | Inexistant | Sans objet |
| E-mail et SMS | Aucun outil branché, aucun envoi | Inexistant | Sans objet |
| Organique social | Aucun compte identifié. Un plan de trois publications Facebook du 14 août, rien ne confirme qu'il a été publié | Inexistant | Sans objet |
| Affiliation, influence, place de marché, magasin | Aucun | Inexistant | Sans objet |

**Ce que ça change pour la lecture, et c'est plus subtil qu'il n'y paraît.** Le prompt prévient que dans une marque à plusieurs canaux, l'un génère la demande et l'autre la récolte, et le modèle d'attribution décide lequel reçoit le crédit. Raselio n'a pas ce problème, elle en a un autre : **son canal unique fait les deux métiers en même temps, et rien ne les sépare.** La même campagne, la même créative et le même budget servent à faire découvrir la marque à un homme qui n'en a jamais entendu parler et à le faire acheter dans la même session. La méthode de lecture de compte nomme précisément ce piège quand elle rappelle qu'on ne compare pas une annonce de haut d'entonnoir et une annonce de bas d'entonnoir sur le même terrain, et qu'un compte lourd en statiques penche souvent vers la récolte de demande. Ce compte est à cent pour cent statique et à cent pour cent prospection : il achète du froid avec un outil qui, dans la doctrine, penche vers le chaud.

**Les 1 300 sessions directes méritent d'être posées comme une question, pas comme un canal.** 53,5 % des sessions d'une boutique de 46 jours sans notoriété, sans organique, sans e-mail et avec 24 sessions Google. La lecture prudente, inferred, confidence thin : une partie de ces sessions est du trafic automatisé, ce qui est cohérent avec les 989 sessions de bureau venues des États-Unis alors que la publicité est à 93,7 % mobile et que les 11 commandes sont toutes françaises. Une autre partie est probablement du retour de session mal attribué. Mais rien dans les pulls ne le prouve et personne ne devrait construire un plan dessus.

**Ce que la structure de canal impose au scoreboard.** Avec un seul canal, le rendement média global et le ROAS Meta devraient converger. Ils ne convergent pas : 0,55 contre 0,31. L'écart de 0,24 est la part du résultat que Meta ne voit pas, cinq commandes sur onze. **Sur une marque à canal unique, cet écart n'est pas un problème d'attribution entre canaux, c'est une mesure directe de ce que la fenêtre d'attribution de Meta laisse tomber.** C'est une information utile et il faut la suivre dans le temps.

## Attribution model and its gaps

**Le modèle en une phrase : dernier clic dans Meta, fenêtre par défaut, doublé d'un référent de commande côté Shopify, sans rien pour réconcilier les deux.**

**Ce qui est verified.** Fenêtre d'attribution `default` sur tous les ad sets, soit 7 jours après clic et 1 jour après vue. Événement optimisé `offsite_conversion.purchase`. Côté boutique, Shopify attribue chaque commande à un référent de source et de nom, ce qui donne 8 Facebook, 2 Instagram et 1 sans référent sur 11 commandes.

**Où le modèle est aveugle, dans l'ordre d'importance.**

**1. Il perd cinq commandes sur onze.** Le trou le plus gros et le plus simple. Meta voit 6 achats, la boutique en compte 11. Si ces cinq commandes viennent d'un clic publicitaire mal attribué, alors le vrai coût par commande de la marque est de 62,26 € et non de 114,14 €, ce qui change complètement le jugement porté sur le compte. Si elles viennent d'ailleurs, la marque a une source de demande qu'elle ne connaît pas. Personne ne peut trancher avec les outils en place.

**2. Il ne peut pas voir la réassurance.** La méthode est explicite : pour un produit acheté vite avec peu de recherche et peu de risque, le dernier clic est directionnellement utile ; pour un produit dont le chemin d'achat est plus long, plus fondé sur la confiance et plus socialement chargé, l'annonce qui a fait le vrai travail il y a une semaine ne reçoit aucun crédit. Le produit de Raselio est du second type : cinq de ses sept objections écrites portent sur le risque et la discrétion. **Le modèle de mesure de cette marque sous-évalue donc structurellement les créatives de réassurance, celles qui parlent de la garantie, du remboursement et du colis neutre.** C'est exactement la famille de créatives qui affiche les plus hauts taux de clic du compte et n'a jamais reçu de budget.

**3. Il ne distingue pas nouveau et récurrent.** Aucune conversion personnalisée n'existe. Aujourd'hui c'est sans conséquence, demain non.

**4. Il mélange deux marques.** La marque soeur Trael a diffusé dans le même compte publicitaire. Le pixel du compte a donc appris sur deux produits qui n'ont rien à voir, et toute ventilation lue au niveau compte mélange 116,37 € de dépense étrangère.

**5. Il ne relie rien à un appareil ni à un pays côté boutique.** Shopify ne dit pas si une commande vient d'un mobile ou d'un bureau, ni de quel pays la session venait. Les 989 sessions de bureau américaines restent donc dans le dénominateur du taux de conversion sans qu'on puisse les en sortir proprement.

**Ce qu'il faut demander à la marque, parce que ce n'est pas lisible de l'extérieur.** Si le pixel a été installé via l'application Shopify officielle ou à la main, si l'API de conversions est branchée, et si le domaine a été vérifié dans la business manager. Ces trois réglages décident d'une partie de l'écart entre 6 et 11. Routé.

## Attribution stack

**La pile tient en deux outils et aucun des deux n'est un outil d'attribution.**

| Couche | En place ? | Détail |
|---|---|---|
| Rapport de plateforme, Meta Ads Manager | Oui | La seule source de coût par achat et de ROAS de la marque |
| Analytics Shopify | Oui | Sessions, entonnoir, référents, pays, appareils, pages d'entrée |
| Outil d'attribution tiers | **Non** | Northbeam non connecté, verified le 2026-09-06 par `check_northbeam_connection`, réponse `success: true, connected: false`. Aucun autre outil n'apparaît dans une source |
| Sondage post-achat | **Non** | Aucun sondage en place. Aucune source de premier rang ne relie un acheteur réel à sa raison d'achat |
| Application d'avis | **Non** | Zéro avis client, verified sur Parker et sur la boutique |
| Tableau de bord d'entreprise mixte | Oui, à la main | La feuille « Récap mensuel — 3 boutiques », tenue manuellement dans un tableur |
| Métriques personnalisées dans le compte | **Non** | `list_custom_metrics` renvoie 0 conversion, 0 événement, 0 formule |
| Vente au détail, place de marché, revendeur | **Non** | Aucune distribution physique |

**Ce que cette pile permet et ne permet pas.** Elle permet de savoir combien la marque a dépensé, combien de commandes sont arrivées et par quel réseau social elles se disent venues. Elle ne permet pas de savoir quelle annonce a été vue avant la commande quand l'attribution Meta rate, ni pourquoi la personne a acheté, ni ce qu'elle a comparé avant. **La marque lit un signal plus mince et plus trompeur qu'elle ne le croit, et cette minceur est la principale raison pour laquelle il faut lire tous ses chiffres avec la réserve posée en tête de document.**

**Le manque le moins cher à combler et le plus utile.** Un sondage post-achat d'une question sur la page de remerciement. Onze commandes, onze réponses possibles, et ce serait la première fois que quelqu'un chez Raselio saurait pourquoi un homme a acheté. Ce n'est pas une recommandation de ce document, c'est le constat que la source de premier rang de tout le brain est vide et qu'elle est à portée de main.

## Blended vs channel-level reporting

**La marque se lit en mixte, au niveau de la boutique, et à ce jour ça ne lui coûte rien.**

Verified sur la feuille « Récap mensuel — 3 boutiques » du 2026-08-28 : les colonnes suivies par boutique sont Commandes, CA, Coût produit, Dépense pub, Marge brute, Bénéfice net, ROAS moyen, Marge % et Statut. C'est une lecture d'entreprise, un chiffre unique par boutique et par mois, et le « ROAS moyen » qui y figure est un ratio de chiffre d'affaires total sur dépense totale et non le ROAS que Meta calcule.

**Pourquoi ça ne coûte rien aujourd'hui.** La lecture en mixte devient dangereuse quand plusieurs canaux se cachent les uns derrière les autres, parce qu'un canal qui profite du travail d'un autre paraît meilleur qu'il n'est. Raselio n'a qu'un canal. Son chiffre mixte et son chiffre par canal décrivent donc presque la même chose, et l'écart entre les deux, 0,55 contre 0,31, mesure exactement une chose utile, la part que l'attribution Meta ne voit pas.

**Pourquoi il faut le noter quand même.** Deux raisons. D'abord parce que la feuille lag sur la boutique : la ligne d'août de Raselio porte, stated, 2 commandes, 74,89 € de chiffre d'affaires et 198,96 € de dépense, alors que Shopify montre 8 commandes en août. Un tableau de bord tenu à la main sur trois boutiques par une seule personne dérive, et une décision prise sur cette feuille est prise sur des chiffres en retard. Ensuite parce que le jour où un deuxième canal apparaît, e-mail, organique ou recherche, la lecture en mixte deviendra immédiatement trompeuse, et la marque n'aura aucun outil pour séparer.

**Ce que ça implique quand on lit ce que la marque dit d'elle-même.** Ses affirmations sur ce qui marche viennent d'un tableur mensuel en retard et d'une lecture d'Ads Manager qui rate un tiers de ses ventes. Ce ne sont pas des chiffres faux, ce sont des chiffres partiels, et il faut les lire comme tels sans jamais les jeter.

## In-store and retail attribution gap

**Raselio n'a aucune distribution physique, donc le trou d'attribution magasin, au sens habituel, n'existe pas ici.** Verified : vente exclusivement directe depuis la boutique Shopify `8piiys-jj.myshopify.com`, livraison Colissimo, 11 commandes toutes facturées en France, aucune enseigne, aucun revendeur, aucune place de marché, aucun distributeur dans une source. Le prompt demande de nommer le trou plutôt que de le remplir : ici le champ est vide parce que le canal n'existe pas, et c'est la bonne réponse.

**Mais le problème dont le trou magasin est le cas le plus visible existe bel et bien, sous une autre forme, et il vaut d'être nommé ici.** Le prompt pose que le vrai sujet est plus large : un résultat produit à un endroit et capté à un autre, sans ligne pour les relier. Raselio a trois versions de ce problème.

**1. Cinq commandes sur onze arrivent sans être vues.** C'est la version principale. La marque a produit une vente et son système de mesure ne l'a rattachée à rien.

**2. Le colis neutre coupe la marque du client au moment où elle pourrait le plus lui parler.** Verified sur les politiques boutique et sur les créatives : la marque promet un colis neutre. C'est un argument de vente réel dans cette catégorie. C'est aussi, mécaniquement, le renoncement à l'un des rares points de contact d'une marque directe avec son acheteur, la boîte. Onze hommes ont reçu un colis anonyme et aucun d'eux n'a été invité à laisser un avis, à parler à la marque ou à revenir.

**3. La marque n'a aucun moyen de recontacter ses onze acheteurs.** Aucun ESP, aucune séquence, aucun SMS. Elle a leurs adresses e-mail dans Shopify et elle ne s'en sert pas. C'est l'équivalent exact, pour une marque en ligne, de l'acheteur en rayon que le magasin ne sait pas rappeler.

**Ce que ça change dans la lecture de tous les chiffres au-dessus.** Rien sur le coût par achat, qui reste ce qu'il est. Beaucoup sur la valeur vie, parce que la valeur vie de un dont ce document se sert n'est pas une fatalité de catégorie, c'est le résultat d'une architecture. Un deuxième SKU, une lame de rechange ou une simple relance changeraient le seuil de rentabilité de cette marque plus vite que n'importe quelle amélioration de créative.

## Open loops

**Boucle 1 — Personne n'a jamais dit combien coûte réellement une commande livrée.**

Observation. La contribution unitaire utilisée partout dans ce brain, 23,58 €, est une soustraction entre un prix de 34,99 € et un coût produit de 11,41 € stated par la feuille du 2026-08-28. La feuille du 2026-09-06 porte 12,71 € pour la même ligne, sans note d'explication. Aucun coût de port Colissimo, aucun frais Shopify Payments, aucun abonnement d'outil n'apparaît dans une source. L'équipe annonce pourtant un seuil de rentabilité d'environ 21 €, ce qui laisse 2,58 € pour un port offert et des frais de paiement.

Le pull : **Tension.** Elle a tiré parce que deux feuilles de la même personne ne donnent pas le même coût produit, et parce que le seuil qui découle des deux ne laisse pas assez de place pour un colis postal français.

La question : combien coûte réellement à Raselio une commande livrée, tout compris ?

Justification. Chaque objectif de ce document descend de ce nombre. Si la contribution réelle est de 18 € au lieu de 23,58 €, le seuil de rentabilité tombe, le plafond de test de 42 € devient encore plus intenable, et l'idée même de rentabilité sur un achat unique doit être rediscutée. Seule la marque peut répondre. **Brand-routed.**

Territoire : Product.

**Boucle 2 — La moitié du trafic de la boutique ne ressemble pas à des acheteurs.**

Observation. Verified sur Shopify, 90 jours : 989 des 2 404 sessions ventilées viennent d'un ordinateur de bureau aux États-Unis, et 1 300 des 2 431 sessions sont marquées en direct. Pendant ce temps la publicité est à 93,7 % mobile et les onze commandes sont toutes facturées en France. Le taux de conversion de la boutique, 0,45 %, est calculé sur ce dénominateur. Recalculé sur le seul trafic social, il vaut 1,00 %.

Le pull : **Surprise.** Elle a tiré parce que le chiffre qui sert de diagnostic à toute l'équipe, un site qui convertirait cinq à dix fois sous la normale, change complètement quand on retire du dénominateur un trafic qui n'a jamais pu acheter.

La question : d'où viennent les 989 sessions de bureau américaines qui arrivent sur cette boutique française ?

Justification. Si ce trafic est automatisé ou hors cible, alors le site de Raselio convertit dans la bande normale et le problème de la marque est le prix du clic, pas la page. Les deux réponses envoient le prochain trimestre dans des directions opposées, l'une vers la publicité et l'autre vers la boutique.

Territoire : Product.

**Boucle 3 — Le prix a baissé le premier jour de vente et personne ne sait pourquoi.**

Observation. Verified sur les 11 commandes : la commande #1001 du 2026-08-26 à 10:59 UTC est passée à 39,90 €, et les dix suivantes toutes à 34,99 €. Le site affiche « 34,99 € au lieu de 75 € ». La marque n'a jamais appliqué la moindre remise depuis, la colonne des remises de Shopify vaut zéro sur les 61 jours de la série.

Le pull : **Curiosité.** Elle a tiré parce que c'est le seul mouvement de prix de toute l'histoire de la marque, qu'il a eu lieu le jour même de la première vente, et qu'il déplace la contribution unitaire de près de cinq euros.

La question : qu'est-ce qui a fait passer le prix de 39,90 € à 34,99 € le jour de la première commande ?

Justification. Le prix fixe la contribution, la contribution fixe le seuil de rentabilité, et le seuil fixe tous les objectifs de ce document. Si la baisse était une décision de positionnement, elle est acquise et le scoreboard se construit dessus. Si c'était un test, la marque a une élasticité de prix jamais explorée et Black Friday arrive dans 82 jours. **Brand-routed.**

Territoire : Product.

**Boucle 4 — La marque n'a aucune deuxième vente possible, et personne n'a vérifié si c'est un choix.**

Observation. Verified : un seul SKU en ligne, 11 clients, 0 rachat, taux de retour client 0,0, aucun outil d'e-mail, aucune lame de rechange, aucun accessoire. Le document de travail de l'équipe du 2026-08-13 mentionne pourtant, stated, que le fournisseur propose déjà « tête rasoir à grille, embout nez, set 7 coupe-ongles, trousse cuir ».

Le pull : **Gap.** Elle a tiré parce que tout le scoreboard de cette marque est écrasé par un seul fait, la première commande est l'événement économique complet, et parce que ce fait n'est pas une contrainte de catégorie mais un choix d'architecture que personne n'a interrogé.

La question : que peut valoir un client Raselio au-delà de sa première commande ?

Justification. Un deuxième article vendu à un client déjà acquis change le coût d'acquisition tolérable plus vite que n'importe quelle amélioration de créative, et il déplacerait le seuil de rentabilité de 21 € vers le haut au lieu de forcer la publicité à devenir cinq fois plus efficace. Seule la marque connaît son catalogue fournisseur et son intention. **Brand-routed.**

Territoire : Product.

## Appendix - Parker media links

La marque est apparue dans Parker MCP le 2026-09-06 vers 09:50 UTC sous `brand_id a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, organisation « Dylan's Org ». Liens et chemins préservés tels quels.

### Vues Parker des annonces qui portent les six achats

| Annonce | Dépense et achats | Page Parker |
|---|---|---|
| `RASELIO \| IMPECCABLE \| CROP TAILLE` · 52505820203791 | 54,56 € · 2 achats · 27,28 € par achat | https://app.heyparker.ai/dashboard/facebook-ads/performance?adId=52505820203791&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 |
| `RASELIO \| IMPECCABLE \| POSTIT SMILEY` · 52505820212391 | 35,15 € · 1 achat · 35,15 € par achat | https://app.heyparker.ai/dashboard/facebook-ads/performance?adId=52505820212391&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 |
| `RASELIO \| IMPECCABLE \| SERVIETTE` · 52505820187391 | 10,30 € · 1 achat · 10,30 € par achat | https://app.heyparker.ai/dashboard/facebook-ads/performance?adId=52505820187391&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 |
| `RASELIO \| STATIQUE S2 \| V1` · 52504788771191 | 32,74 € · 1 achat · 32,74 € par achat | https://app.heyparker.ai/dashboard/facebook-ads/performance?adId=52504788771191&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 |
| `RASELIO \| STATIQUE S9 \| V1` · 52504791074191 | 26,98 € · 1 achat · 26,98 € par achat | https://app.heyparker.ai/dashboard/facebook-ads/performance?adId=52504791074191&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 |

### La plus grosse dépense unitaire du compte, sans achat

| Annonce | Dépense | Page Parker |
|---|---|---|
| `RASELIO \| POSTIT \| GAGNANTE` · 52505593472791 | 63,61 € · 0 achat attribué · 4 ajouts au panier · 1 paiement initié | https://app.heyparker.ai/dashboard/facebook-ads/performance?adId=52505593472791&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 |

### Pages d'arrivée du compte

- https://www.raselio.com/products/raselio-tondeuse-parties-intimes
- https://www.raselio.com/pages/pourquoi-pas-votre-tondeuse-a-barbe
- https://www.raselio.com/pages/7-raisons
- https://www.raselio.com/products/cutlab-essentials-bundle

### Artefacts sources, chemins préservés

| ID | Source | Chemin |
|---|---|---|
| M001 | Compte Meta, campagnes, ad sets, ciblage, objectifs, emplacements | `source-pulls/meta-account-campaigns-adsets.md` |
| M002 | Compte Meta, ventilations âge, genre, emplacement, série quotidienne | `source-pulls/meta-account-breakdowns.md` |
| M003 | Compte Meta, 183 annonces niveau ad | `source-pulls/meta-ads-all.md` |
| M004 | Compte Meta, 884 creatives, 224 paires titre plus texte uniques | `source-pulls/meta-creatives-copy.md` |
| M005 | Compte Meta, tendances de performance niveau annonce | `source-pulls/meta-performance-trend.md` |
| S001 | Shopify, 8 requêtes ShopifyQL, ventes, sessions, référents, appareils, pays, pages d'entrée, nouveaux contre récurrents | `source-pulls/shopify-analytics.md` |
| S002 | Shopify, 11 commandes et 14 fiches clients, tout l'historique commercial | `source-pulls/shopify-orders-and-customers.md` |
| D001 | Feuille « Récap mensuel — 3 boutiques », modifiée le 2026-08-28 | `source-pulls/drive-recap-mensuel-3-boutiques.md` |
| D002 | Feuille « Suivi comptable — 3 boutiques », modifiée le 2026-09-06 | `source-pulls/drive-suivi-comptable-3-boutiques-2026-09-06.md` |
| D003 | Brief d'équipe, 30 statiques et plan Meta, 2026-09-03, source du seuil de 21 €, du plafond de 42 € et de la règle de coupe | `source-pulls/drive-30-statiques-meta-plan-2026-09-03.md` |
| A001 | 90-day performance and delivery audit, 2026-Q3 | `audits/2026-Q3/90-day-performance-audit.md` |
| A002 | 90-day creative strategy audit, 2026-Q3 | `audits/2026-Q3/90-day-creative-strategy-audit.md` |
| A003 | 90-day creative diversity audit, 2026-Q3 | `audits/2026-Q3/90-day-diversity-audit.md` |
| A004 | Monthly hook audit, 2026-09 | `audits/2026-09/monthly-hook-audit.md` |
| C001 | Ad account evaluation, le document jumeau qui lit la créative de ce même compte | `sub-context-docs/ad-account-evaluation.md` |

### Appels Parker MCP effectués pour ce document, avec leur réponse

| Appel | Réponse | Date |
|---|---|---|
| `check_northbeam_connection` | `success: true, connected: false` | 2026-09-06 |
| `list_custom_metrics` | `success: true, enabled: true, count: 0, metrics: [], formulas: []` | 2026-09-06 |
| `search_customer_reviews_sql` | `totalReviews: 0` | 2026-09-06 |
| `search_facebook_ad_comments_sql` | 2 commentaires sur tout le compte | 2026-09-06 |
| `search_chat_history` mode `listThreads` | 0 fil | 2026-09-06 |
| `search_facebook_ads_sql`, périmètre Raselio, `metricsMode: lifetime_only` | 151 annonces, 676,91 €, 6 achats, entonnoir complet et tags IA | 2026-09-06 |
| `get_brand_persona` | Document de contexte de marque complet, 14 sections, produit par Parker et non par l'équipe | 2026-09-06 |
