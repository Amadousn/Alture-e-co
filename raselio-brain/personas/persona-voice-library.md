---
brand: raselio
doc: persona-voice-library
generated_on: 2026-09-07
refresh_by: 2026-10-07
voc_corpus_profile: personas/voice-of-customer/voc-corpus-profile.md
personas_profile: personas/personas-profile.md
sources_read: [personas/voice-of-customer/voc-corpus-profile.md, personas/voice-of-customer/voice-of-customer.md et ses neuf extractions, personas/personas-profile.md, source-pulls/personas/ad-comments.md, source-pulls/personas/customer-reviews.md, source-pulls/personas/post-purchase-surveys.md, source-pulls/personas/brand-reputation.md, source-pulls/personas/reddit.md, source-pulls/personas/other-reviews.md, source-pulls/personas/ad-account.md, source-pulls/personas/brand-self-echo-detection.md, Parker MCP brand a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 — search_facebook_ad_comments_sql et _semantic, search_customer_reviews_sql, semantic_search_post_purchase_survey, get_brand_persona, search_facebook_ads_sql avec le bloc ad_analysis, source-pulls/shopify-orders-and-customers.md, source-pulls/gmail-brand-signals.md, source-pulls/drive-30-statiques-meta-plan-2026-09-03.md, sub-context-docs/customer-journey-and-persona-discovery.md]
date_range: 2026-08-26 to 2026-09-01
data_limitations: [LE CORPUS DE LANGAGE CLIENT DE CETTE MARQUE COMPTE UN VERBATIM UTILISABLE. Il faut le lire avant tout le reste, parce que ça change ce que ce document peut être. Les quatre surfaces qui devaient le nourrir ont été interrogées le 2026-09-06 et le 2026-09-07, et voici ce qu'elles rendent : 0 avis client, avec un message d'outil disant explicitement que la base est vide et que ce n'est pas un problème d'accès ; 0 réponse de sondage post-achat ; 2 commentaires publicitaires sur l'ensemble du compte, dont l'un fait trois caractères ; 0 mention de la marque sur 8 requêtes de réputation ; 0 avis tiers ; aucun outil Reddit dans cette installation et toutes les surfaces communautaires refusées par le proxy réseau. Le corpus émotionnel exploitable tient donc en une phrase de 51 caractères, déposée le 2026-08-31, par une personne dont on ne sait ni l'âge, ni le genre, ni si elle a acheté. Conséquences précises sur ce document. Aucune fréquence ne peut être calculée : une récurrence de 1 sur un dénominateur de 2 n'est pas une fréquence. Aucun classement d'émotions par volume n'est possible ; le classement proposé mélange donc, en le disant, une émotion attestée par du langage et des émotions inférées du comportement d'achat, et les deux ne sont jamais confondues. Aucune expression par persona n'est observable : personne ne parle assez pour qu'on voie une différence de registre entre un persona et un autre. Le langage de catégorie disponible provient de clients d'autres marques, arrive sans nom de marque, sans date et sans lien vérifié, et il est rangé en annexe de recherche et jamais en preuve. Les 57 entrées de langage écrites par Raselio elle-même sont en quarantaine dans la bibliothèque de voix client et ne sont utilisées ici que comme objets d'analyse, jamais comme voix de client. Cinq lignes de copie attribuées à des clients nommés sont documentées comme inventées par l'équipe et sont bannies de tout usage.]
methods_loaded: [creative-strategy-context/customer-review-mining-method.md, creative-strategy-context/emotional-delivery-and-timing.md, creative-strategy-context/persona-research-and-creative-strategy-process.md, creative-strategy-context/advertising-to-older-audiences.md, creative-strategy-context/hook-psychology.md, creative-strategy-context/creative-strategy-fundamentals.md]
---

# Persona voice and emotion library - Raselio

## Purpose and how to use

Ce document est le compagnon de langage émotionnel de `personas/personas-profile.md`. Il existe pour une raison très simple : empêcher qu'un rédacteur invente ce que ressent le client. On y entre par l'émotion qu'on veut faire naître, on passe par le persona et par le signal comportemental actif, et on écrit ensuite.

**Pour Raselio, il faut ajouter un mode d'emploi particulier, parce que ce document ne peut pas faire son travail normal.** Il n'existe qu'une phrase de client dans tout le coffre. Ce document ne vous donnera donc pas une banque d'émotions attestées. Il vous donnera trois choses, et il faut les utiliser différemment :

**Un.** La seule phrase réelle, avec sa date, sa source et son lien. Citable telle quelle. Ne rien en généraliser.

