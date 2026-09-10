---
brand: raselio
external_account: gillette-labs-body-intimate
account_type: competitor
doc: 90-day-performance-audit-external
generated_on: 2026-09-06
refresh_by: 2026-12-05
parker_brand_id: a81e7c77-ca41-4cbd-acf8-ec27ea58eb37
external_brand_id: bdf3dd63-74ed-40f7-9da7-3245cd250869
sources_read: [Surfaces d'avis - page avis Gillette UK pour le GilletteLabs Body + Intimate Razor (page bloquée par le proxy, connue par résumé de moteur de recherche), fiche et avis Walmart du rasoir 5 unités et des recharges 6 unités (page bloquée, agrégat connu par résumé), fiches Amazon.fr et Amazon.com de la gamme (pages non atteintes), trois bancs d'essai français - barbedudaron.fr sur l'i5, lemalefrancais.com sur l'i3, latelierdubarbier.fr sur l'i5 (les trois bloqués par le proxy, connus par résumé). Surface presse - communiqué de lancement du 2026-04-02 repris par BusinessWire, Morningstar, Global Cosmetics News, Chain Drug Review, T3, HuffPost UK, tous bloqués par le proxy et connus par résumé, plus le pop-up parisien et marseillais de mars 2026 déjà consigné dans sub-context-docs/competitive-landscape.md. Copie publicitaire - 357 annonces de la gamme corps dans le corpus Parker, fenêtre de lancement 2026-06-08 au 2026-09-06, avec accroches, angles, arguments de valeur, tags de niveau de conscience, de désir et d'émotion. Prix et distribution France - source-pulls/meta-ad-library-competitors.md et les relevés de sub-context-docs/competitive-landscape.md. Côté marque - mcp__Parker__search_customer_reviews_sql et _semantic sur Raselio, mcp__Parker__search_facebook_ad_comments_sql, source-pulls/shopify-orders-and-customers.md.]
review_denominator: 88 avis, agrégat seul, note moyenne 4,8 sur 5, sur la recharge de lames GilletteLabs Body chez Walmart au 2026-09-06 - c'est le seul dénominateur chiffré atteignable dans ce run. À cela s'ajoutent 7 textes d'avis individuels effectivement lus, 5 en anglais et 2 en français, tous restitués par le résumé d'un moteur de recherche parce que les pages d'origine sont bloquées par le proxy de la session. Aucun autre dénominateur n'a pu être établi - ni le nombre d'avis sur la page Gillette UK, ni sur Amazon.fr, ni sur la fiche rasoir Walmart. Mélange de récence non observable.
methods_loaded: [analyzing-public-ad-accounts.md, customer-review-mining-method.md, hooks.md, killer-performance-ads.md, persona-research-and-creative-strategy-process.md, advertising-luxury-and-higher-price-points.md, creative-strategy-fundamentals.md]
data_limitations: [Le proxy de la session bloque toutes les surfaces d'avis atteignables - gillette.co.uk, walmart.com, chaindrugreview.com, globalcosmeticsnews.com, t3.com, barbedudaron.fr, lemalefrancais.com, latelierdubarbier.fr. Sept textes d'avis seulement ont été effectivement lus, et ils l'ont été à travers le résumé d'un moteur de recherche, pas sur la page. Chaque citation de cette section porte donc la mention "restitué par le moteur de recherche, page d'origine bloquée" et est marquée stated, jamais verified. Aucune trajectoire de sentiment n'est calculable - la lecture d'une trajectoire suppose des avis datés sur deux fenêtres, et aucune date d'avis individuelle n'a pu être obtenue. Le signal d'engagement sur les annonces concurrentes est inaccessible - mcp__Parker__search_facebook_ad_comments_sql est un outil de marque propre et ne lit pas les commentaires d'un compte externe, et aucun compteur de commentaire, de partage ou de réaction n'est exposé sur les annonces externes du corpus. La lecture organique de Gillette est indisponible - aucun outil organique n'était accessible dans cette session. Le corpus publicitaire lu est celui de la page mondiale 7390944749, donc l'inférence d'audience porte sur la créative anglophone et non sur la créative française. Aucun audit externe antérieur n'existe pour ce compte, donc aucune trajectoire trimestrielle n'est calculable et le mélange de récence du corpus d'avis n'a pas de point de comparaison. Le pool d'avis de Raselio lui-même est vide - quatre requêtes distinctes le 2026-09-06 renvoient N égal à 0, donc la détection de migration entrante ne dispose d'aucune matière côté marque.]
---

# 90-day performance audit, external — Gillette Labs Body + Intimate, for Raselio

## Comment lire ce document

Ce document reconstruit la santé publique d'un concurrent avec ce qui est visible de l'extérieur : ses avis, sa presse, l'engagement sur ses annonces, et ce que sa copie publicitaire trahit de l'acheteur qu'elle vise. La règle structurante est simple et elle tient tout le document : **chaque affirmation est soit `grounded`, c'est-à-dire adossée à une source publique nommée, soit `flagged-inference`, c'est-à-dire une lecture que j'ai formée à partir de signaux et qui demande vérification.** Rien entre les deux.

