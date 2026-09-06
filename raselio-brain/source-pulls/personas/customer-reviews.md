---
brand: raselio
doc: customer-reviews
generated_on: 2026-09-06
refresh_by: 2026-10-06
sources_read: [Parker MCP brand `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, org « Dylan's Org » — `search_customer_reviews_sql` appelé le 2026-09-06 sans mot-clé, sentiment « all », `returnData: true`, limite 500, aucune borne de date, donc la requête la plus large que l'outil accepte, source-pulls/shopify-store-and-product.md (fiche produit `gid://shopify/Product/15882947854667`, variante unique, 11 images, 4 pages, 6 politiques : aucune application d'avis installée, aucun métachamp d'avis, aucun bloc d'avis dans le thème), source-pulls/shopify-orders-and-customers.md (11 commandes et 14 fiches clients, soit la totalité de l'historique commercial), source-pulls/shopify-analytics.md (2 431 sessions sur 61 jours, référents, pages d'entrée sur 90 jours), source-pulls/gmail-brand-signals.md (46 fils sur la requête `raselio OR cutlab`, corps complets de 8 fils, 4 recherches dédiées à la voix client), sub-context-docs/website-and-product-audit.md, sub-context-docs/reputation-analysis.md, sub-context-docs/customer-journey-and-persona-discovery.md, running-notes/brand-rules.md, running-notes/missing-context.md]
reviews_read: 0. Ce n'est pas un échantillon vide, c'est un corpus vide, et il a été interrogé plutôt que supposé. La surface de vente propriétaire est unique, la boutique Shopify `8piiys-jj.myshopify.com`, et elle porte 11 commandes depuis son ouverture commerciale le 2026-08-26. Aucune surface revendeur n'existe : la marque ne vend ni sur une marketplace, ni en magasin, ni chez un distributeur, et 100 % des 11 commandes sont passées sur son propre site, verified. Le dénominateur réel de ce document est donc 0 avis sur 11 acheteurs possibles, dont le plus ancien a reçu sa commande il y a onze jours.
data_limitations: [Le corpus d'avis de premier rang est vide et l'outil le dit explicitement plutôt que d'échouer. `search_customer_reviews_sql` renvoie le 2026-09-06, verbatim : « The database does not contain any customer reviews yet for this brand. No reviews have been uploaded or imported. This is not an access issue - the database simply has no review data to search. » `totalResults: 0`, temps d'exécution 94 ms. Côté boutique, aucune application d'avis n'est installée, aucun métachamp d'avis n'existe sur la fiche produit et aucun bloc d'avis n'apparaît dans les pages exportées : la marque n'a jamais mis en place la collecte. Aucune surface revendeur n'existe à lire : pas de fiche Amazon, pas de Cdiscount, pas de distribution physique. Les sites d'avis tiers sont traités par le document other-reviews et n'entrent pas ici. Conséquence directe et il faut la nommer sans détour : la source que la méthode persona classe au deuxième rang de force de preuve, juste derrière le sondage post-achat, est absente pour cette marque. Les sept sections de ce document qui demandent une lecture d'identité, d'état, d'achat pour soi ou pour un autre, d'écart entre le dit et le fait, et de différence entre surfaces, ne peuvent pas être remplies. Elles sont écrites comme des blancs nommés, avec ce qu'elles coûteraient et ce qui les remplirait, et aucune n'est comblée par une inférence. Deux surfaces voisines ont été interrogées le même jour et sont vides elles aussi : `semantic_search_post_purchase_survey` renvoie `totalResponsesForBrand: 0`, et le corpus de commentaires publicitaires compte exactement 2 lignes. Il n'existe aucun outil Reddit dans cette installation Parker. La seule parole extérieure connue de toute l'histoire de la marque tient en trois phrases, une question de livraison reçue par e-mail et deux commentaires publicitaires. `mcp__Parker__search_chat_history` a été refusé par le classifieur de permissions de la session le 2026-09-06 : les échanges antérieurs de l'équipe avec Parker n'ont pas été lus. raselio.com est bloqué par le proxy réseau, donc le rendu du site n'a pas été vu, seules les pages exportées par l'API Shopify l'ont été.]
methods_loaded: [creative-strategy-context/customer-review-mining-method.md, creative-strategy-context/persona-research-and-creative-strategy-process.md, creative-strategy-context/emotional-delivery-and-timing.md, creative-strategy-context/advertising-to-older-audiences.md, creative-strategy-context/creative-strategy-fundamentals.md]
---

# Customer reviews — persona signal — Raselio

## Identity signals observed

**Aucun. Et l'absence est le résultat, pas l'échec.**

Voici la piste de recherche, dans l'ordre, parce qu'elle est ce qui donne son poids à la phrase ci-dessus.

La marque existe désormais dans Parker sous l'identifiant `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, ce qui n'était pas le cas le matin du 2026-09-06. La surface a donc été interrogée pour de bon. J'ai lancé la requête la plus large que l'outil accepte : aucun mot-clé, sentiment « all », données individuelles demandées, limite 500, aucune borne de date. Réponse en 94 millisecondes, `totalResults: 0`, avec un message qui ne laisse pas de place au doute, verbatim : « The database does not contain any customer reviews yet for this brand. No reviews have been uploaded or imported. This is not an access issue - the database simply has no review data to search. »

J'ai ensuite vérifié côté boutique plutôt que de m'en tenir à un outil. La fiche produit `gid://shopify/Product/15882947854667` ne porte aucun métachamp d'avis. Aucune application d'avis n'est installée sur `8piiys-jj.myshopify.com`. Aucune des quatre pages exportées ne contient de bloc d'avis. La seule note visible sur le site est une mention écrite en dur dans le texte de la landing, « 4,7/5 » et « (1 734 avis) », traitée plus bas.

J'ai enfin vérifié qu'il n'existe pas de surface revendeur à lire. Les 11 commandes de l'historique sont toutes passées sur le site propre, toutes facturées en France, verified sur les analytics Shopify. Il n'y a ni marketplace, ni magasin, ni distributeur. Ce document n'a donc pas une surface vide et une autre pleine : il a une seule surface, et elle est vide.

**Les méthodes chargées avant l'analyse.** `customer-review-mining-method.md` pour la règle du dénominateur, pour la discipline qui veut qu'un corpus absent soit nommé comme absent plutôt que comblé, pour l'échelle de couverture qui oblige à déclarer une passe partielle, et pour le repérage de l'écho de marque. `persona-research-and-creative-strategy-process.md` pour l'échelle de force de preuve, où le sondage post-achat vient en premier, les avis propriétaires en deuxième et les données de commande en troisième, et pour la règle qui interdit de promouvoir un signal en persona. `emotional-delivery-and-timing.md` pour les phases TEEP. `advertising-to-older-audiences.md` parce que les acheteurs observés ont tous plus de 45 ans et que ce doc dit précisément quel type de preuve ce public croit. `creative-strategy-fundamentals.md` pour la posture des boucles.

**Ce que l'absence dit de la marque, et c'est une lecture, pas un constat administratif.** Raselio a 46 jours de vie commerciale et 11 acheteurs. `persona-research-and-creative-strategy-process.md` décrit trois états de départ possibles pour une marque : celle qui n'a jamais fait de publicité et n'a presque pas de donnée client, celle qui croit connaître ses personas sans pouvoir les valider, et celle qui a des personas verrouillés par de la donnée de premier rang. Raselio est dans le premier état pour la donnée et dans le deuxième pour le discours : elle a déjà écrit trois versions de son persona, dont une avec un prénom, un âge et une biographie, et elle n'a pas un mot d'acheteur pour en soutenir une seule. C'est exactement la configuration où la méthode dit de nommer l'écart plutôt que de renvoyer à la marque sa propre histoire.

**Ce que 11 avis changeraient, nommé précisément, parce que c'est ce que cette absence coûte en aval.** Ils donneraient le seul âge réel jamais attaché à un acheteur de cette marque : aujourd'hui la seule preuve d'âge du coffre est une ventilation de plateforme sur six achats et une lecture de prénoms sur onze commandes, et la méthode persona classe l'âge inféré d'une écriture comme un signal, jamais comme un fait. Ils diraient de quel outil chaque homme est parti, ce que la marque affirme sans preuve depuis le début. Ils diraient si l'objet tient ses promesses de tête arrondie, de LED et d'étanchéité, promesses que l'équipe a elle-même marquées « à confirmer » sur l'autonomie et les RPM. Ils donneraient la première langue de client de cette marque, la seule matière qui permet d'écrire une accroche qui ne soit pas la voix du copywriter. Et ils rempliraient la case de preuve que `advertising-to-older-audiences.md` désigne comme le raccourci de confiance de ce public : un compteur d'avis élevé lit comme une preuve réelle pour un homme de plus de cinquante ans, et la marque en affiche un qui n'existe pas.

**Ce qui remplirait cette surface, par ordre de coût croissant.** Un e-mail à onze personnes, dont huit ont reçu leur colis : c'est la chose la moins chère du coffre entier et personne ne l'a faite. Une application d'avis installée sur la boutique, qui capture les suivantes automatiquement. Une demande de photo ou de prénom et d'âge dans ce même e-mail, qui produirait en une semaine le témoignage de pair que les créas 16, 17, 27, W12 et N08 fabriquent aujourd'hui avec des noms inventés.

## Behavioral-signal states observed

Aucun. Blanc nommé.

Aucun acheteur Raselio n'a décrit ce qui se passait dans sa vie au moment où il a acheté. Les six déclencheurs qui circulent dans le coffre — la séance qui fait peur, les boutons trois jours après, la repousse qui se remarque, le soir où ça compte, le report pour raison de logistique, la vue qui baisse — viennent tous de l'advertorial et des briefs de la marque, jamais d'une bouche extérieure. Ils sont donc **stated** par la marque et ils restent non confirmés. `customer-journey-and-persona-discovery.md` les porte déjà avec ce marquage et ce document n'ajoute rien qui les renforce.

La seule chose qui ressemble à un état d'achat, et je la donne pour ce qu'elle vaut, est une lecture de comportement sur les horodatages des 11 commandes, verified sur la liste Shopify : quatre commandes tombent entre 07:23 et 09:20 heure locale et trois entre 21:33 et 22:48. Sur onze, ce n'est pas un motif, c'est une piste. Et surtout ce n'est pas un état au sens de la méthode : une heure d'achat n'est pas ce qui se passait dans la vie de l'homme, c'est seulement le moment où il a payé.

## Buying for self versus for others

Blanc nommé, et il faut être précis sur ce que la donnée de commande peut et ne peut pas dire.

Ce qui est verified : 11 commandes, toutes d'un seul article, toutes à 34,99 € sauf la première à 39,90 €, toutes facturées en France, aucune remise appliquée sur 61 jours de série, aucun message cadeau, aucune adresse de livraison différente de l'adresse de facturation dans les champs exposés. 11 nouveaux clients, 0 client récurrent.

Ce que ça ne dit pas : rien. Un homme qui achète pour lui et une femme qui achète pour son compagnon produisent exactement la même ligne de commande dans Shopify. Les onze fiches clients portent des prénoms qui se lisent comme masculins, mais un prénom n'est pas une preuve de genre et encore moins une preuve de destinataire. Ce document ne tranche pas.

Le seul indice d'achat pour un tiers vient d'ailleurs et il est faible. L'équipe écrit, stated, brief du 3 septembre : « Les femmes 45-54 montrent un signal faible mais réel d'achat-cadeau (3 ATC, 1 paiement initié) ». Trois ajouts au panier et une initiation de paiement, zéro achat. `persona-research-and-creative-strategy-process.md` range de toute façon le cadeau parmi les comportements qui traversent les personas, jamais parmi les personas. Ce signal appartient au document ad-account et à la synthèse, pas à celui-ci, et il ne devient une lecture d'avis que le jour où une acheteuse écrira « je l'ai offert à mon mari ».

## Stated-versus-revealed divergences

Le prompt appelle cette section la plus précieuse du document. Elle est vide, et il est utile de dire exactement pourquoi elle l'est plutôt que de la remplir avec autre chose.

Un écart entre le dit et le révélé demande deux choses dans la même bouche : une raison d'achat déclarée, et un usage ou un contexte décrit dans le même texte qui pointe ailleurs. Cette marque n'a aucun texte d'acheteur. Il n'y a donc pas une bouche, il n'y en a zéro.

Ce qui existe à la place est un écart d'un autre genre, et il ne faut surtout pas le confondre avec celui-ci : la marque déclare une chose et sa donnée en montre une autre. Le brief du 23 août écrit son ICP à 18-34 ans ; les six achats attribués du compte sont tous chez des hommes de plus de 45 ans. Le site affiche 1 734 avis ; il en existe zéro. Ces écarts sont réels et ils sont documentés ailleurs — dans `ad-account.md` pour le premier, dans `reputation-analysis.md` et `brand-self-echo-detection.md` pour le second. Ce ne sont pas des écarts entre le dit et le révélé au sens de ce document, parce que dans les deux cas c'est la marque qui parle des deux côtés. Les ranger ici reviendrait à faire passer la voix de la marque pour celle du client, ce que `customer-review-mining-method.md` classe explicitement parmi les erreurs de lecture les plus coûteuses.

Blanc nommé, sans substitut.

## Recurrence and spread

Le comptage tient en peu de lignes et chacune porte son dénominateur.

| mesure | valeur | source | fenêtre |
|---|---|---|---|
| avis lus | 0 | Parker `search_customer_reviews_sql`, requête la plus large possible | tout l'historique |
| avis existants sur la boutique | 0 | export Shopify de la fiche produit et des 4 pages, aucun métachamp d'avis, aucune application installée | 2026-09-06 |
| surfaces revendeur à lire | 0 | 100 % des 11 commandes passées sur le site propre, aucune marketplace, aucun distributeur | tout l'historique |
| acheteurs possibles | 11 | Shopify `list-orders`, `totalCount: 11` | 2026-08-26 → 2026-09-04 |
| fiches clients | 14, dont 11 avec une commande, 2 sans commande et 1 correspondant à l'adresse professionnelle du gérant | Shopify `list-customers` | 2026-07-23 → 2026-09-04 |
| commandes livrées au 2026-09-06 | 8 sur 11 marquées FULFILLED, 3 UNFULFILLED | Shopify `list-orders` | 2026-09-06 |
| âge de la commande la plus ancienne | 11 jours | commande #1001 du 2026-08-26 | 2026-09-06 |
| clients récurrents | 0 sur 11 | Shopify `returning_customer_rate: 0.0` sur 90 jours | 2026-06-08 → 2026-09-06 |
| retours ou remboursements demandés | 0 relevé dans les sources | `sales_reversals: 0` sur 61 jours de série, aucun fil de retour dans les 46 fils Gmail lus | 2026-07-08 → 2026-09-06 |
| paroles extérieures connues, toutes surfaces confondues | 3 | 1 question de livraison par e-mail, 2 commentaires publicitaires | 2026-08-26 → 2026-09-01 |

**Ce que ces chiffres autorisent et ce qu'ils n'autorisent pas.** Zéro retour sur 11 commandes ne veut pas dire onze clients contents : la commande la plus ancienne a onze jours et la fenêtre de rétractation légale en court encore. `customer-review-mining-method.md` est explicite là-dessus, un corpus vide n'écarte aucun problème, il rend seulement tout invisible. Ni le plaisir ni le défaut du produit ne sont connus.

**Passe déclarée partielle.** La méthode demande qu'une passe qui manque des sources matérielles le dise. Celle-ci manque sa source unique. Ce n'est pas une passe partielle, c'est une passe à vide, et la seule chose qu'elle établit avec certitude est le point zéro : au 2026-09-06, Raselio a 0 avis. Le prochain run comparera contre ce chiffre.

## Brand-self-echo watch

Il n'y a aucun langage de client à surveiller, donc l'écho classique — la marque qui s'entend revenir dans les avis de ses clients — ne peut pas se produire. Ce qui se produit ici est plus direct et il faut le nommer, parce que c'est la seule chose que cette surface donne à lire.

**La marque a écrit les avis avant d'avoir des clients.** Verified sur l'export Shopify du 2026-09-06.
Landing « 7 raisons », hero : « 4,7/5 », « (1 734 avis) », attribut d'accessibilité « Note moyenne 4,7 sur 5, 1 734 avis ».
Même page, bloc produit : « Noté 4,7/5 sur 1 734 avis ».
Même page, barre de confiance : « +17 000 clients satisfaits ».
Même page, FAQ : « La majorité de nos clients constatent nettement moins de rougeurs et de démangeaisons qu'avec un rasoir. »
Advertorial, signé « Par Julien M. », mis à jour le 31 août 2026 : « **Plus de 17 000 personnes ont déjà fait le changement. La seule chose qu'elles regrettent, c'est de ne pas l'avoir fait plus tôt.** »

En face, verified : 0 avis, 11 commandes. L'écart est de trois ordres de grandeur sur les deux compteurs. Et la dernière citation mérite un mot supplémentaire pour ce document précis : « la seule chose qu'elles regrettent, c'est de ne pas l'avoir fait plus tôt » est exactement la forme du regret de tardiveté que cette passe est censée aller chercher dans les avis. Elle est ici écrite par la marque, sur une base de onze commandes et zéro avis. Elle ne peut jamais être citée comme parole de client.

**Le même chiffre circule dans la publicité payée, avec deux valeurs différentes.** Verified sur la lecture créative des annonces : « Approuvée par plus de 35 000 hommes » figure sur les trois annonces « Impeccable » qui portent quatre des six achats du compte et sur les cinq annonces du lot EMOTION ; « Approuvée par plus de 17 000 hommes » figure sur RS30-7R 01, sur S4 et sur S10. Trois nombres tournent donc en même temps entre le site et le compte, sans source pour aucun.

**Des témoignages nommés ont été écrits pour des personnes qui n'existent pas.** L'équipe le documente elle-même, stated. Brief du 3 septembre : « Les créas 16, 17, 27 utilisent des prénoms fictifs de témoignage (Hervé D., Catherine) : à remplacer par de vrais avis clients dès que possible ». Document du 4 septembre : « W12 et N08 utilisent « Bernard L. » / « Bernard, 61 ans » avec une citation inventée. Remplace par un avis réel ». Le texte inventé de la créa 16 est, stated : « Hervé D. · Achat vérifié ★★★★★ / « Franchement, je retenais mon souffle à chaque passage. Là, zéro coupure, zéro rougeur. J'aurais dû le faire il y a 20 ans. » »

**La conséquence pour tout run futur, et c'est la seule instruction opérationnelle de ce document.** Le jour où un avis Raselio apparaîtra quelque part, la première vérification à faire n'est pas de le lire, c'est de vérifier qu'il n'a pas été écrit par la marque ou hérité d'un gabarit. Le même « 1 734 avis » figure sur la marque soeur Trael, stated, ce qui indique un gabarit recopié plutôt qu'un chiffre choisi pour Raselio. Un corpus qui démarre dans ces conditions doit être traité comme suspect jusqu'à preuve du contraire, et chaque avis futur doit porter sa provenance : application, date, commande rattachée.

## Surface differences

Sans objet, et c'est en soi une lecture.

Il n'existe qu'une surface de vente : la boutique Shopify de la marque. Pas de fiche marketplace, pas de rayon, pas de distributeur, pas d'agrégateur d'avis. La comparaison que cette section demande — l'acheteur du site contre l'acheteur du revendeur, souvent deux personnes différentes — ne peut pas être faite parce qu'il n'y a qu'un chemin d'achat.

Ce que ça implique pour le travail persona vaut d'être dit. `customer-review-mining-method.md` note que pour une marque distribuée, les avis de la surface où les gens achètent réellement pèsent plus lourd que ceux du site propre, parce qu'ils reflètent un état d'esprit différent. Raselio n'a pas ce problème et n'a pas non plus cet avantage : tout son public passe par une seule porte, et cette porte est un fil Facebook. Les analytics le confirment, verified : sur les 11 commandes des 90 derniers jours, 8 sont référencées facebook, 2 instagram, 1 sans référent. Aucune ne vient d'une recherche, d'un média, d'un forum ou d'un e-mail. Il n'y a donc pas de deuxième population d'acheteurs à comparer, et il n'y en aura pas tant qu'un deuxième canal n'existera pas.

## Open loops

**Boucle 1.** Observation : onze hommes ont acheté une tondeuse intime à une marque de six semaines, huit ont reçu leur colis, et aucun n'a jamais été sollicité pour dire un mot, alors que la marque affiche 1 734 avis sur sa page d'accueil. Pull : Gap, elle a tiré en voyant qu'un e-mail à onze personnes est la chose la moins chère de tout le coffre et qu'elle n'a pas été faite. Question : que diraient les onze acheteurs de Raselio si on le leur demandait ? Justification : c'est la seule action qui transforme d'un coup la source la plus faible du système persona en source de deuxième rang, et elle décide de tout ce que la marque pourra écrire d'honnête dans ses prochaines créas. Territoire : Product. Seule la marque peut répondre.

**Boucle 2.** Observation : les créas 16, 17, 27, W12 et N08 utilisent des prénoms et des citations de témoignage inventés, et l'advertorial est signé par un « Julien M. » qui n'existe dans aucune source, pendant que le public qui achète est celui pour qui, selon la méthode, la preuve doit venir d'une personne de son âge. Pull : Tension, elle a tiré en lisant côte à côte le témoignage inventé d'« Hervé D., 58 ans » et la liste réelle des onze acheteurs. Question : quelle forme de preuve un homme de plus de cinquante ans croit-il réellement pour un achat comme celui-là ? Justification : la marque n'a aucune preuve authentique à montrer aujourd'hui, donc savoir laquelle construire en premier décide de ce qu'il faut aller chercher avant le prochain lot créatif. Territoire : Messaging.

**Boucle 3.** Observation : zéro retour et zéro remboursement sur onze commandes, mais la plus ancienne n'a que onze jours et la fenêtre de rétractation court encore. Pull : Curiosité, elle a tiré parce qu'un compteur à zéro sur une fenêtre trop courte se lit facilement comme une bonne nouvelle alors qu'il ne dit rien. Question : que se passe-t-il chez les onze premiers acheteurs dans les trente jours qui suivent la livraison ? Justification : le taux de retour à trente jours est la première mesure de qualité produit que cette marque pourra obtenir, et il décide si le renversement de risque affiché partout est tenable. Territoire : Product. Seule la marque peut répondre.

**Boucle 4.** Observation : la boutique n'a aucune application d'avis installée quarante-six jours après son ouverture commerciale, alors que la landing affiche une note et un compteur écrits en dur dans le texte. Pull : Surprise, elle a tiré en cherchant le métachamp d'avis de la fiche produit et en ne trouvant ni application, ni champ, ni bloc. Question : qu'est-ce qui a fait choisir d'afficher une note plutôt que d'en collecter une ? Justification : la réponse change la priorité du prochain sprint, parce qu'installer la collecte est une heure de travail et que la note affichée est un risque de conformité actif. Territoire : Product. Seule la marque peut répondre.