**Deux.** Les moteurs émotionnels que le **comportement d'achat** laisse voir, et pas le langage. Ce n'est pas la même chose et c'est marqué à chaque fois. Quand quatre achats sur six viennent d'une famille de créas qui vend le calme et zéro achat d'une famille qui vend la gêne, ça dit quelque chose sur ce qui bouge un acheteur, sans qu'aucun acheteur ait parlé. C'est de l'inférence de comportement, à confiance mixte au mieux.

**Trois.** La liste de ce qu'il ne faut surtout pas prendre pour du langage client : la langue de la marque, la langue des concurrents, et cinq lignes attribuées à des personnes qui n'existent pas.

**Ce qu'il ne faut pas faire avec ce document.** Ne pas y chercher une phrase à mettre dans une accroche. Il n'y en a qu'une et elle est ironique. Pour écrire aujourd'hui, il faut assumer d'écrire sans langage client, et c'est plus honnête que de recycler la voix du copywriter en la faisant passer pour celle du client.

## How to read the evidence tags

**Les balises de source.** `ad-comment` désigne un commentaire déposé sous une publicité Facebook de la marque. `brand-copy` désigne une phrase écrite par Raselio, sur son site ou dans une créa. `team-doc` désigne une phrase écrite par l'équipe dans un document de travail. `category-unverified` désigne un fragment de langage de client d'une autre marque, restitué par un moteur de recherche ou stocké sans attribution dans le document de contexte de marque Parker, et jamais lu à la source. `behavior` désigne une lecture faite sur des chiffres d'achat et non sur des mots.

**Observé contre inféré.** Une citation est **observée** quand le client nomme l'émotion lui-même, avec le mot. Elle est **inférée** quand l'émotion est certaine à la lecture du ton, des enjeux ou des intensifs, mais que le mot n'y est pas. Sur le corpus de Raselio, il y a une citation et elle est inférée : personne n'a jamais écrit « j'ai peur » ni « je suis gêné » à cette marque.

**Une balise supplémentaire, propre à cette marque, et il faut la respecter.** `brand_self_echo: true` couvre 57 entrées de la bibliothèque de voix client. Ce ne sont pas des clients contaminés par la marque, ce sont des phrases de la marque que personne n'a jamais reprises. La conséquence pratique est la même : pas de copie principale sans dérogation. La conséquence de lecture est différente : ces phrases ne prouvent rien sur ce que ressent un acheteur.

## Dataset summary

**Sources lues et ce qu'elles ont rendu.**

| source | volume | fenêtre | ce qu'elle a rendu |
|---|---|---|---|
| commentaires publicitaires | 2 enregistrements, corpus complet | 2026-08-31 → 2026-09-01 | 1 phrase utilisable, 1 de trois caractères |
| avis clients | 0 | tout l'historique | rien. L'outil dit que la base est vide et que ce n'est pas un problème d'accès |
| sondages post-achat | 0 | tout l'historique | rien. Aucun sondage n'a jamais été envoyé |
| réputation | 8 requêtes de marque | 2026-09-06 → 2026-09-07 | 0 mention de Raselio |
| avis tiers | 0 sur Raselio, 7 pages de catégorie refusées par le proxy | 2026-09-07 | 15 fragments de catégorie non vérifiés, rangés en annexe |
| Reddit et forums | 0 fil lu, aucun outil, 16 refus réseau | 2026-09-06 → 2026-09-07 | rien |
| e-mail entrant | 46 fils lus | 2026-07-22 → 2026-09-06 | 1 question client, sur la livraison |
| compte publicitaire | 183 lignes d'annonces, lecture créative complète sur 24 | 2026-08-10 → 2026-09-06 | le comportement d'achat, pas du langage |

**Couverture de source.** Une surface sur sept a livré du langage de client. La méthode de mining demande de déclarer la passe partielle quand des sources matérielles manquent ; ici il faut la déclarer **quasi vide**, ce qui est plus fort.

**Couverture de champ.** Sur les deux enregistrements existants, `author_name` et `author_id` sont nuls, `like_count` et `comment_count` sont à zéro, `parent_comment_ids` est vide. Aucun âge, aucun genre, aucun fil, aucune réaction. La date et l'annonce d'origine sont, elles, complètes sur les deux.

**Quelle source a été la plus dense en émotion, et pourquoi ça surprend.** Ce ne sont pas les commentaires, ce sont les textes que la marque a écrits pour elle-même. L'advertorial contient neuf formulations de douleur datées, sept de résultat, sept d'images. C'est de la langue excellente et ce n'est pas de la langue client. La densité émotionnelle de ce coffre est donc entièrement du côté de l'émetteur, pas du récepteur, et c'est la caractéristique la plus importante du jeu de données.