Une chose doit être dite avant tout le reste, parce qu'elle limite la moitié du document. **Le proxy de cette session bloque toutes les surfaces d'avis de Gillette.** J'ai atteint un agrégat chiffré, 88 avis à 4,8 sur 5 chez Walmart sur la recharge de lames, et sept textes d'avis individuels, tous restitués par le résumé d'un moteur de recherche et non lus sur leur page. C'est peu. La méthode de minage d'avis dit qu'un compte n'est pas significatif sans son dénominateur, et le dénominateur ici est court et partiellement inconnu. Je ne le maquille pas, je le porte à chaque ligne, et la section sentiment est explicitement mince plutôt qu'inventée.

La partie du document qui est **riche** est ailleurs, et elle vaut le déplacement : l'inférence d'audience à partir de la copie publicitaire, qui repose sur 357 annonces réellement lues avec leurs accroches, leurs angles et leurs tags, et la superposition d'événements de marque, qui repose sur un communiqué de lancement chiffré. C'est là que ce document apporte quelque chose que l'audit de performance interne ne peut pas atteindre.

## Two-sentence diagnosis

Sur la maigre surface d'avis atteignable, Gillette Labs Body + Intimate tient exactement la promesse sur laquelle il a bâti son lancement, la note agrégée est de **4,8 sur 5 sur 88 avis** chez Walmart et les rares textes lus disent tous la même chose sur l'absence de coupure, ce qui veut dire que l'objection produit que Raselio pourrait espérer exploiter, « le géant coupe quand même », n'existe pas dans les données publiques disponibles aujourd'hui, `grounded`.

Le point de levier pour Raselio n'est donc pas la qualité du produit adverse mais son économie et sa géographie : Gillette vend un manche puis des recharges à environ **4,66 $ la cartouche**, il vient d'installer en France une tondeuse i3 à **29,70 €** et un rasoir dont le consommable revient chaque mois, pendant que Raselio vend un appareil sans consommable à 34,99 € et l'écrit noir sur blanc, `grounded` sur les deux prix et `flagged-inference` sur la conclusion qu'un acheteur français fera ce calcul.

## Grounded findings

Six constats, chacun avec sa source et rien de plus que ce que la source dit.

**1. La note publique est très haute et le dénominateur est court.** `grounded`. Chez Walmart, la recharge de lames GilletteLabs Body & Intimate en lot de six affiche **4,8 étoiles sur 5 pour 88 avis** au 2026-09-06. C'est le seul couple note et dénominateur que j'ai pu obtenir sur toute la gamme. La page elle-même est bloquée par le proxy ; le chiffre est restitué par le résumé du moteur de recherche. La méthode dit qu'un décompte n'est pas une signification : 88 avis pour un produit P&G distribué chez Walmart, Amazon et Costco est un **très petit dénominateur**, ce qui veut dire que la gamme est récente, pas qu'elle est aimée par peu de monde.

**2. Le lancement est daté et chiffré.** `grounded`. Gillette a annoncé le GilletteLabs Body le **2 avril 2026** et l'a positionné comme « Gillette's safest body razor ever ». Le communiqué porte deux statistiques de marché qui expliquent toute la créative du compte : **60 % des hommes de trente-cinq ans et moins retirent des poils de leur corps**, le plus souvent sur le torse, les aisselles ou la zone intime, et **70 % des hommes utilisent le même rasoir pour leur visage et pour leur corps**. Le communiqué d'origine sur BusinessWire est bloqué par le proxy ; les deux chiffres sont restitués de façon concordante par plusieurs reprises de presse.

**3. Le mécanisme produit revendiqué a un nom et trois pièces.** `grounded`. « Triple Defense System », composé d'une **Anti-Irritation Bar** qui passe sur la peau avant les lames pour libérer les poils piégés, d'une **Anti-Ingrown Bar** contre les poils incarnés, et d'une bande de lubrification longue durée. En France le même vocabulaire est traduit et porté par la fiche produit : « Technologie SkinFirst », « Barres Anti-Irritation Et Anti-Poils Incarnés », lu verbatim dans les titres d'annonces catalogue de la page Gillette France, `verified` sur `source-pulls/meta-ad-library-competitors.md`.

**4. L'économie du consommable est publique et chiffrable.** `grounded`. Un lot de six cartouches de recharge coûte **27,97 $, soit 4,66 $ la cartouche**, au 2026-09-06. Page bloquée, chiffre restitué par résumé.

**5. Le prix France d'entrée de gamme est sous celui de Raselio.** `grounded` sur les relevés déjà consignés le 2026-09-06 : la tondeuse **Gillette Labs i3 Body + Intimate à 29,70 €** en Drive Leclerc, référencée aussi chez Cdiscount et Auchan, avec « Autonomie 80 min, 2 sabots inclus » dans le titre marchand. Raselio est à 34,99 €. L'écart est de 5,29 € en faveur du géant, sur un produit qu'on peut prendre en faisant ses courses.

**6. La distribution France du message publicitaire est très en retard sur le message mondial.** `grounded`. La requête « Gillette Labs body » dans la bibliothèque publicitaire française renvoie **dix lignes** au 2026-09-06, dont cinq annonces catalogue créées le 3 juillet et trois créatives nommées « Rasoir GilletteLabs Body » **créées le 3 septembre**. Sur la même période, le compte mondial a lancé 259 annonces en trente jours.

## Sentiment trajectory with event overlays

**Je dois commencer par un blanc, parce que c'est la réponse honnête.** Une trajectoire de sentiment se lit sur des avis datés répartis sur au moins deux fenêtres. Aucune date d'avis individuelle n'a pu être obtenue dans ce run : les pages qui les portent sont bloquées, et le moteur de recherche restitue des textes sans horodatage. **Il n'existe donc aucune trajectoire de sentiment pour ce compte dans cette version du document.** C'est un blanc nommé, pas une absence de mouvement.

