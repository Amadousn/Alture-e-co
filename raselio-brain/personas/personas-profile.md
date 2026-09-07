---
brand: raselio
doc: personas-profile
generated_on: 2026-09-07
refresh_by: 2026-12-07
sources_synced:
  - customer-reviews: 2026-09-07        # interrogé, 0 avis. Zéro contribution à toute persona
  - ad-account: 2026-09-07              # lu. La seule source qui porte un acheteur confirmé
  - ad-comments: 2026-09-07             # interrogé, 2 commentaires. 1 verbatim utilisable
  - post-purchase-surveys: 2026-09-07   # interrogé, 0 réponse. Zéro contribution
  - brand-reputation: 2026-09-07        # lu, 0 mention, 0 défenseur réel, 5 défenseurs inventés
  - reddit: 2026-09-07                  # aucun outil dans cette installation, 0 fil lu
  - other-reviews: 2026-09-07           # 0 surface tierce pour Raselio, corpus de catégorie en substitut
  - voc-corpus-profile: 2026-09-07      # 2 enregistrements, 1 verbatim unique, 57 entrées projetées en quarantaine
  - brand-self-echo-detection: 2026-09-07
persona_count: 2
flagship_persona: soigne-discret
companion_docs:
  - persona-voice-library: personas/persona-voice-library.md
  - lifecycle-journey-maps: personas/lifecycle-journey-maps.md
  - cross-persona-bias-notes: personas/cross-persona-bias-notes.md
  - voice-of-customer: personas/voice-of-customer/voice-of-customer.md