**Les méthodes chargées avant l'analyse.** `customer-review-mining-method.md` pour le dénominateur, la règle qui interdit de promouvoir une occurrence unique en motif, et le repérage de l'écho de marque. `emotional-delivery-and-timing.md` pour les quatre phases TEEP et surtout pour la lecture valence contre intensité, qui est la seule grille qui fonctionne quand on lit du comportement plutôt que des mots. `persona-research-and-creative-strategy-process.md` pour l'échelle de force de preuve. `advertising-to-older-audiences.md` parce que les six achats attribués viennent tous d'hommes de plus de 45 ans. `hook-psychology.md` pour la lecture du travail que fait une accroche, remarquer, qualifier, intriguer, rassurer, mouvoir, transporter. `creative-strategy-fundamentals.md` pour la posture des boucles.

## Persona reference

Les personas canoniques sont définis dans `personas/personas-profile.md` et ne sont ni renommés ni redéfinis ici.

- **`soigne-discret` — flagship, confiance mixed.** Un homme qui tient les choses en ordre sans en faire un sujet, qui s'occupe déjà de cette zone avec un outil qui n'a pas été conçu pour elle, et qui veut que la routine cesse d'être une épreuve.
- **`partenaire-prescriptrice` — emerging, confiance hypothesis.** Une femme en couple avec lui, qui commande à sa place parce qu'il ne le fera pas. Zéro achat à ce jour.

**Note d'attribution obligatoire pour ce document.** Aucun des deux personas ne peut recevoir d'étiquette de langage : l'unique verbatim est anonyme, donc `identity_tag: null`. Toute expression par persona écrite ci-dessous est une inférence sur du comportement d'achat, jamais une observation de registre.

## Top emotional engines

Le classement qui suit n'est pas un classement de fréquence, et il faut le dire avant de le lire, parce qu'un lecteur pressé le prendrait pour tel. Une fréquence demande un dénominateur, et le dénominateur du langage client de cette marque est deux. Le classement mélange donc deux natures de preuve, toujours signalées : ce qui est attesté par du langage, et ce qui est inféré du comportement d'achat. La première catégorie contient une entrée.

### Emotion 1 - Le sentiment de perdre quelque chose

**Le ressenti, en une phrase.** Se raser cette zone n'est pas un entretien, c'est un renoncement à une part de soi.

**Fréquence et dénominateur.** 1 occurrence sur 2 enregistrements de langage client existants. Ce n'est pas une fréquence, c'est une existence.

**Intensité, avec le raisonnement.** Moyenne, et exprimée par l'ironie plutôt que par la colère. La personne n'insulte pas, ne se plaint pas et ne pose pas de question. Elle constate une perte au nom d'un « nous » masculin collectif, ce qui déplace la conversation du produit vers l'identité. `hook-psychology.md` décrit la qualification comme le deuxième travail d'une accroche, celui qui dit au spectateur si le message est pour lui ; ici c'est le spectateur qui a fait le travail à l'envers, en disant que le message n'est pas pour lui et pourquoi.

**Où elle se situe dans le parcours.** Avant tout. C'est une émotion de pré-Trigger : elle empêche le besoin de devenir conscient, parce qu'elle nie qu'il y ait un besoin.

**Alignement persona.** Aucun. L'auteur est anonyme et rien ne dit qu'il corresponde à `soigne-discret`. C'est peut-être exactement l'inverse : l'homme qui n'achètera jamais.

**Déclencheurs de contexte.** Une publicité montrant un homme d'environ trente ans, torse nu, en boxer gris, avec le titre « Soyez impeccable partout. » et un texte qui tutoie.

**Preuve verbatim.**

> « Plus rien de la bête sauvage qui sommeille en nous. »
> Source : `ad-comment`, Facebook, page 1234695553067195, sous l'annonce `52505820194591` « RASELIO | IMPECCABLE | BOXER ». Date : 2026-08-31 à 15:46:58 UTC. Identifiant : `3c2ca5a3-6d53-5564-6fd8-f33d60753d83`. 0 like, 0 réponse. Balise : **inférée**, l'émotion n'est pas nommée.

**Phrases courtes à reprendre pour une accroche statique.** Aucune. Cette phrase n'est pas une pépite d'accroche, c'est une objection. La reprendre en accroche reviendrait à vendre l'argument de l'adversaire. Ce qu'elle rend possible, en revanche, est une accroche qui la reconnaît avant de la retourner, et c'est un travail d'écriture, pas un copier-coller.