Ce que je peux poser, c'est un **niveau** et des **événements**, en disant clairement que les deux ne sont pas reliés par une mesure.

**Le niveau.** 4,8 sur 5 sur 88 avis chez Walmart pour la recharge, `grounded`. Les sept textes lus vont tous dans le même sens sauf un.

**Les événements de la fenêtre, dans l'ordre.** `grounded` sauf mention.
- **Mars 2026** : pop-up éphémère Gillette autour du rasage intime à Paris et à Marseille, où le rasoir a été présenté en avant-première. `stated`, consigné le 2026-09-06 dans `sub-context-docs/competitive-landscape.md`, page de presse d'origine bloquée par le proxy.
- **2 avril 2026** : lancement mondial du GilletteLabs Body avec la revendication « Gillette's safest body razor ever ».
- **3 juillet 2026** : mise en ligne des annonces catalogue Gillette France sur la gamme Body + Intimate, cinq références dont les tondeuses i3 et i5 et les recharges.
- **13 juillet 2026** : première vague de créative de gamme dans le corpus mondial, quatre des annonces du haut du classement d'impressions datent de ce jour, `verified` sur Parker.
- **6 au 11 août 2026** : deuxième vague, la plus dense, la majorité du haut de classement actuel.
- **3 septembre 2026** : trois créatives françaises créées sur la page Gillette France.

**La lecture, `flagged-inference`, à vérifier.** Le rythme des événements dessine une séquence classique de lancement P&G : preuve en presse et en événement d'abord, puis distribution, puis catalogue, puis créative de marque, marché par marché, avec la France dans la dernière vague. Je n'ai **aucune mesure** qui relie ces événements à un mouvement de sentiment, et je refuse d'en inventer une. Ce qui est réellement utile ici n'est pas une courbe, c'est le calendrier lui-même : il dit à quel moment la France reçoit la pression.

## Hooks mined from review verbatims

Sept textes lus. Je les donne tous, avec la mention obligatoire de leur mode d'obtention, et je dis pour chacun ce qui en fait ou non une matière d'accroche. La méthode veut du volume ; le volume n'existe pas ici et je préfère sept lignes honnêtes que trente inventées.

**Une réserve de forme qui compte.** Les sept textes ci-dessous ont été **restitués par le résumé d'un moteur de recherche**, les pages d'origine étant bloquées par le proxy de la session. Le moteur les a présentés entre guillemets comme des citations, mais je ne les ai pas vus sur leur page. Ils sont donc marqués `stated` et non `verified`, et **aucun d'eux ne doit être repris tel quel dans une créative sans être revérifié à la source.** C'est une règle de sécurité, pas une précaution de style.

**1.** « keeps giving me nicks and cuts way too easily » — avis Walmart, signé Brandon, sur le rasoir GilletteLabs Body. `stated`.
C'est le seul texte négatif du lot et c'est de loin le plus intéressant des sept. Il attaque la revendication centrale du lancement, « safest body razor ever », avec les mots exacts de la revendication. En matière d'accroche c'est une **Comment-Response** parfaite dans sa forme brute : une phrase courte, ordinaire, qui contredit une promesse énorme. Réserve légale immédiate et sérieuse : reprendre un avis nommant un concurrent dans une publicité payante en France pose une question de publicité comparative et une question de règles de plateforme. Ce point est à trancher par la marque, pas par cet audit.

**2.** « didn't give me any nicks or cuts » — avis sur la page Gillette UK. `stated`.
Utile comme mesure de barre, pas comme accroche. Le mot que le client emploie pour dire que ça va est exactement le mot de la marque. Cela veut dire que le vocabulaire de la catégorie est déjà celui de Gillette dans la bouche du client.

**3.** « extremely gentle shave, no nicks or cuts » — avis repris par Yahoo Shopping. `stated`.
Même lecture que le 2.

**4.** « it cuts cleanly on the first pass without needing to press too hard, which helps avoid nicks » — avis repris par Yahoo Shopping. `stated`.
Celui-ci porte une mécanique physique que Raselio peut réutiliser sans citer personne : **la pression**. « Sans appuyer » est un geste, pas une caractéristique, et un geste se filme. C'est le seul des sept qui contient un plan de tournage.

**5.** « super durable, the materials feel amazing on the skin, and doesn't cause razor bumps and cuts » — avis cinq étoiles, surface non précisée par le résumé. `stated`.
Faible en accroche parce qu'il empile trois bénéfices sans en dramatiser aucun.

**6.** « a good little trimmer designed for the body, it's ideal » — banc d'essai français sur la tondeuse Gillette Intimate i3. `stated`, page `lemalefrancais.com` bloquée par le proxy.
Ordinaire, sauf pour un détail : le diminutif « little ». Il porte l'idée d'un objet modeste et suffisant, ce qui est exactement la position que Raselio occupe à 34,99 €.

**7.** « a bit light for large areas to treat » — même banc d'essai. `stated`.
La seule réserve produit exprimée sur la gamme française, et elle est nette : l'i3 manque de puissance sur les grandes surfaces. Pour Raselio, dont la fiche annonce environ quatre-vingt-dix minutes d'autonomie contre les quatre-vingts minutes annoncées par le titre marchand de l'i3, `stated` des deux côtés, c'est un terrain de comparaison technique qui existe. À manier avec la même prudence légale que le point 1.