refresh_note: La cadence de la famille personas est de 180 jours. Elle est ramenée à 90 jours ici parce que trois déclencheurs de la table de rafraîchissement ont déjà tiré : un changement de nom et de domaine le 2026-07-29, un changement de prix le 2026-08-26, et une réécriture complète de l'ICP par l'équipe le 2026-09-03. Un quatrième tirera dès qu'un seul avis client existera, et ce document devra être refait ce jour-là quelle que soit sa date.
data_limitations: [TOUTE CE DOCUMENT REPOSE SUR SIX ACHATS ATTRIBUÉS ET ONZE COMMANDES. C'est la limite qui gouverne tout le reste et elle est portée sur chaque persona. Six achats ne sont pas un échantillon. Ils ne permettent ni de condamner une tranche d'âge, ni d'établir une part, ni de classer deux messages l'un contre l'autre avec certitude. Deux des trois sources de premier rang de la méthode sont vides, interrogées et pas supposées : 0 avis client, message explicite de l'outil disant que la base est vide et que ce n'est pas un problème d'accès ; 0 réponse de sondage post-achat, totalResponsesForBrand 0. La troisième, les commentaires publicitaires, compte 2 lignes dont une de trois caractères. Aucune source tierce n'existe et aucun outil Reddit n'est présent dans cette installation Parker. Conséquence directe : AUCUN ACHETEUR RASELIO N'A JAMAIS DÉCRIT SA VIE, SON GESTE, SON ÂGE NI SA RAISON D'ACHETER. Chaque trait d'identité de ce document est inféré depuis un comportement d'achat, une ventilation de plateforme, un prénom, un horaire, ou depuis la langue que la marque a écrite. Aucun n'est appuyé par une parole de client. L'âge de l'acheteur vient de la classification démographique de Meta et non d'une déclaration : c'est une donnée de plateforme, pas une donnée d'état civil. La ventilation d'âge et de genre utilisée est celle agrégée au niveau annonce côté Parker, sur 771,64 € et 173 annonces, marque soeur Trael et deux annonces archivées comprises ; la ventilation au niveau compte du pull Meta est contaminée par 49,60 € de diffusion fantôme des 10 au 13 août et n'est pas utilisée pour la lecture d'audience. « Not available » est la valeur littérale renvoyée par l'API Meta quand aucun achat n'est attribué, ce n'est pas un zéro vérifié. Écart d'attribution non résolu : Meta attribue 6 achats, Shopify compte 11 commandes, cinq commandes ne sont vues par aucun rapport.]
methods_loaded: [creative-strategy-context/persona-research-and-creative-strategy-process.md, creative-strategy-context/emotional-delivery-and-timing.md, creative-strategy-context/advertising-to-older-audiences.md, creative-strategy-context/customer-review-mining-method.md, creative-strategy-context/ad-account-analysis.md, creative-strategy-context/creative-strategy-fundamentals.md]
---

# Personas — Raselio

## How to read this doc

Chaque persona ci-dessous est une **identité**, c'est-à-dire une façon durable de se concevoir soi-même qui décrira encore la même personne dans dix ans. Un déclencheur n'est pas une persona. Un état de vie n'est pas une persona. Ce sont des **signaux comportementaux**, rangés dans un bloc séparé pour qu'ils puissent tourner sans qu'on réécrive la personne en dessous.

Pour produire quelque chose, on prend la persona pour la voix et l'identité, puis on pose par-dessus le signal comportemental actif à ce moment-là.

**Trois avertissements à lire avant tout usage, parce qu'ils changent ce que ce document autorise.**

**Premier avertissement, la taille.** Cette marque a six achats attribués et onze commandes. Toute la lecture d'identité de ce document tient sur ce socle. Six achats ne sont pas un échantillon, ce sont six achats. Ils donnent une direction très nette et aucune valeur fiable.

**Deuxième avertissement, le silence.** Aucun acheteur Raselio n'a jamais écrit un mot accessible. Zéro avis, zéro réponse de sondage, un message de contact sur 46 jours qui portait sur un délai d'expédition. Le corpus de langage client entier de cette marque fait **une phrase**, laissée en commentaire sous une publicité le 2026-08-31. Toutes les autres phrases de ce cerveau qui ressemblent à de la parole de client ont été écrites par la marque.

**Troisième avertissement, le compte.** Deux personas sont nommées ici et une seule a des acheteurs derrière elle. La seconde en a zéro et elle est tenue à part, en candidate d'expansion, exactement comme la méthode l'exige. Gonfler le compte avec des grappes minces serait ici le mode d'échec le plus facile, parce que la marque possède déjà trois jeux de personas écrits et qu'aucun n'a été validé par un acheteur.

## Cross-persona bias notes

L'audit de biais complet vit dans `personas/cross-persona-bias-notes.md`. Voici les quatre points que la méthode demande de porter ici, en tête, parce qu'ils conditionnent la lecture de tout ce qui suit.

**Écho de marque.** Il ne prend pas la forme habituelle. Une boucle d'écho ordinaire demande qu'un client reprenne la formule de la marque, et aucun client de Raselio n'a jamais rien repris. Ce que la marque a fait à la place est plus direct : elle a **écrit le côté client de la conversation à l'avance**. Elle diffuse en publicité payée des questions de client entre guillemets, « Et si ça se voit sur le colis ? », « Et si ça ne me convient pas ? », « Et si c'est un gadget ? », une affirmation de fréquence, « C'est la question qui revient le plus souvent : et si je me coupe ? », et cinq témoignages signés de prénoms et d'âges inventés que son équipe documente elle-même comme inventés. Le corpus de langage de marque fait 224 paires titre plus texte uniques résolues depuis 884 creatives. Le corpus de langage client fait une phrase. Le détail est dans `source-pulls/personas/brand-self-echo-detection.md`. **Conséquence pour ce document : aucun trait de persona ne peut s'appuyer sur une phrase issue du site ou d'une publicité.**

**Risque de minorité bruyante.** Il ne s'applique pas dans sa forme classique, parce qu'aucun segment n'est bruyant : deux commentaires sur 43 270 impressions, soit 0,046 commentaire pour mille. La forme qu'il prend ici est inverse et mérite d'être nommée. La seule voix extérieure qui existe, « Plus rien de la bête sauvage qui sommeille en nous », appartient très probablement à un homme qui n'a pas acheté. Une phrase unique et bien tournée exerce une attraction disproportionnée sur un travail persona affamé. Elle est traitée en veille et jamais en persona.

**Divergence entre le déclaré et l'observé.** Elle existe et elle est massive, mais elle n'oppose pas un acheteur à lui-même, faute de déclaration d'acheteur. Elle oppose **trois jeux de personas écrits** à six achats observés. Le jeu du 2026-08-23 dit « Homme FR, 18-34 ans (persona « Kevin, 27 ans ») ». Le document de contexte de marque stocké dans Parker propose cinq profils dont aucun n'a plus de 47 ans. Le jeu du 2026-09-03 dit « Hervé, 58 ans ». Les six achats attribués sont tous chez des hommes de 45 ans et plus. **Le côté chargé pour la décision est l'observé**, parce qu'il vient d'achats, avec la réserve permanente du dénominateur de six.

**Sources qui se contredisent.** Une seule contradiction réelle, sur le taux de clic par âge. Le brief du 2026-09-03 affirme, stated, que « plus l'homme est jeune, plus il clique », avec des taux de 3,3 à 3,6 % chez les 18-34. La ventilation au niveau compte dit l'inverse chez les hommes : 1,60 % en 18-24, 0,98 % en 25-34, 1,04 % en 35-44, 1,03 % en 45-54, 1,98 % en 55-64 et 2,23 % en 65 et plus. L'explication est technique et elle est résolue : Parker compte 1 234 clics totaux pour 775 clics sur lien, donc les deux tables ne mesuraient pas la même chose. La conséquence pratique tient quand même : **la justification « les jeunes cliquent mais n'achètent pas » ne se vérifie pas au niveau compte**, et la vraie raison observée est plus simple, ils n'achètent pas du tout.

## Served-versus-actual diagnosis

C'est la lecture centrale de tout ce document et elle tient en trois lignes qui ne se recouvrent pas.

**Ce que la créa courtise.** Un homme d'environ trente ans, tatoué, torse nu, glabre, qu'on tutoie. Ce n'est pas une lecture de nom d'annonce, c'est une lecture média complète : sur l'annonce qui porte le plus d'achats du compte, `52505820203791` « IMPECCABLE | CROP TAILLE », Parker décrit « un seul modèle masculin de la fin de la vingtaine au milieu de la trentaine », teint hâlé, cheveux bouclés foncés, barbe courte, physique athlétique, torse nu, tatouages dont le mot « FOCUS » sur les côtes. Les quatre autres annonces à achat sont bâties sur le même casting. Le texte publicitaire de la famille gagnante tutoie, verbatim : « La tondeuse ultime pour tout le corps n'existe pas... / À moins que tu n'aies pas encore essayé la Raselio ? » Verified.

**Ce que la plateforme sert.** Des hommes de plus de 45 ans, à 82,4 % de la dépense. Ventilation Parker au niveau annonce, lifetime, dénominateur 771,64 € : 18-24 → 17,82 € soit 2,3 % ; 25-34 → 47,95 € soit 6,2 % ; 35-44 → 70,20 € soit 9,1 % ; 45-54 → 138,03 € soit 17,9 % ; 55-64 → 257,18 € soit 33,3 % ; 65 et plus → 240,46 € soit 31,2 %. Hommes 86,9 %, femmes 11,9 %. Mobile 93,4 %. Facebook 70,7 %, Instagram 28,2 %. Verified. Personne n'a demandé ça : les treize ad sets Raselio sont réglés en 18-65, tous genres, avec Advantage+ activé. L'enchère a trouvé un acheteur que le paramétrage ne visait pas.

**Ce que six hommes ont acheté.** Six achats attribués sur toute la vie du compte, tous chez des hommes de plus de 45 ans : quatre sur la ligne 55-64, un sur 45-54, un sur 65 et plus. Zéro sous 45 ans, pendant que 135,80 € étaient dépensés sur les lignes hommes 18-44 pour 19 997 impressions et 220 clics. Verified.

**Le diagnostic, en deux phrases, et il doit disqualifier des idées.**

> Raselio n'a pas conquis son acheteur, elle l'a rencontré : elle paie une créa écrite et castée pour un homme de trente ans, la plateforme la livre à 82 % à des hommes de plus de 45 ans, et les six seuls achats du compte viennent tous de là, sans que personne ait jamais entendu un de ces hommes parler. Le travail du trimestre n'est donc pas de trouver une nouvelle audience, c'est de faire dire un mot à celle qui achète déjà et d'arrêter de payer celle qui ne le fait pas.

Ce que ce diagnostic disqualifie, concrètement : toute idée qui vise à élargir vers un public plus jeune avant qu'une créa écrite pour un homme de 58 ans ait été jugée à budget égal ; toute production de volume supplémentaire tant que 105 annonces sur 163 ont dépensé moins d'un euro chacune ; et toute créa qui s'appuie sur un chiffre de preuve sociale que la marque ne peut pas défendre.

**Ce que le diagnostic ne tranche pas, et il faut le dire.** Il ne dit pas que les hommes de 18 à 44 ans n'achèteront jamais ce produit. Il dit qu'aucun ne l'a fait pendant qu'on payait pour les atteindre, avec une créa écrite pour eux. La marque n'a jamais opposé, à budget égal, une créa écrite pour un homme de trente ans à une créa écrite pour un homme de cinquante-huit. Une seule annonce du compte casse le casting, `52506751290991` « RS30-7R 01 - Impeccable a tout age », modèle de 45 à 55 ans en peignoir, mécanisme visuel identique par ailleurs. C'est l'expérience la plus propre que ce compte ait jamais montée : une seule variable, l'âge du modèle, à mécanisme constant. Elle a reçu 12,07 € et trois jours, pour 448 impressions, 1 ajout au panier et zéro achat. Il n'y a rien à en conclure. L'expérience existe et elle n'a pas été financée.

## Framework architecture

Ce document est la maison canonique des identifiants ci-dessous. `persona-voice-library.md`, `lifecycle-journey-maps.md` et `voice-of-customer.md` les reprennent et n'en inventent pas d'autres.

**Identifiants d'identité, deux.** `soigne-discret`, `partenaire-prescriptrice`.

**Identifiants de signal comportemental, six.** `apres-le-mauvais-outil`, `avant-un-moment-qui-compte`, `doute-sur-le-vendeur`, `vue-de-pres-qui-baisse`, `cadeau-pour-lui`, `regard-de-lautre-dans-la-piece`.

**Portes d'entrée, six.** Elles sont détaillées plus bas et elles sont toutes `stated` par la marque, aucune confirmée par un acheteur.

**Calques d'identité, deux.** `en-couple-hetero` et `plus-de-50-ans`. Les deux sont des calques et non des personas, et le premier est une supposition de la marque que rien ne confirme.

## Persona reference matrix

| Persona | Statut | Acheteurs derrière elle | Dépense servie | Confiance | Ce qui la ferait monter |
|---|---|---|---|---|---|
| `soigne-discret` | flagship | **6 achats sur 6** | 636,26 € des 771,64 €, soit 82,4 % | **thin** | dix réponses à une question ouverte posée aux onze acheteurs, ou dix avis réels |
| `partenaire-prescriptrice` | émergente | **0 achat** | 91,80 € de débordement de diffusion, soit 11,9 %, dont 28,45 € sur la ligne femmes 45-54 | **hypothesis** | trois achats attribués sur un ad set femmes séparé, avec une créa écrite pour elle et un budget réel |

**Pourquoi il n'y a que deux lignes.** Parce qu'il n'y a que six achats et qu'ils forment une seule grappe. La méthode dit de garder l'ensemble petit et réel et de ne pas le gonfler avec des grappes minces. Tout ce qui n'a pas d'acheteur est tenu dans la liste de veille en bas de page, où il est visible sans être promu.

---

## Persona 1 : `soigne-discret` — Le soigné discret — flagship

Un homme qui tient sa personne en ordre sans jamais transformer ça en projet, et qui préfère que l'effort ne se voie pas.

### Identity

**Identités centrales, deux, et pas davantage, parce que les sources ne portent pas plus.**

**1. Il se tient, il ne se transforme pas.** Inferred, confiance mixed. La preuve la plus solide est un fait de conversion et pas une phrase : sur les six achats du compte, quatre viennent de la famille visuelle « Impeccable », dont le mot porteur est un adjectif d'état et non un verbe de transformation. Cinq annonces, 112,39 €, quatre achats, coût par achat 28,10 € contre 94,16 € sur la campagne principale, ROAS 1,245 contre 0,372. Verified. La famille concurrente, l'humour anatomique du post-it, a reçu 181,11 € sur 25 annonces et produit un seul achat. Ce n'est pas une lecture de goût, c'est le seul mécanisme prouvé sur l'achat de tout le compte. L'équipe est arrivée à la même lecture de son côté, stated, verbatim : « Il ne cherche pas à « devenir » quelqu'un, il veut être **impeccable, propre, à l'aise** et ne plus retenir sa respiration. »

**2. Il achète seul, tôt ou tard, et il ne veut pas qu'on le sache.** Inferred, confiance thin. Les onze commandes sont horodatées à la minute, verified : quatre tombent entre 05:23 et 09:07 UTC, trois entre 19:33 et 20:48 UTC. En heure française d'été, un groupe le matin entre 07:23 et 11:07 et un groupe le soir entre 21:33 et 22:48. Ce sont les deux moments où un homme est seul chez lui. Le dénominateur est de onze, donc c'est une piste, pas un motif. Ce qui la renforce est structurel plutôt que statistique : la marque vend la discrétion comme un bénéfice, l'emballage est neutre, aucun acheteur n'a laissé de trace publique, et zéro mention de la marque existe dans tout l'index atteignable.

**Identités contextuelles.** Aucune n'est observable. Un homme peut se concevoir autrement en vacances, en couple, seul, au travail. Rien dans les sources ne permet de nommer une condition d'activation. **Blanc nommé.**

**Le décalage entre le dehors et le dedans.** Il n'est pas observable au sens strict, parce qu'il faudrait entendre l'homme se décrire et le voir agir autrement. Ce qui existe est une divergence d'un autre genre et elle est réelle : **il a acheté une créa qui ne lui ressemble pas.** Un homme de cinquante-huit ans a acheté une tondeuse à une marque inconnue après avoir vu à l'écran un homme de trente ans, torse nu, tatoué, tutoyé, avec un post-it à smiley sur l'entrejambe. `advertising-to-older-audiences.md` pose qu'une preuve ne se transfère que si elle a l'âge du spectateur et qu'un visage bien plus jeune ne transfère pas. Ici, le casting jeune n'a pas empêché l'achat. Deux explications tiennent et le compte ne permet pas de trancher : soit ce n'est pas le corps qui vend mais la phrase « Soyez impeccable partout » et le produit net et grand, soit cet homme achète malgré la créa parce que le produit répond à un problème qu'il a déjà. C'est la boucle ouverte la plus haute de ce document.

### Behavioral signals (currently observed)

Quatre signaux. La méthode en attend trois à six et prévient qu'en dessous de trois on capture mal. Quatre est le maximum que les sources portent honnêtement, et deux des quatre sont `stated` par la marque et jamais observés.

**`apres-le-mauvais-outil`** — Il se rase déjà cette zone, avec une tondeuse à barbe ou un rasoir jetable, et il en garde des coupures et des rougeurs. Part de la persona dans cet état : **inconnue**, aucune source ne la mesure. Base : `stated` par l'équipe, verbatim, « Il se rase déjà cette zone, avec un rasoir jetable ou une tondeuse à barbe : il connaît les coupures, les rougeurs, la repousse qui pique. » Corroboration faible depuis la catégorie, deux extraits d'avis de clients Manscaped qui racontent le même historique d'échecs. Implication : le message d'outil dédié, qui est celui que la marque sert le mieux, s'adresse à cet état et à lui seul.

**`vue-de-pres-qui-baisse`** — Il ne voit plus bien de près, donc il rase une zone qu'il devine. Part : inconnue. Base : `stated` par l'équipe, créa 30, verbatim, « Passé 50 ans, on voit moins bien de près. » et « Vos lunettes ne vont pas sous la douche. La LED, si. » **Une corroboration extérieure existe et c'est la seule de tout ce document** : un client d'une autre marque, sur un avis Walmart du Gillette Intimate, loue le bouton d'allumage comme « easily accessible and nice and noticeable for people with poor eye sight », stated, citation restituée par WebSearch et page non ouverte. Implication : la LED cesse d'être une caractéristique de fiche produit et devient un argument d'identification. Le compte n'a jamais mis plus de 1,15 € derrière.

**`doute-sur-le-vendeur`** — Il est convaincu par le produit et bloqué par la marque : garantie, colis, remboursement, provenance. Part : inconnue. Base : `stated` par l'équipe, verbatim, « méfiance (dropshipping), discrétion du colis ». Signal de comportement mesuré : la créa qui traite cet état, `52506457654991` « RS · C11 garantie-colis », affiche **14,06 % de taux de clic, le meilleur du compte**, sur 64 impressions et 1,33 € de dépense. Verified. Implication : c'est la phase Evaluation au sens de `emotional-delivery-and-timing.md`, celle où l'acheteur ne cherche pas plus d'information mais attend qu'on nomme son hésitation exacte, et le compte écrit presque tout en Trigger et en Purchase.

**`avant-un-moment-qui-compte`** — Il s'occupe de ça avant une occasion. Part : inconnue. Base : `stated` par la marque, encart de l'advertorial, verbatim, « *La confiance, ça se prépare avant le moment où on en a besoin.* », et une créa du compte s'appelle simplement « Ce soir. ». Aucune confirmation d'acheteur. **Le plus faible des quatre**, et je le garde parce que c'est un état classique de la catégorie et parce qu'il est facile à tester.

**Les signaux que je refuse d'inscrire.** La honte de se déshabiller, écrite par la marque dans le lot EMOTION, verbatim « Gêné de te déshabiller ? Plus jamais. » : 85,04 € de dépense, 5 ajouts au panier, 2 initiations de paiement, **zéro achat**. La nostalgie de l'adolescence, « La tondeuse qu'il te fallait à 16 ans » : 33,80 €, les deux meilleurs coûts par clic sortant du lot d'août, zéro achat. Les deux font cliquer et ne vendent pas, et aucun acheteur ne les a jamais exprimés.

### Voice signature

**Il ne parle pas.** C'est le fait le plus important de cette section et il faut le porter tel quel.

Le seul verbatim extérieur existant pour cette marque, « Plus rien de la bête sauvage qui sommeille en nous. », n'appartient probablement pas à cette persona : il conteste le geste que cette persona pratique déjà. Il est tenu en veille.

Ce que je peux dire de la voix, `inferred`, confiance thin, depuis le comportement plutôt que depuis la parole : c'est une voix qui ne demande rien. Un seul message client sur 46 jours, et il portait sur une date d'expédition. Zéro commentaire, zéro avis, zéro question publique. Les gens ne posent pas de question à cette marque, ils s'en vont : 2 431 sessions pour 42 ajouts au panier sur 61 jours.

Ce que la marque suppose de sa voix, `stated` et à ne pas confondre avec un constat : « Ton qui marche : **vouvoiement**, phrases courtes, humour pudique et adulte (clin d'œil au couple, jeu sur l'âge), jamais de vulgarité, jamais de moquerie. » Le compte n'a jamais testé le vouvoiement contre le tutoiement à budget égal : les cinq annonces qui portent les six achats tutoient toutes.

Le détail du langage vit dans `personas/persona-voice-library.md` et dans `personas/voice-of-customer/voice-of-customer.md`. Les deux disent la même chose : le bac client contient une phrase.

### Day-in-the-life

**Cette section ne peut pas être écrite honnêtement et je ne l'écris pas.**

Une journée type se construit depuis ce qu'un acheteur raconte de sa vie. Aucun acheteur Raselio n'a rien raconté. Écrire ici un homme de cinquante-huit ans qui boit son café et regarde le journal serait exactement ce que le document de contexte de marque stocké dans Parker a déjà fait cinq fois, avec des voitures, des plats préparés et des conversations avec un frère, sur zéro donnée.

Ce que les sources autorisent, et c'est court, tient en trois faits de comportement, tous verified. Il est en France, à 100 % des onze commandes. Il achète sur mobile, à 93,4 % de la dépense servie. Il rencontre la marque dans un fil Facebook, huit commandes sur onze référencées facebook et deux instagram, et nulle part ailleurs : zéro session d'affiliation, de média, de forum ou d'e-mail sur 90 jours.

**Blanc nommé.** Tout le reste. Ce qu'il fait, avec qui il vit, ce qu'il regarde, quand il pense à ça.

### What activates purchase

**Le déclencheur révélé.** Non observé. Personne n'a demandé à un acheteur ce qui se passait ce jour-là. Ce qui est observé est plus modeste et vaut d'être dit : la première commande de la boutique tombe le 2026-08-26, le lendemain du jour où le compte quitte le régime Audience Network à très bas CPM pour le régime fil Facebook, et les six achats attribués arrivent tous dans cette seconde fenêtre. Verified. **Ce n'est pas un déclencheur d'acheteur, c'est un déclencheur de canal**, et il dit que le parcours de cette marque commence dans un fil Facebook et nulle part ailleurs.

**Raison déclarée contre raison révélée.** Il n'y a aucune raison déclarée, donc pas de comparaison possible. La seule chose que la donnée révèle est le mécanisme qui a converti : quatre des six achats sur une famille visuelle qui vend un état calme sur fond crème, avec un titre en très gros et un produit net et grand. **Le côté chargé pour la décision est celui-là**, avec la réserve permanente de six achats.

**La friction à la fermeture, et c'est la donnée la plus dure du document.** Verified sur l'entonnoir Parker au niveau compte : 775 clics sur lien, 597 vues de page de destination, 32 ajouts au panier, 12 paiements initiés, 6 achats. Étape par étape : 77,0 % du clic à la page, puis **5,4 % de la page au panier**, puis 37,5 % du panier au paiement, puis 50,0 % du paiement à l'achat. Trois étapes sur quatre sont normales. Une est catastrophique et c'est la deuxième. Le clic arrive, la page charge, et presque personne n'ajoute au panier. L'équipe l'a mesuré de son côté, stated, verbatim : « **Le vrai problème est post-clic** : CTR 3 % mais CVR site ≈ 0,2 % et CPA 86 € pour un break-even à 21 €. »

**Ce que personne ne sait sur cette friction.** Les annonces envoient vers trois destinations différentes, la fiche produit, `/pages/7-raisons` et l'advertorial `/pages/pourquoi-pas-votre-tondeuse-a-barbe`. Aucune source ne dit laquelle perd le plus de monde. C'est le blanc le plus actionnable de tout le cerveau et il se comble avec un outil d'analyse de page, pas avec un pull publicitaire.

### What we believe vs what we observed

**Affirmations de haute confiance, présentes dans trois types de source ou plus.** Il n'y en a **aucune**, et il faut le dire franchement. Cette marque possède trois types de source qui portent du signal : le compte publicitaire, les commandes Shopify et deux commentaires. Aucun trait d'identité n'apparaît dans les trois. Le seul fait qui approche est l'âge de l'acheteur, présent dans deux sources indépendantes, la ventilation Meta et la lecture des prénoms et domaines de messagerie des onze acheteurs, et la seconde est une inférence faible.

**Affirmations à source unique, qui demandent corroboration.** Toutes les autres. « Il se tient plutôt qu'il ne se transforme » repose sur quatre achats d'une famille visuelle. « Il achète seul tôt ou tard » repose sur onze horodatages. « Il doute du vendeur » repose sur un taux de clic mesuré sur 64 impressions. « Il ne voit plus bien de près » repose sur une créa de la marque et un avis d'un client d'une autre marque.

**Hypothèses d'équipe que la donnée ne soutient pas.**

Que l'acheteur ait 18 à 34 ans. Écrit le 2026-08-23, contredit par six achats sur six, et l'équipe l'a elle-même retiré le 2026-09-03.

Que les jeunes cliquent plus. Le brief l'affirme, la ventilation au niveau compte dit le contraire chez les hommes, et l'écart est expliqué par une différence de définition de clic.

Que la marque ait 17 000 clients et 1 734 avis. Elle a 11 commandes et 0 avis, vérifié des deux côtés.

Que la partenaire soit un canal. Trois ajouts au panier et une initiation de paiement selon le tableau de bord de l'équipe, zéro achat selon la ventilation, sur 28,45 € de dépense.

Que l'acheteur soit en couple hétérosexuel. Supposé par presque toute la mise en scène de la marque et confirmé par rien.

### Awareness and market sophistication

**Stade de conscience : conscient du problème, et parfois conscient de la solution.** Inferred, confiance mixed. La preuve est indirecte et elle vient de deux côtés. D'abord la marque et l'équipe posent toutes deux que l'homme se rase déjà cette zone avec un mauvais outil, ce qui suppose un problème déjà vécu. Ensuite `advertising-to-older-audiences.md` établit que ce public convertit volontiers depuis un état conscient du problème et même inconscient, et qu'il tolère un récit plus long que ce qu'un média-acheteur attend. La condition qui fait basculer entre conscient du problème et conscient de la solution est de savoir s'il sait qu'il existe des tondeuses dédiées, et rien dans les sources ne le dit. **Blanc nommé.**

**Sophistication du marché : moyenne, et elle monte.** Verified sur le paysage concurrentiel. Manscaped, Meridian, Philips, Gillette, Braun, plus au moins quatre marques françaises actives en publicité, Cooper, Billy Trimmer, Thomyle et Raselio, revendiquent toutes la même chose : pas de coupure, pas d'irritation, lame céramique, étanche, LED. Quand toute la catégorie fait la même promesse, l'acheteur cesse de récompenser la promesse et commence à récompenser la preuve spécifique.

**Ce qui compte comme preuve spécifique pour cette persona.** `advertising-to-older-audiences.md` répond précisément : une autorité reconnue, un format qui ressemble à quelque chose qu'il regarde déjà, un compteur d'avis élevé, et un témoignage de son âge. Raselio n'a aucun des quatre. Ce qu'elle met à la place est un compteur inventé. **Elle a donc placé sa preuve la plus fragile devant le public le plus sensible à la preuve**, et c'est le risque numéro un de sa stratégie actuelle.

**Ce que ça implique pour l'ouverture.** Un appel direct et explicite, parce que la subtilité sous-performe chez ce public et que l'ancrage d'identité, « si vous avez plus de 50 ans, ça vous concerne », lève l'attention. Un rythme lent, du gros texte et un contraste fort, parce que la lisibilité est le jeu entier. Et une preuve qui ait son âge. Tenir ça comme une forme et pas comme un script.

### Message signals, frequency-ranked

Classé par dépense réelle et non par nombre d'annonces, parce que ce compte produit beaucoup plus de créas qu'il n'en finance. Dénominateur : 163 annonces Raselio et 677,81 € sommés au niveau annonce.

**1. `humour-anatomique` — le post-it et l'humour cru. 25 annonces, 181,11 €, soit 26,7 %, 1 achat.** Le message le plus financé du compte. Trois post-it « Couilles / Torse / Jambes » sur un mur de carrelage, texte publicitaire ouvrant sur « Hey, sacré gaillard ! ». Expression chez cette persona : elle clique et elle n'achète pas. L'équipe l'écrit, stated, verbatim : « Humour anatomique cru (post-it « Couilles »), pixel seul, visuels jeunes torse nu : forts CTR/ATC, faible achat. » **La marque le mène aujourd'hui, et c'est son plus gros pari perdant.**

**2. `etat-impeccable` — l'état plutôt que le geste. 5 annonces, 112,39 €, soit 16,6 %, 4 achats.** Fond crème, titre noir très gras, soulignement vert citron sur « partout », un humain, produit héros. Coût par achat 28,10 €, ROAS 1,245. Expression chez cette persona : c'est le seul mécanisme prouvé sur l'achat. **La marque le suit au lieu de le mener** : il reçoit les deux tiers de ce que reçoit l'humour.

**3. `preuve-sociale-chiffree` — « Approuvée par plus de 35 000 hommes » et « 17 000 hommes ».** Présent sur les annonces qui vendent, donc corrélé à l'achat sans qu'on puisse lui attribuer la cause. **Trois chiffres différents tournent en même temps**, 35 000 sur les créas Impeccable, 17 000 sur le lot du 3 septembre et sur le site, 1 734 avis sur la landing. Aucun n'a de source. Expression chez cette persona : c'est exactement le levier auquel elle est la plus sensible, ce qui rend le risque maximal. **Menée, et indéfendable en l'état.**

**4. `securite-de-lachat` — garantie, colis neutre, remboursement, provenance.** Le meilleur taux de clic du compte, 14,06 %, et **moins de cinq euros cumulés sur toute la famille**. Expression chez cette persona : c'est sa phase Evaluation, celle où elle décroche. **Manquée, presque entièrement.**

**5. `outil-dedie` — « votre tondeuse à barbe n'a rien à faire sous la ceinture ».** Le message structurant de tout le site et de l'advertorial. Expression : c'est l'argument que la marque sert le mieux et il n'a pas suffi, six achats pour environ 685 €. **Menée.**

**6. `presbytie-led` — « Vos lunettes ne vont pas sous la douche. La LED, si. »** Le seul angle du compte construit depuis une donnée d'acheteur plutôt que depuis une intuition, et la seule chose de tout ce cerveau qu'un client extérieur ait corroborée. **Manquée**, jamais financée au-delà de 1,15 €.

**7. `editorial-objection` — l'objection technique traitée en article.** Une annonce, `7001074469987` « CREATIVE 02 | NATIVE AD », 32,13 €, **le meilleur coût par clic sortant du compte à 0,378 €** contre 0,99 € et 1,27 € pour les deux plus gros dépensiers. Arrêtée le 14 août, jamais rejouée au prix actuel, et elle pointait vers une page produit de l'ancienne marque. Expression : `advertising-to-older-audiences.md` place le format éditorial et le test écrit en tête des formats qui portent chez ce public. **Abandonnée.**

### T-E-E-P content angle map

Ce n'est pas un plan média. C'est la forme de travail créatif que chaque phase demande pour cette persona, pour qu'aucune étape aval ne demande la vente avant que l'homme soit prêt. Les quatre phases sont définies dans `emotional-delivery-and-timing.md`.

**Trigger, le besoin devient conscient.** Ce que la phase demande : lui renvoyer son état interne avec précision, avant d'introduire une solution. Ce que la marque a : son meilleur matériau, l'advertorial, verbatim, « Vous connaissez ce moment. La tondeuse approche, vous retenez votre souffle, et chaque passage se fait les dents serrées. » **Bien servi.**

**Exploration, il compare et se fait une carte.** Ce que la phase demande : un point de vue, une texture de marque, la sensation de ce que c'est d'être client ici, et non des caractéristiques ni des offres. Ce que la marque a : presque rien. Aucune vidéo sur 163 annonces, aucun visage identifié, aucun fondateur, aucune preuve extérieure, et zéro présence dans l'index de recherche français, donc un homme qui explore ne trouve rien. **Absente.**

**Evaluation, il gère un risque et attend qu'on nomme son hésitation.** Ce que la phase demande : nommer l'hésitation précise, sans pression et sans sur-expliquer sa valeur. Ce que la marque a : une créa à 14,06 % de taux de clic financée à 1,33 €, et une famille entière sous cinq euros. **La phase la plus chère et la moins servie.** C'est aussi l'étape où l'entonnoir perd 94,6 % des gens.

**Purchase, la décision est prise ou presque.** Ce que la phase demande : retirer, pas ajouter. Ce que la marque a : le prix barré « 34,99 € au lieu de 75 € », le « PROFITER DE L'OFFRE », les cinq boutons d'action de l'advertorial. **Sur-servie.**

### Attribution

```yaml
sources_used:
  - type: ad-account
    last_pulled: 2026-09-07
    contribution: la totalite du socle. 6 achats attribues, ventilation age et genre au niveau annonce, lecture media complete de 24 annonces, entonnoir complet
  - type: ad-comments
    last_pulled: 2026-09-07
    contribution: quasi nulle. 2 commentaires, et le seul porteur de langage conteste le geste de cette persona plutot qu'il ne la decrit
  - type: brand-reputation
    last_pulled: 2026-09-07
    contribution: negative et utile. 0 defenseur, 0 detracteur, 0 mention, ce qui etablit qu'aucun acheteur n'a encore engage son identite
  - type: other-reviews
    last_pulled: 2026-09-07
    contribution: une seule corroboration exterieure, l'avis Gillette sur le bouton lisible pour les gens qui voient mal, qui appuie le signal vue-de-pres-qui-baisse
sources_available_but_unused:
  - type: customer-reviews
    reason: interroge le 2026-09-07, 0 avis. La base est vide, ce n'est pas un probleme d'acces
  - type: post-purchase-surveys
    reason: interroge le 2026-09-07, 0 reponse. Aucun dispositif de collecte n'existe
  - type: reddit
    reason: aucun outil dans cette installation Parker, lecture directe refusee par le proxy
confidence: thin
confidence_reason: les motifs qui soutiennent l'identite centrale de cette persona apparaissent dans UN SEUL type de source, le compte publicitaire, sur 6 achats. Les deux sources de premier rang de la methode sont vides. Aucune parole d'acheteur n'existe.
what_would_move_it_to_mixed: dix reponses a une question ouverte posee aux onze acheteurs, OU dix avis reels sur la boutique. L'un des deux suffit, parce qu'il ferait passer cette persona d'un type de source a deux et donnerait la premiere parole d'acheteur du coffre.
```

---

## Persona 2 : `partenaire-prescriptrice` — La partenaire qui commande à sa place — émergente

Une femme qui achète pour l'homme avec qui elle vit, parce qu'elle a remarqué quelque chose qu'il ne réglera pas tout seul.

**Avertissement de statut, à lire avant la fiche.** Cette persona a **zéro achat** derrière elle. Elle est tenue ici en candidate d'expansion et jamais mélangée à la persona validée, exactement comme la méthode l'exige. Sa confiance est `hypothesis`, la valeur la plus basse de l'échelle, réservée aux personas raisonnées depuis un signal extérieur plutôt qu'observées dans la base d'acheteurs.

**Un point de méthode qui doit être posé, parce qu'il est facile de se tromper ici.** Le cadeau est un **comportement qui traverse les personas**, jamais une persona, et il figure comme tel dans le registre des calques plus bas. Ce qui peut prétendre au statut de persona n'est pas le cadeau, c'est **la personne qui paie et qui n'est pas l'utilisateur** : elle a son propre déclencheur, son propre message et son propre parcours. C'est à ce titre étroit, et à lui seul, que cette fiche existe.

### Identity

**Identité centrale, une seule et elle est faible.** Elle règle pour lui ce qu'il ne réglera pas. Inferred, confiance hypothesis. Aucune source ne porte cette identité : elle est reconstruite depuis la mise en scène de la marque et depuis quatre extraits d'avis de clientes d'une autre marque.

Ce qui existe côté marque, `stated` : le brief du 2026-09-03 écrit, verbatim, « Elle voit la pub, elle sait qu'il n'osera jamais commander. Elle offre ». Le document de contexte de marque stocké dans Parker lui consacre un profil entier, « Sandrine — The Practical Gift-Giver », 44 ans, administratrice scolaire à Nantes, qui découvre par une publicité Instagram pendant sa pause déjeuner. Ce profil n'est appuyé par aucune donnée de Raselio, le document le dit lui-même.

Ce qui existe côté catégorie, `stated` et sur une autre marque : quatre extraits d'avis Walmart sur les Manscaped Lawn Mower. Le plus révélateur, restitué par WebSearch et page non ouverte : « I bought this for my husband after asking a few men in my life who said this product was worth looking into for grooming 'down there'. I am pleased to inform that hubby was very pleased with the results. » Cette femme a mené une enquête sociale avant d'acheter et rend compte du résultat. Ce n'est pas une impulsion, c'est une commission. **Réserve immédiate** : Manscaped est distribuée en magasin aux États-Unis et vend des coffrets cadeaux, donc ce signal peut être un artefact de canal plutôt qu'une vérité de catégorie.

**Identités contextuelles, décalage dehors-dedans.** Non observables. Blancs nommés.

### Behavioral signals (currently observed)

Deux signaux, tous deux `stated` et jamais observés chez Raselio.

**`cadeau-pour-lui`** — Elle achète pour un homme, à une occasion ou sans occasion. Part : sans objet, zéro acheteuse. Base : la mise en scène de la marque et le corpus de catégorie. Implication : le message doit se lire comme une attention et jamais comme une critique, ce que la marque a déjà compris, créa 28, texte à l'image `stated`, verbatim, « Le cadeau qu'il ne s'offrira jamais lui-même. / Et dont vous profiterez aussi. / Colis neutre · Livraison offerte ».

**`regard-de-lautre-dans-la-piece`** — Elle remarque et ne dit rien. Base : les titres de créas de la marque, `stated`, « Elle ne dira rien. Mais elle remarquera tout. », « Elle a remarqué. », « Ce matin, elle n'a rien dit. Son sourire, si. » Ce calque traverse les deux personas et il est inscrit au registre commun.

### Voice signature

**Aucune.** Aucune femme n'a jamais parlé à cette marque, ni en commentaire, ni en avis, ni en message. Blanc nommé.

### Day-in-the-life

**Non écrite, et volontairement.** Le document de contexte de marque stocké dans Parker en propose déjà une, avec trois bouteilles d'eau à moitié pleines sur un bureau et un post-it qui dit de rappeler Sophie. Elle est écrite sur zéro donnée. En ajouter une seconde ne ferait qu'épaissir la fiction.

### What activates purchase

**Non observé.** Zéro achat.

**Ce qui est mesuré, et c'est peu.** La ligne femmes 45-54 du compte a reçu 28,45 € pour 15 547 impressions, 63 clics, 0,41 % de taux de clic et **zéro achat attribué**, verified. L'équipe compte de son côté, sur son propre tableau de bord, trois ajouts au panier et un paiement initié, stated, chiffres non réconciliés avec les 32 ajouts au panier que Parker voit au niveau compte. La dépense féminine totale, 91,80 € soit 11,9 %, est du débordement de diffusion et non un ciblage : aucun ad set femmes n'existe au 2026-09-06.

**Friction à la fermeture.** Inconnue.

### What we believe vs what we observed

**Affirmations de haute confiance :** aucune.

**Affirmations à source unique :** toutes, et la source est la marque elle-même dans deux cas sur trois.

**Hypothèses que la donnée ne soutient pas :** que ce soit un canal. Zéro achat sur 91,80 € de diffusion féminine, et la créa écrite pour elle n'a jamais été mise en ligne. Le signal n'est pas réfuté, il est **non testé**.

### Awareness and market sophistication

**Stade de conscience :** probablement inconsciente du problème pour elle-même et consciente du problème pour lui. Inferred, confiance hypothesis. **Sophistication :** la même que pour la persona 1, mais sans historique d'usage, donc encore plus dépendante de la preuve extérieure.

### Message signals, frequency-ranked

Un seul message existe et il n'a jamais tourné : `cadeau-sans-critique`, créa 28, zéro diffusion. Rien d'autre à classer.

### T-E-E-P content angle map

Non renseignée. Sans un seul achat ni une seule parole, remplir les quatre phases produirait une fiction structurée. **Blanc nommé.**

### Attribution

```yaml
sources_used:
  - type: ad-account
    last_pulled: 2026-09-07
    contribution: 28,45 EUR sur la ligne femmes 45-54, 63 clics, 0 achat. Une creative ecrite et jamais mise en ligne
  - type: other-reviews
    last_pulled: 2026-09-07
    contribution: quatre extraits d'avis de clientes de Manscaped, marque concurrente, canal de distribution different
sources_available_but_unused:
  - type: customer-reviews
    reason: 0 avis
  - type: post-purchase-surveys
    reason: 0 reponse, et c'est ici que le manque coute le plus cher: une question, "est-ce pour vous ou pour quelqu'un d'autre", trancherait cette persona en dix reponses
  - type: ad-comments
    reason: 2 commentaires, aucun d'une femme identifiable
  - type: reddit
    reason: aucun outil, aucun acces
  - type: brand-reputation
    reason: 0 mention
confidence: hypothesis
what_would_move_it_up: trois achats attribues sur un ad set femmes separe, avec la creative 28 et un budget reel. En dessous de trois achats, elle reste une hypothese. Une reponse de sondage post-achat qui dit "c'etait un cadeau" la ferait passer a thin immediatement.
```

---

## Entry-door trigger library

Les portes d'entrée sont les moments qui font passer une persona de passive à active. **Six sont nommées et aucune n'est confirmée par un acheteur.** Elles sont toutes `stated` par la marque, écrites dans son advertorial, sa landing et ses fiches créa, et elles sont conservées parce que ce sont les seules qui existent et parce que la moitié est testable contre de vrais commentaires le jour où il y en aura.

**`la-seance-qui-fait-peur`** — Le moment de poser la lame. Advertorial, verified : « Personne n'en parle, mais tout le monde la connaît : cette micro-hésitation avant de poser la lame. Ce réflexe de contracter tout le corps. Cette séance qui ressemble plus à du déminage qu'à de l'entretien. » La porte la plus travaillée du site.

**`les-boutons-trois-jours-apres`** — Advertorial, verified : « Vous faites l'effort de vous entretenir. Et 72 heures plus tard, la zone est couverte de petits boutons rouges et de poils incarnés. Précisément la semaine où vous auriez préféré être présentable. »

**`la-repousse-qui-se-remarque`** — Advertorial, verified : « Deux jours de peau lisse, puis une semaine de repousse dure qui gratte, qui pique, et qui se remarque. » **La porte la mieux corroborée de l'extérieur** : trois des cinq fils de discussion identifiés par la passe communauté portent cette objection dans leur titre.

**`le-soir-ou-ca-compte`** — Encart de l'advertorial, verified : « *La confiance, ça se prépare avant le moment où on en a besoin.* » Une créa s'appelle simplement « Ce soir. »

**`le-report-par-logistique`** — Advertorial, verified : « Ce n'est pas la flemme. C'est la logistique : s'installer dans la salle de bain, trouver le bon moment, et finir par retrouver des poils sur le lavabo. Que quelqu'un d'autre risque de voir avant vous. »

**`la-vue-qui-baisse`** — Créa 30 du 2026-09-03, stated : « Passé 50 ans, on voit moins bien de près. » La seule porte liée à l'âge et non au geste, et la seule que la marque ait écrite **après** avoir lu l'âge de ses acheteurs. C'est aussi la seule que le corpus de catégorie corrobore, via l'avis Gillette sur le bouton lisible.

## Behavioral overlays

Des comportements d'achat qui traversent les personas. Aucun n'est une persona et aucun ne doit être promu.

**`cadeau-pour-lui`** — Le cadeau. Traverse tout, informe l'offre et le calendrier, jamais la cible. C'est le piège classique et il est ici doublement tentant, parce que la marque et le document de contexte Parker en font tous deux un profil.

**`avant-un-moment-qui-compte`** — La préparation avant une occasion.

**`apres-le-mauvais-outil`** — L'achat qui suit une mauvaise expérience avec un autre outil.

**`doute-sur-le-vendeur`** — L'hésitation qui porte sur la marque et non sur le produit. La seule que le compte mesure, à 14,06 % de taux de clic.

**`regard-de-lautre-dans-la-piece`** — La présence d'un tiers qui remarque. Ce calque n'est pas un âge, il traverse toutes les tranches.

**`vue-de-pres-qui-baisse`** — La contrainte physique nouvelle qui change le rapport à l'outil.

## Identity overlays

Des attributs stables qui se posent sur une persona sans en devenir une.

**`plus-de-50-ans`** — Un calque, pas une persona, et la distinction compte. `advertising-to-older-audiences.md` le dit lui-même : « older audience » est une lentille de départ et pas une persona, et le travail persona se fait d'abord. Ce calque bende beaucoup de choses : rythme lent, gros texte, autorité, preuve d'âge égal, format familier, et il vaut pour les deux personas.

**`en-couple-hetero`** — Un calque **supposé par la marque et confirmé par rien**. Il est présent dans presque toute la mise en scène : les attributs alt des images de l'advertorial, « Lui au bout du lit, elle sous la couette » puis « Le couple réconcilié, câlin sur le lit », et une série de titres, « Elle ne dira rien. Mais elle remarquera tout. », « Le moment de vérité, c'est quand le boxer tombe. », « Ce qu'elle ne dira jamais. » Aucune donnée ne le confirme et aucune ne l'infirme. L'homme seul et l'homme qui n'est pas dans un couple hétérosexuel ne sont adressés par aucune des 163 annonces, verified. **Blanc nommé et à surveiller.**

## Voices that speak for the brand

**Aucune n'existe aujourd'hui, et c'est le manque le plus structurant de ce document.**

Verified sur 24 lectures créatives complètes et sur 163 annonces : aucun fondateur à l'écran, aucun expert, aucun professionnel de santé, aucun créateur, aucun client identifiable, aucun visage portant un vrai nom. Aucune presse, aucun prix, aucune certification, aucun partenariat, aucune place dans un comparatif. Les cinq seules personnes qui parlent au nom de cette marque sont **inventées**, et son équipe le documente.

`advertising-to-older-audiences.md` est direct sur ce que ce public croit : une autorité explicitement cadrée, un format qui ressemble à une source établie, un compteur d'avis élevé, et un témoignage qui a leur âge. Voici donc les quatre voix candidates, posées comme candidates et pas comme recommandations, avec ce qui manque à chacune.

**`pair-du-meme-age`** — Un homme de l'âge de l'acheteur qui raconte son usage. Manque : un vrai client qui accepte. La marque en a onze et ne leur a jamais écrit.

**`autorite-sante`** — Un professionnel qui explique pourquoi la peau de cette zone demande autre chose. Manque : la relation, et une vérification de ce que la marque a le droit de faire dire.

**`comparatif-independant`** — Une place dans un classement de catégorie. Un agrégateur français publie un « top 10 des Tondeuse Anti Coupure Partie Intime au France — Septembre 2026 » où Raselio ne figure pas. Manque : la démarche, et c'est la plus atteignable des quatre.

**`fondateur`** — Dylan Ulry à l'écran, expliquant pourquoi il a fait cet objet. Manque : la décision, et elle n'appartient qu'à lui.

## Messaging signals library

Les noms canoniques des angles, pour que les documents compagnons parlent la même langue. Les sept sont classés dans la fiche de la persona 1 avec leur dépense et leurs achats.

`humour-anatomique` · `etat-impeccable` · `preuve-sociale-chiffree` · `securite-de-lachat` · `outil-dedie` · `presbytie-led` · `editorial-objection`

Deux angles supplémentaires existent dans le compte et n'ont produit aucun achat : `nostalgie-adolescence`, « La tondeuse qu'il te fallait à 16 ans », 33,80 €, et `gene-au-deshabillage`, lot EMOTION, 85,04 €.

## Companion-doc routing

**Pour le langage exact et l'émotion :** `personas/persona-voice-library.md`. Prévenir le lecteur avant qu'il n'ouvre : le bac client contient une phrase.

**Pour le moment où dire quoi :** `personas/lifecycle-journey-maps.md`.

**Pour savoir où la confiance dans ce document doit être qualifiée :** `personas/cross-persona-bias-notes.md`. À lire avant d'engager un budget sur une de ces personas.

**Pour la banque de phrases :** `personas/voice-of-customer/voice-of-customer.md` et les neuf extractions.

**Pour l'origine de chaque formule :** `source-pulls/personas/brand-self-echo-detection.md`. À lire avant de reprendre une phrase du site ou d'une créa.

## What we're watching

**Nouveaux signaux comportementaux.** Aucun. Le compte a 28 jours de vie réelle et il n'existe aucune période antérieure à laquelle comparer.

**Signaux qui s'effacent.** Aucun signal client. Une seule chose bouge et elle est du côté de la marque : le registre est passé du tutoiement, lot du 2026-08-23 visant « Kevin, 27 ans », au vouvoiement, lot du 2026-09-03 visant 45 ans et plus. Onze jours d'écart, aucun mot de client entre les deux. Ce n'est pas un langage client qui s'efface, c'est une hypothèse remplacée par une autre.

**Grappes d'identité en formation, qui ne rentrent dans aucune persona.**

**L'homme pour qui le poil est une identité.** Une seule occurrence, le commentaire du 2026-08-31, « Plus rien de la bête sauvage qui sommeille en nous. » Il n'a probablement pas acheté. Aucune des 163 annonces ne parle à un homme qui pense perdre quelque chose, et aucune des sept objections que l'équipe s'est écrites ne contient cette idée. C'est la seule objection spontanée que cette marque possède, et elle se situe **en amont** de toutes celles qu'elle traite.

**L'homme qui ne se rase pas encore là.** Tous les messages supposent un geste installé. Aucune annonce ne s'adresse à un homme qui n'a jamais tondu là. `advertising-to-older-audiences.md` note que ce public convertit volontiers depuis un état inconscient du problème, ce qui rend la lacune plus grande qu'elle n'en a l'air.

**L'homme seul, et l'homme hors d'un couple hétérosexuel.** Jamais adressé, jamais compté, jamais nommé dans une source.

**La séparation entre 55-64 et 65 et plus.** Les deux tranches se comportent différemment : les 55-64 prennent 33,3 % de la dépense et portent quatre achats pour un ROAS de 0,594 ; les 65 et plus prennent 31,2 %, affichent le meilleur taux de clic masculin du compte à 2,23 % et le CPM le plus bas des tranches acheteuses à 8,00 €, et portent un seul achat pour un ROAS de 0,171. Le plan de l'équipe recommande de cibler « hommes 45-65+ » sans distinguer les deux. Six achats ne permettent pas de trancher, et c'est la première chose à regarder au prochain passage.

**Personas suspectées d'être des artefacts de biais, à retirer ou à rétrograder.**

**« Kevin, 27 ans »**, écrit le 2026-08-23. Zéro achat sur 135,80 € dépensés sur les lignes hommes 18-44. **À retirer**, et l'équipe l'a déjà fait sur le papier le 2026-09-03. Ce qui n'a pas suivi, c'est le compte : au 2026-09-06, les treize ad sets Raselio étaient toujours en 18-65 avec Advantage+, trois jours après une décision écrite deux fois de passer en 45-65.

**Les cinq profils du document de contexte de marque stocké dans Parker** — Thomas 38 ans, Nabil 26 ans, Sandrine 44 ans, Damien 31 ans, Lucas 47 ans. Aucun n'a plus de 47 ans. Le document dit lui-même n'avoir reçu aucune donnée de la marque. **À rétrograder au rang d'hypothèses de catégorie**, et à ne jamais confondre avec les personas de ce document. Le risque est réel parce qu'ils arrivent par un appel d'outil et portent le nom de la marque, ce qui leur donne l'autorité d'une source.

**« Hervé », le persona d'équipe du 2026-09-03.** Il est proche de la persona 1 de ce document et il est plus précis qu'elle sur l'âge, 58 ans, cœur 55-64. Il n'est pas retiré, il est **rétrogradé** : rien ne justifie de fixer un âge à l'unité près sur six achats, et un des onze acheteurs réels s'appelle Hervé F., ce qui crée un risque de circularité si le persona est ensuite traité comme validé par ce client.

## Open loops

**Boucle 1.** Observation : les cinq annonces qui portent les six achats montrent toutes des hommes d'environ trente ans, torse nu et tatoués, et leur texte tutoie, alors que 82,4 % de la dépense et la totalité des achats atterrissent chez des hommes de plus de 45 ans. Pull : Surprise, elle a tiré au moment où la description du modèle de l'annonce la plus rentable a donné « fin de la vingtaine au milieu de la trentaine » et non l'homme mûr que la lecture d'âge laissait attendre. Question : qu'est-ce qui, dans ces créas, a convaincu un homme de cinquante-huit ans alors que la personne à l'écran ne lui ressemble pas ? Justification : la réponse décide si le prochain lot change de casting ou garde celui qui marche, et le lot suivant est déjà écrit autour d'un modèle aux cheveux gris. Territoire : Creators and talent.

**Boucle 2.** Observation : le compte a dépensé 135,80 € sur les lignes hommes 18-44 pour 19 997 impressions, 220 clics et zéro achat, avec une créa écrite pour un homme de vingt-sept ans, pendant que 566,98 € sur les lignes 45 et plus produisaient les six achats du compte. Pull : Tension, elle a tiré en lisant côte à côte le « ICP : Homme FR, 18-34 ans » du 23 août et la ventilation d'achats du 6 septembre. Question : qu'est-ce qui a empêché les hommes de 18 à 44 ans d'acheter alors qu'ils ont cliqué ? Justification : si c'est la créa qui ne leur parlait pas, la marque perd la moitié de son marché en les excluant ; si c'est la tranche qui n'achète pas ce produit, chaque euro dépensé là est perdu et le budget doit basculer. Territoire : Personas.

**Boucle 3.** Observation : deux des trois sources de premier rang de la méthode sont vides pour cette marque, 0 avis et 0 réponse de sondage, la troisième compte deux commentaires, et onze hommes ont reçu l'appareil sans qu'on leur ait jamais posé une question. Pull : Gap, elle a tiré parce que la source la moins chère à installer est aussi celle qui manque le plus. Question : qu'est-ce qui empêche aujourd'hui la marque de poser une seule question à ses onze premiers acheteurs ? Justification : dix réponses feraient passer la persona flagship de thin à mixed et donneraient au coffre sa première parole d'acheteur, ce qui change plus le travail créatif que trente créas de plus. Territoire : Product. **Seule la marque peut répondre.**

**Boucle 4.** Observation : la créa qui traite la garantie et le colis affiche le meilleur taux de clic de tout le compte à 14,06 % et a reçu 1,33 € sur 677,81 €, pendant que l'entonnoir perd 94,6 % des gens entre la vue de page et le panier. Pull : Gap, elle a tiré en cherchant combien le compte avait mis derrière son meilleur taux de clic et en trouvant un euro trente-trois. Question : combien d'hommes se décident au moment où la question du colis et du remboursement est réglée, plutôt qu'au moment où le produit est expliqué ? Justification : la réponse dit si la marque doit continuer d'expliquer sa tondeuse ou commencer à vendre la sécurité de l'achat, et c'est la moitié du prochain budget de production. Territoire : Messaging.

**Boucle 5.** Observation : les 65 ans et plus reçoivent 31,2 % de la dépense avec le meilleur taux de clic masculin du compte et portent un seul achat pour un ROAS de 0,171, pendant que les 55-64 reçoivent 33,3 % et en portent quatre pour un ROAS de 0,594, et le plan de l'équipe traite les deux tranches comme une seule. Pull : Pattern, elle a tiré en voyant deux tranches voisines afficher un comportement d'attention identique et un comportement d'achat opposé. Question : qu'est-ce qui sépare un homme de soixante ans d'un homme de soixante-dix devant ce produit ? Justification : ces deux tranches consomment ensemble deux tiers du budget, et si elles n'achètent pas de la même façon, la marque paie une audience pour une autre. Territoire : Personas.

---

**Sign-off des méthodes chargées qui en portent une.**

This is everything I know about advertising to older audiences.