**Phrases longues pour une ouverture vidéo.** Aucune, pour la même raison. Et il faut noter que la marque n'a jamais produit une seule vidéo de son propre chef, donc la question ne se pose pas encore.

**Expression par persona.** Non observable. Une phrase, un auteur anonyme.

**Ce que cette émotion vaut malgré son dénominateur de un.** Elle est la seule chose dans tout le coffre qui vienne d'un cerveau extérieur à la marque, et elle nomme une chose que la marque n'a jamais nommée. Les sept objections que l'équipe s'est écrites — « c'est pour les jeunes », « je vais me couper », « ma tondeuse à barbe suffit », « arnaque, ça vient de Chine », « colis pas discret », « à quoi sert la LED », « ça pique à la repousse » — supposent toutes un homme qui veut déjà se raser. Celle-ci vient d'un homme qui n'en veut pas. Sur 24 annonces dont la lecture créative est complète et 69 documentées, aucune ne touche cette idée. L'absence, elle, se compte sans marge d'erreur.

### Emotion 2 - Le soulagement d'être en ordre, plutôt que la fierté d'être transformé

**Nature de la preuve : `behavior`. Aucun client n'a écrit un mot là-dessus.** Ce qui suit est une inférence sur du comportement d'achat, à confiance mixte, sur un dénominateur de six achats.

**Le ressenti, en une phrase.** Rien de spectaculaire ne se passe. Une chose qui traînait est réglée, et le corps se détend.

**La preuve, chiffrée.** L'ad set `52505820131591` « IMPECCABLE x5 » a dépensé 112,39 € et produit 4 des 6 achats du compte, avec un coût par achat de 28,10 € contre 94,16 € sur la campagne principale, verified. Son mécanisme, lu image par image : fond crème uni, titre noir très gras « Soyez impeccable partout. », un soulignement vert citron, un seul humain, produit héros net, flèches vers les zones. En face, l'ad set `52505897002791` « POSTIT ÉMOTIONNEL x5 », qui vend explicitement une émotion négative et sa réparation, a dépensé 85,04 € et produit zéro achat. Ses titres, verified : « Gêné de te déshabiller ? Plus jamais. », « Le moment de vérité, c'est quand le boxer tombe. », « Ta barbe est soignée. Et tes boules ? »

**Pourquoi je lis ça comme une émotion et pas comme une préférence esthétique.** `emotional-delivery-and-timing.md` explique qu'un état de forte intensité rétrécit l'attention et pousse à l'action immédiate mais supprime le traitement réflexif qui fabrique l'identification, tandis qu'un état de faible intensité et de valence positive ouvre exactement ce traitement. La famille qui vend est à faible intensité et à valence positive ; celle qui ne vend pas est à intensité élevée, sur la gêne et sur la performance. C'est le quadrant que la méthode décrit comme le plus sous-investi du DTC, et c'est celui qui vend ici.

**Où elle se situe dans le parcours.** Purchase, et un peu Evaluation. C'est l'émotion de la décision, pas celle du déclenchement.

**Alignement persona.** `soigne-discret`, par construction : c'est le persona bâti sur ce comportement.

**Preuve verbatim.** Aucune de client. La seule formulation qui approche est de la marque et porte `brand_self_echo: true`, `brand-copy`, advertorial : « **Résultat : vous respirez normalement. La routine redevient une routine, pas une épreuve.** » Elle est excellente. Elle n'est pas une preuve d'émotion client.

**Phrases à reprendre.** Aucune de client. Ce qui est utilisable est le **registre**, pas les mots : déclaratif, court, état plutôt qu'action, calme plutôt qu'intense.

### Emotion 3 - Le besoin d'être rassuré sur le vendeur, pas sur le produit

**Nature de la preuve : `behavior`. Confiance mixte, sur des dénominateurs très petits.**

**Le ressenti, en une phrase.** Le produit a l'air d'aller ; c'est la marque qui n'a pas de visage, et il faut décider quand même.

**La preuve, chiffrée.** L'annonce `52506457654991` « RS · C11 garantie-colis » affiche 14,06 % de taux de clic, le meilleur du compte, sur 64 impressions et 1,33 € dépensés, verified. Toute la famille garantie, colis neutre et remboursement tient sous cinq euros cumulés. Côté site, 2 431 sessions produisent 42 ajouts au panier sur 61 jours, soit 1,7 %, et 11 commandes ; entre 1 116 et 4 154 sessions par commande selon le compteur retenu. Côté recherche, huit requêtes de marque ne remontent aucune trace de Raselio, donc l'homme qui veut vérifier ne trouve rien.