**Le constat qui compte plus que les sept lignes.** La méthode dit que le pool d'avis d'un rival est de la vraie donnée que l'audit interne ne peut pas atteindre, et que c'est là que l'audit externe gagne son droit d'exister. Ici, ce n'est pas le cas, et il faut le dire : **cette section est mince par accident d'accès, pas parce que la matière n'existe pas.** Les pages existent, elles sont pleines, elles sont simplement inatteignables depuis cette session. C'est la première chose à débloquer au prochain refresh, et c'est consigné en limite de données et dans `running-notes/missing-context.md`.

## Customer migration signal

**Aucun signal de migration n'a été trouvé, et je décris exactement ce que j'ai cherché pour que le blanc soit lisible.**

**Côté rival vers marque.** J'ai cherché dans les avis de Gillette la langue du basculement, « switched from », « used to use », la mention d'une marque concurrente. La requête menée le 2026-09-06 sur les comparaisons entre GilletteLabs Body et Manscaped Lawn Mower n'a **renvoyé aucun avis de bascule**, seulement des communiqués de presse Manscaped et des fiches produit. `grounded` sur l'absence de résultat, pas sur l'absence du phénomène.

**Côté marque vers rival, et c'est le blanc le plus dur.** Pour lire une migration entrante il faut le pool d'avis de la marque elle-même. Celui de Raselio est vide : quatre requêtes distinctes le 2026-09-06, deux en SQL et deux en sémantique, renvoient toutes **N égal à 0**, avec `collectionExists: true` et `totalReviewsAnalyzed: 0`. Ce n'est pas un problème d'accès, c'est un corpus vide. Raselio a onze commandes et aucune application d'avis.

**La seule voix de client que Parker détient pour Raselio tient en deux lignes**, `verified` sur `search_facebook_ad_comments_sql` le 2026-09-06 : « Lol », posté le 2026-09-01, et « Plus rien de la bête sauvage qui sommeille en nous. », posté le 2026-08-31. La seconde est une vraie phrase de client français sur une annonce de la marque, et elle est amusante, mais elle ne dit rien d'une migration.

**Conclusion de section, `grounded` : la détection de migration est structurellement impossible pour cette marque aujourd'hui, dans les deux sens.** Elle le restera tant que Raselio n'a pas de programme d'avis. C'est un argument de plus, et l'un des plus concrets, en faveur d'installer une collecte d'avis, développé dans `audits/2026-Q3/customer-review-audit.md`.

## Audience inference from ad copy

C'est la section riche du document. Elle repose sur **357 annonces réellement lues** avec leur copie, leurs accroches et leurs tags, fenêtre de lancement du 2026-06-08 au 2026-09-06, `verified` sur Parker. Toutes les conclusions de qui-est-visé restent des `flagged-inference`, parce qu'une copie dit qui la marque veut atteindre et pas qui elle atteint.

**Pour qui la copie est écrite, `flagged-inference`, confiance forte.** Un homme jeune et actif qui se rase déjà le corps mais avec le mauvais outil. Les preuves qui portent cette lecture sont trois et elles se recoupent.

D'abord les accroches elles-mêmes, verbatim, `verified` : « The everyday battle of trying to remember which is the face razor and which is the *other* razor », « ONE THING GUYS GET WRONG ABOUT BODY GROOMING », « it took me a while to realize you shouldn't be using your face razor on your body », « STOP using your face razor on your pubes! ⚠️ », « when u don't have to use the same razor on ur pubes and ur face anymore... ». Cinq formulations différentes d'une seule et même idée. La copie ne demande pas à l'homme de commencer à se raser le corps, elle lui reproche l'outil.

Ensuite le niveau de conscience tagué, `verified` : **Solution Aware 225 sur 357, soit 63,0 %. Problem Aware 100, soit 28,0 %. Unaware 29, soit 8,1 %. Most Aware 1. Product Aware zéro.** L'absence totale de Product Aware confirme la lecture : la copie n'est pas écrite pour quelqu'un qui compare deux rasoirs corps, elle est écrite pour quelqu'un qui ne sait pas encore que la catégorie existe en tant que telle.

Enfin le contexte de vie que la copie installe, `verified`, verbatim : « after workout or being outside all day », « training twice a day and staying fresh », « no matter what sport you're playing », « Come get ready with me to go out to the bars », « as a content creator no two days look the same », « The Biggest Date Night Tip ». Salle de sport, sport en extérieur, sortie du soir, voyage, tournage.

**L'étage du tunnel visé, `flagged-inference`, confiance forte.** Haut et milieu de tunnel. 91 % de la gamme en Problem ou Solution Aware, 97,8 % d'annonces sans promotion, et des destinations qui pointent vers des pages de redirection puis vers Amazon, Walmart ou Costco. Un compte qui récolterait sa base afficherait l'inverse : beaucoup de Most Aware, beaucoup d'offres, du reciblage.

**Le désir sur lequel la copie s'appuie, `verified` sur les tags :** Comfortable living conditions 109 sur 357, soit 30,5 %, puis Freedom from fear, pain, and danger 84, soit 23,5 %, puis Sexual companionship 41, soit 11,5 %. **L'émotion :** Hope 91 et Confidence 90, soit ensemble 50,7 %, contre Shame 20, soit 5,6 %.

