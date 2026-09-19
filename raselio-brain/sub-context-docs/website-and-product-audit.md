---
brand: raselio
doc: website-and-product-audit
generated_on: 2026-09-06
refresh_by: 2026-12-06
sources_read: [source-pulls/shopify-store-and-product.md (shop info, 1 produit, 11 images, 4 pages, 6 politiques, 1 collection), source-pulls/shopify-analytics.md (8 requêtes ShopifyQL, 60 et 90 jours), source-pulls/shopify-orders-and-customers.md (11 commandes, 14 fiches clients), source-pulls/gmail-brand-signals.md (digest hebdo Shopify, rapports CWILL, notifications de commande), source-pulls/drive-recap-mensuel-3-boutiques.md et Suivi_comptable__3_boutiques lu en direct le 2026-09-06 (coût unitaire), source-pulls/drive-30-statiques-meta-plan-2026-09-03.md (lecture site par l'équipe), source-pulls/drive-3-posts-facebook-2026-08-14.md, RASELIO_10_creatives.md et raselio9adsstatiques.md lus en direct (versions antérieures du produit), integrationimagesavantapres.md lu en direct, running-notes/brand-rules.md, competitors/_competitive-set.md]
data_limitations: [raselio.com est bloqué par le proxy de la session : la page d'accueil, le thème, le panier, le checkout et les widgets n'ont pas été vus ; seules les pages et politiques exportées par l'API Shopify ont été lues. Aucune fiche technique fournisseur : RPM, autonomie, indice d'étanchéité, matériau exact des lames et conditions de la garantie 2 ans ne sont publiés nulle part, l'équipe les marque « à confirmer ». Aucun avis client, aucune application d'avis, aucun retour, aucune réclamation dans les sources : la section « problèmes connus » repose sur ce que le site et les documents de l'équipe laissent voir, pas sur la voix du client. Pas de brand_id Parker : aucune lecture de commentaires publicitaires ni de sondage post-achat. Le compare-at price du produit n'est pas exposé par l'export ; le « 75 € » est lu sur la landing et dans les publicités. Le prix de revient vient de la feuille de l'équipe, stated, sans frais de port ni frais de paiement.]
methods_loaded: [creative-strategy-fundamentals.md, persona-research-and-creative-strategy-process.md, killer-performance-ads.md, customer-review-mining-method.md, advertising-luxury-and-higher-price-points.md, creative-strategy-by-brand-size.md]
---

# Website and product audit — Raselio

## La piste de recherche, avant les sections

Le travail ici consiste à démonter la gamme comme quelqu'un qui devrait la vendre. La gamme tient en un seul produit, ce qui rend le catalogue court et rend chaque détail plus lourd : tout ce que la marque peut dire, elle doit le dire sur cet objet.

Ce que j'ai examiné. L'export Shopify du 6 septembre 2026 : un produit, une variante, onze images avec leurs textes alternatifs, la description HTML, quatre pages dont deux landings complètes, six politiques, une collection vide. Les analytics Shopify sur 60 et 90 jours : ventes par jour, sessions et entonnoir par jour, référents, appareils et pays, pages d'entrée, commandes par référent, clients nouveaux et récurrents, pays de facturation. Les onze commandes et quatorze fiches clients. Le digest hebdomadaire Shopify et les rapports de suivi CWILL dans Gmail. Puis les documents de l'équipe qui décrivent les versions antérieures du produit, le kit « Raselio Pro™ » du 13 et 14 août, et la lecture que l'équipe fait elle-même de son site dans le brief du 3 septembre. Pour la question du prix, j'ai chargé la méthode sur le luxe et les prix élevés, parce que « 34,99 € au lieu de 75 € » demande d'être lu par rapport à sa catégorie.

Ce qui n'a pas pu être vu : le site rendu. Le proxy bloque raselio.com. J'ai donc le code des pages, pas leur rendu, ni le panier, ni le checkout, ni le thème d'accueil. Et il n'existe aucun avis client, nulle part, donc la moitié « ce qui ne va pas » de ce document est lue dans les traces du site et dans les aveux de l'équipe, pas dans la bouche des acheteurs.

## Full SKU list and product lines

**Le catalogue, au 6 septembre 2026, verified.** Un produit, une variante, une collection vide.

| Champ | Valeur |
|---|---|
| Titre | Tondeuse Intime Homme Raselio™ |
| Handle | raselio-tondeuse-parties-intimes |
| Prix | 34,99 € TTC, TVA 20 % incluse, soit 6,65 € de TVA sur la commande #1001 à 39,90 € |
| Prix de référence affiché | « au lieu de 75 € » sur la landing et dans la créa 04, non exposé sur la fiche par l'API |
| Référence interne | MS-810 dans les briefs ; SKU Shopify « Electric intimate hair removal device » depuis le 1er septembre, « CUTLAB-TRIM-SOLO » sur les commandes #1001 à #1006 |
| Type de produit | « Bundle », tags « bundle, essentials, grooming » |
| Créé le | 2026-07-24 à 00h04 UTC ; mis à jour le 2026-09-06 à 03h23 UTC |
| Inventaire | totalInventory 0, variante à -11, c'est à dire non suivi |
| Images | 11, dont 3 sans texte alternatif ; toutes générées, noms de fichiers « ChatGPT_Image_… » et « hf_2026… » |
| Collection | « Page d'accueil », handle frontpage, 0 produit |

**Ce qu'il y a dans la boîte, d'après la marque.** Texte alternatif de l'image 9, verified : « Contenu de la boite Raselio : tondeuse, sabot guide de coupe, socle de charge, cable USB, brosse, huile ». L'advertorial, raison 7 : « Sabot, socle de charge, câble USB, huile d'entretien, brosse de nettoyage : tout est dans la boîte. Vous n'avez rien à ajouter ». Un seul sabot, trois hauteurs, verified sur la fiche : « Sabot réglable 3 hauteurs ».

**La ligne telle qu'elle a existé, parce que les traces sont encore sur le site.** Trois états en trois semaines, tous stated dans les documents de l'équipe et verified par les URL encore visitées.

1. Du 13 au 14 août : « Raselio Pro™ », deux offres, « 44,99 € (Tondeuse seule) / 59,99 € (Pack Essentiel) », le pack décrit comme « tondeuse corps céramique, tête rasoir à grille, embout nez, set 7 coupe-ongles, trousse cuir », stated dans le doc Grümwise du 13 août. Le post Facebook du 14 août vend « Le kit complet : tondeuse + accessoires, rien à racheter » et « Pack Essentiel à 59,99 € au lieu de 75 € ». L'URL de cette époque, `/products/cutlab-essentials-bundle`, a encore reçu 97 sessions en français et 9 en anglais sur 90 jours, verified.
2. Le 23 août : « Raselio™ MS-810 — Tondeuse Intime Homme · 39,90 € (barré 75 €) », stated. Une autre URL intermédiaire, `/products/raselio-tondeuse-zones-intimes-corp`, a reçu 7 sessions, verified.
3. Depuis le 26 août au soir : 34,99 €. La commande #1001 du 26 août à 10h59 UTC est à 39,90 €, la #1002 du même jour à 19h33 UTC est à 34,99 €, verified.

**Ce que la forme de la ligne dit.** Une gamme d'un seul produit qui a rétréci, pas grandi : le kit à cinq accessoires est devenu une tondeuse seule avec les accessoires de base. La page Notre Histoire a fait de ce rétrécissement une position, verified : « une seule tondeuse, pensée dans le détail, plutôt qu'une multitude d'accessoires ». Mon inférence : la marque a choisi la simplicité d'un seul objet à prix d'impulsion plutôt que la valeur perçue d'un kit, et elle l'a fait en trois jours autour de la première vente. Le prix de référence de 75 € n'a pas suivi ce mouvement.

## Top sellers and hero products

Avec un seul produit, le héros n'est pas une hypothèse. Ce qui l'est, c'est la porte par laquelle on y entre, traitée dans la section sur le point d'entrée.

**Les chiffres, verified.** 11 commandes entre le 26 août et le 4 septembre 2026, toutes d'un seul article, toutes payées, toutes livrées en France, 10 à 34,99 € et 1 à 39,90 €, chiffre d'affaires brut 377,32 €. 11 clients, 0 client récurrent. Par jour : 2 le 26 août, 1 le 27, 1 le 28, 0 le 29, 2 le 30, 0 le 31, 1 le 1er septembre, 1 le 2, 1 le 3, 2 le 4, 0 le 5. Sur les 11, 8 sont attribuées à facebook, 2 à instagram, 1 sans référent.

**Ce que l'équipe dit du produit qui se vend, stated.** Brief du 3 septembre : « 9 commandes depuis le 26/08, toutes en France, panier moyen 34,99 € (un seul produit, pas d'upsell). » Et la feuille de suivi du 6 septembre : 5 commandes du 1er au 5 septembre, CA 174,95 €, dépense publicitaire 234,18 €, « Perte ».

**Ce que le site pousse.** Il n'y a rien d'autre à pousser. Les deux landings, l'advertorial et la fiche mènent toutes au même lien `/products/raselio-tondeuse-parties-intimes`, verified sur chaque bouton.

## Bundles and starter packs

**Aujourd'hui, aucun.** Le seul produit est typé « Bundle » dans Shopify et tagué « bundle, essentials », verified, mais il se vend comme une pièce unique avec ses accessoires de base. Aucune offre à deux unités, aucun lot, aucun accessoire vendu séparément, aucune huile de rechange, aucune tête de remplacement. Le digest Shopify de la semaine du 24 au 30 août compte « 6 commandes » à « 1 article » chacune, verified.

**Hier, un pack.** Le « Pack Essentiel » à 59,99 € du 14 août était le pack de démarrage de la marque, avec l'argument « rien à racheter ». Il a disparu avant la première vente. Mon inférence : à cette date la marque cherchait à lever la peur d'un premier achat par la complétude du kit ; depuis le 26 août elle la lève par le prix, 34,99 €, et par le renversement de risque, « Satisfait ou remboursé 30 jours ». Deux réponses différentes à la même question, celle du premier oui, et la seconde est la seule qui a produit des ventes, sur 11 commandes.

**Ce qu'on ne sait pas.** Si le kit reviendra, et si le fournisseur propose les accessoires du kit à part. Le doc Grümwise du 13 août listait « tête rasoir à grille, embout nez, set 7 coupe-ongles, trousse cuir » comme des pièces déjà disponibles, stated. À confirmer avec la marque.

## Product-level differentiators

Pour chaque point, ce que la marque dit, contre quoi elle le dit, et ce que la réalité du produit permet de tenir. Je lis derrière le marketing, en gardant en tête que le produit est un modèle fournisseur, « packshot RUILANG 810 importé depuis la fiche 1688 », stated dans les prompts du 3 septembre.

**1. Tête arrondie.** La marque, verified : « Tête arrondie et lames céramique : conçues pour limiter les accrocs et les irritations, même sur peau sensible ». L'alternative nommée : la tête plate et la lame droite d'une tondeuse à barbe. Le mécanisme est expliqué dans l'advertorial : « une surface plane, une peau épaisse » contre « La peau la plus fine du corps, une surface irrégulière qui bouge ». Réalité : la forme arrondie est visible sur le packshot de référence, « tête large arrondie à peigne métallique argenté », stated. L'effet sur les accrocs n'est testé nulle part. Ce point est le cœur de l'angle n°1 de l'équipe et son seul argument pour posséder un deuxième outil. Piège à noter : la même tête arrondie est un standard de la catégorie, les tondeuses corporelles des concurrents nommés dans le set, Thomyle, Gillette Labs Intimate, Grümwise, en revendiquent l'équivalent, data-limited sur le détail.

**2. Lames céramique.** La marque : « Les lames céramique Raselio™ ne chauffent pas et coupent le poil net, sans le tirer » ; FAQ : « ne rouillent pas et conservent leur tranchant bien plus longtemps que des lames acier classiques ». Réalité : aucune fiche matière. Le doc du 13 août reprend l'argument de Grümwise à l'identique et note « aucune allégation n'est inventée » parce que « Raselio Pro coche exactement les mêmes cases que Grümwise », stated. Le premier point d'objection que Grümwise traite dans sa propre créative n°3, « la céramique, ça s'ébrèche ? », n'est traité nulle part sur le site Raselio. Piège : une lame céramique qui s'ébrèche ou ne se remplace pas devient une objection de durabilité, et aucune tête de rechange n'est vendue.

**3. LED intégrée.** La marque : « vous voyez ce que vous rasez, jusque dans les plis ». Alternative : « Vous travaillez à l'aveugle. Au-dessus d'une lame. » Réalité : la LED est visible sur le packshot, « petite LED blanche allumée sous la tête ». C'est l'élément que l'équipe considère le plus distinctif, brief du 3 septembre, stated : « Aucun concurrent FR ne parle à l'homme de 50 ans et plus, ne vouvoie, ni n'exploite la LED comme réponse à la presbytie. C'est l'espace libre. » Mon observation : c'est la seule caractéristique que la marque relie à un usage précis de son acheteur réel, les lunettes qui ne vont pas sous la douche, créa 30.

**4. 100 % étanche.** La marque : « utilisable sous la douche et rincée en quelques secondes ». Réalité : aucun indice IPX publié. La marque en fait une raison logistique, advertorial raison 6 : « La routine entière se fait sous la douche : 5 minutes, tout part avec l'eau, aucune trace de votre passage. » Piège : « 100 % » sans indice est une promesse absolue sur un produit fournisseur dont la marque n'a pas la fiche.

**5. Sabot 3 hauteurs.** La marque : « net, court, ou naturel maîtrisé. Assez court pour être impeccable, assez long pour ne jamais piquer. » Réalité : un sabot, trois positions. Piège : trois hauteurs est peu pour la catégorie ; la marque en fait un argument de simplicité, FAQ : « Commencez par la plus longue pour dégrossir, puis descendez ». C'est le seul argument qui traite la douleur n°2 de l'équipe, « repousse qui pique ».

**6. Sans fil sur socle.** La marque : « Raselio se recharge sur son socle, qui lui sert aussi de support dans la salle de bain. Aucun câble à gérer pendant l'utilisation ». Réalité : socle et câble USB dans la boîte, verified sur l'image 9. Autonomie « environ 90 minutes » sur l'advertorial, mais « à confirmer » dans les documents internes, stated. Piège : un chiffre publié que l'équipe ne tient pas en interne.

**7. Achat unique, sans abonnement.** La marque : « Chaque commande est un achat unique, sans abonnement caché ni engagement. » Réalité : vrai par construction, aucun consommable n'est vendu. C'est aussi ce qui rend la ligne sans revenu récurrent, voir la section LTV.

**8. Prix.** La marque : « 34,99 € » avec « au lieu de 75 € » et, dans les publicités, « Vous ne payez pas la pub. Vous payez la lame. » Lecture avec la méthode sur les prix élevés : le prix se lit par rapport à la catégorie, pas en absolu. L'équipe situe les concurrents « premium à 80-100 € », stated dans le doc du 13 août, et le brief du 3 septembre cite « Billy Trimmer (FR) », « Club Cooper (FR) », Thomyle, sans prix relevés. Aucun prix concurrent n'est verified dans ce run. Ma lecture provisoire, inférée : Raselio n'est ni luxe ni cher pour sa catégorie ; il est bas, ce qui déplace l'objection du « pourquoi si cher » vers le « pourquoi si peu cher », que l'équipe a elle-même listée : « « arnaque / ça vient de Chine » », « « Pas cher = pas bon » ». Cela laisse une liberté totale de format, statiques brutes, natif, sans contrainte de marque, ce que la méthode réserve aux marques sans posture luxe.

**Ce qui n'est pas un différenciateur mais est présenté comme tel.** « Garantie 2 ans » et « Satisfait ou remboursé 30 jours » sont des conditions de vente, pas des propriétés du produit. Elles occupent pourtant la place d'un argument produit sur les deux landings et dans 26 textes publicitaires sur 30. Voir Known product issues pour l'écart entre la promesse et la politique.

## Patents, proprietary materials, and manufacturing edges

**Aucun.** Aucun brevet, aucun matériau propriétaire, aucune fabrication contrôlée n'apparaît dans une source. Le produit est un modèle de catalogue fournisseur, « RUILANG 810 », acheté sur 1688, stated dans les prompts du 3 septembre et dans `running-notes/brand-rules.md`. Le coût unitaire est de 11,41 € en août et 12,71 € en septembre dans la feuille de l'équipe, stated. Le prompt de fidélité produit dit lui-même « Aucune inscription sur le produit », ce qui signifie que l'objet livré ne porte ni logo ni marque. La marque possède : son nom, non vérifié comme déposé, data-limited ; ses textes ; ses images générées ; ses landings. Rien de tout cela n'empêche un concurrent d'acheter le même modèle. Le seul avantage durable observable est immatériel : la position « pensée pour cette zone, pas pour votre barbe », et elle est partagée par les concurrents du set.

## Known product issues

Aucun avis client n'existe, donc rien ici ne vient de la voix de l'acheteur. Les problèmes ci-dessous sont visibles sur le site, dans les données ou dans les mots de l'équipe. Je les range du plus lourd au plus léger pour ce que la marque peut prétendre.

**1. La promesse de remboursement et la politique écrite ne disent pas la même chose.** Landing, verified : « Essayez Raselio pendant 30 jours, sans aucun risque. Si vous ne constatez pas de différence par rapport à votre ancienne méthode, nous vous remboursons intégralement, sans poser de questions. » Politique de remboursement, verified : « Pour être admissible à un retour, l'article doit être dans son état d'origine, non utilisé, complet » et « les produits scellés … ne peuvent plus être retournés après ouverture de leur scellé, sauf s'ils sont défectueux ou non conformes. » Les CGV ajoutent que les frais de retour d'un changement d'avis sont « à la charge du client ». Un homme qui essaie la tondeuse trente jours ne peut pas la rendre « non utilisée ». C'est la contrainte la plus lourde sur ce que la marque peut dire, et elle est interne à ses propres pages. Aucun retour n'a encore été demandé dans les sources, verified sur Gmail.

**2. Les chiffres de preuve n'existent pas.** « +17 000 hommes » et « 4,7/5 (1 734 avis) » sur un site qui a 11 commandes et aucune application d'avis, verified. Le même « 1 734 avis » figure sur le post de la marque sœur Trael, stated. L'équipe l'a repéré et propose un repli, brief du 3 septembre. Tant que ce n'est pas réglé, tout argument de preuve sociale sur le site est exposé.

**3. La conversion du site est le problème que l'équipe nomme en premier.** Brief du 3 septembre, stated : « **Le vrai problème est post-clic** : CTR 3 % mais CVR site ≈ 0,2 % et CPA 86 € pour un break-even à 21 €. » Et : « CVR sessions ≈ 0,23 % : le site convertit 5 à 10 fois moins qu'une fiche produit e-commerce saine (1-2 %). C'est le levier n°1 après les créas. » Les analytics confirment l'ordre de grandeur : 11 commandes pour 2 431 sessions sur 90 jours, soit 0,45 %, et le digest Shopify de la semaine du 24 au 30 août indique « Conversion 0,64% » pour 470 visites et 6 commandes, verified. Sur 61 jours de séries, seuls 8 jours ont au moins une session de checkout terminée. Les ajouts au panier sont rares : 44 sessions avec ajout au panier sur 2 431, verified. Le trafic lui-même est en partie hors cible : 989 sessions desktop depuis les États-Unis sur 2 404 réparties par pays, contre 791 mobile France, verified ; mon inférence, marquée comme telle, est qu'une part importante du trafic américain desktop est du trafic non humain ou de l'opérateur, ce qui gonfle le dénominateur.

**4. Les spécifications ne sont pas tenues.** « environ 90 minutes d'autonomie » publié, « RPM and exact battery life are marked "à confirmer" » en interne ; « Garantie 2 ans » publié, « garantie 1 an = *[à confirmer]* » le 13 août ; « 100 % étanche » sans indice. Stated et verified. Tant qu'une fiche fournisseur n'est pas obtenue, ces trois points ne peuvent pas être défendus.

**5. Le chantier Cutlab.** Cinq politiques sur six disent « Cutlab », deux renvoient à cutlabsupport@gmail.com, les CGV portent « Nom du médiateur : [À COMPLÉTER OBLIGATOIREMENT] », la page Contact est vide, verified. Un client qui lit les politiques découvre un autre nom de marque. La marque le sait depuis le 26 juillet.

**6. Le produit n'a jamais été photographié.** Les onze images de la fiche et toutes celles des landings sont générées, verified sur les noms de fichiers ; le doc du 4 septembre demande de vérifier « que la tondeuse n'a pas été redessinée » sur les visuels, et le brief du 3 septembre note que « quelques rendus portent un petit « RASELIO » sur le corps (18, 21, 22) que le produit réel n'a pas », stated. Un acheteur qui reçoit un objet sans marque après avoir vu un objet marqué a un motif de doute.

**7. Le délai de livraison est promis sans être mesuré.** « Livré en 48-72 h partout en France » dans la créa 29, contre une politique qui donne « 1 à 3 jours ouvrés » de préparation et des délais « à titre estimatif ». Le seul message client reçu demande précisément cela, formulaire du 26 août, verified : « Hello, can i know when you will ship if a customer should order today? », réponse : « Hello sure ». Les rapports CWILL comptent 6 expéditions en août sans aucune donnée de délai, verified.

**8. L'inventaire n'est pas suivi.** Variante à -11, verified. Aucun risque de rupture visible pour le client, mais aucune visibilité pour la marque.

**9. Le site parle anglais tout seul.** 448 traductions automatiques publiées le 27 juillet, verified ; les pages `/en/…` reçoivent 130 sessions sur 90 jours. L'offre est pourtant « Livraison Colissimo offerte » en France uniquement et la politique d'expédition évoque des droits de douane hors UE. Le « Livraison France & Canada » du 14 août a disparu, stated.

**Ce qui va au doc avis et à la marque.** Le taux de retour, le taux de casse, la tenue de la batterie, la douleur réelle à l'usage, l'ébrèchement de la céramique : rien de tout cela n'est observable aujourd'hui. Aucun retour, aucune réclamation, aucun avis. Le corpus est vide, ce qui, avec la méthode de lecture des avis, veut dire qu'aucun problème n'est écarté, seulement qu'aucun n'est encore visible.

## LTV expansion and the upsell cycle

**Le produit est un achat unique, sans cycle.** Aucun consommable, aucune tête de rechange, aucune huile vendue à part, aucun deuxième produit. La marque en fait un argument, « sans abonnement caché ». Sur 11 clients, 0 récurrent, verified, sur une fenêtre trop courte pour dire quoi que ce soit du rachat. La feuille de l'équipe calcule la marge par commande, pas par client, stated.

**Les vecteurs possibles, tous à l'état d'hypothèse, marqués comme miens.**

1. Le cadeau par la partenaire. C'est le seul vecteur pour lequel l'équipe a un signal, stated : « Les femmes 45-54 montrent un signal faible mais réel d'achat-cadeau (3 ATC, 1 paiement initié) », d'où la créa 28 « Le cadeau qu'il ne s'offrira jamais lui-même. » Ce n'est pas un rachat par le même client, c'est un second acheteur pour le même produit.
2. La deuxième unité. Rien dans l'offre ne le propose ; aucun lot à deux, aucune remise de quantité. Discounts sur 60 jours : 0 €, verified.
3. Le retour du kit. Les accessoires du pack du 14 août, « tête rasoir à grille, embout nez, set 7 coupe-ongles, trousse cuir », existent chez le fournisseur, stated. C'est le seul upsell naturel visible, et il a été retiré.
4. L'élargissement du corps. La page Notre Histoire ouvre la porte, verified : « accompagne aussi le torse, le ventre et le reste du corps » ; les créas 04 et R27 parlent de « Là-dessous · Torse · Dos » et « Une tondeuse trois zones ». C'est un élargissement d'usage, pas un second produit.
5. Le consommable qui n'existe pas encore. Tête de rechange ou lame : si la céramique s'use ou s'ébrèche, c'est le seul rachat naturel d'une tondeuse. Rien n'est vendu.

**Où la ligne cale.** Après le premier achat, il n'y a rien à acheter. La méthode rappelle qu'une gamme sans rachat est une entreprise différente d'une gamme à cycle ; ici chaque euro de marge doit être gagné sur la première commande, et la marge par unité est d'environ 22,28 € avant frais de port et de paiement, stated d'après 34,99 moins 12,71. À confirmer avec la marque : le coût Colissimo par commande et les frais Shopify Payments, absents de la feuille.

## Use-case and need-state mapping

Ce que le produit est conçu pour faire, lu dans la façon dont le site et les publicités le rangent. Aucun persona ici ; la jonction avec les vrais acheteurs se fait dans le travail persona.

| Usage ou besoin, dans les mots de la marque | Où c'est dit | Ce que le produit apporte, selon la marque |
|---|---|---|
| Raser « les testicules, les parties intimes et les zones sensibles » | Fiche produit | Tête arrondie, lames céramique, LED |
| « Le maillot, le pubis, l'aine, l'entrejambe » | Notre Histoire | Idem, « en priorité » |
| « le torse, le ventre et le reste du corps » | Notre Histoire, créa 04 « Là-dessous · Torse · Dos » | Polyvalence, « Une seule tondeuse pour là-dessous, le torse et le dos » |
| Ne plus se couper, ne plus retenir son souffle | Advertorial raisons 1 et 2, créas 06, 09, 12, 22, 23, 27 | Tête arrondie, contrôle |
| Éviter « Les boutons rouges qui apparaissent 3 jours après » et « La repousse qui pique » | Advertorial raisons 3 et 5, créas 15 et 24 | Lames céramique, sabot 3 hauteurs « jamais à blanc » |
| Voir ce qu'on rase, « Vous travaillez à l'aveugle » | Advertorial raison 4, créas 14 et 30 | LED, présentée pour l'homme qui « voit moins bien de près » |
| Faire vite et sans trace, « 5 minutes, tout part avec l'eau » | Advertorial raison 6, créas 11, W09, R18 | 100 % étanche, sous la douche |
| Se préparer « avant le moment où on en a besoin », le couple | Advertorial images « Lui au bout du lit, elle sous la couette », créas 11 « Ce soir. », 13, 17, R15 | Discrétion, résultat « qui fait bonne impression de près » |
| Être offert par la partenaire | Créa 28, R04, R19 | Colis neutre, « dont vous profiterez aussi » |
| Rester « impeccable » à son âge, « après 50 ans », « À tout âge » | Créas 01, 04, 27, R20, R28 | Identité, non une fonction |

Trois hauteurs et une fonction couvrent donc au moins huit besoins distincts dans la bouche de la marque. Où un même homme est servi à des moments différents : le soir avant un rendez-vous, sous la douche en routine, trois jours après pour ne pas piquer. La marque a écrit cette séquence dans son advertorial, du titre 1 au titre 7, et c'est la lecture la plus utile de ce tableau : un seul produit, une seule routine, sept moments.

## Entry-point product hypothesis

Il n'y a qu'un produit, donc la question du point d'entrée se déplace : par quelle page un acheteur entre, et à quel prix.

**Par quelle page, verified sur 90 jours.** Pages d'entrée : accueil 1 171 sessions, fiche produit 363, landing « 7 raisons » 312, advertorial 195, ancienne URL du kit 97, page mot de passe 92. Les commandes ne sont pas attribuées par page d'entrée dans les données disponibles, data-limited. L'équipe, stated : les créas 19, 21 et 26 « renvoient vers la landing « pourquoi-pas-votre-tondeuse-a-barbe » » et l'advertorial est « déjà l'un des chemins qui convertit », sans chiffre.

**Mon hypothèse, marquée comme telle.** L'entrée qui a produit les ventes est la fiche produit atteinte depuis une statique Facebook : 8 commandes sur 11 attribuées à facebook, 27 créas sur 30 du 3 septembre pointent vers la fiche produit avec « SHOP_NOW », 3 vers l'advertorial avec « LEARN_MORE ». Le prix d'entrée est 34,99 €, un prix d'impulsion pour la catégorie, avec le renversement de risque comme levier du premier oui. La tension à nommer sans la résoudre : le prix qui obtient le plus facilement un premier oui laisse environ 22 € de marge unitaire avant port et frais, contre un coût par achat Meta de 96,70 € sur la campagne principale, verified, ce qui veut dire que le point d'entrée le plus facile n'est pas, aujourd'hui, un point d'entrée rentable, et que la marque n'a aucun second achat pour rattraper l'écart.

**Ce que ça implique pour la lecture du héros.** Le héros et le point d'entrée sont le même objet, mais deux portes le vendent différemment : la fiche produit vend une tondeuse, l'advertorial vend un problème, la tondeuse à barbe sous la ceinture. Laquelle amène l'acheteur qui reste est une question pour le travail persona et pour le compte publicitaire, pas pour ce document.

## Open loops

Lu au travers des fondamentaux : les boucles d'un audit produit se concentrent sur la porte d'entrée contre l'économie, sur la jonction usage réel contre usage prévu, et sur les différenciateurs que la réalité produit ne confirme pas.

**Boucle 1.** Observation : la marque a remplacé un kit à 59,99 € par une tondeuse seule à 34,99 € trois jours autour de sa première vente, et elle a écrit sur son site que ce choix est une conviction ; la marge unitaire est passée avec lui sous les 23 €, sans aucun second achat possible. Pull : Surprise, elle a tiré en lisant « rien à racheter » le 14 août puis « plutôt qu'une multitude d'accessoires » sur le site vingt jours plus tard. Question : combien un acheteur qui vient d'acheter la tondeuse à 34,99 € aurait-il ajouté au panier si les accessoires du kit lui avaient été proposés ? Justification : la réponse décide si le point d'entrée à bas prix peut être rendu rentable par un panier plus gros au lieu d'un coût par achat plus bas, ce qui change tout ce que la stratégie demandera au produit. Territoire : Product.

**Boucle 2.** Observation : le site promet un essai de trente jours « sans poser de questions » et « Zéro coupure. Ou remboursé. », alors que sa politique n'accepte que les produits non utilisés et exclut les scellés ouverts ; aucun retour n'a encore été demandé. Pull : Tension, elle a tiré en lisant la politique juste après la landing. Question : quel pourcentage des acheteurs Raselio demandera un remboursement une fois la tondeuse utilisée, et que leur répond la marque ? Justification : sur un produit d'hygiène à 34,99 € livré gratuitement, le taux de retour et la réponse donnée décident si le renversement de risque est un argument tenable ou un coût caché, et donc s'il peut rester le pilier de 25 textes sur 30. Territoire : Product. Seule la marque peut répondre.

**Boucle 3.** Observation : la marque publie « environ 90 minutes d'autonomie », « 100 % étanche », « Garantie 2 ans » et « les lames céramique ne rouillent pas », et son équipe marque en interne autonomie, RPM et durée de garantie « à confirmer » ; le produit est un modèle 1688 sans fiche. Pull : Gap, elle a tiré en cherchant une fiche technique et en ne trouvant que des « à confirmer ». Question : quelles sont, chiffre par chiffre, les spécifications réelles de la MS-810 telles que le fournisseur les garantit ? Justification : chaque différenciateur produit de la marque repose sur ces chiffres, et aucun ne peut être utilisé en publicité sans eux. Territoire : Product. Seule la marque peut répondre, question 9 de `running-notes/missing-context.md`.

**Boucle 4.** Observation : 8 commandes sur 11 viennent de facebook, 27 créas sur 30 envoient vers la fiche produit, 3 vers l'advertorial, et l'équipe dit sans chiffre que l'advertorial « convertit » ; les analytics ne relient pas les commandes à la page d'entrée. Pull : Curiosity, elle a tiré parce que deux portes vendent le même objet avec deux discours et que personne ne sait laquelle amène l'acheteur qui reste. Question : par quelle page les onze acheteurs sont-ils entrés, et laquelle des deux portes a produit le plus d'achats par session ? Justification : la réponse dit où concentrer le trafic payant et quel discours, produit ou problème, est le vrai point d'entrée de Raselio. Territoire : Product.

## Appendix - Parker media links

Aucun lien média Parker n'était disponible dans ce run : la marque n'existe pas dans Parker MCP. Références média et sources ouvertes ou citées, chemins conservés à l'identique.

**Fiche produit Shopify gid://shopify/Product/15882947854667, variante gid://shopify/ProductVariant/57933901594955, images dans l'ordre de l'API avec leur texte alternatif**
- 1, « Tondeuse intime homme Raselio sur son socle de charge, pensee pour les parties intimes » : https://cdn.shopify.com/s/files/1/1067/3265/0827/files/ChatGPT_Image_21_aout_2026_20_25_27.png?v=1787336796
- 2, sans alt : https://cdn.shopify.com/s/files/1/1067/3265/0827/files/ChatGPT_Image_6_sept._2026_05_21_38.png?v=1788664954
- 3, « Macro de la tete arrondie et des lames ceramique Raselio, concues pour les zones sensibles » : https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260903_091529_f4deade0-e0f9-43a8-96e5-d71ac5961a3e.png?v=1788428566
- 4, sans alt : https://cdn.shopify.com/s/files/1/1067/3265/0827/files/ChatGPT_Image_6_sept._2026_05_14_28.png?v=1788664568
- 5, « Eclairage LED integre de la tondeuse Raselio eclairant la zone intime, plus d'angles morts » : https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260903_093717_894785bc-41d1-4a37-85c9-d7e313ef13c4.png?v=1788428566
- 6, « Comparaison tondeuse a barbe et tondeuse intime Raselio : lame peau fine, LED, lame dediee » : https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260903_091529_f292f88f-17f4-4df3-a9f1-a8d2da3dab6a.png?v=1788428567
- 7, « Tondeuse Raselio rincee sous l'eau : 100% etanche, utilisable sous la douche » : https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260903_091529_d2071e4d-aa15-4043-912a-e03acb88314f.png?v=1788428567
- 8, « Comment utiliser la tondeuse Raselio en 3 etapes : regler la hauteur, passer sans appuyer, rincer » : https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260903_093052_4336aa0e-4a74-4183-9401-edf861477703.png?v=1788428566
- 9, « Contenu de la boite Raselio : tondeuse, sabot guide de coupe, socle de charge, cable USB, brosse, huile » : https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260903_091529_30c25428-d903-4a1d-a4cc-afe8649bfcbc.png?v=1788428567
- 10, « Garantie 2 ans, satisfait ou rembourse 30 jours et colis neutre et discret avec Raselio » : https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260903_093716_c2285a30-7248-44a9-95c1-9e58749a966c.png?v=1788428567
- 11, sans alt : https://cdn.shopify.com/s/files/1/1067/3265/0827/files/ChatGPT_Image_6_sept._2026_05_14_39.png?v=1788664569

**Pages de la boutique**
- Fiche produit : https://www.raselio.com/products/raselio-tondeuse-parties-intimes
- Landing : https://www.raselio.com/pages/7-raisons
- Advertorial : https://www.raselio.com/pages/pourquoi-pas-votre-tondeuse-a-barbe
- Notre Histoire : https://www.raselio.com/pages/notre-histoire
- Politiques : https://raselio.com/policies/legal-notice · https://raselio.com/policies/privacy-policy
- Ancienne URL du kit encore visitée : /products/cutlab-essentials-bundle ; URL intermédiaire : /products/raselio-tondeuse-zones-intimes-corp

**Images de l'advertorial**
- https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260830_012123_0b741a91-d229-41f7-a635-f32243bc7008.png?v=1788053053
- https://cdn.shopify.com/s/files/1/1067/3265/0827/files/raselio-apprehension-rect.png?v=1788140739
- https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260830_005806_ad64ddf6-d384-4670-9395-3881595edb1a.png?v=1788051647
- https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260830_005806_6f1ce54d-9a78-4320-9f59-f75f72dc7c1c.png?v=1788051647
- https://cdn.shopify.com/s/files/1/1067/3265/0827/files/raselio-scene-avant-rect.png?v=1788140738
- https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260830_005806_c0b4fbec-dedc-4555-aa17-7ca5202f844f.png?v=1788051647
- https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260830_005806_52370bd7-cfca-4262-b4ad-a8eaffe96ee0.png?v=1788052021
- https://cdn.shopify.com/s/files/1/1067/3265/0827/files/raselio-scene-apres-rect.png?v=1788140739

**Images de la landing « 7 raisons »**
- https://www.raselio.com/cdn/shop/files/ChatGPT_Image_21_aout_2026_06_06_33.png?width=1600
- https://www.raselio.com/cdn/shop/files/ChatGPT_Image_21_aout_2026_06_06_43.png?width=900
- https://cdn.shopify.com/s/files/1/1067/3265/0827/files/ChatGPTImage21aout2026_01_31_21.png?width=900
- https://www.raselio.com/cdn/shop/files/ChatGPT_Image_21_aout_2026_06_11_08.png?width=900
- https://www.raselio.com/cdn/shop/files/ChatGPT_Image_21_aout_2026_15_24_25.png?width=900
- https://cdn.shopify.com/s/files/1/1067/3265/0827/files/hf_20260903_103729_792b3bdc-4ffe-4bbd-b80b-5da14e19561f.png?width=900
- https://cdn.shopify.com/s/files/1/1067/3265/0827/files/raselio-raison7-C.png?width=900

**Créas Meta citées pour l'usage produit, PNG 2K CloudFront**
- 04 Post-it zones après 50 ans : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115359_97ce5fd8-03fc-4b4d-8fdc-6179cc0418af.png
- 14 Ce que vous ne voyez pas : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120545_57ec041d-1169-47e3-8b4f-4f0019918583.png
- 15 Ça pique 3 jours après : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_121331_90c3b955-003b-43bd-b6f5-69061853dd79.png
- 24 Jour 1 · Jour 3 · Jour 7 : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_122912_973c6c7a-c540-4f16-a276-23680738e33a.png
- 28 Le cadeau qu'il ne s'offrira jamais : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_120906_5ab355bb-67f4-4510-9cab-a4cd476abd3d.png
- 29 Livré partout en France : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_121331_04f0acb4-a321-4233-a883-5c32631b5faa.png
- 30 Les lunettes : https://d8j0ntlcm91z4.cloudfront.net/user_3HOON4uZ0UBHxAqQn2ohE7Rms4P/hf_20260903_115600_ac3a76ec-5de5-4cf5-8c7b-032cbb5690ff.png

**Documents de l'équipe**
- RASELIO_10_creatives.md, 13/08, versions kit et prix 44,99 / 59,99 : https://docs.google.com/document/d/1kDDaVKnpw3pzKimJuUXn6PJpAEtp5vyo2-zTkIMuZCI/edit?usp=drivesdk&ouid=112921070097625603847
- postsfacebook1408.md, 14/08, Pack Essentiel 59,99 € : https://docs.google.com/document/d/111agG7TtW0YbpNqik1aE6uWzXJ_1R6mde0ECJq1kZDk/edit?usp=drivesdk&ouid=112921070097625603847
- raselio9adsstatiques.md, 23/08, MS-810 à 39,90 € : https://docs.google.com/document/d/1aiWsbdYNY6FMgMQx7unJlaALYMZvhj4_FW4D8aIGrJw/edit?usp=drivesdk&ouid=112921070097625603847
- RASELIO – Brief 30 créas Meta, 03/09, lecture du site par l'équipe : https://docs.google.com/document/d/1Xsu17VS85RP00yEVZZBd7jNL-BGXR_Wyn6_oFyCVB10/edit?usp=drivesdk&ouid=112921070097625603847
- integrationimagesavantapres.md, 31/08 : https://docs.google.com/document/d/1zdv-MlBpC_6QfI6D4oNpUCNkmD7cIBVJfLKzm1IgJ6k/edit?usp=drivesdk&ouid=112921070097625603847
- Suivi_comptable__3_boutiques, coût unitaire 12,71 € : https://docs.google.com/spreadsheets/d/1ee2z1guRfXPSiRPoGCLa_xVSHdWY1vKPLRaoWnObSko/edit?usp=drivesdk&ouid=112921070097625603847

Méthodes chargées pour ce document, preuve de lecture : This is based on everything I have learned about luxury and high-priced brands. This is everything I know about tailoring creative strategy to brand size.
