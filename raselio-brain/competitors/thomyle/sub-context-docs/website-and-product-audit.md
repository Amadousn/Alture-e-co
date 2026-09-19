---
brand: raselio
competitor: thomyle
doc: competitor-website-and-product-audit
generated_on: 2026-09-06
refresh_by: 2027-03-06
sources_read: [source-pulls/brandsearch-competitors.md — section G `get_products` sur thomyle.com (11 lignes de bestsellers classées, plus 1 ligne "latest", avec titre, prix, URL, date de création et vendeur), section A fiche de marque (18 produits déclarés, plateforme Shopify, 108 visites mensuelles), sections D et E (40 annonces avec textes verbatim portant les allégations produit et les offres), section F (agrégats tous temps sur 1 063 annonces, répartition des appels à l'action) ; source-pulls/meta-ad-library-competitors.md — 26 annonces actives de la page Thomyle en France au 2026-09-06 ; WebSearch du 2026-09-06 (fiche Amazon.fr B0FHB3VTLM, article de test glowupbyparis, résultats sur les pages du site) ; sub-context-docs/category-and-market-research.md, sub-context-docs/website-and-product-audit.md (côté Raselio, pour la comparaison de fiche technique), competitors/_competitive-set.md. GAPS NOMMÉS — thomyle.com est bloqué par le proxy sortant : aucune page produit, aucune page collection, aucun panier, aucun tunnel de commande, aucun quiz, aucune page d'abonnement n'a pu être ouverte ni parcouru. Amazon.fr est bloqué : la fiche marketplace n'est connue que par son titre. `get_products` renvoie 12 lignes quand la fiche de marque en annonce 18 : 6 produits ne sont pas décrits ici. Le rang 5 n'est pas renvoyé par l'outil. Le champ `product_type` est vide sur toutes les lignes. Aucune marge, aucun coût, aucun volume de vente réel n'est accessible : ce sont des choses que seul Thomyle sait.]
---

# Competitor website and product audit — Thomyle, for Raselio

## Comment cet audit a été fait, et ce qu'il vaut

La méthode de ce document demande de parcourir la boutique du rival : pages produit, modules de mise en avant, panier, tunnel, quiz. **Rien de tout cela n'a été possible.** Le proxy sortant bloque thomyle.com. Ce que j'ai à la place est en fait assez inhabituel et assez bon : la sortie brute de `get_products`, qui donne pour douze produits le titre exact, le prix exact, l'URL exacte et la date de création exacte, plus un classement de bestsellers tel que rapporté par Brandsearch. C'est le catalogue vu par sa base de données plutôt que par sa vitrine.

Ce que cela permet est précis : la forme de la ligne, l'échelle de prix, la chronologie des ajouts, et l'écart entre ce que la marque vend et ce qu'elle met en publicité. Ce que cela interdit est tout aussi précis : je ne sais pas comment un produit est présenté, ce que la page promet, ni ce que le panier propose. Chaque fois que je parle de mise en avant, c'est une déduction depuis le rang et depuis les annonces, jamais depuis une page vue.

Une nuance de vocabulaire avant de commencer. Le classement de `get_products` est appelé « bestsellers » par l'outil. Je le lis comme **un ordre de mise en avant tel que Brandsearch le rapporte, pas comme un volume de ventes vérifié**. Personne hors de Thomyle ne connaît son vrai meilleur vendeur.

## Full product line and its shape

**Les douze produits que la source expose, verified sur `get_products` du 2026-09-06 :**

| Rang | Produit | Prix | Créé le |
|---|---|---|---|
| 1 | Le Fidèle™ - Un rasage intime sûr, doux et sans irritation | 119,90 € | 2025-12-08 |
| 2 | Le Fidèle™ - Votre allié idéal pour un rasage intime impeccable | 49,90 € | 2024-10-04 |
| 3 | Kit « L'essentiel » | 99,90 € | 2026-01-02 |
| 4 | Kit Barbe & visage | 119,90 € | 2026-01-02 |
| 6 | Shaver | 49,90 € | 2026-01-02 |
| 7 | Rasoir lame finition | 19,90 € | 2026-01-02 |
| 8 | Tondeuse nez | 24,90 € | 2026-01-02 |
| 9 | Tondeuse finition barbe | 39,90 € | 2026-01-02 |
| 10 | Assurance colis | 9,00 € | 2025-12-01 |
| 11 | 3x Lames de rasage ( 6 mois ) | 29,90 € | 2025-12-01 |
| — | Kit Full Grooming | 0,00 USD tel que rapporté | 2026-01-02 |

Le rang 5 n'est pas renvoyé par l'outil, et la fiche de marque annonce 18 produits quand l'outil en rend 12. **Six produits manquent à cet inventaire.** Data-limited, et il faut le garder en tête avant toute conclusion sur la largeur de la ligne.

**La forme, une fois qu'on regroupe. Trois blocs et un intrus.**

Le **bloc intime**, qui est le cœur historique : les deux « Le Fidèle™ », à 49,90 € et 119,90 €, plus la recharge « 3x Lames de rasage ( 6 mois ) » à 29,90 €.

Le **bloc barbe et visage**, entièrement créé le **2 janvier 2026** : Kit Barbe & visage 119,90 €, Shaver 49,90 €, Rasoir lame finition 19,90 €, Tondeuse nez 24,90 €, Tondeuse finition barbe 39,90 €, Kit Full Grooming.

Le **bloc kits**, aussi du 2 janvier 2026 : Kit « L'essentiel » 99,90 €, Kit Barbe & visage 119,90 €, Kit Full Grooming.

Et l'intrus : **« Assurance colis » à 9,00 €**, créée le 1er décembre 2025. Ce n'est pas un produit de grooming, c'est un module de panier vendu comme un article.

**La lecture de forme, inferred.** La chronologie est le vrai contenu de cette section, et elle raconte un basculement daté. Pendant quatorze mois, d'octobre 2024 à décembre 2025, Thomyle a été **une marque à un produit** : Le Fidèle, le rasoir intime. Puis, le 2 janvier 2026, **six produits apparaissent le même jour**, et aucun n'est intime : barbe, visage, nez, finition. En une journée, la marque passe de « rasage intime » à « grooming masculin complet ».

C'est un changement de voie, pas une extension de gamme. La marque s'était nommée sur un territoire étroit et exclusif, « Le rasage intime au masculin », verified sur sa propre description, et six mois avant ce document elle est allée là où se trouvent tous les autres : la barbe et le visage, la catégorie masculine la plus encombrée qui existe.

**Où la ligne est solide.** Sur un point réel : elle couvre maintenant une **échelle de prix complète, de 19,90 € à 119,90 €**, avec au moins un produit à chaque palier. Une marque qui a un article à 19,90 € a une porte d'entrée à faible risque, et une marque qui a un kit à 119,90 € a un plafond de panier. Raselio a un seul prix, 34,99 €, verified dans `running-notes/brand-rules.md`. Sur la seule mécanique du panier, Thomyle a plus de leviers.

**Où elle est mince.** Deux endroits. D'abord, l'expansion du 2 janvier 2026 n'a **aucune trace publicitaire** : sur les 40 annonces historiques et les 26 annonces actives que j'ai lues, **zéro** mentionne la barbe, le visage, le nez, un kit ou un rasoir de finition. Une marque qui crée six produits et n'en annonce aucun a soit décidé de ne pas les pousser, soit ne les a pas encore lancés. Dans les deux cas, huit mois plus tard, ils ne sont pas soutenus.

Ensuite, la duplication. Le produit classé numéro un s'appelle « Le Fidèle™ - Un rasage intime sûr, doux et sans irritation » et son URL se termine par **`-copie`**. Le produit classé numéro deux s'appelle « Le Fidèle™ - Votre allié idéal pour un rasage intime impeccable ». Ce sont deux fiches pour ce qui porte le même nom de produit, à **119,90 € et 49,90 €**, soit un facteur 2,4. La recharge de lames porte elle aussi un `-copie` dans son URL. Je ne peux pas dire depuis la source ce que la fiche à 119,90 € contient de plus ; ce que je peux dire, c'est que la ligne a des doublons et que le doublon le plus cher est celui que la source classe premier.

## Hero products and the conspicuous absence

**Le héros par la publicité, verified et sans ambiguïté : Le Fidèle, le rasoir ou tondeuse intime.** La preuve est totale plutôt que partielle. Sur les **26 annonces actives** en France au 2026-09-06, les 26 portent un titre qui nomme la tondeuse ou le rasoir intime. Sur les **20 annonces les plus dépensières de toute l'histoire du compte**, les 20 aussi. Le lien produit que les annonces portent dans leur texte est toujours le même, verbatim : `https://thomyle.com/products/rasoir-electrique-pour-homme-le-fidele`. Et ce lien pointe vers la fiche à **49,90 €**, pas vers celle à 119,90 €.

C'est un point important et il faut le poser proprement : **le produit que Thomyle classe premier n'est pas celui que Thomyle annonce.** Le classement met en tête la fiche à 119,90 €. La totalité de la dépense publicitaire lue envoie vers la fiche à 49,90 €. Deux « héros » différents selon la surface qu'on regarde. Inferred, mais l'écart est net.

**Le héros par le classement : la fiche à 119,90 €.** Marqué comme la lecture de Brandsearch, non confirmée. Si ce rang reflète un volume réel, alors une part des acheteurs de Thomyle paie 119,90 € pour ce que la publicité vend à 49,90 €, et la fiche chère est probablement un pack. Data-limited : je n'ai pas la page.

**L'absence remarquable, et elle est énorme.** Thomyle vend **six produits de barbe et de visage créés le 2 janvier 2026** et n'en annonce **aucun**. Zéro mention sur 46 annonces lues, dont les 26 qui tournent aujourd'hui. La méthode dit que le produit qu'un rival vend sans jamais le pousser est un signal stratégique. Voici ce que ce signal dit, inferred : soit ces produits ne se vendent pas et la marque ne veut pas y mettre d'argent, soit ils sont là pour remplir le panier après la vente du produit principal et n'ont jamais été conçus pour acquérir. La deuxième lecture est la plus probable, parce que le bloc a été créé en même temps que trois kits.

**Une seconde absence, plus discrète et plus intéressante : la recharge n'est jamais annoncée non plus.** « 3x Lames de rasage ( 6 mois ) » à 29,90 € existe depuis le 1er décembre 2025. Aucune des 46 annonces lues ne la mentionne. Une marque qui a construit un consommable et ne le pousse jamais ne fait pas encore tourner sa machine de réachat.

## Claimed differentiators

Toutes les allégations ci-dessous sont **stated par Thomyle**, tirées de ses propres textes publicitaires, et **aucune n'est vérifiée** : je n'ai ni test, ni fiche technique, ni page produit.

**1. « Lame SkinSafe », l'allégation principale.** Verbatim, verified sur au moins huit annonces distinctes : « • Lame SkinSafe : zéro coupure, zéro poil incarné. » La version anglaise dit « Say goodbye to cuts and ingrown hairs with our SkinSafe blade. » Et une annonce ajoute la nature de la lame, verbatim : « ✔️ Lames arrondies, zéro irritation/coupure ».

C'est le différenciateur central, et il est **fabriqué par nomination** : Thomyle donne un nom propre en majuscules à une lame arrondie. Deux remarques factuelles. D'abord, l'allégation est absolue, « zéro coupure », ce qui est le genre de formule qu'un acheteur peut invalider seul en une utilisation. Ensuite, elle n'est pas propriétaire : la catégorie entière a le même geste et le même mot, verified dans `sub-context-docs/category-and-market-research.md`, avec « SkinFirst » et « Triple Système de Défense » chez Gillette et « SkinProtect » chez Philips. Trois noms propres pour la même caractéristique. Un différenciateur que trois marques revendiquent en même temps n'en est plus un ; il est devenu le prix d'entrée de la catégorie.

**2. La LED intégrée.** Verbatim, verified : « • LED intégrée : précision maximale. » et, dans la version tutoyante, « ✔️ LED intégrée → tu vois ce que tu fais ». C'est la même caractéristique que Raselio revendique. Chez Thomyle elle est vendue comme de la précision. Aucune annonce lue ne la relie à l'âge ou à la vue qui baisse.

**3. L'étanchéité.** Verbatim, verified : « • Étanche : rasage propre sous la douche. » et « ✔️ 100 % étanche → sous la douche, en toute tranquillité ». La fiche Amazon.fr, connue par son seul titre, annonce **IPX7**, stated. Aucun texte publicitaire lu ne donne d'indice IP : la marque dit « 100 % étanche » sans le chiffrer là où elle paie pour être vue.

**4. L'autonomie : 120 minutes, et l'allégation n'apparaît qu'une fois.** Verbatim, verified sur l'annonce 1741869303074724 et sa jumelle 1142182718009790 : « ✔️ Et 120 minutes d'autonomie pour ne jamais être pris de court ». C'est le seul chiffre de spécification de tout le corpus lu. Il est absent de la copie la plus dépensière. Pour comparaison, Raselio annonce environ 90 minutes et ClubCooper 90 minutes, verified dans `sub-context-docs/category-and-market-research.md`.

**5. Le trois-en-un.** Connu par le seul titre Amazon.fr, verbatim tel que remonté : « 3-in-1 IPX7 Waterproof Intimate Trimmer for Men - Body, Armpit and Face Shaver Wet&Dry », stated. Cette polyvalence n'apparaît dans aucune annonce lue. La marketplace vend un appareil polyvalent, la publicité vend un appareil spécialisé.

**6. La garantie d'essai : 60 jours.** Verbatim, verified sur l'annonce 1105806901622065 : « ✔️ 60 jours pour tester ou rembourser ». Un article de test rapporte la même chose, stated. Elle n'apparaît que sur **1 des 40** annonces historiques lues et sur **aucune** des 26 actives.

**Ce qui pourrait retourner une allégation en objection.** Deux choses, et je les signale sans les juger, en renvoyant leur gravité aux documents avis et réputation. D'abord « zéro coupure » : l'étude de référence citée dans `sub-context-docs/category-and-market-research.md` établit que près de 26 % des hommes qui entretiennent leur pilosité pubienne déclarent s'être blessés, stated ; une promesse absolue sur un geste où un homme sur quatre s'est déjà coupé est une promesse à haut risque de démenti. Ensuite « 60 jours pour tester ou rembourser » : une garantie généreuse annoncée une fois puis absente de toute la campagne active est une promesse dont la tenue devient invisible, et les plaintes de remboursement remontées dans `public-perception.md` portent exactement là.

## Pricing, bundling, and the upsell path

**L'échelle de prix, verified :** 9,00 € (assurance colis) · 19,90 € · 24,90 € · 29,90 € (recharge) · 39,90 € · 49,90 € (produit annoncé) · 99,90 € · 119,90 € (deux produits). Sept paliers.

**L'offre, et c'est le fait le plus constant du compte.** Thomyle est en promotion permanente, dans quatre formulations que le corpus donne verbatim, toutes verified :

- « 🎁 Offre Spéciale Été : -25 % + 1 cadeau offert. »
- « 🎁 Offre Spéciale rentrée  : -25 % + 1 cadeau offert. » — noter le double espace, présent dans l'original
- « Nos plus grosses réductions de l'année ! Maintenant -20 % sur tout avec le code "THOMYLE20" »
- « 🎁 Et en ce moment, tu profites de -20% supplémentaires avec le code SUMMER20 »

Deux copies rigoureusement identiques ne diffèrent que par le mot « Été » ou « rentrée ». La promotion ne s'arrête pas, elle change de nom avec la saison.

**La répartition des appels à l'action confirme la même chose, verified sur les agrégats tous temps :** GET_OFFER 2 062, SHOP_NOW 557, GET_OFFER_VIEW 337, LEARN_MORE 232, ORDER_NOW 56, SEE_DETAILS 45. Les deux variantes « offre » totalisent 2 399 occurrences sur 3 289, soit **72,9 %** des appels à l'action de toute la bibliothèque.

**La lecture de prix, inferred.** Un produit annoncé à 49,90 € avec « -25 % » permanent est un produit à **37,43 €** en pratique. Ce n'est plus une remise, c'est le prix. Le prix affiché sert d'ancre. Cette mécanique est exactement celle que la réglementation française encadre depuis le 28 mai 2022 par l'article L.112-1-1 du code de la consommation, qui impose que le prix barré soit le prix le plus bas pratiqué dans les trente jours précédents, stated dans `sub-context-docs/category-and-market-research.md`. Je ne donne pas d'avis juridique. Je note que la remise permanente est structurelle chez Thomyle, pas ponctuelle.

**Le chemin de montée en gamme, tel que le catalogue le laisse voir, inferred :**

1. **L'entrée** se fait à 49,90 € sur Le Fidèle, seul produit soutenu par la publicité.
2. **Le panier se remplit** avec « Assurance colis » à 9,00 €, un article dont la seule fonction est d'ajouter neuf euros au moment du paiement.
3. **Le réachat** est possible et il est réel : « 3x Lames de rasage ( 6 mois ) » à 29,90 € installe un cycle de six mois. **C'est le point structurel le plus important de ce document.** Thomyle n'est pas un achat unique durable. C'est un appareil plus un consommable, comme Gillette. Raselio, elle, vend un achat unique sans consommable et en fait une vertu, verified sur sa page Notre Histoire : « Chaque commande est un achat unique, sans abonnement caché ni engagement. »
4. **La montée en gamme** passe par les kits à 99,90 € et 119,90 €, qui n'existent que depuis le 2 janvier 2026 et ne sont jamais annoncés.

**Ce qui n'est pas visible.** Aucun abonnement n'apparaît dans le catalogue exposé. Aucun quiz ni outil de recommandation n'apparaît dans les URL remontées. Le tunnel de commande n'est pas parcourable. La livraison n'est chiffrée nulle part. La page `/pages/suivre-ma-commande` existe, ce qui indique une logistique avec suivi. Blancs nommés.

**Où l'économie de Thomyle est solide, inferred.** Elle a les deux moteurs à la fois : un consommable à 29,90 € tous les six mois et une échelle de panier de 9 € à 119,90 €. Une marque qui peut espérer un second achat peut se permettre un coût d'acquisition plus élevé qu'une marque qui ne le peut pas. C'est un avantage structurel réel, indépendant de sa créative.

**Où elle est fragile.** Le moteur existe mais n'est pas allumé : la recharge n'est jamais annoncée, les kits non plus, et la remise permanente de 25 % rogne la marge de chaque première vente. Une marque qui remise en permanence son seul produit soutenu, et ne pousse jamais ce qui rapporterait la seconde vente, laisse sa propre économie sur la table.

## Use cases and which buyer each product serves

Cette section est en grande partie inférée depuis la façon dont Thomyle **cadre** chaque produit dans sa publicité, faute de pouvoir lire les pages produit.

**Le Fidèle à 49,90 € sert un usage unique et un moment précis : se raser la zone intime sous la douche, sans se couper.** Les trois marqueurs sont dans le texte, verbatim : la zone, « même dans les zones les plus sensibles » et, plus crûment, « des coupures sur les testicules » ; le lieu, « Rasage pratique sous la douche » ; la peur, « Marre des rasoirs qui coupent et irritent ? ». L'acheteur cadré est **l'homme qui a déjà eu peur en le faisant**, pas l'homme qui veut un meilleur résultat.

**Le même produit sert un second usage, entièrement différent : le cadeau.** L'annonce 1105806901622065 le dit sans détour, verbatim : « 🎁 Offres-lui Le Fidèle™ ». L'acheteuse cadrée est la partenaire, et le bénéfice cadré n'est pas le confort de l'homme mais le sien : « la tondeuse qui va transformer sa zone sensible… et ton plaisir. » Deux acheteurs, un produit, deux motifs.

**Le bloc barbe et visage sert un usage que Thomyle n'a jamais expliqué à personne.** Six produits, aucune publicité, aucune page lisible. Je ne peux pas dire quel acheteur ils visent. Blanc nommé. Ce que je peux dire, c'est que rien dans le discours de la marque ne relie « le soin intime au masculin » à une tondeuse à nez.

**Les kits servent l'acheteur déjà convaincu.** À 99,90 € et 119,90 €, ils supposent quelqu'un qui a déjà décidé d'acheter Thomyle et arbitre seulement la taille du panier. Inferred depuis le prix et l'absence de publicité.

**La recharge sert le client existant à six mois.** Le titre le dit lui-même, « ( 6 mois ) ». C'est le seul produit du catalogue dont la fonction est explicitement le retour.

**Un point de lecture pour la fin.** La ligne de Thomyle, prise ensemble, ne résout pas en une voie nette. Elle a la forme de deux marques superposées : une marque intime spécialisée, très soutenue, très étroite ; et une marque de grooming généraliste, créée en une journée, jamais soutenue. La méthode dit qu'une ligne qui ne résout pas en une voie claire est une information réelle sur le rival, et pas un défaut de l'analyse. C'est le cas ici, et je ne le lisse pas.

## Open loops

**1. Thomyle vend un consommable et ne l'annonce jamais.**
« 3x Lames de rasage ( 6 mois ) » à 29,90 € existe depuis le 1er décembre 2025, verified sur `get_products`. Sur 46 annonces lues, dont les 26 qui tournent aujourd'hui, aucune ne la mentionne, et 72,9 % des appels à l'action de la bibliothèque poussent une offre d'acquisition.
**Pull : gap.** Une marque a construit le moteur de réachat de sa catégorie puis n'a jamais mis un euro dessus.
**Question : combien de fois un acheteur français de tondeuse intime revient-il acheter quelque chose à la même marque ?**
Raselio vend un achat unique sans consommable et en fait un argument. Si le réachat existe vraiment dans cette catégorie, alors le modèle sans consommable est un handicap économique déguisé en vertu, et le coût d'acquisition tolérable de Raselio est structurellement plus bas que celui de ses rivaux. Si le réachat n'existe pas, l'argument tient et Thomyle a construit un moteur inutile.
**Territoire : product.**

**2. La marque qui s'appelle « Le rasage intime au masculin » a ajouté six produits de barbe et de visage en une seule journée.**
Le 2 janvier 2026, six fiches apparaissent : Kit Barbe & visage, Shaver, Rasoir lame finition, Tondeuse nez, Tondeuse finition barbe, Kit Full Grooming, verified sur les dates de création. Huit mois plus tard, aucune n'a été annoncée.
**Pull : surprise.** Une marque qui a bâti tout son nom sur un territoire étroit est allée en une journée dans la catégorie masculine la plus encombrée qui existe, puis n'en a rien fait.
**Question : qu'est-ce qui pousse une marque de rasage intime à élargir vers la barbe et le visage ?**
Raselio est mono-produit et se demandera un jour si elle doit s'élargir. Voir un rival direct faire le mouvement puis ne pas le soutenir est le genre de signal qui vaut une année d'hésitation, à condition de savoir ce qui l'a déclenché et pourquoi il s'est arrêté.
**Territoire : product.**

**3. Le produit que la source classe premier coûte 2,4 fois celui que toute la publicité vend.**
Le rang 1 est « Le Fidèle™ - Un rasage intime sûr, doux et sans irritation » à 119,90 €, URL terminant par `-copie`. Le rang 2 est « Le Fidèle™ - Votre allié idéal pour un rasage intime impeccable » à 49,90 €, et c'est vers lui que pointent tous les liens publicitaires lus.
**Pull : curiosity.** Deux fiches du même produit nommé, à un facteur 2,4, dont la plus chère est celle que la source met en tête et la moins chère celle que la marque paie pour montrer.
**Question : à quel prix les acheteurs français de cette catégorie finissent-ils réellement par payer ?**
Raselio vend à 34,99 € et raisonne, depuis le 13 août, contre « les tondeuses premium à 80-100 € », stated. Si les acheteurs de la catégorie atterrissent en fait à 119,90 € après être entrés par une annonce à 49,90 €, alors le prix affiché en publicité et le prix payé sont deux choses différentes, et le positionnement prix de Raselio est construit contre le mauvais nombre.
**Territoire : product.**

## Appendix - Parker media links

**Catalogue Thomyle, `get_products` du 2026-09-06 (`source-pulls/brandsearch-competitors.md`, section G)**
- https://thomyle.com/products/le-fidele™-un-rasage-intime-doux-sur-et-sans-irritation-copie — rang 1, 119,90 €
- https://thomyle.com/products/rasoir-electrique-pour-homme-le-fidele — rang 2, 49,90 €, cible de tous les liens publicitaires lus
- https://thomyle.com/products/kit-lindispensable — rang 3, 99,90 €
- https://thomyle.com/products/kit-barbe — rang 4, 119,90 €
- https://thomyle.com/products/shaver — rang 6, 49,90 €
- https://thomyle.com/products/rasoir-lame-finition — rang 7, 19,90 €
- https://thomyle.com/products/tondeuse-nez — rang 8, 24,90 €
- https://thomyle.com/products/tondeuse-finition-barbe — rang 9, 39,90 €
- https://thomyle.com/products/assurance-colis-1 — rang 10, 9,00 €
- https://thomyle.com/products/lame-de-rasage-le-fidele-copie — rang 11, 29,90 €, la recharge
- https://thomyle.com/products/kit-full-grooming — sans rang, 0,00 USD tel que rapporté
- https://thomyle.com/products/lame-de-rasage — page lames remontée par la recherche du 2026-09-06
- Tableau de bord : https://app.brandsearch.co/brand-analysis/thomyle.com

**Annonces portant les allégations produit citées**
- Annonce 776660794701468 — copie à puces complète, « Lame SkinSafe », LED, étanche, « Déjà plus de 10 000 hommes conquis », 2 447,79 € de dépense EU
- Annonce 1741869303074724 — seule mention de l'autonomie, « 120 minutes », 2 838,60 € de dépense EU
- Annonce 1105806901622065 — seule mention de la garantie, « 60 jours pour tester ou rembourser », angle cadeau, 849,07 € de dépense EU
- Annonce 1688251272320272 — porte le lien produit dans le corps, 1 978,10 € de dépense EU

**Surfaces marketplace et pages du site remontées par la recherche du 2026-09-06, toutes bloquées par le proxy**
- https://www.amazon.fr/thomyle-Fid%C3%A8le-impeccable-Tondeuse-Aisselles/dp/B0FHB3VTLM
- https://thomyle.com/collections/all
- https://thomyle.com/pages/suivre-ma-commande
- https://thomyle.com/pages/conditions-dutilisation
- https://shop.app/m/3d4xrte0q1

**Documents internes lus**
- source-pulls/brandsearch-competitors.md · source-pulls/meta-ad-library-competitors.md
- sub-context-docs/category-and-market-research.md · sub-context-docs/website-and-product-audit.md · sub-context-docs/competitive-landscape.md
- competitors/_competitive-set.md · running-notes/brand-rules.md
