---
brand: raselio
doc: post-purchase-surveys
generated_on: 2026-09-07
refresh_by: 2026-10-07
sources_read: [Parker MCP brand `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37` (org « Dylan's Org ») — `semantic_search_post_purchase_survey` appelé le 2026-09-07 en mode lookup pur, sans paramètre `query`, sans filtre de plateforme, de sondage, de question, de date ni de segment NPS, `topK: 50`, ce qui énumère tout ce qui existe pour la marque ; `lookup_post_purchase_survey` appelé le 2026-09-07 sur `questionId: q_01`, `limit: 50`, les quatre types numériques nps, rating, star et currency, sans borne de date. Surfaces de collecte vérifiées hors Parker : source-pulls/shopify-store-and-product.md (fiche produit, 4 pages, 6 politiques, aucune application de sondage, aucune page de remerciement personnalisée relevée), source-pulls/shopify-orders-and-customers.md (11 commandes, 14 fiches clients, tout l'historique), source-pulls/gmail-brand-signals.md (46 fils, aucun e-mail de sondage sortant, aucune réponse entrante). Docs amont lus : personas/voice-of-customer/voc-corpus-profile.md, personas/voice-of-customer/voice-of-customer.md, personas/voice-of-customer/voc-trigger-moment.md, source-pulls/personas/ad-account.md, source-pulls/personas/ad-comments.md, source-pulls/personas/customer-reviews.md, sub-context-docs/customer-journey-and-persona-discovery.md, sub-context-docs/website-and-product-audit.md, running-notes/brand-rules.md, running-notes/success-definition.md]
responses_read: 0 réponses. Le corpus a été interrogé deux fois le 2026-09-07, avec deux outils différents, et les deux renvoient `totalResponsesForBrand: 0`. Dénominateur des répondants possibles : 11 commandes payées du 2026-08-26 au 2026-09-04. Taux de réponse : 0 sur 11, soit 0,0 %. Aucun sondage n'existe, donc aucune question n'a jamais été posée à un acheteur Raselio.
data_limitations: [ZÉRO RÉPONSE, ET ZÉRO SONDAGE. La distinction compte : ce n'est pas un sondage qui existerait avec un taux de réponse nul, c'est l'absence de tout dispositif. Interrogé, pas supposé. `semantic_search_post_purchase_survey` en mode lookup sans aucun filtre renvoie `results: []`, `count: 0`, `uniqueResponses: 0`, `totalResponsesForBrand: 0`, `collectionExists: true`, avec le message « This brand has no post-purchase survey responses yet — they need to upload a CSV or connect a survey platform first. » `lookup_post_purchase_survey` sur q_01 renvoie `surveyResponseIds: []`, `matchedAnswers: 0`, `totalResponsesForBrand: 0` et le même message. Conséquence directe : ce document ne peut porter aucune raison d'achat déclarée, aucun classement de raisons, aucune réponse à la question de découverte, aucun état d'acheteur, aucune divergence entre déclaration et comportement observée sur un même individu. La méthode place le sondage post-achat au premier rang de l'échelle de preuve, parce que c'est la seule source qui relie une réponse à un achat confirmé. Raselio n'a rien à ce rang, ni au deuxième rang qui est l'avis propriétaire, également à zéro. Sa preuve la plus haute est donc la donnée de commande, troisième rang, sur onze lignes. Aucune surface de collecte n'existe : aucune application de sondage sur la boutique Shopify, aucun e-mail de suivi sortant dans les 46 fils Gmail lus, la page « Contactez-nous » a un corps vide, et le seul point de contact publié est raseliosupport@gmail.com depuis le 2026-09-03. Le dénominateur est de 11 acheteurs et la commande la plus ancienne a douze jours au 2026-09-07, donc même un outil branché aujourd'hui rendrait une poignée de réponses au mieux. Aucune donnée de rachat, aucune valeur à vie, aucune cohorte, puisque zéro client récurrent sur onze.]
methods_loaded: [creative-strategy-context/persona-research-and-creative-strategy-process.md, creative-strategy-context/customer-review-mining-method.md, creative-strategy-context/emotional-delivery-and-timing.md, creative-strategy-context/advertising-to-older-audiences.md, creative-strategy-context/creative-strategy-fundamentals.md]
---

# Post-purchase surveys — persona signal — Raselio

## La piste de recherche, avant les lectures

**Le corpus de sondage post-achat de Raselio a été interrogé et il a renvoyé zéro réponse.** Deux outils, deux chemins, le même résultat, le 2026-09-07.

**Appel 1, énumération complète.** `semantic_search_post_purchase_survey`, marque `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, sans paramètre `query`, ce qui bascule l'outil en mode lookup et énumère tout ce qui existe au lieu de classer par similarité. Aucun filtre de plateforme, de sondage, d'identifiant de question, de type de question, de date ni de segment NPS. `topK: 50`. Réponse : `results: []`, `count: 0`, `uniqueResponses: 0`, `totalResponsesForBrand: 0`, `collectionExists: true`, et le message « This brand has no post-purchase survey responses yet — they need to upload a CSV or connect a survey platform first. »

**Appel 2, recherche par question numérique.** `lookup_post_purchase_survey`, `questionId: q_01`, `limit: 50`, les quatre types numériques nps, rating, star et currency, sans borne de date. Cet outil passe par un autre chemin, il cherche des réponses chiffrées et non du texte embarqué. Réponse : `surveyResponseIds: []`, `count: 0`, `matchedAnswers: 0`, `totalResponsesForBrand: 0`, même message.

**La distinction qui compte, et il faut la poser tout de suite.** Ce n'est pas un sondage qui existerait avec un taux de réponse nul. C'est l'absence de tout dispositif. Le message des deux outils est explicite : la marque doit d'abord téléverser un fichier ou brancher une plateforme de sondage. Vérification indépendante côté boutique : aucune application de sondage sur Shopify, aucune page de remerciement personnalisée relevée dans l'export, aucun e-mail de suivi sortant dans les 46 fils Gmail de la marque, et une page « Contactez-nous » au corps vide. **Aucune question n'a jamais été posée à un acheteur Raselio.**

**Le dénominateur.** Onze commandes payées, du 2026-08-26 au 2026-09-04, toutes d'un seul article, toutes facturées en France, verified. Onze acheteurs possibles, zéro sondé, taux de réponse 0 sur 11.

**Pourquoi ce zéro pèse plus lourd que les autres zéros de ce cerveau.** `persona-research-and-creative-strategy-process.md` classe les sources par force de preuve et met le sondage post-achat tout en haut, avant les avis propriétaires, avant les données de commande, avant les avis de détaillant, avant les communautés, avant le signal concurrent. La raison est simple : c'est la seule source qui relie un acheteur confirmé à sa raison d'acheter, au moment où il vient de payer. Raselio n'a rien à ce rang. Elle n'a rien non plus au deuxième, l'avis propriétaire, également à zéro et vérifié séparément. Sa source la plus haute est donc la donnée de commande, troisième rang, sur onze lignes qui ne contiennent aucun mot.

**Les méthodes chargées avant l'analyse.** `persona-research-and-creative-strategy-process.md` pour l'échelle de preuve ci-dessus et pour la règle qui dit que sans donnée d'achat un âge est inféré et jamais vérifié. `customer-review-mining-method.md` pour la règle du dénominateur, pour la discipline de couverture de source qui demande de déclarer la passe partielle quand une source majeure manque, et pour la règle qui dit qu'un corpus vide se nomme comme vide. `emotional-delivery-and-timing.md` pour les quatre phases TEEP, Trigger, Exploration, Evaluation, Purchase, qui servent ici à nommer précisément quelle partie du parcours reste invisible. `advertising-to-older-audiences.md` parce que les six achats attribués du compte sont tous chez des hommes de 45 ans et plus et que ce document est le prior de la catégorie pour ce public. `creative-strategy-fundamentals.md` pour la posture des boucles ouvertes.

**La leçon du cachemire, qui gouverne ce document même vide.** La méthode rappelle qu'une réponse de sondage est le récit conscient, présentable et rétrospectif que l'acheteur donne de lui-même, et que le moi qui a vraiment payé ne remplit pas de formulaire. Une marque qui demande aux gens quel tissu ils veulent obtient la réponse premium, fabrique le produit premium, et découvre au passage en caisse que le moi économe n'était pas dans le sondage. Cette leçon a une conséquence inattendue pour Raselio : elle n'a pas de réponses de sondage à mal interpréter, mais elle a **une liste d'objections et un persona écrits par son équipe qui occupent exactement la place qu'occuperaient de mauvaises réponses de sondage**. C'est le sujet de la section sur l'écho de marque plus bas.

## Identity signals observed

**Aucun. Zéro sur zéro réponse.**

Personne n'a jamais dit à cette marque qui il est, ce qu'il faisait avant, ni pourquoi il a acheté. La section que ce document existe pour produire est vide, et le vide est le résultat.

**Ce qui existe à la place, et qui n'est pas de la parole d'acheteur.** Les six achats attribués du compte publicitaire, verified sur la ventilation Parker au niveau annonce, lifetime, le 2026-09-07 : quatre sur la ligne hommes 55-64, un sur hommes 45-54, un sur hommes 65 et plus. Zéro sous 45 ans. C'est une donnée de plateforme et pas une déclaration : Meta classe l'utilisateur, l'utilisateur ne s'est pas décrit.

Il faut peser ce chiffre honnêtement, dans les deux sens. Six achats, c'est minuscule. Six achats ne prouvent pas qu'un homme de trente ans n'achètera jamais ce produit. Ils prouvent qu'aucun ne l'a fait pendant que 135,80 € étaient dépensés sur les lignes hommes 18-44 pour 19 997 impressions et 220 clics, verified. Et la direction est confirmée par deux lectures indépendantes : la ventilation de dépense donne 82,4 % chez les plus de 45 ans côté Parker, et les prénoms et domaines de messagerie des onze acheteurs penchent vers la même génération.

**Ce qu'un sondage aurait donné et que rien d'autre ne peut donner.** L'âge que Meta attribue est une classification de plateforme. L'âge qu'un homme donne lui-même est une déclaration. Les deux ne se valent pas et ils ne se remplacent pas. Aujourd'hui, personne ne sait si l'homme de 58 ans du compte publicitaire correspond à un homme de 58 ans réel, ni ce qu'il pense être en train d'acheter.

## Stated reasons, frequency-ranked

**Aucune raison déclarée. Zéro sur zéro réponse. Le classement demandé par cette section n'existe pas.**

Il faut résister ici à la tentation la plus forte de tout ce document, et je la nomme pour que personne ne l'oublie plus tard. **Raselio possède une liste de raisons et d'objections très assurée, et elle n'a pas été écrite par des clients.** Elle a été écrite par l'équipe le 2026-09-03. Elle a exactement la forme d'un dépouillement de sondage. Elle n'en est pas un.

La voici, stated, verbatim, uniquement pour qu'elle soit reconnaissable et jamais réutilisable comme réponse d'acheteur : « Objections ? « C'est pour les jeunes », « je vais me couper », « ma tondeuse à barbe suffit », « arnaque / ça vient de Chine », « colis pas discret », « à quoi sert la LED », « ça pique à la repousse ». »

Sept objections. Zéro dénominateur. Zéro date de collecte. Zéro source. Aucune de ces sept n'a jamais été confrontée à un mot d'acheteur, et le seul commentaire de fond que la marque ait reçu, « Plus rien de la bête sauvage qui sommeille en nous », n'en contient aucune.

Même chose pour la liste des freins, stated, verbatim du même document : « Freins : peur de se couper, méfiance (dropshipping), discrétion du colis, gêne du sujet, sentiment que le grooming intime est « pour les jeunes », vue de près qui baisse. » Et pour la liste des preuves qui comptent, stated, verbatim : « Preuves qui comptent : nombre d'hommes, garantie 2 ans, 30 jours remboursé, colis neutre, Colissimo, SAV en français, prix unique sans abonnement. »

Ces trois listes sont de bonnes hypothèses. Elles sont écrites par des gens qui regardent leur compte publicitaire et leurs commandes. Elles ne sont pas des raisons déclarées et elles ne peuvent pas être classées par fréquence, parce qu'elles n'ont aucune fréquence.

**Le blanc nommé, avec sa forme exacte.** La question « pourquoi avez-vous acheté aujourd'hui » n'a jamais été posée à un acheteur Raselio, et personne ne connaît la réponse.

## Stated-versus-revealed divergences

C'est la section que la méthode désigne comme la plus précieuse de ce document, et il faut être exact sur ce qu'elle peut porter ici.

**Ce qui ne peut pas être fait.** La divergence classique, où un même acheteur déclare une raison et en révèle une autre par son comportement, est impossible à observer. Il faut une déclaration d'un côté et un comportement de l'autre, sur la même personne. Le côté déclaration est vide. Blanc nommé.

**Ce qui peut être fait, et c'est une divergence d'un autre genre.** Ce document peut poser côte à côte ce que la marque déclare de son acheteur et ce que le comportement observé montre. Ce n'est pas la divergence que la méthode cherche, et je le dis pour qu'aucun lecteur ne la range à cette place. Mais c'est la seule tension mesurable ici, et elle est nette. Les trois lignes ci-dessous sont posées comme **hypothèses à tester contre les sources comportementales**, comme la méthode l'autorise quand la donnée de sondage ne peut pas atteindre le comportement.

**Divergence 1 — l'âge de l'acheteur.** Déclaré côté équipe le 2026-08-23, stated, verbatim : « **ICP :** Homme FR, 18-34 ans (persona « Kevin, 27 ans ») ». Déclaré côté document de contexte de marque stocké dans Parker, lu le 2026-09-07, stated : cinq profils types dont le plus âgé a 47 ans, Thomas 38 ans, Nabil 26 ans, Sandrine 44 ans, Damien 31 ans, Lucas 47 ans, avec la recommandation d'audience « French men 25-50 (broad) ». Observé côté compte, verified : 6 achats sur 6 chez des hommes de 45 ans et plus, dont 4 sur 55-64. L'équipe a elle-même relevé la contradiction le 2026-09-03, stated, verbatim : « **Les données contredisent ce persona sur toute la ligne.** » **Le côté chargé pour la décision est le comportement**, parce qu'il vient d'achats et non d'une intention écrite, mais son dénominateur est de six et il ne condamne pas une tranche d'âge.

**Divergence 2 — ce qui fait acheter contre ce qui fait cliquer.** Déclaré côté équipe, stated, verbatim : « Preuves qui comptent : nombre d'hommes, garantie 2 ans, 30 jours remboursé, colis neutre ». Observé côté compte, verified : la créa qui porte la garantie et le colis neutre, `52506457654991` « RS · C11 garantie-colis », affiche 14,06 % de taux de clic, le meilleur du compte, et a reçu 1,33 € sur 677,81 €. Les quatre achats de la famille « Impeccable » viennent d'annonces qui ne parlent ni de garantie ni de colis, mais d'un état, « Soyez impeccable partout ». **Les deux côtés disent des choses différentes et aucun n'est disqualifié** : l'équipe décrit peut-être correctement ce qui rassure, et le compte montre que ce qui rassure n'a jamais été financé assez pour produire un achat. C'est une hypothèse à trancher par une allocation de budget, pas par une lecture.

**Divergence 3 — le rôle de la partenaire.** Déclaré côté équipe, stated, verbatim : « Elle voit la pub, elle sait qu'il n'osera jamais commander. Elle offre ». Déclaré côté document de contexte Parker, stated : un profil type entier d'acheteuse cadeau, « Sandrine — The Practical Gift-Giver », 44 ans. Observé côté compte, verified : la ligne femmes 45-54 a reçu 28,45 €, produit 15 547 impressions, 63 clics, 0,41 % de taux de clic et **zéro achat**, et la créa écrite pour elle, la 28, n'a jamais été mise en ligne. Observé côté commandes, verified : les onze commandes portent des prénoms masculins ou des initiales, sans note cadeau et sans adresse de livraison distincte. **Le côté chargé est le comportement, et il dit zéro.** Mais le dénominateur est minuscule et la créa n'a jamais tourné, donc l'hypothèse n'est pas réfutée, elle est non testée.

## How buyers found the brand

**Aucune réponse déclarée. Zéro sur zéro.** La question « où avez-vous entendu parler de nous » n'a jamais été posée.

**Ce que les données de canal montrent à la place, et il faut lire ça comme de l'attribution et pas comme une identité.** Commandes par référent sur 90 jours, dénominateur 11 commandes, verified : facebook 8, instagram 2, référent vide 1. Sessions par référent sur la même fenêtre, dénominateur 2 431 sessions : direct 1 300, facebook 923, instagram 181, google 24, plus trois lignes à une session.

**Ce que ça dit de qui est l'acheteur, et c'est modeste.** Inferred, confiance mixed. Un acheteur qui arrive par un fil Facebook, sur mobile, à 93,4 % de la dépense sur mobile, et qui achète le jour même dans la plupart des cas, n'a pas fait de recherche de marque. Il n'a pas comparé sur un site de test, il n'est pas passé par Google, il n'est pas venu d'un e-mail. La marque n'apparaît nulle part dans l'index de recherche français, donc même s'il avait cherché il n'aurait rien trouvé. C'est un homme qui décide depuis la publicité elle-même, ce qui met toute la charge de la preuve sur la créa et sur la page d'atterrissage.

**Le piège du chiffre « direct » à 1 300 sessions.** Il ne veut pas dire bouche-à-oreille. La ventilation par appareil et par pays montre 989 sessions desktop depuis les États-Unis et 265 mobiles depuis les États-Unis, contre 791 mobiles depuis la France, alors que les onze commandes sont facturées en France à 100 %. Inferred, confiance mixed : une part importante de ce trafic n'est pas un acheteur.

**Le blanc nommé, et il est plus grand qu'il n'en a l'air.** L'écart d'attribution est réel et non résolu : Meta attribue 6 achats, Shopify en compte 11, dont 8 marqués facebook et 2 instagram par son propre référent. Cinq commandes ne sont vues par aucun rapport publicitaire. Une seule question dans un sondage post-achat, « où nous avez-vous vus pour la première fois », réglerait cette question mieux que n'importe quel outil d'attribution, et elle coûte une ligne de configuration.

## Behavioral-signal states observed

**Aucun. Zéro sur zéro réponse.**

Un état situationnel se lit dans une réponse en texte libre, quand un acheteur raconte ce qui se passait dans sa vie. Aucun texte libre n'existe.

**Ce que le comportement d'achat laisse voir, et ce n'est pas un état émotionnel.** Verified sur les onze horodatages : quatre commandes tombent entre 05:23 et 09:07 UTC, trois entre 19:33 et 20:48 UTC. En heure française d'été, cela met un groupe le matin entre 07:23 et 11:07 et un groupe le soir entre 21:33 et 22:48. Inferred, confiance thin : les achats s'accrochent aux deux moments où un homme est seul chez lui. Sur onze commandes, c'est une piste, pas un motif.

Verified aussi, et c'est un fait de canal et non d'acheteur : la première commande de la boutique tombe le 2026-08-26, le lendemain du jour où le compte publicitaire quitte le régime Audience Network à très bas CPM pour le régime fil Facebook. Les six achats attribués arrivent tous dans cette seconde fenêtre.

**La lecture TEEP de ce qui manque, parce que c'est plus utile que la liste de ce qui est absent.** `emotional-delivery-and-timing.md` sépare quatre travaux internes. Le compte Raselio écrit presque tout en Trigger et en Purchase. Ce qu'un sondage post-achat rendrait visible est précisément la phase Evaluation, celle où l'homme gère un risque et attend qu'on nomme son hésitation exacte, et c'est la phase que la créa de cette marque ne sert presque jamais. Aujourd'hui personne ne sait ce qui se passe dans la tête d'un acheteur Raselio entre le clic et le paiement, et l'entonnoir dit que c'est exactement là que 94,6 % des gens s'en vont : 597 vues de page pour 32 ajouts au panier, soit 5,4 %, verified.

## Survey gaps and brand-self-echo

**Les blancs de sondage, et ici c'est la totalité.** Aucune question n'a été posée, donc toutes les questions manquent. Plutôt qu'une liste exhaustive qui n'apprendrait rien, voici les quatre que le travail persona réclame en premier, chacune avec ce qu'elle débloquerait, et toutes routées à la marque parce que seule elle peut installer l'outil.

**Question 1, la raison et le moment.** Qu'est-ce qui vous a décidé aujourd'hui plutôt qu'il y a six mois. Elle remplit la catégorie des moments déclencheurs de la bibliothèque voix-client, qui est à zéro entrée sur onze achats horodatés à la minute.

**Question 2, le destinataire.** Est-ce pour vous ou pour quelqu'un d'autre. Elle tranche la divergence 3 ci-dessus, celle du rôle de la partenaire, que ni le compte ni les commandes ne peuvent trancher.

**Question 3, l'avant.** Qu'utilisiez-vous avant. Toute l'argumentation de la marque repose sur une seule substitution, la tondeuse à barbe, et aucun acheteur ne l'a jamais confirmée.

**Question 4, l'hésitation.** Qu'est-ce qui a failli vous empêcher d'acheter. Elle est la seule qui atteint la phase Evaluation, et elle testerait d'un coup les sept objections que l'équipe s'est écrites.

**L'écho de marque, et il est particulier ici parce qu'il n'y a pas de sondage à contaminer.** La méthode prévient contre le sondage à menu fermé, où la marque écrit les réponses possibles et se les fait rendre. Raselio n'a pas ce problème, elle a sa forme extrême : **la marque a écrit les réponses sans poser la question.**

Trois artefacts occupent la place que des réponses de sondage occuperaient, et ils doivent être marqués une fois pour toutes.

**Artefact 1, les listes d'objections et de freins du brief du 2026-09-03**, traitées plus haut. Sept objections, six freins, sept preuves. Zéro dénominateur, zéro source, zéro date de collecte.

**Artefact 2, les cinq témoignages attribués à des clients qui n'existent pas**, documentés par l'équipe elle-même, stated : la créa 16 attribuée à « Hervé D. · Achat vérifié ★★★★★ », la créa 17 attribuée à « Catherine » sous forme de capture de SMS, la créa 27 avec « 58 ans. Fini de retenir ma respiration. », les créas W12 et N08 avec « Bernard L. » et « Bernard, 61 ans », et l'advertorial signé « Par Julien M. ». L'équipe écrit elle-même « à remplacer par de vrais avis clients dès que possible » et « avec une citation inventée. Remplace par un avis réel ». Ces cinq lignes ont exactement la forme d'une réponse de sondage en texte libre. Aucune n'en est une. Bannies de tout usage aval.

**Artefact 3, les cinq profils types du document de contexte de marque stocké dans Parker**, lu le 2026-09-07, stated. Thomas, 38 ans, coordinateur logistique près de Lyon. Nabil, 26 ans, designer UX à Toulouse. Sandrine, 44 ans, administratrice scolaire à Nantes. Damien, 31 ans, commercial pharma. Lucas, 47 ans, professeur d'histoire divorcé à Bordeaux. Chacun tient sur plusieurs paragraphes, avec une voiture, un plat préparé, une phrase de LinkedIn, une conversation avec un frère. Ce sont des textes convaincants et complets. Le document dit lui-même de quoi il est fait, verbatim, stated : « No creative background, testing history, winning angles, or previous performance data was provided by the brand. » Aucun de ces cinq n'a plus de 47 ans, alors que les six acheteurs observés ont tous plus de 45 ans et que quatre sont sur 55-64. **Le risque, pour ce document en particulier, est qu'un run futur lise ces profils comme le résultat d'un travail de sondage.** Ils sont de la synthèse à partir de recherche publique et de langage d'avis de concurrents.

## Recurrence and spread

**Le décompte, pour qu'il soit vérifiable.**

| Élément | Valeur | Comment vérifié |
|---|---|---|
| Réponses de sondage lues | **0** | 2 appels Parker le 2026-09-07, `totalResponsesForBrand: 0` sur les deux |
| Sondages existants | **0** | même appels, message « they need to upload a CSV or connect a survey platform first » |
| Questions jamais posées | **toutes** | aucune application de sondage sur Shopify, aucun e-mail sortant dans 46 fils Gmail |
| Acheteurs sondables | 11 | 11 commandes payées, 2026-08-26 au 2026-09-04 |
| Taux de réponse | 0 sur 11, soit 0,0 % | — |
| Part de texte libre | sans objet | aucune réponse |
| Part de choix imposé | sans objet | aucune réponse |
| Fenêtre | aucune | aucun sondage n'a jamais tourné |

**Ce que ce document livre malgré tout, et c'est trois choses.** D'abord un fait vérifié : la source de premier rang de l'échelle de preuve est vide pour cette marque, et elle est vide parce qu'aucun outil n'a été installé, pas parce qu'un outil est en panne. Ensuite un avertissement : trois corps de texte existent dans ce cerveau qui ressemblent à des réponses de sondage et n'en sont pas, et ils sont nommés ci-dessus pour qu'aucun run futur ne les confonde. Enfin trois divergences posées en hypothèses, l'âge, la preuve qui rassure, et le rôle de la partenaire, que les sources comportementales peuvent commencer à tester dès maintenant.

**La confiance globale.** Verified sur l'absence et sur les onze commandes. Aucune autre affirmation de ce document n'atteint mieux que inferred, et rien n'y dépasse la confiance mixed.

## Open loops

**Boucle 1.** Observation : la source que la méthode place au premier rang de toute l'échelle de preuve est vide pour cette marque, et elle est vide parce qu'aucun outil n'a jamais été branché, tandis que onze hommes ont payé et reçu l'appareil entre le 26 août et le 4 septembre sans qu'on leur demande quoi que ce soit. Pull : Gap, elle a tiré parce que la source qui coûte le moins cher à installer est aussi celle qui manque le plus. Question : qu'est-ce qui empêche aujourd'hui la marque de poser une seule question à ses onze premiers acheteurs ? Justification : une question à onze personnes ferait passer cette marque du troisième rang de preuve au premier, et elle débloquerait à la fois le classement des raisons d'achat, la question du destinataire et la catégorie des moments déclencheurs, aujourd'hui toutes à zéro. Territoire : Product. **Seule la marque peut répondre.**

**Boucle 2.** Observation : l'entonnoir du compte montre 597 vues de page pour 32 ajouts au panier, soit 5,4 %, et la marque n'a aucun moyen de savoir ce qui se passe dans la tête d'un homme entre le clic et le départ, parce que la seule phase du parcours que sa créa ne sert presque jamais est aussi la seule qu'aucune de ses sources ne peut observer. Pull : Tension, elle a tiré en mettant la fuite mesurée en face de la liste des sources disponibles et en constatant qu'aucune ne regarde cet endroit. Question : qu'est-ce qui arrête un homme entre le moment où la page se charge et le moment où il ferme l'onglet ? Justification : c'est la seule étape de l'entonnoir qui sort de la normale, et tant que personne ne l'a demandé à un acheteur, chaque nouveau lot de créas travaille en amont d'un problème situé en aval. Territoire : Messaging.

**Boucle 3.** Observation : trois corps de texte existent dans le coffre de cette marque qui ont la forme d'un dépouillement de sondage, sept objections chiffrées à rien, cinq témoignages signés de noms inventés et cinq profils types nommés avec métier et ville, et aucun des trois ne vient d'un acheteur. Pull : Surprise, elle a tiré en constatant que la marque possède plus de texte sur son client que la plupart des marques qui ont vraiment sondé. Question : sur quoi l'équipe s'est-elle appuyée pour écrire ses sept objections ? Justification : si trois des sept sont des inventions d'équipe, une part du budget créatif du prochain lot répond à des freins qui n'existent pas, et savoir lesquelles reposent sur une observation réelle change ce qu'il faut produire. Territoire : Messaging. **Seule la marque peut répondre.**

---

**Sign-off des méthodes chargées qui en portent une.**

This is everything I know about advertising to older audiences.
