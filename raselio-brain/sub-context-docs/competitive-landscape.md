---
brand: raselio
doc: competitive-landscape
generated_on: 2026-09-06
refresh_by: 2026-12-06
sources_read: [source-pulls/brandsearch-competitors.md (20 fiches de marque, 12 requêtes lookup_brand, corpus publicitaire Meta de thomyle.com trié par dépense puis par récence, agrégats tous temps sur 1 063 annonces, 5 requêtes search_meta_ads FR à 0 résultat, 1 requête search_brands FR page 1 sur 97), source-pulls/drive-grumwise-top10-reproduction-2026-08-13.md (351 pubs Grümwise analysées par l'équipe, 166 actives, top 10 par dépense EU avec adaptation Raselio de chacune), competitors/_competitive-set.md, sub-context-docs/category-and-market-research.md, sub-context-docs/brand-identity-analysis.md, sub-context-docs/website-and-product-audit.md, source-pulls/drive-30-statiques-meta-plan-2026-09-03.md, running-notes/brand-rules.md, running-notes/missing-context.md, WebSearch du 2026-09-06 pour Billy, ClubCooper, Manscaped, Philips OneBlade Intimate, Gillette Labs Body + Intimate et les pages de vérification de confiance sur Thomyle, URL et dates d'accès dans l'appendice. Aucune liste de concurrents fournie par la marque : l'intake n'a pas pu être posé, le build a tourné sans personne.]
data_limitations: [Le set concurrentiel est une sélection de Parker au jour du build, pas celle du fondateur. `competitors/_competitive-set.md` le dit et la question 4 de `running-notes/missing-context.md` attend encore la réponse de Dylan. Toute la hiérarchie ci-dessous est donc à confirmer ou à remplacer. Aucun brand_id Parker : ni search_competitor_facebook_ads, ni brand_discovery, ni les commentaires publicitaires des concurrents n'ont pu être appelés, donc aucune lecture créative média complète n'existe pour Gillette, Philips, Billy et ClubCooper. Pour ces quatre marques je n'ai que les fiches produit publiques et les descriptions de catalogue, pas leurs créas : chaque fois que c'est le cas, le document écrit `creative read unavailable`. Brandsearch se contredit sur Thomyle : la fiche de marque annonce 2 082 annonces au total et 32 actives, l'agrégat tous temps en compte 1 063 ; je porte les deux et je n'en réconcilie aucun. get_brand_ads renvoie 20 annonces par appel sans paramètre de page, donc la lecture du corpus Thomyle porte sur 40 annonces sur 1 063, les 20 plus dépensières et les 20 plus récentes. Les cinq requêtes search_meta_ads en français sur la France ont renvoyé zéro ligne, donc aucune découverte de concurrent par mots-clés publicitaires n'a été possible. discover_meta_ads n'accepte pas de filtre pays : l'échantillon renvoyé est anglophone et hors sujet. Grümwise n'existe pas dans Brandsearch : tout ce qui le concerne vient du document de l'équipe du 13 août, donc stated. Les chiffres de dépense et de reach EU sont des estimations de transparence Meta telles que rapportées par Brandsearch et par l'équipe, jamais revérifiées ailleurs. Le proxy de la session bloque gillette.fr, fr.scamdoc.com et demotivateur.fr : pour ces pages je n'ai que le résumé du moteur de recherche.]
methods_loaded: [analyzing-public-ad-accounts.md, hooks.md, ad-formats/ (static, video, both), killer-performance-ads.md, creative-strategy-fundamentals.md, persona-research-and-creative-strategy-process.md]
---

# Competitive landscape — Raselio

## La piste de recherche, avant les sections

Ce document trie. Il ne démonte personne, le démontage a ses propres documents et il vient après. Son travail est de dire qui est qui autour de Raselio et où doit aller le travail lourd, parce qu'on ne peut pas auditer tout le monde et que faire semblant produit une lecture mince de beaucoup de marques au lieu d'une lecture profonde des rares qui comptent.

**Un avertissement à mettre avant tout le reste, parce qu'il change la confiance à accorder à ce document.** Le set concurrentiel de départ n'a pas été donné par la marque. Le build du 6 septembre 2026 a tourné sans personne, l'intake n'a pas pu être posé, et `competitors/_competitive-set.md` l'écrit lui-même : « The founder was not available to name rivals (unattended build), so this set is Parker's selection from what the connected tools could reach, seeded by the team's own documents. **Confirm or replace** ». La question est toujours ouverte, c'est la numéro 4 de `running-notes/missing-context.md`. Tout ce qui suit est donc une lecture de Parker, pas la carte du fondateur. Là où je place une marque, la place est un jugement et je dis sur quoi il repose. Là où je m'écarte du set du jour du build, je le dis et j'explique pourquoi.

Ce que j'ai lu, dans l'ordre. Le corpus Brandsearch du 6 septembre : vingt fiches de marque, douze requêtes de résolution de noms, l'agrégat tous temps du compte publicitaire de Thomyle sur 1 063 annonces, les vingt annonces les plus dépensières et les vingt plus récentes de ce même compte avec leurs textes verbatim, une requête de découverte de marques françaises et cinq requêtes publicitaires par mots-clés. Puis le document du 13 août dans lequel l'équipe démonte les dix meilleures créatives de Grümwise et écrit, pour chacune, la version Raselio. Puis les documents de travail de l'équipe et les trois documents de fondation déjà écrits. Puis le web, pour les marques que Brandsearch ne couvre pas ou couvre mal : Gillette, Philips, Billy, ClubCooper, Manscaped.

Ce que je n'ai pas pu faire, dit une fois pour toutes. Il n'y a pas de brand_id Parker sur cette marque, donc `search_competitor_facebook_ads` et `brand_discovery` n'ont pas pu tourner. Pour Gillette, Philips, Billy et ClubCooper, je n'ai aucune créative en main : ni visuel, ni accroche, ni transcription. Chaque fois que ces marques apparaissent, la lecture créative est marquée **creative read unavailable** et elle ne sert à aucune conclusion créative. Les seules marques dont je tiens vraiment la créative sont Thomyle, par les textes verbatim du corpus Brandsearch, et Grümwise, par le démontage plan par plan de l'équipe. Enfin, `search_chat_history` a renvoyé 0 fil le 6 septembre 2026 : l'équipe n'a jamais parlé à Parker avant ce build, donc cette source n'existe pas ici.

Une dernière remarque de méthode, tirée de la lecture des comptes publicitaires publics. Un compte se lit en nommant d'abord le tri : trié par dépense, le haut de la bibliothèque est une hypothèse sur ce que la marque croit gagner ; trié par récence, c'est ce qu'elle teste en ce moment. Les deux tranches Thomyle sont lues séparément plus bas pour cette raison, et je ne confonds jamais la plus récente avec la meilleure.

## Direct competitors, the deep-audit set

Quatre marques. Le set est volontairement resserré et il couvre quatre façons différentes de résoudre le même problème pour le même acheteur : la marque française en direct qui achète du volume publicitaire, la marque française en direct qui joue le premium et le référencement, le géant du rasage humide avec ses lames de rechange, et le géant de l'électroménager avec son appareil sans consommable. Les deux dernières sont en rayon, à un prix inférieur à celui de Raselio, et c'est ce qui les rend directes malgré la différence de taille.

**Les quatre sont marquées « audit approfondi à faire ». Le contenu de cet audit ne se fait pas ici.**

### 1. Thomyle — thomyle.com, France

**Pourquoi direct :** même acheteur, même achat, même langue, même pays, même zone du corps. La marque se décrit elle-même « Thomyle - Le rasage intime au masculin » et « On réinvente le soin intime au masculin, sans tabou, sans compromis », verified sur la fiche Brandsearch du 2026-09-06. Son produit phare, Le Fidèle™, est un rasoir électrique à 49,90 €, verified sur get_products.

**Le type de menace : le volume publicitaire et la revendication de rang.** C'est le seul acteur du set qui a acheté beaucoup de média en français sur exactement ce sujet. Les agrégats tous temps portent sur 1 063 annonces pour 97 741,09 € de dépense EU cumulée et 11 973 023 de reach EU, avec une moyenne de 93,89 € par annonce et un maximum de 12 117,34 €, verified as reported par Brandsearch. La fiche de marque annonce par ailleurs 2 082 annonces au total et 32 actives, un chiffre que l'agrégat ne recoupe pas : je porte les deux et je ne tranche pas, data-limited. Le mix média est 790 vidéos pour 273 images, la langue est le français sur 1 054 annonces sur 1 063, et la démographie déclarée est « All » en genre et 18-65 en âge sur 1 041 annonces, ce qui veut dire un ciblage large sans segmentation d'âge, verified.

**Ce que sa créative fait, lu sur les textes verbatim.** Trois accroches structurent tout le compte, et je les nomme dans le vocabulaire des accroches. La première est une **Question hook** en position d'attaque problème-solution, présente sur au moins six des vingt annonces les plus dépensières, verbatim : « Marre des rasoirs qui coupent et irritent ? Le Fidèle™ est la solution idéale ! 💡 ». Le corps qui suit est un **Headline + Benefits** classique, trois puces de mécanisme, « Lame SkinSafe : zéro coupure, zéro poil incarné. LED intégrée : précision maximale. Étanche : rasage propre sous la douche. », puis une preuve sociale chiffrée, « ✅ Déjà plus de 10 000 hommes conquis. », puis une offre, « 🎁 Offre Spéciale Été : -25 % + 1 cadeau offert. » La deuxième est une **Storytelling hook** à la première personne, annonce 1660478448273374, 2 371,97 € de dépense EU, verbatim : « J'avais toujours peur de me couper. À chaque rasage, j'étais en sueur. Un faux mouvement… et c'était la catastrophe. » La troisième est une **POV hook** écrite du point de vue de la partenaire, annonce 1105806901622065, 849,07 € de dépense EU, verbatim : « Tu veux lui faire plaisir… mais t'as pas envie de mettre ta bouche sur un champ de bataille ? » suivie de « 🎁 Offres-lui Le Fidèle™ », ce qui en fait un format **Gifting**.

Le titre est presque toujours le même et il est un argument de rang : « La Tondeuse N°1 en Europe », « Le Rasoir N°1 en Europe », « Le rasoir intime n°1 en Europe », verified. La répartition des appels à l'action est très concentrée : GET_OFFER 2 062 occurrences, SHOP_NOW 557, GET_OFFER_VIEW 337, LEARN_MORE 232, ORDER_NOW 56, SEE_DETAILS 45, verified. Une bibliothèque qui appelle deux fois sur trois à « profiter d'une offre » est, selon la méthode de lecture des comptes publics, une bibliothèque à forte part de créative menée par l'offre, ce qui se lit comme de la pression sur le chiffre à court terme ou comme un moteur de demande manquant, jamais comme une raison d'en faire plus.

**Le point qui doit ouvrir l'audit approfondi.** La fiche Brandsearch donne à thomyle.com **108 visites mensuelles**, verified, en face de 97 741,09 € de dépense EU cumulée. Ces deux nombres sont difficiles à tenir ensemble et je ne les explique pas ici. C'est une boucle ouverte, plus bas.

**Sources :** fiche et corpus Brandsearch du 2026-09-06, tableau de bord https://app.brandsearch.co/brand-analysis/thomyle.com.

---

### 2. Billy — billy-trimmer.com, France

**Pourquoi direct :** même produit, même pays, même zone, et le même mécanisme exact que Raselio. La description de la marque, verified sur la fiche Brandsearch du 2026-09-06 : « La tondeuse intime anti-coupure pour hommes et femmes — billy. Lame céramique, 100% waterproof, anti-poil incarné. Maillot, pubis, testicules, bikini... ». Marque française lancée via Ulule début 2025, prix 79 €, lame céramique anti-coupure, LED frontale, waterproof, cinq longueurs de coupe, stated d'après les pages consultées le 2026-09-06.

**Le type de menace : elle occupe le haut du prix et elle possède la couche de recherche.** 26 792 visites mensuelles, 52 annonces Meta actives sur 186 au total, 19 produits, verified sur Brandsearch. C'est la marque du set qui reçoit le plus de trafic français, deux cent quarante fois plus que Thomyle. Et ce trafic ne vient pas que de la publicité : ses propres articles de blog sortent en première page sur « tondeuse intime », « meilleure tondeuse intime 2026 » et « billy vs Philips OneBlade Intimate vs bodygroom », observé le 2026-09-06 sur plusieurs requêtes différentes. Elle publie aussi ses propres avis, « 4.87/5 basée sur 70 avis vérifiés » et « près de 2 000 clients satisfaits en 2026 », stated d'après sa page d'avis.

**Pourquoi je la fais monter dans le set profond alors que le set du jour du build la laissait en liste de veille.** Trois raisons, et je les donne parce que c'est un écart assumé avec `competitors/_competitive-set.md`. Un, elle est française, elle vend le même objet et elle est bien plus visible que Thomyle sur le trafic. Deux, elle tient exactement le mécanisme que Raselio revendique, céramique plus LED plus étanchéité, ce qui veut dire que l'argument produit de Raselio n'est pas un différenciateur face à elle. Trois, elle le vend 79 € contre 34,99 €, ce qui fait d'elle la cible naturelle de l'axe « vous ne payez pas la pub, vous payez la lame » que l'équipe a repris de Grümwise. Une marque contre laquelle un axe entier du compte est écrit doit être auditée, pas surveillée.

**Lecture créative : creative read unavailable.** Aucun visuel, aucune accroche, aucune transcription de Billy n'a pu être obtenue dans ce run, faute de brand_id Parker et faute d'appel Brandsearch sur ses 186 annonces. Rien de ce qui précède ne dit ce que sa publicité montre.

**Sources :** fiche Brandsearch du 2026-09-06, https://billy-trimmer.com/products/la-billy-bleue, https://www.barbierprive.fr/produit/test-avis-tondeuse-intime-billy-2025-zero-coupure/.

---

### 3. Gillette Labs Body + Intimate — Gillette, groupe P&G, France

**Pourquoi direct :** même usage annoncé, même acheteur, et un prix en dessous de celui de Raselio. La gamme couvre les deux architectures du besoin, un rasoir humide Body + Intimate avec lames de rechange et une tondeuse i3 et i7 Body + Intimate. En France, la tondeuse i3 est référencée chez Cdiscount, Auchan et Leclerc, relevée à 29,70 € en Drive, stated d'après les pages consultées le 2026-09-06.

**Le type de menace : c'est le leader durable, et il déplace la définition de la catégorie.** Deux mouvements datés. Un pop-up éphémère à Paris et à Marseille en mars 2026 autour du rasage intime, où le rasoir a été présenté en avant-première, stated. Un lancement américain annoncé début avril 2026 avec la revendication « Gillette's safest body razor ever », stated d'après les reprises de presse, le communiqué d'origine étant bloqué par le proxy. La menace n'est pas qu'il prenne des clients à Raselio un par un. C'est qu'il finance l'éducation de la catégorie et qu'en le faisant il s'approprie le vocabulaire de sécurité, « SkinFirst », « Triple Système de Défense », « barre anti-poils incarnés », qui est précisément le vocabulaire que les petites marques utilisaient comme différenciateur. Quand le mot de la catégorie appartient à P&G et coûte 29,70 € en rayon, « lames céramique, tête arrondie » cesse d'être un argument et redevient une caractéristique.

**Le second effet, plus lent : le modèle de revenu.** Gillette vend un rasoir puis des recharges. Raselio vend un achat unique sans consommable et en fait une vertu, verified sur la page Notre Histoire : « Chaque commande est un achat unique, sans abonnement caché ni engagement. » L'axe anti-abonnement de Raselio a donc une cible réelle et nommable, et c'est celle-là.

**Lecture créative : creative read unavailable.** Brandsearch ne résout pas « gillette labs », la requête a renvoyé `matches: []`, verified. Aucune annonce Gillette n'a été lue dans ce run.

**Sources :** https://www.gillette.fr/fr-fr/produits/tondeuse-barbe/body-intimate-i3-tondeuse, https://www.cdiscount.com/electromenager/beaute-masculine/tondeuse-corps-zone-intime/f-1105803-aacue17514.html, https://www.dealabs.com/bons-plans/tondeuse-gillette-labs-i3-body-intimate-3329129, https://www.auchan.fr/gillette-labs-tondeuse-pour-le-corps/pr-C1857591, toutes consultées le 2026-09-06.

---

### 4. Philips OneBlade Intimate — Philips, France

**Pourquoi direct :** c'est le produit que l'acheteur français trouve en rayon quand il cherche exactement ce que Raselio vend, et il est moins cher. Le modèle QP229/50 démarre à 24,95 € sur idealo.fr, la gamme se situant entre 30 et 40 €, et il est vendu chez Carrefour, stated d'après les pages consultées le 2026-09-06. Il annonce une triple protection de la peau, la technologie SkinProtect, un sabot corps de 3 mm, une étanchéité IPX7 jusqu'à un mètre pendant trente minutes, et environ trente minutes d'autonomie après huit heures de charge.

**Pourquoi je le mets en direct alors qu'il n'était pas dans le set du jour du build.** Parce que c'est le seul acteur qui rend fausse la phrase la plus importante du positionnement de Raselio. L'équipe raisonne depuis le 13 août contre « les tondeuses premium à 80-100 € », stated. À 24,95 €, chez Carrefour, avec un indice d'étanchéité publié que Raselio n'a pas, OneBlade Intimate est en dessous de Raselio sur le prix et au-dessus sur la preuve technique. Une marque qui casse à la fois l'argument de prix et l'argument de spécification mérite un audit, pas une ligne de veille.

**Le type de menace : le plancher de prix et la commodité d'achat.** Sur ce point Philips diffère de Gillette et c'est pourquoi les deux sont dans le set. Gillette vend un système avec recharge, Philips vend un appareil autonome sans consommable, exactement le modèle de Raselio. Face à Gillette, l'argument « achat unique » de Raselio fonctionne. Face à Philips, il ne fonctionne pas, puisque Philips l'a déjà.

**Lecture créative : creative read unavailable.** Brandsearch ne résout pas « philips oneblade », la requête a renvoyé `matches: []`, verified.

**Sources :** https://www.philips.fr/c-p/QP1924_30/oneblade-intimate, https://www.idealo.fr/prix/204947120/philips-oneblade-intimate-qp229-50.html, https://www.carrefour.fr/p/rasoir-intime-oneblade-philips-8720689037846, consultées le 2026-09-06.

---

### Ce que ce set couvre, et ce qu'il ne couvre pas

Le set couvre quatre approches distinctes du même achat, et il inclut le leader durable de la catégorie. Ce qu'il ne couvre pas : aucune marque du set ne s'adresse à l'homme de plus de cinquante ans. L'équipe l'a écrit le 3 septembre, verbatim, stated : « Aucun concurrent FR ne parle à l'homme de 50 ans et plus, ne vouvoie, ni n'exploite la LED comme réponse à la presbytie. C'est l'espace libre. » Je note l'absence, je ne la déclare pas opportunité : une case vide est une question, pas une réponse. Elle est en boucle ouverte plus bas.

## Indirect and category-adjacent competitors

Ces marques ne se battent pas pour le même achat, mais elles occupent le voisinage de l'acheteur, elles façonnent ce qu'il croit possible, et certaines pourraient basculer vite.

**Grümwise, grumwise.com, Australie, marché britannique.** Tondeuse corps céramique à 39 £. Ce n'est pas un rival français : rien dans les sources ne montre qu'elle vend en France, et Brandsearch ne la connaît pas, la requête « grumwise » ayant renvoyé `matches: []`, verified. Elle est dans ce document pour une raison différente et importante : **c'est le modèle créatif que Raselio copie.** Le document de l'équipe du 13 août démonte ses dix meilleures créatives par dépense EU et écrit pour chacune la version Raselio, plan par plan. Grümwise y est décrite avec 351 pubs analysées et 166 actives, sa créative numéro un ayant 2 568 € de dépense EU et 223 318 de reach, stated d'après le document, chiffres non revérifiés. L'équipe résume elle-même les deux axes du compte, verbatim, stated : « **Axe « Us vs Them / anti-marketing »** (Créatives 1, 4, 10, 8) : « vous payiez la pub, pas la lame » + « prix honnête, achat unique ». C'est le cœur du compte. » et « **Axe « mécanisme céramique »** (Créatives 3, 5, 6, 7, 9) ». Dans le vocabulaire des formats, ces dix créatives se répartissent en **Us vs Them** et **Wall of Text** pour les manifestes 1 et 4, **Post-It Note** et **Handwritten** pour la 10, **Educational** en traitement d'objection pour la 3, **Comment Response** avec **Demo** sur matière de substitution pour la 6, **UGC Single** avec **Unboxing** pour la 2, **Comparison** pour la 8 et **Question hook** pour la 9. **Rôle : inspo, pas concurrent.** Elle deviendrait un concurrent direct le jour où elle ouvrirait la France, ce qu'aucune source n'indique aujourd'hui.

**Manscaped, États-Unis, la marque qui a créé la catégorie.** Le Lawn Mower en est à sa cinquième génération, le 5.0 Ultra à 109,99 $, et la société revendique 300 millions de dollars de chiffre d'affaires et plus de 15 millions de clients dans 39 pays depuis 2016, stated d'après les pages consultées le 2026-09-06. Sur Brandsearch, manscaped-leader.com et manscaped-us.com sont tous deux **inactifs avec 0 annonce Meta**, verified. **Rôle : adjacent, référence de registre et de prix.** C'est la marque qui a rendu le sujet dicible dans la culture anglophone, et son humour est la référence dont tout le monde s'inspire. Elle passerait en direct si elle poussait la France en publicité ; rien ne le montre aujourd'hui.

**Braun, dans la maison P&G.** Un bundle « Braun x GilletteLabs Body & Intimate » existe sur fr.braun.com, consulté le 2026-09-06. Braun vend par ailleurs des tondeuses corps en rayon français. **Rôle : adjacent, et c'est surtout le signe que le groupe P&G attaque la catégorie par deux marques à la fois.**

**Le générique sans marque du rayon et des places de marché.** Ce n'est pas une marque, c'est une offre, et elle prend une part réelle du même achat. Le même appareil que Raselio, décrit avec exactement les mêmes mots, « 2 en 1, IPX7 étanche, lames céramique anti-coupure, sabot réglable, socle de recharge », est vendu sur ManoMano et sur la place de marché E.Leclerc sous l'EAN 3701751901741, entre 29,99 € et 50 € selon les fiches, verified sur les titres consultés le 2026-09-06. **Rôle : adjacent devenu direct de fait.** C'est l'adjacence qui s'est déjà refermée. Elle ne fait pas de publicité et ne peut donc pas être auditée comme un compte, mais elle plafonne le prix.

**Le rasoir jetable et la tondeuse à barbe.** Ce ne sont pas des marques concurrentes, ce sont les solutions que l'acheteur utilise déjà, et ce sont les vraies alternatives contre lesquelles Raselio écrit. La marque les nomme toutes les deux : l'advertorial titre « Vos couilles sont une zone sensible. Votre tondeuse à barbe l'ignore. » et la créa 24 oppose « Rasoir jetable : Lisse · Rouge · Ça pique » à « Raselio avec sabot : Net · Net · Confortable », verified et stated. **Rôle : adjacent, et principal détenteur de la part de marché du geste.**

**L'épilation en institut, la cire et les crèmes dépilatoires.** Elles résolvent le même besoin autrement. Aucune source de ce run ne les mesure sur l'homme français. **Rôle : adjacent, blanc nommé.**

## Emerging and micro-competitors to watch closely

Le bon rythme ici est un contrôle périodique, pas une analyse continue. La méthode insiste sur ce bloc quand la catégorie est fortement commoditisée, et elle l'est : `sub-context-docs/category-and-market-research.md` établit que le matériel est un modèle de catalogue fournisseur et que la même fiche technique circule chez plusieurs vendeurs. C'est donc ici que la prochaine vraie menace apparaîtra.

**ClubCooper, clubcooper.com, immatriculée à Malte, vend en France.** Le cas le plus intéressant du bloc. Elle se décrit « Tondeuse intime Cooper : lame céramique, 90 min d'autonomie, waterproof, 0 irritation. Design compact, livraison offerte en France. », verified sur Brandsearch, ce qui est **mot pour mot la fiche technique de Raselio**, autonomie de 90 minutes comprise. Prix relevé : 49,99 € en offre VIP, stated. Trafic : 3 435 visites mensuelles. Publicité : **0 annonce active sur 24 au total**, verified. Elle se bat aussi sur le référencement, avec des comparatifs maison du type « Meilleure Tondeuse Intime Homme 2026 : Comparatif (vs Rasoir) » qui sortent dans les résultats français, observé le 2026-09-06. **Pourquoi elle est ici et pas dans le set profond :** elle se bat pour le même achat mais elle ne fait plus de publicité. Selon la méthode, c'est un concurrent de marché et un néant créatif, donc rien à apprendre de son pipeline aujourd'hui. À surveiller précisément parce que le jour où elle rallume, elle devient directe immédiatement.

**La grappe française sur Shopify.** Cinq boutiques que Brandsearch fait remonter sur les requêtes « tondeuse intime » et « rasoir intime », toutes françaises, toutes petites, la plupart dormantes. Elles comptent non par leur poids mais parce qu'elles montrent la vitesse à laquelle une boutique se monte dans cette catégorie.

| Marque | Visites mensuelles | Annonces Meta actives / total | Statut | Créneau |
|---|---|---|---|---|
| nutss.fr | 0 | 0 / 0 | inactive | tondeuse intime homme, 1 produit |
| coco-liss.com | 0 | 0 / 0 | active | tondeuse intime homme et femme, 1 produit |
| cocospoilus.fr | 0 | 0 / 4 | inactive | rasoir intime homme, 1 produit |
| wavyliss.com | 0 | 0 / 64 | active | kit tondeuse intime femme, 13 produits |
| kelyss.com | 0 | 5 / 6 | active | rasoir intime femme, 3 produits |

Toutes verified sur Brandsearch au 2026-09-06. Deux choses à en tirer. La première : le décompte n'est pas la signification, et cette grappe ne rend pas la catégorie encombrée, elle montre seulement que l'entrée coûte peu. La seconde : trois de ces cinq visent la femme, ce qui est un rappel utile que la même mécanique produit se vend au public féminin avec un autre discours.

**Les boutiques francophones opérées depuis l'étranger, sur le public féminin.** maserenea.com, 0 annonce active sur 30, et lumeziaa.com, 0 sur 17, toutes deux enregistrées aux États-Unis mais vendant en français un « rasoir intime femme », verified. À surveiller comme miroir : elles font, sur les femmes, exactement ce que Raselio fait sur les hommes.

**Les acteurs anglophones du même objet.** balls.co, 29 175 visites mensuelles pour 0 annonce active sur 6 ; mightybull.co, inactive ; mangroomer.com, 8 206 visites pour 0 annonce active ; bakblade.com, 27 515 visites et 38 annonces actives sur 38, mais positionnée sur le dos et le corps plutôt que sur l'intime. Tous verified sur Brandsearch. **Rôle : veille, avec une exception.** BAKBLADE est le seul du bloc qui fait tourner un vrai volume publicitaire aujourd'hui, ce qui en fait le meilleur candidat de ce bloc si la marque veut un jour aller chercher de l'inspiration créative hors de France.

**Cutlab, cutlab.space.** L'ancien nom de Raselio. Fiche inactive, 0 visite, 0 annonce, verified. Ce n'est pas un concurrent. Il reste listé pour que personne ne le prenne pour un.

## Open loops

**1. Thomyle a dépensé près de cent mille euros en publicité européenne et son site reçoit cent huit visites par mois.**
Les agrégats Brandsearch donnent 97 741,09 € de dépense EU cumulée sur 1 063 annonces et 11 973 023 de reach EU, et la même source donne à thomyle.com 108 visites mensuelles. Les vingt annonces actives les plus récentes tournent avec des dépenses minuscules, entre 0,58 € et 17,41 € chacune.
**Pull : surprise.** Le rapport entre l'argent dépensé et le trafic reçu est à l'opposé de ce que tout mon contexte me ferait attendre, et l'écart est de plusieurs ordres de grandeur.
**Question : d'où vient le décalage entre la dépense publicitaire relevée chez Thomyle et le trafic mesuré sur son site ?**
Toute la place de Thomyle dans ce document repose sur l'idée qu'il est le poids lourd français de la catégorie. Si ce trafic est réel, alors le leader du marché français n'envoie presque personne chez lui et c'est une catégorie beaucoup plus ouverte qu'elle n'en a l'air. Si la mesure est fausse, alors je dois savoir laquelle des deux mesures Brandsearch je peux utiliser ailleurs.
**Territoire : messaging.**

**2. Billy vend le même mécanisme deux fois plus cher et occupe la première page de Google avec ses propres articles.**
Sur cinq requêtes françaises différentes menées le 6 septembre, les pages de billy-trimmer.com sortent en résultat naturel : sa fiche produit, ses comparatifs contre Philips, sa page d'avis. Elle a 26 792 visites mensuelles, contre 108 pour Thomyle et 2 431 sessions en 90 jours pour Raselio.
**Pull : gap.** Il y a là une source de demande que Raselio n'a jamais touchée : 24 sessions Google en 90 jours sur 2 431, verified sur les analytics Shopify.
**Question : que cherchent les hommes français dans un moteur de recherche avant d'acheter une tondeuse intime, et qui leur répond aujourd'hui ?**
Si la décision passe par une phase de comparaison écrite, alors la publicité seule ne suffit pas à convertir et le trou de conversion à 0,45 % que la marque constate a une explication en amont du site. Cela changerait l'ordre des priorités de la marque.
**Territoire : produit.**

**3. Aucune marque de la catégorie ne s'adresse à l'homme de plus de cinquante ans, alors que c'est le seul âge qui achète chez Raselio.**
Les ciblages déclarés de Thomyle sont « All » en genre et 18-65 en âge sur 1 041 annonces, sans segmentation. Aucun texte publicitaire de son corpus ne nomme un âge. Et les six achats attribués de Raselio sont tous sur des hommes de 45 ans et plus.
**Pull : gap.** L'absence est totale et parfaitement alignée avec le seul endroit où la marque encaisse, ce qui est trop propre pour être pris comme une bonne nouvelle sans vérifier.
**Question : pourquoi aucune marque française de cette catégorie ne s'adresse-t-elle à l'homme de plus de cinquante ans ?**
Une case vide a trois explications possibles : personne n'a essayé, quelqu'un a essayé et échoué, ou une contrainte invisible de l'extérieur l'interdit. Savoir laquelle décide si Raselio tient un espace libre ou marche dans un piège déjà repéré par d'autres.
**Territoire : personas.**

**4. Le concurrent français qui dépense le plus fait des vidéos, Raselio ne fait que des statiques.**
Le mix média de Thomyle sur 1 063 annonces est de 790 vidéos pour 273 images, et son annonce la plus dépensière de tous les temps, 12 117,34 € de dépense EU, est une vidéo. Le teardown de Grümwise par l'équipe compte cinq vidéos dans son top 10, dont la deuxième créative la plus dépensière du compte. Raselio n'a produit que des statiques depuis le 10 août, neuf lots en douze jours, verified sur le compte.
**Pull : tension.** Les deux comptes que la marque a choisis comme références mettent leur plus gros budget sur la vidéo, et la marque a construit toute sa production sans vidéo.
**Question : que fait la vidéo dans cette catégorie que la statique ne fait pas ?**
La contrainte de la catégorie est qu'on ne peut pas montrer la zone. Si la vidéo apporte quand même quelque chose que l'image fixe ne peut pas apporter, une démonstration sur matière de substitution, une voix, un visage qui rend le sujet dicible, alors le plan de production actuel a un plafond. Si elle n'apporte rien de plus, la marque économise du temps et de l'argent en restant sur la statique.
**Territoire : messaging.**

## Appendix - Parker media links

**Corpus concurrent Thomyle, source-pulls/brandsearch-competitors.md, tiré le 2026-09-06**
- Tableau de bord de marque : https://app.brandsearch.co/brand-analysis/thomyle.com
- Fiche produit portée dans le corps de plusieurs annonces : https://thomyle.com/products/rasoir-electrique-pour-homme-le-fidele
- Annonce 24498181093113298 — « Le Rasoir N°1 en Europe », vidéo, 13/07/2025 au 25/10/2025, 12 117,34 € de dépense EU, 1 488 527 de reach EU
- Annonce 907929188246851 — vidéo, 17/01/2026 au 23/05/2026, 3 686,92 € de dépense EU
- Annonce 1741869303074724 — « La Tondeuse N°1 en Europe », vidéo, 31/07/2025 au 16/09/2025, 2 838,60 € de dépense EU
- Annonce 1660478448273374 — accroche Storytelling « J'avais toujours peur de me couper. », vidéo, 06/02/2026 au 21/03/2026, 2 371,97 € de dépense EU
- Annonce 2093676494451752 — image, 29/07/2025 au 21/09/2025, 1 529,82 € de dépense EU, visuel https://media4.brandsearch.co/resize/NvpKLBTdv4GciGT0dqd-7lcF8rm5MBuom46AQDF85dU/skp:jpg:png:webp:heic/exp:1788941015/bG9jYWw6Ly8vbWV0YS8yMDkzNjc2NDk0NDUxNzUyX29yaWdpbmFsLmpwZw
- Annonce 1105806901622065 — accroche POV partenaire, format Gifting, vidéo, 09/08/2025 au 15/11/2025, 849,07 € de dépense EU
- Annonce 1531363598738260 — la plus dépensière des vingt actives récentes, vidéo, 05/08/2026 au 20/08/2026, 17,41 € de dépense EU, 2 134 de reach EU
- Annonce 2013852465902153 — image, 05/08/2026 au 21/08/2026, 15,78 € de dépense EU, 1 933 de reach EU

**Fiches de marque Brandsearch citées, toutes tirées le 2026-09-06**
- https://app.brandsearch.co/brand-analysis/thomyle.com
- https://app.brandsearch.co/brand-analysis/cutlab.space
- https://app.brandsearch.co/brand-analysis/manscaped-leader.com
- billy-trimmer.com, nutss.fr, coco-liss.com, cocospoilus.fr, a719d0-af.myshopify.com, kelyss.com, wavyliss.com, clubcooper.com, mightybull.co, balls.co, manscaped-us.com, bakblade.com, thebakblade.com, mangroomer.com, bodygroomer.com, maserenea.com, lumeziaa.com — fiches complètes dans source-pulls/brandsearch-competitors.md, section C

**Teardown Grümwise par l'équipe, 13 août 2026**
- source-pulls/drive-grumwise-top10-reproduction-2026-08-13.md
- Document d'origine : https://docs.google.com/document/d/1kDDaVKnpw3pzKimJuUXn6PJpAEtp5vyo2-zTkIMuZCI/edit?usp=drivesdk&ouid=112921070097625603847

**Pages concurrentes consultées sur le web le 2026-09-06**
- Billy : https://billy-trimmer.com/products/la-billy-bleue · https://billy-trimmer.com/en/pages/avis-et-reviews-billy-trimmer-tondeuses · https://billy-trimmer.com/en/blogs/articles/meilleure-tondeuse-intime-2026-billy-vs-philips-oneblade-intimate-vs-bodygroom · https://www.barbierprive.fr/produit/test-avis-tondeuse-intime-billy-2025-zero-coupure/
- ClubCooper : https://clubcooper.com/products/tondeuse-intime-cooper · https://clubcooper.com/blogs/news/tondeuse-partie-intime-homme-2026 · https://clubcooper.com/collections/all
- Gillette : https://www.gillette.fr/fr-fr/produits/tondeuse-barbe/body-intimate-i3-tondeuse · https://www.gillette.fr/fr-fr/produits/rasoirs/body-intimate-rasoir (bloqué par le proxy) · https://www.cdiscount.com/electromenager/beaute-masculine/tondeuse-corps-zone-intime/f-1105803-aacue17514.html · https://www.auchan.fr/gillette-labs-tondeuse-pour-le-corps/pr-C1857591 · https://www.dealabs.com/bons-plans/tondeuse-gillette-labs-i3-body-intimate-3329129 · https://www.amazon.fr/Gillette-Intimate-Technologie-SkinFirst-Rechargeable/dp/B0G6WXP4LN · https://fr.braun.com/fr-fr/male-grooming/gillette-labs-body-razor-bundle · https://www.businesswire.com/news/home/20260402674230/en/Gillette-Launches-New-GilletteLabs-Body-Razor-Setting-a-New-Standard-for-Mens-Body-Grooming (bloqué par le proxy) · https://www.demotivateur.fr/lifestyle/le-rasage-intime-fait-peau-neuve-avec-le-labs-by-gillette-pour-une-experience-unique-a-paris-47488 (bloqué par le proxy)
- Philips : https://www.philips.fr/c-p/QP1924_30/oneblade-intimate · https://www.philips.fr/c-m-pe/oneblade-tonte-et-rasage-visage/oneblade-intimate · https://www.idealo.fr/prix/204947120/philips-oneblade-intimate-qp229-50.html · https://www.carrefour.fr/p/rasoir-intime-oneblade-philips-8720689037846
- Manscaped : https://www.manscaped.com/blogs/newsroom/manscaped-continues-its-rapid-international-expansion-launching-in-norway-and-switzerland · https://www.amazon.com/MANSCAPED%C2%AE-Mower%C2%AE-Ultra-Groin-Trimmer/dp/B0CDNQ62ML · https://www.shopify.com/blog/manscaped-get-market-ready-and-thrive
- Générique de rayon et de place de marché : https://www.e.leclerc/fp/tondeuse-homme-intime-corps-etanche-ipx7-lames-ceramique-led-autonomie-longue-duree-3701751901741 · https://www.manomano.fr/p/tondeuse-corps-homme-2-en-1-rasoir-corps-homme-ipx7-etanche-tondeuse-intime-homme-avec-lames-ceramique-anti-coupure-sabot-reglable-socle-de-recharge-cadeau-homme-pour-mari-amis-papa-73228941 · https://www.cdiscount.com/electromenager/beaute-masculine/tondeuse-corps/l-1105803.html
- Pages de vérification de confiance sur Thomyle : https://fr.scamdoc.com/view/2284165 (bloqué par le proxy) · https://franceverif.fr/fr/site/thomyle.com · https://fr.gridinsoft.com/online-virus-scanner/url/thomyle-com
- Comparatif de presse français : https://www.europe1.fr/societe/tondeuse-intime-pour-homme

**Documents internes lus pour le tri**
- competitors/_competitive-set.md
- sub-context-docs/category-and-market-research.md
- sub-context-docs/brand-identity-analysis.md
- sub-context-docs/website-and-product-audit.md
- source-pulls/drive-30-statiques-meta-plan-2026-09-03.md
- running-notes/brand-rules.md et running-notes/missing-context.md

Méthodes chargées pour ce document, preuve de lecture : les méthodes de lecture des comptes publics, des accroches, des formats publicitaires, du niveau d'exigence d'une bonne publicité de performance, des fondamentaux de stratégie créative et du processus persona ont été lues avant l'analyse ; aucune d'elles ne porte de ligne de signature à recopier, contrairement à `seasonality.md` et `creative-strategy-by-brand-size.md` qui n'entrent pas dans le périmètre de ce document.