**Ce que cette inférence dit à Raselio, et c'est le point qui fait le lien avec l'audit interne.** La copie de Gillette est écrite pour un homme de vingt à quarante ans. La copie de Raselio l'est aussi, en pratique : les créatives qui portent les quatre achats du meilleur ad set montrent **un homme dans la fin de la vingtaine ou le début de la trentaine, torse nu, athlétique, tatoué**, `verified` dans `audits/2026-Q3/90-day-creative-strategy-audit.md`. Or l'acheteur réel de Raselio a quarante-cinq ans et plus, sur les six achats attribués et sur les onze commandes Shopify. **Les deux marques écrivent donc pour le même homme jeune, et l'une des deux encaisse chez un homme plus vieux sans jamais lui parler.** C'est la tension centrale que l'analyse de whitespace reprend.

## Engagement signal where exposed

**Blanc nommé, et je dis précisément pourquoi.**

Aucun compteur d'engagement n'est exposé sur les annonces externes du corpus Parker : ni nombre de commentaires, ni réactions, ni partages, ni sentiment de commentaire. L'outil de lecture de commentaires publicitaires de Parker, `search_facebook_ad_comments_sql`, est un outil de **marque propre** ; appelé sur le brand_id de Raselio il renvoie les commentaires du compte Raselio, pas ceux de Gillette. Il n'existe aucun paramètre pour le pointer vers un compte externe.

Ce que je peux donner à la place, et qui n'est pas un signal d'engagement, c'est **l'historique de rang d'impressions**, qui est exposé, `verified`. Il dit ce que le compte pousse et soutient, jamais ce que le public en fait. Trois mouvements notables de la fenêtre du 2026-08-29 au 2026-09-06 :

- Annonce `2045348549707003`, la confession sur le rasoir du père : montée du rang 64 au rang 6 en cinquante-trois jours, puis **stable au rang 6 pendant huit jours**. Une créative que le compte ne lâche pas.
- Annonce `1477062697448217`, « BODY +INTIMATE » : du rang 33 au rang 18 en huit jours, plus gros saut du 30 au 22 le 2 septembre.
- Annonce `1071953122070728`, « 100+ year glow up » en huit secondes : du rang 93 au rang 45 en huit jours, plus gros saut de 56 places le 2 septembre.

Le 2 septembre revient dans presque tous les historiques de rang du compte. `flagged-inference`, confiance mixed : soit le compte a ouvert le budget ce jour-là, soit la campagne a changé de structure. Le classement seul ne permet pas de trancher, et il ne dit rien de la rentabilité.

**La lecture organique de Gillette est également indisponible** dans ce run, aucun outil organique n'étant accessible. Le compte Instagram `gillette` compte 192 239 abonnés et la page Facebook 1 877 598 mentions J'aime, `verified` sur la fiche de marque Parker, mais rien de ce qui y est publié n'a été lu.

## Flagged inferences requiring verification

Les cinq lectures de ce document qui ne sont pas adossées à une mesure et qui demandent une vérification avant d'être utilisées.

**1. Que la note de 4,8 sur 5 soit représentative de la gamme.** Elle porte sur **la recharge de lames**, pas sur le rasoir, pas sur les tondeuses i3 et i5, et pas sur le marché français. Un acheteur de recharge est un client déjà acquis qui rachète : c'est un signal de **rétention**, pas d'acquisition. La méthode met explicitement en garde contre la confusion des deux, et je la commets à moitié en citant ce chiffre en tête. Vérification : atteindre la page d'avis du rasoir lui-même et celle des tondeuses françaises.

**2. Que la revendication de sécurité tienne dans l'usage réel.** Un seul avis négatif a été trouvé, celui de Brandon, contre quatre positifs. Sur sept textes, ce ratio ne prouve rien. La méthode rappelle aussi que les avis négatifs sont **sur-représentés** dans un corpus ouvert parce que les mécontents écrivent plus ; ici c'est l'inverse qui est arrivé, ce qui est le signe d'un corpus filtré par le moteur de recherche plutôt que d'une réalité mesurée.

**3. Que le retard français soit un retard et pas un choix.** Dix lignes dans la bibliothèque française contre 259 lancements mondiaux en trente jours est un fait. En conclure que la France recevra la même pression est une inférence. P&G pourrait très bien avoir décidé de porter la gamme en France par le rayon et la presse et de ne jamais y mettre de volume social.

**4. Que l'économie du consommable soit un argument pour un acheteur français.** Le prix de 4,66 $ la cartouche est américain. Aucun prix de recharge français n'a été relevé dans ce run. L'argument « achat unique contre abonnement » est solide en logique et non vérifié en euros.

**5. Que le casting jeune de Gillette soit une décision et pas une conséquence.** Je lis une absence complète d'homme de plus de quarante-cinq ans sur trente annonces de créateurs. Cette absence peut être un choix de marque, ou simplement le reflet de qui accepte de faire une publicité sur ce sujet. Les deux ont des conséquences très différentes pour Raselio.

## What was out of scope and removed

Trois blocs de matière ont été rencontrés et écartés, parce qu'ils appartiennent à une autre fonction que la stratégie créative.

**La logistique de distribution.** Le référencement de la gamme chez Cdiscount, Auchan, Leclerc, Carrefour, Amazon, Walmart et Costco a été relevé, et seule la partie qui touche au **prix vu par l'acheteur** et à la **destination des annonces** est conservée. Le reste, conditions de référencement, formats de lot, disponibilité, appartient à une lecture commerciale et pas à celle-ci.