**Pourquoi c'est une émotion et pas une objection logique.** `advertising-to-older-audiences.md` pose que pour ce public l'autorité est le raccourci de confiance et qu'un compteur d'avis élevé lit comme une preuve réelle. Ce n'est pas un calcul, c'est un besoin d'appui. Et `emotional-delivery-and-timing.md` décrit exactement cette phase, Evaluation, comme celle où l'acheteur ne cherche pas plus d'information mais attend qu'on nomme son hésitation, et où ajouter de la pression ou du volume le fait décider que ce n'est pas la bonne marque.

**Preuve verbatim.** Une seule, et c'est la seule question qu'un extérieur ait jamais posée à cette marque.

> « Hello, can i know when you will ship if a customer should order today? »
> Source : formulaire de contact Shopify, relayé par mailer@shopify.com, fil Gmail `1a03dccaf7935d33`. Date : 2026-08-26 à 11:20 UTC. Expéditeur nommé « Sodiq », code pays FR, message en anglais. Réponse de la marque deux minutes plus tard : « Hello sure ». Balise : **inférée** pour l'émotion, **observée** pour le sujet. Dénominateur : 1 message client entrant sur 46 jours de vie commerciale.

Un message sur quarante-six jours n'est pas un motif. Ce qui est notable est que ce message unique porte sur la livraison, c'est-à-dire précisément sur le sujet que la FAQ du site ne traite pas et que le compte publicitaire ne finance pas.

**Alignement persona.** `soigne-discret`, dans son identité contextuelle de vérificateur.

### Ce que ce classement ne contient pas, et pourquoi

La peur de se couper devrait être ici. C'est l'axe central de toute la créa de la marque et de toute la catégorie. Elle n'y est pas parce qu'aucun client de Raselio ne l'a jamais exprimée, et parce que le compte ne permet pas de l'isoler : les annonces qui la portent ne sont pas séparées de celles qui portent autre chose. Elle est traitée en signaux à faible confiance ci-dessous. La ranger dans les moteurs principaux parce que tout le monde en parle serait exactement l'erreur que ce document existe pour empêcher.

## Low-confidence signals

**La peur de se couper.** Attestée nulle part chez un client de Raselio. Attestée dans le langage de catégorie, mais uniquement par des fragments non vérifiés à la source, rangés en annexe. Ce qui l'éclairerait : une seule page d'avis ouverte, ou dix réponses de sondage.

**La gêne de se déshabiller devant quelqu'un.** La marque en a fait un lot entier, EMOTION, 85,04 € et zéro achat. Aucune trace côté client. Le signal est donc doublement faible : ni langage, ni conversion. Ce qui l'éclairerait : un sondage demandant ce qui a failli empêcher l'achat.

**Le regard de la partenaire.** Omniprésent dans la créa, avec « Elle ne dira rien. Mais elle remarquera tout. » et « Elle a remarqué. », et zéro achat sur les annonces qui le portent. Aucune femme et aucun homme n'a jamais confirmé cette lecture. Ce qui l'éclairerait : une question de sondage sur le destinataire du bénéfice.

**La presbytie.** Le seul angle du compte construit à partir d'une donnée d'acheteur réelle, l'âge, et il n'a reçu que 1,15 €. Zéro langage client. Ce qui l'éclairerait : trente euros derrière la créa 30 pendant sept jours.

**L'ironie comme mécanisme de défense.** Deux commentaires, dont l'un est une blague de trois lettres sous la créa la plus crue du compte et l'autre une ironie d'identité. Deux points ne font pas une ligne. Ce qui l'éclairerait : dix commentaires de plus, ce qui, au rythme observé d'un commentaire pour 22 336 impressions, demanderait environ 220 000 impressions supplémentaires.

## Creative language opportunities

**Une seule opportunité repose sur du langage de client vérifié, et c'est la plus intéressante du document.**

**L'image de la bête sauvage, et le cadrage qu'elle révèle.** Le seul Français qui ait parlé à cette marque n'a pas décrit un problème d'outil, il a décrit une puissance en réserve qu'on lui enlève. Raselio propose exactement le modèle mental inverse : une zone à risque qu'on met en ordre. La marque n'a jamais écrit une ligne qui reconnaisse cette lecture avant de la retourner. C'est un territoire de message entier, ouvert, et il vient d'un vrai homme. Il n'existe pas de formule toute faite à lifter : ce qui est disponible est une posture, celle qui accepte que le poil ait une valeur avant de proposer de le raccourcir plutôt que de le supprimer. Le produit s'y prête, il a un sabot à trois hauteurs.

**Deux opportunités reposent sur du langage de catégorie non vérifié, et elles sont marquées comme telles.** À lire dans l'annexe de recherche et à confirmer avant tout usage.
La modestie de formulation. Le langage de résultat de la catégorie, dans les fragments disponibles, est prudent et relatif, du type « so far it has not nicked me ». Raselio écrit « 0 coupure ». Inféré, à confiance thin : la formule modeste sonne plus vrai chez un public qui a déjà été déçu. Cette lecture est déjà portée par la bibliothèque de voix client et elle est reprise ici parce qu'elle touche directement le registre.
Le temps que ça prend. Le langage de catégorie fait apparaître une douleur que Raselio ne nomme nulle part, celle de la durée. La marque a l'argument, cinq minutes sous la douche, et elle l'a chargé pour 0,02 €.

**Ce que la marque sur-utilise et qu'elle devrait arrêter, du côté du langage.** Le chiffre de preuve sociale, sous ses trois formes, 35 000, 17 000 et 1 734 avis. Le détail est dans `source-pulls/personas/brand-self-echo-detection.md`. Pour ce document, ce qui compte est que la mention occupe la première ligne de lecture des annonces qui vendent, c'est-à-dire l'espace le plus cher de la créa, avec une phrase que la marque ne peut pas défendre.

## Contradictions and warnings

**Un.** La seule émotion attestée par du langage contredit le cadrage de la marque. Raselio traite la zone comme un problème d'outil à régler ; le seul homme qui ait parlé la traite comme une puissance à conserver. Un enregistrement, donc thin, mais la contradiction est frontale et personne ne l'a jamais testée.

**Deux.** L'émotion que la créa travaille le plus n'est pas celle qui vend. La famille post-it et le lot EMOTION vendent la gêne, la blague et la performance : 266,15 € cumulés, un seul achat. La famille « Impeccable » vend un état calme : 112,39 €, quatre achats. L'équipe est arrivée à la même conclusion de son côté, stated : « l'humour visuel (post-it, pixel) fait cliquer et mettre au panier mais convertit moins ». Le budget n'a pas suivi la conclusion.

**Trois, et c'est un avertissement de conformité autant que de langage.** Cinq lignes qui se présentent comme des paroles de clients sont écrites par la marque, et l'équipe le documente elle-même. « Franchement, je retenais mon souffle à chaque passage. Là, zéro coupure, zéro rougeur. J'aurais dû le faire il y a 20 ans. » signée « Hervé D. · Achat vérifié ★★★★★ ». « Catherine ❤️ / T'as fait quoi de différent ? / Rien. / (Raselio.) ». « 58 ans. Fini de retenir ma respiration. » sur une pancarte. « Bernard L. » et « Bernard, 61 ans » avec citation inventée. L'advertorial signé « Par Julien M. ». **Ces cinq lignes sont bannies de tout usage sans dérogation, et elles tournent aujourd'hui en publicité payée.** Le danger propre à ce document est qu'elles ont exactement la forme d'une pépite de mining : un run futur qui relira les créas sans cet avertissement les prendra pour du langage client.

**Quatre.** Une partie de ce que la marque tient pour sa voix vient de ses concurrents. « 0 coupure. 0 stress. 100 % contrôle. » est repris de Club Cooper, « LA TONDEUSE INTIME / ANTI-COUPURE · ANTI POIL INCARNÉ · ANTI IRRITATION » de Billy Trimmer, « Ce n'est pas votre peau. C'est la lame. » et « Vous ne payez pas la pub. Vous payez la lame. » de Grümwise, « Vous ne feriez pas ça à un kiwi. » de Balls Club, tous documentés par la veille de l'équipe. Ces formules sont rangées comme langage de marque dans la bibliothèque de voix client ; elles sont en réalité du langage de concurrent. Le territoire n'est pas libre.

**Cinq.** Le registre n'est pas tranché et le document de personas ne peut pas le trancher. L'équipe a décidé le vouvoiement, stated : « Ton qui marche : **vouvoiement**, phrases courtes, humour pudique et adulte ». Les cinq annonces qui ont produit les six achats tutoient toutes, verified sur le texte publicitaire chargé. Il n'existe aucune preuve que le vouvoiement convertisse mieux : le lot vouvoyé a trois jours et zéro achat.