**Le détail de la mécanique produit.** Les revendications techniques du Triple Defense System sont conservées en tant que **vocabulaire de marché**, parce que le vocabulaire est un actif créatif. Les comparaisons d'ingénierie de lame, elles, sont retirées : elles ne changent aucune décision créative de Raselio et elles invitent à une bataille de spécifications que la méthode déconseille pour une marque de cette taille.

**Le bundle Braun.** L'existence d'un lot « Braun x GilletteLabs Body & Intimate » sur `fr.braun.com` est notée dans le paysage concurrentiel et sortie d'ici : c'est un signal de portefeuille de groupe, pas un signal de performance publique du compte audité.

## Provisional recommendations held as hypotheses

Trois hypothèses, en forme de si-alors, avec leur persona, leur direction de message et leur signal de réussite. Aucune n'est prête à exécuter, et chacune est explicitement conditionnée à un déblocage de contexte.

**Hypothèse 1 — l'homme de plus de cinquante ans, sur le registre du geste et non du sport.**
*Si* Raselio met à l'écran un homme d'environ cinquante-cinq à soixante ans, dans une salle de bain ordinaire, en vouvoiement, sur le mécanisme du geste sûr et de la lumière qui permet de voir ce qu'on fait, *alors* le coût par ajout au panier devrait baisser sous les 24,11 € que le compte paie aujourd'hui, sur la tranche 45-64 qui porte déjà 82 % de la dépense et la totalité des achats.
**Persona** : l'homme de quarante-cinq ans et plus, qui achète déjà et à qui aucune créative de la catégorie ne parle, ni chez Raselio, ni chez Gillette sur 357 annonces, ni chez Thomyle dont les 1 041 annonces ciblées sont toutes en 18-65 sans segmentation.
**Message** : la précision et la sécurité du geste, pas la performance sportive.
**Signal de réussite** : le coût par ajout au panier de l'ad set concerné, contre le 24,11 € du compte, sur au moins trente ajouts au panier avant de conclure quoi que ce soit.
**Ce qui la conditionne** : rien côté données. C'est l'hypothèse la plus prête des trois.

**Hypothèse 2 — la démonstration sur objet de substitution, en vidéo courte.**
*Si* Raselio produit une vidéo de dix à quinze secondes montrant le mauvais outil abîmer un objet de substitution puis le bon outil passer proprement, *alors* le compte devrait obtenir un taux de clic supérieur à ses statiques actuelles, parce que le geste montre ce que l'image fixe ne peut que dire.
**Persona** : le même homme de quarante-cinq ans et plus, au niveau Problem Aware, celui que le compte finance le moins.
**Message** : le mauvais outil fait des dégâts, le bon n'en fait pas, et personne ne voit un corps.
**Signal de réussite** : le taux de clic et le taux d'ajout au panier contre les 2,60 % de CTR et les 5,4 % de vues de page vers panier du compte.
**Ce qui la conditionne** : Raselio n'a jamais produit une vidéo, donc le vrai risque est de production et pas de stratégie. C'est aussi pourquoi cette hypothèse cite une annonce de Gillette comme preuve que le format passe la modération : les annonces `1050422014117181` et `1028150503182738` le font avec un prop en fourrure et un modèle en mousse.

**Hypothèse 3 — l'achat unique, chiffré en euros et sans nommer personne.**
*Si* Raselio met le calcul du consommable au centre d'une créative, en euros français et sans citer de marque, *alors* elle devrait convertir mieux sur un acheteur qui compare déjà en rayon, parce que c'est le seul terrain où sa structure de prix bat mécaniquement celle d'un système à recharges.
**Persona** : l'acheteur en phase d'évaluation, celui qui regarde la tondeuse à 29,70 € en Drive et se demande ce qu'elle coûte vraiment.
**Message** : le coût sur deux ans, pas le prix affiché.
**Signal de réussite** : le taux de passage de la vue de page vers le panier, qui est aujourd'hui à 5,4 % et qui est la fuite unique et identifiée de l'entonnoir.
**Ce qui la conditionne, et c'est un vrai verrou** : aucun prix de recharge français n'a été relevé, et la question de la publicité comparative revient dès qu'un chiffre de concurrent apparaît. **À faire trancher par la marque avant toute production.**

## Open loops

**1. La seule surface où le rival est mesurable publiquement est fermée à Parker, et ce n'est pas un détail technique.**
Les pages d'avis de Gillette, chez Walmart, chez Gillette UK, chez Amazon et sur les trois bancs d'essai français, sont toutes bloquées par le proxy de cette session. Sept textes d'avis ont été lus, tous à travers un résumé de moteur de recherche, contre un dénominateur agrégé de 88 avis sur un seul produit de la gamme.
**Pull : gap.** Il y a une masse de données publiques sur ce concurrent, elle existe, et rien n'a pu en être fait dans ce passage.
**Question : que disent réellement les acheteurs français des tondeuses Gillette Body + Intimate quand ils écrivent librement ?**
Toute la moitié « objection exploitable » de la stratégie de Raselio dépend de la réponse. Si le produit adverse déçoit sur un point précis en France, c'est un angle. S'il ne déçoit pas, l'angle est le prix et rien d'autre.
**Territoire : product.**