**Six.** La marque emploie quatre registres pour nommer la même zone sur les mêmes surfaces : « zones intimes » sur la fiche produit, « parties intimes » dans l'URL, « là-dessous » sur la créa 04, « Couilles » sur le post-it de S2 et « tes boules » dans le texte publicitaire d'EMOTION 3. Le français n'a pas d'équivalent installé au « manscaping » anglais. Aucune décision n'est prise et chaque créa la reprend à zéro.

## Quote appendix

### Preuve propre — citations avec source, date et surface vérifiées

**Deux entrées. C'est tout ce que la marque possède.**

```yaml
- quote: "Plus rien de la bête sauvage qui sommeille en nous."
  source_type: ad-comment
  platform: Facebook, page 1234695553067195
  ad: "52505820194591 — RASELIO | IMPECCABLE | BOXER"
  row_id: 3c2ca5a3-6d53-5564-6fd8-f33d60753d83
  url: https://www.facebook.com/122109959949409627/posts/122108833431409627?comment_id=1395943165961254
  date: 2026-08-31
  product: Tondeuse Intime Homme Raselio, SKU unique
  rating: null
  persona_tag: null            # auteur anonyme, author_id et author_name vides
  emotion_tag: perte-didentite
  observed_or_inferred: inferred
  brand_self_echo: false
  recurrence: 1
  denominator: 2 enregistrements de langage client existants
  confidence: thin

- quote: "Hello, can i know when you will ship if a customer should order today?"
  source_type: inbound-email
  platform: formulaire de contact Shopify, relayé par mailer@shopify.com
  row_id: fil Gmail 1a03dccaf7935d33
  url: null
  date: 2026-08-26
  product: boutique Raselio
  rating: null
  persona_tag: null
  emotion_tag: besoin-de-reassurance-vendeur
  observed_or_inferred: inferred pour l'émotion, observed pour le sujet
  brand_self_echo: false
  recurrence: 1
  denominator: 1 message client entrant sur 46 jours et 46 fils lus
  confidence: thin
  notes: >
    Expéditeur nommé « Sodiq », code pays FR, message rédigé en anglais.
    Réponse de la marque le même jour, deux minutes plus tard, en entier : « Hello sure ».
```

**Une troisième ligne existe et n'est pas une citation.** « Lol », `ad-comment`, sous l'annonce `52505897035991` « EMOTION 3 - Barbe soignee et tes boules », 2026-09-01 à 15:37:47 UTC, identifiant `b86f8833-cadf-bad9-8cfc-1f0c6893a98f`. Trois caractères, aucun contenu de langage. Conservée pour la complétude du dénominateur, inutilisable comme preuve d'émotion.

### Section de recherche — fragments sans source vérifiée, jamais utilisables comme preuve

Le prompt demande que toute citation sans source ou sans date sorte de la preuve propre. Les quinze fragments ci-dessous n'ont ni date, ni nom d'auteur, ni page lue à la source. Ils sont conservés pour qu'un run disposant d'un accès réseau aille les vérifier, et ils sont **interdits en copie et interdits comme preuve d'émotion**.

**Bloc A — restitués par le moteur de recherche le 2026-09-07, catégorie tondeuse intime, pages jamais ouvertes.** Sept lectures directes tentées, sept refusées.
- Surface annoncée, page d'avis Best Buy, Manscaped Lawn Mower 5.0 Ultra : « No nicks, no cuts, no bleeding. » ; « this item feels like I'm getting waxed over and over again, i pulls at the hair way too much for a sensitive area ».
- Surface annoncée, avis Amazon, Meridian Trimmer : « The guards take away a bit of anxiety when moving around the 'boys' and the fact that it cuts thoroughly instead of pulling is a god-send ».

**Bloc B — stockés dans le document de contexte de marque Parker, lu le 2026-09-06, sans surface, sans date et sans produit attribués.** Ce document dit lui-même les tirer d'une analyse d'avis concurrents et ne dit pas d'où.
- « Taking any type of razor or trimmer to your nether regions can be daunting and time consuming. »
- « I'm sure many men can relate to finishing a trim session with a few nicks and cuts. »
- « I've tried traditional razors and other electric razors »
- « The small head moved in and out of crevices easily, and felt very safe with no risk of pain. »
- « No pulling or tugging of hair. »
- « It is handy for obscure places and so far it has not nicked me. »
- « I feel more clean, cool, and confident — plus the wife likes it. »
- « This shaver is bulky and does not have the same feel and closeness as the One-Blade. »
- « For a man who grooms occasionally, the Meridian delivers 80% of the result at less than half the price. »
- « Bought this less than a year ago and never used it under the water. When I finally did it broke. It is not waterproof at all. »
- l'idée d'une tondeuse intime comme « a nice little stocking stuffer for Christmas »