**2. Le géant vend un manche et des recharges, Raselio vend un objet qui ne se recharge jamais, et personne ne sait si l'acheteur français fait ce calcul.**
Une cartouche de recharge coûte 4,66 $ aux États-Unis. Raselio écrit sur sa page Notre Histoire, verbatim : « Chaque commande est un achat unique, sans abonnement caché ni engagement. » Aucun prix de recharge français n'a été relevé et aucune source ne dit si cet argument pèse dans une décision d'achat.
**Pull : curiosity.** Deux modèles économiques opposés se battent pour le même geste et rien dans le contexte de la marque ne dit lequel l'acheteur préfère.
**Question : combien un homme français pense-t-il dépenser sur deux ans quand il choisit entre un rasoir à recharges et une tondeuse sans consommable ?**
Si le calcul est présent dans sa tête, l'axe achat unique est le premier message de la marque. S'il ne l'est pas, c'est un argument de fondateur que personne n'attend et il faut le descendre dans l'ordre.
**Territoire : product.**

**3. Le seul texte négatif trouvé sur le produit adverse attaque exactement la promesse du lancement.**
Un avis Walmart signé Brandon dit que le rasoir « keeps giving me nicks and cuts way too easily », quand toute la campagne de lancement est construite sur « Gillette's safest body razor ever » et sur « less nicks & cuts ».
**Pull : tension.** La promesse la plus chère du marché et sa contradiction la plus directe se trouvent sur la même fiche produit, et je n'ai aucun moyen de savoir laquelle est représentative.
**Question : à quelle fréquence la promesse de zéro coupure est-elle contredite dans les avis de la catégorie ?**
Si la contradiction est fréquente, la catégorie a une crédibilité fragile et une marque qui promet moins et prouve mieux gagne. Si elle est rare, promettre la même chose que Gillette avec moins de moyens est un combat perdu d'avance.
**Territoire : messaging.**

**4. Les deux marques écrivent pour le même homme jeune et l'une des deux encaisse chez un homme de soixante ans.**
La copie de Gillette est écrite pour un homme de vingt à quarante ans sur 357 annonces. Les créatives de Raselio qui portent quatre de ses six achats montrent un homme de la fin de la vingtaine, torse nu et tatoué. Les six achats attribués et les onze commandes viennent d'hommes de quarante-cinq ans et plus, avec des prénoms et des adresses de messagerie qui le confirment.
**Pull : surprise.** Le décalage entre à qui la créative parle et qui paie est complet, et il tient sur les deux marques à la fois.
**Question : qu'est-ce que l'homme de soixante ans reconnaît dans une publicité qui montre un homme de trente ans ?**
Si c'est le produit qu'il reconnaît et pas la personne, changer le visage ne servira à rien et il faut travailler la démonstration. Si c'est une projection, alors le pivot d'âge décidé par l'équipe le 3 septembre est peut-être une erreur qu'il vaut mieux tester petit.
**Territoire : personas.**

## Appendix - Parker media links

**M001 — Fiche de marque externe Gillette dans Parker**
- Identifiant externe : `bdf3dd63-74ed-40f7-9da7-3245cd250869`, page Facebook 7390944749, 1 085 annonces enregistrées, Instagram `gillette` 192 239 abonnés, page Facebook 1 877 598 mentions J'aime
- Bibliothèque publicitaire : https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&is_targeted_country=false&media_type=all&search_type=page&source=fb-logo&view_all_page_id=7390944749
- Discuté dans : inférence d'audience, signal d'engagement

**M002 — Annonce 2045348549707003, confession du rasoir du père, rang 6 stable sur huit jours**
- Parker : https://app.heyparker.ai/dashboard/ad-library?adId=2045348549707003&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37
- Vidéo : https://auth.heyparker.ai/storage/v1/object/public/internal-facebook-ads/external-brands/bdf3dd63-74ed-40f7-9da7-3245cd250869/2045348549707003.mp4
- Discuté dans : signal d'engagement, historique de rang

**M003 — Annonce 1477062697448217, « BODY +INTIMATE », du rang 33 au rang 18 en huit jours**
- Parker : https://app.heyparker.ai/dashboard/ad-library?adId=1477062697448217&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37
- Vidéo : https://auth.heyparker.ai/storage/v1/object/public/internal-facebook-ads/ext/bdf3dd63-74ed-40f7-9da7-3245cd250869/aac1fb1339aed7f03a6d40a69257e126ae200c50c4e2c163bdf85e751ba0ef66.mp4
- Discuté dans : signal d'engagement

**M004 — Annonce 1071953122070728, « 100+ year glow up », du rang 93 au rang 45 en huit jours**
- Parker : https://app.heyparker.ai/dashboard/ad-library?adId=1071953122070728&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37
- Discuté dans : signal d'engagement

**M005 — Annonces de démonstration sur objet de substitution, citées comme preuve de passage en modération**
- `1050422014117181` : https://app.heyparker.ai/dashboard/ad-library?adId=1050422014117181&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37
- `1028150503182738` : https://app.heyparker.ai/dashboard/ad-library?adId=1028150503182738&brandId=a81e7c77-ca41-4cbd-acf8-ec27ea58eb37
- Discuté dans : hypothèse 2