**Ce que ces quinze fragments valent, dit une fois pour toutes.** Ils viennent de clients d'autres marques, dans un autre pays et une autre langue, et aucun n'a été lu à la source. Les traiter comme la voix du client Raselio produirait exactement le dégât que ce document existe pour empêcher, à savoir une marque française qui écrit ses accroches sur des avis américains dont personne n'a vérifié l'existence.

### Langage de la marque — en quarantaine, jamais du langage client

Les 57 entrées écrites par Raselio elle-même vivent dans les annexes des neuf extractions de `personas/voice-of-customer/`, chacune avec `brand_self_echo: true`. Elles ne sont pas recopiées ici. Trois d'entre elles sont citées dans le corps de ce document, uniquement comme objets d'analyse : « Résultat : vous respirez normalement. La routine redevient une routine, pas une épreuve. », « Elle ne dira rien. Mais elle remarquera tout. », « Le moment de vérité, c'est quand le boxer tombe. »

## Open loops

**Boucle 1.** Observation : la seule phrase qu'un Français ait écrite à cette marque décrit le rasage comme une perte, et le cadrage de la marque décrit exactement l'inverse, un problème d'outil à régler ; aucune des 24 créas dont la lecture est complète ne touche cette idée. Pull : Curiosité, elle a tiré parce que le seul cerveau extérieur disponible pense le sujet à l'envers de la marque. Question : que pensent perdre les hommes qui refusent de se raser cette zone ? Justification : si ce cadrage est répandu, la marque parle depuis le mauvais bout du problème pour une part de son marché, et aucune créa ne l'a jamais testé. Territoire : Messaging.

**Boucle 2.** Observation : les cinq annonces qui portent les six achats tutoient toutes, l'équipe a décidé par écrit que le vouvoiement était le ton qui marche, et le lot vouvoyé a trois jours et zéro achat. Pull : Tension, elle a tiré en lisant « À moins que tu n'aies pas encore essayé la Raselio ? » dans le texte de l'annonce la plus rentable, juste après avoir lu la décision de vouvoyer. Question : quel registre un homme de cinquante-huit ans accepte-t-il d'une marque qu'il ne connaît pas sur ce sujet-là ? Justification : le registre est la première décision d'écriture de chaque créa, il est pris à l'aveugle depuis le début, et il se teste pour presque rien. Territoire : Messaging.

**Boucle 3.** Observation : la marque emploie quatre mots différents pour la même zone du corps sur les mêmes surfaces, du clinique au cru, et le français n'a pas de terme installé équivalent au « manscaping » anglais. Pull : Gap, elle a tiré en trouvant « zones intimes », « parties intimes », « là-dessous » et « couilles » dans un même compte publicitaire. Question : avec quels mots un homme français nomme-t-il cette zone quand il en parle à quelqu'un d'autre ? Justification : c'est la contrainte de langue la plus lourde de cette marque, elle n'est pas tranchée, et chaque créa la retranche à sa façon. Territoire : Messaging.

**Boucle 4.** Observation : la marque a produit 44 672 impressions et 32 ajouts au panier pour deux commentaires publics, soit un commentaire pour 22 336 impressions, et vend explicitement le fait que personne ne saura. Pull : Gap, elle a tiré en voyant six fois plus de paniers que de mots écrits. Question : où les hommes disent-ils quelque chose sur ce produit quand ils ne l'écrivent pas sous la publicité ? Justification : si la réaction existe en privé, la marque cherche sa voix client au mauvais endroit depuis le début, et une bibliothèque de langage ne se remplira jamais par le canal qu'elle surveille. Territoire : Product.

**Boucle 5.** Observation : la seule question qu'un extérieur ait posée à cette marque en quarante-six jours portait sur la date d'expédition, et la FAQ du site ne traite ni la livraison, ni le retour, ni la garantie, ni la provenance. Pull : Pattern, elle a tiré parce que le même sujet revient de trois côtés indépendants, le message client, le meilleur taux de clic du compte et la liste de freins de l'équipe. Question : quelle part des hésitations porte sur l'achat plutôt que sur le produit ? Justification : la réponse décide si la prochaine vague de créas continue d'expliquer la tondeuse ou commence à rassurer sur la marque, et c'est la moitié du budget de production. Territoire : Messaging.