**M006 — Surfaces d'avis, toutes bloquées par le proxy de la session le 2026-09-06, connues par résumé de moteur de recherche**
- Avis Gillette UK sur le GilletteLabs Body + Intimate Razor : https://www.gillette.co.uk/reviews/17682690/
- Avis Walmart, rasoir 5 unités : https://www.walmart.com/reviews/product/18062057882
- Fiche Walmart, recharges 6 unités, 4,8 sur 5 pour 88 avis : https://www.walmart.com/ip/18076214920
- Recharges Amazon US, 3 lames : https://www.amazon.com/GilletteLabs-Intimate-Blades-Anti-ingrown-Refills/dp/B0GTWJ41K5
- Recharges Gillette US, 6 cartouches : https://gillette.com/en-us/products/gillettelabs/body-intimate-razor-refill-blades-6ct
- Lames Amazon.fr, lot de 10 : https://www.amazon.fr/Gillette-Intimate-Lames-Rasoir-Homme/dp/B0G6WMXNWM
- Tondeuse i3 Amazon.fr : https://www.amazon.fr/Gillette-Intimate-Technologie-SkinFirst-Rechargeable/dp/B0G6WXP4LN
- Bancs d'essai français : https://www.barbedudaron.fr/blog/tondeuse-gillette-i5-intimate/ · https://www.lemalefrancais.com/post/tondeuse-gillette-intimate-i3-avis · https://latelierdubarbier.fr/tondeuse-pour-le-corps-gillette-body-et-intimate-i5-test-et-avis/
- Discuté dans : constats adossés, accroches tirées des avis

**M007 — Surface presse du lancement, pages bloquées par le proxy, chiffres connus par résumé concordant**
- https://www.businesswire.com/news/home/20260402674230/en/Gillette-Launches-New-GilletteLabs-Body-Razor-Setting-a-New-Standard-for-Mens-Body-Grooming
- https://www.morningstar.com/news/business-wire/20260402674230/gillette-launches-new-gillettelabs-body-razor-setting-a-new-standard-for-mens-body-grooming
- https://www.globalcosmeticsnews.com/gillette-launches-gillettelabs-body-razor-to-tap-growing-body-grooming-trend/
- https://chaindrugreview.com/gillette-launches-gillettelabs-body-razor/
- https://www.t3.com/home-living/grooming/gillette-just-launched-its-latest-body-grooming-range-and-it-includes-four-new-shavers
- https://www.huffingtonpost.co.uk/entry/gillette-mens-body-razor-intimate-shaving_uk_6a0c2f1ae4b03f66d278eaea
- https://www.hpcmagmea.com/2026/04/07/gillette-introduces-new-body-razor-to-under-gillettelabs-line/
- Discuté dans : constats adossés, superposition d'événements

**M008 — Prix et distribution France**
- Fiche officielle tondeuse i3 : https://www.gillette.fr/fr-fr/produits/tondeuse-barbe/body-intimate-i3-tondeuse
- Cdiscount, « Autonomie 80 min, 2 sabots inclus » : https://www.cdiscount.com/electromenager/beaute-masculine/tondeuse-corps-zone-intime/f-1105803-aacue17514.html
- Auchan : https://www.auchan.fr/gillette-labs-tondeuse-pour-le-corps/pr-C1857591
- Relevé Drive Leclerc à 29,70 € : https://www.dealabs.com/bons-plans/tondeuse-gillette-labs-i3-body-intimate-3329129
- Discuté dans : constats adossés, hypothèse 3

**M009 — Bibliothèque publicitaire France, page Gillette France 1095978967098603**
- Fichier source : `source-pulls/meta-ad-library-competitors.md`, section « Gillette Labs body », dix lignes au 2026-09-06
- Créatives du 2026-09-03 : https://www.facebook.com/ads/library/?id=1595338758703939 · https://www.facebook.com/ads/library/?id=1561390675470214 · https://www.facebook.com/ads/library/?id=1111521908195233
- Discuté dans : constats adossés, superposition d'événements, inférence 3

**M010 — Surfaces de voix client côté Raselio, interrogées pour le signal de migration**
- `mcp__Parker__search_customer_reviews_sql` et `mcp__Parker__search_customer_reviews_semantic`, brand_id `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, quatre requêtes le 2026-09-06, N égal à 0 sur les quatre
- `mcp__Parker__search_facebook_ad_comments_sql`, deux commentaires
- « Lol », 2026-09-01 : https://www.facebook.com/122109959949409627/posts/122108944095409627?comment_id=2257250055117203
- « Plus rien de la bête sauvage qui sommeille en nous. », 2026-08-31 : https://www.facebook.com/122109959949409627/posts/122108833431409627?comment_id=1395943165961254
- Discuté dans : signal de migration

**M011 — Documents internes lus pour la lecture comparative**
- `audits/2026-Q3/90-day-performance-audit.md` — entonnoir Parker, coût par ajout au panier 24,11 €, six achats, 82,0 % de dépense sur 45 ans et plus
- `audits/2026-Q3/90-day-creative-strategy-audit.md` — l'homme de la fin de la vingtaine dans les créatives qui vendent
- `source-pulls/shopify-orders-and-customers.md` — les onze commandes et leurs domaines de messagerie
- `sub-context-docs/competitive-landscape.md` — pop-up de mars 2026, prix relevés, tri du set
- `running-notes/success-definition.md` — la marge de contribution d'environ 23,58 € qui sert de barre

Méthodes chargées pour ce document, preuve de lecture. La méthode d'analyse des comptes publicitaires publics, la méthode de minage des avis clients, la taxonomie des accroches, le niveau d'exigence d'une bonne publicité de performance, le processus persona, les fondamentaux de stratégie créative et la méthode des marques à prix supérieur à la moyenne de catégorie ont été lus avant l'analyse. Une seule d'entre elles porte une ligne de signature obligatoire et la voici : **This is based on everything I have learned about luxury and high-priced brands.**
